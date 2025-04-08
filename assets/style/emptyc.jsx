import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    title: {
        color: '#ffff',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5, 
        fontFamily: 'Poppins_Bold', 
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#1261D7',
        alignItems: 'center',
        justifyContent: 'center',     
    },
    image: {
        width: 340,   
        height: 340,  
        resizeMode: 'contain',
        marginBottom: 15,
    },
    button: {
        width: 250,
        height: 60,
        backgroundColor: '#0E4DB0', // azul escuro
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#ffff',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Poppins_Bold',
        alignItems: 'center',
    },
    
    
})