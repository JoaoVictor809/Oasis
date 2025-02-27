import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        margin: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 120, // Ajuste para dispositivos móveis
        height: 120,
        resizeMode: 'contain',
        marginBottom: 15,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1261D7',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginBottom: 10,
        textAlign: 'center',
    },
    paragraph: {
        fontSize: 14,
        lineHeight: 22,
        color: '#333',
        textAlign: 'justify',
        marginBottom: 10,
    },
    bulletPoint: {
        fontSize: 14,
        color: '#333',
        textAlign: 'left',
        marginBottom: 5,
    },
});
