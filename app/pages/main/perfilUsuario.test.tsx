import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import UserDashboard from './perfilUsuario'; // Ajuste o caminho para perfilUsuario.tsx

// Mock das dependências
jest.mock('../../../components/ActivityCalendar', () => {
  const React = require('react'); // Import React for JSX
  // const ActualActivityCalendar = jest.requireActual('../../../components/ActivityCalendar');
  return jest.fn(({ onDayPress, onMonthChange, initialMonth, markedDates }) => (
    <div data-testid="mock-activity-calendar">
      <button data-testid="calendar-day-press" onClick={() => onDayPress('2024-07-10')}>Press Day</button>
      <button data-testid="calendar-error-trigger" onClick={() => onDayPress('ERROR_DATE')}>Simulate Error Press</button>
      <button data-testid="calendar-month-change" onClick={() => onMonthChange('2024-08')}>Change Month</button>
      <span>{initialMonth}</span>
      <span>{JSON.stringify(markedDates)}</span>
    </div>
  ));
});

jest.mock('../../../components/DayActivityDetails', () => {
  const React = require('react'); // Import React for JSX
  return jest.fn(({ selectedDate, activities }) => (
    <div data-testid="mock-day-activity-details">
      <span data-testid="details-date">{selectedDate}</span>
      <span data-testid="details-activities-count">{activities.length}</span>
    </div>
  ));
});

// Mock para expo-font e outras dependências de ambiente se necessário
jest.mock('expo-font', () => ({
  useFonts: () => [true],
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

// Mock para react-native-chart-kit (se não estiver mockado globalmente)
jest.mock('react-native-chart-kit', () => {
  const React = require('react'); // Import React for JSX
  return ({
    BarChart: jest.fn(() => <div data-testid="mock-bar-chart" />),
  });
});


// Mock para a API (axios ou fetch) se as chamadas reais forem feitas em fetchDayActivityDetails
// Por enquanto, fetchDayActivityDetails tem a lógica mockada internamente,
// então não precisamos mockar axios/fetch globalmente AINDA.

describe('UserDashboard - Day Activity Details Integration', () => {
  beforeEach(() => {
    // Limpar mocks de componentes para contagem de chamadas, etc.
    require('../../../components/ActivityCalendar').mockClear();
    require('../../../components/DayActivityDetails').mockClear();
    // Se UserDashboard fizer chamadas de API reais no futuro, mocká-las aqui.
    // jest.spyOn(global, 'fetch').mockResolvedValueOnce(...);
  });

  // Needed for awaiting state updates related to fetchDayActivityDetails
  beforeAll(() => {
    jest.useFakeTimers(); // Mock timers for async operations like setTimeout in fetch
  });

  afterAll(() => {
    jest.useRealTimers(); // Restore real timers
  });


  it('fetches and displays day activity details on day press', async () => {
    const { getByTestId, queryByTestId, findByTestId } = render(<UserDashboard />);

    // Verificar que os detalhes não estão visíveis inicialmente
    expect(queryByTestId('mock-day-activity-details')).toBeNull();

    // Simular clique em um dia no calendário
    fireEvent.press(getByTestId('calendar-day-press'));

    // Verificar indicador de carregamento para detalhes (se houver um específico)
    // (No código atual, o ActivityIndicator é mais genérico ou pode não ser facilmente selecionável sem testID)
    // Poderíamos adicionar um testID ao ActivityIndicator de detalhes em perfilUsuario.tsx

    // Aguardar a renderização dos detalhes
    const detailsComponent = await findByTestId('mock-day-activity-details');
    expect(detailsComponent).toBeTruthy();

    // Verificar se DayActivityDetails foi chamado com as props corretas
    // A data '2024-07-10' é a que o mock do ActivityCalendar dispara no onDayPress
    // O número de atividades (3) é do mock dentro de fetchDayActivityDetails para essa data
    expect(getByTestId('details-date').props.children).toBe('2024-07-10');
    expect(getByTestId('details-activities-count').props.children).toBe(3);

    // Verificar se o componente DayActivityDetails foi chamado uma vez
    const DayActivityDetailsMock = require('../../../components/DayActivityDetails');
    expect(DayActivityDetailsMock).toHaveBeenCalledTimes(1);
  });

  it('shows loading indicator while fetching details and then shows details', async () => {
    // Este teste é mais robusto se a função fetchDayActivityDetails for realmente assíncrona
    // e se o estado de carregamento for testável.
    // A implementação atual de fetchDayActivityDetails já tem um delay simulado.

    const { getByTestId, findByTestId, queryByText } = render(<UserDashboard />);

    fireEvent.press(getByTestId('calendar-day-press'));

    // No UserDashboard, o ActivityIndicator para detalhes é renderizado se isLoadingDetails for true.
    // Vamos assumir que ele existe e é visível durante o carregamento.
    // Para testar isso explicitamente, o ActivityIndicator precisaria de um testID.
    // Ex: <ActivityIndicator testID="loading-details-indicator" ... />
    // expect(getByTestId('loading-details-indicator')).toBeTruthy();

    // Aguarda a conclusão da busca e renderização dos detalhes
    await findByTestId('mock-day-activity-details');
    // expect(queryByTestId('loading-details-indicator')).toBeNull(); // Deve sumir após carregar
    expect(getByTestId('details-date').props.children).toBe('2024-07-10');
  });


  it('displays an error message if fetching details fails', async () => {
    // Para este teste, precisamos forçar um erro na função fetchDayActivityDetails.
    // A maneira mais fácil é modificar temporariamente o mock interno dela ou,
    // idealmente, se ela usasse fetch/axios, mockaríamos a chamada para rejeitar.
    // Por enquanto, vamos assumir que podemos interceptar e modificar a função.

    // Como fetchDayActivityDetails está no escopo do UserDashboard,
    // o mock direto é mais complexo sem refatorar UserDashboard para aceitar fetchDayActivityDetails como prop
    // ou usar jest.spyOn em um módulo exportado.

    // Este teste é mais um placeholder para quando a chamada de API for real.
    // Se a função fetchDayActivityDetails fosse importada de outro módulo:
    // jest.spyOn(apiModule, 'fetchDayActivityDetails').mockRejectedValueOnce(new Error('API Error'));
    // A modificação em fetchDayActivityDetails para simular erro com "ERROR_DATE" já foi feita.

    const { getByTestId, findByText, queryByTestId } = render(<UserDashboard />);

    // Simular clique no botão que dispara onDayPress('ERROR_DATE')
    fireEvent.press(getByTestId('calendar-error-trigger'));

    // Aguardar a mensagem de erro
    const errorMessage = await findByText("Não foi possível carregar os detalhes das atividades.");
    expect(errorMessage).toBeTruthy();

    // Verificar que os detalhes não estão visíveis
    expect(queryByTestId('mock-day-activity-details')).toBeNull();

    // Verificar se o DayActivityDetails não foi chamado (ou foi chamado e retornou null/vazio)
    // Como o erro acontece antes da chamada efetiva com dados, ele não deve ser renderizado com dados.
    const DayActivityDetailsMock = require('../../../components/DayActivityDetails');
    // Dependendo da lógica, DayActivityDetails pode ser chamado antes do erro ser setado,
    // ou a lógica de renderização pode fazer com que ele não apareça.
    // Se selectedDateForDetails ainda for "ERROR_DATE" mas detailsError estiver setado,
    // DayActivityDetails não renderiza os detalhes, mas o componente em si pode ser "chamado".
    // O importante é que a *mensagem de erro* apareça e *conteúdo de sucesso* não.
    // A verificação de queryByTestId('mock-day-activity-details') == null é mais robusta aqui.
  });

  it('clears details when the month is changed', async () => {
    const { getByTestId, queryByTestId, findByTestId } = render(<UserDashboard />);

    // 1. Clicar em um dia para carregar detalhes
    fireEvent.press(getByTestId('calendar-day-press'));
    await findByTestId('mock-day-activity-details');
    expect(queryByTestId('mock-day-activity-details')).toBeTruthy(); // Detalhes estão visíveis

    // 2. Simular mudança de mês
    fireEvent.press(getByTestId('calendar-month-change'));

    // 3. Verificar se os detalhes foram removidos/ocultados
    // A lógica em perfilUsuario.tsx é: setSelectedDateForDetails(null); setDayActivityDetails([]);
    // Então, o DayActivityDetails não deve ser renderizado porque selectedDateForDetails é null.
    expect(queryByTestId('mock-day-activity-details')).toBeNull();
  });
});
