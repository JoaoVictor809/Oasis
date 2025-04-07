import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    title: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5, // Espaço abaixo do título principal
        fontFamily: 'Poppins_Bold', // Aplicando a fonte personalizad
    },
    button: {

    },
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    image: {
        width: 340,   // Novo tamanho
        height: 340,  // Novo tamanho
        resizeMode: 'contain',
        marginBottom: 15,
    },
    buttonText: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5, // Espaço abaixo do título principal
        marginTop: 50,
        fontFamily: 'Poppins_Bold', // Aplicando a fonte personalizad
      
    },
})