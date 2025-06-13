import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import UserDashboard from './perfilUsuario'; // Ajuste o caminho se o componente for exportado como default

// Mock para expo-font, assumindo que useFonts é usado em perfilUsuario.tsx
jest.mock('expo-font', () => ({
  useFonts: () => [true], // Simula que as fontes foram carregadas
}));

// Mock para expo-router (necessário por causa do componente Link)
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  Link: jest.fn(({ href, children, ...props }) => (
    <div {...props} data-testid={`mocked-link-to-${href}`}>
      {children}
    </div>
  )),
  Stack: {
    Screen: jest.fn(({ children }) => <>{children}</>),
  }
}));

// Mock para Ionicons (se usado diretamente)
jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: (props) => <View testID="mocked-ionicons" {...props} />,
  };
});

// Mock para Alert.alert
const mockAlert = jest.fn();
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Alert.alert = mockAlert;
  return RN;
});


describe('UserDashboard (Tela de Perfil e Configurações)', () => {
  beforeEach(() => {
    // Limpa mocks antes de cada teste
    mockAlert.mockClear();
    // Limpar mocks de expo-router se necessário
    const { Link } = require('expo-router');
    (Link as jest.Mock).mockClear();

  });

  it('deve renderizar os títulos das seções de configuração', () => {
    const { getByText } = render(<UserDashboard />);

    expect(getByText('Alterar Nome de Usuário')).toBeTruthy();
    expect(getByText('Preferências de Notificação')).toBeTruthy();
    expect(getByText('Alterar Senha')).toBeTruthy();
  });

  it('deve renderizar os campos de entrada para nome de usuário', () => {
    const { getByPlaceholderText } = render(<UserDashboard />);
    expect(getByPlaceholderText('Novo nome de usuário')).toBeTruthy();
  });

  it('deve renderizar os switches para preferências de notificação', () => {
    const { getByText } = render(<UserDashboard />);
    // Os switches em si são mais difíceis de selecionar sem testIDs,
    // mas podemos verificar os textos associados a eles.
    expect(getByText('Receber notificações de novos cursos')).toBeTruthy();
    expect(getByText('Receber atualizações de progresso')).toBeTruthy();
  });

  it('deve renderizar os campos de entrada para alterar senha', () => {
    const { getByPlaceholderText } = render(<UserDashboard />);
    expect(getByPlaceholderText('Senha Atual')).toBeTruthy();
    expect(getByPlaceholderText('Nova Senha')).toBeTruthy();
    expect(getByPlaceholderText('Confirmar Nova Senha')).toBeTruthy();
  });

  // Teste de interação básico para o nome de usuário
  it('deve chamar Alert ao salvar nome de usuário', () => {
    const { getByText, getByPlaceholderText } = render(<UserDashboard />);

    const usernameInput = getByPlaceholderText('Novo nome de usuário');
    fireEvent.changeText(usernameInput, 'NovoNome');

    const saveUsernameButton = getByText('Salvar Nome');
    fireEvent.press(saveUsernameButton);

    expect(mockAlert).toHaveBeenCalledWith("Sucesso", "Nome de usuário salvo!");
  });

  // Teste de interação básico para as preferências de notificação
  it('deve chamar Alert ao salvar preferências de notificação', () => {
    const { getByText } = render(<UserDashboard />);
    // Poderíamos também simular a mudança no switch aqui se necessário
    const savePreferencesButton = getByText('Salvar Preferências');
    fireEvent.press(savePreferencesButton);

    expect(mockAlert).toHaveBeenCalledWith("Sucesso", "Preferências de notificação salvas!");
  });

  // Teste de interação para alterar senha (senhas não coincidem)
  it('deve chamar Alert com erro se as novas senhas não coincidirem', () => {
    const { getByText, getByPlaceholderText } = render(<UserDashboard />);

    const newPasswordInput = getByPlaceholderText('Nova Senha');
    fireEvent.changeText(newPasswordInput, 'nova123');

    const confirmPasswordInput = getByPlaceholderText('Confirmar Nova Senha');
    fireEvent.changeText(confirmPasswordInput, 'diferente456');

    const changePasswordButton = getByText('Alterar Senha');
    fireEvent.press(changePasswordButton);

    expect(mockAlert).toHaveBeenCalledWith("Erro", "As novas senhas não coincidem.");
  });

  // Teste de interação para alterar senha (sucesso)
  it('deve chamar Alert com sucesso se as novas senhas coincidirem', () => {
    const { getByText, getByPlaceholderText } = render(<UserDashboard />);

    const currentPasswordInput = getByPlaceholderText('Senha Atual');
    fireEvent.changeText(currentPasswordInput, 'atual123');

    const newPasswordInput = getByPlaceholderText('Nova Senha');
    fireEvent.changeText(newPasswordInput, 'nova123');

    const confirmPasswordInput = getByPlaceholderText('Confirmar Nova Senha');
    fireEvent.changeText(confirmPasswordInput, 'nova123');

    const changePasswordButton = getByText('Alterar Senha');
    fireEvent.press(changePasswordButton);

    expect(mockAlert).toHaveBeenCalledWith("Sucesso", "Senha alterada!");
  });

});
