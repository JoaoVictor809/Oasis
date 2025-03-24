import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        zIndex:-1
    },
    forma001: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 152,
        height: 150,
    },
    container002: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        zIndex:-1
    },
    forma002: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 145,
        height: 150,
    },
    title: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: "10%",
        
    },
    botao: {
        position: 'absolute',
        bottom: 150,
        right: 20,
        zIndex: 1
    },
    txt: {
        fontSize: 25,
        fontFamily: 'MinhaFonte-Regular',
        color: "#fff",
        textAlign: "center"
    },
    caixa: {
        alignItems: "center"
    },
    input: {
        padding: 10,
        width: "100%",
        borderRadius: 20,
        backgroundColor: "#585454af",
        color: "#fff",
        borderWidth: 0, 
        outlineWidth: 0, 
        fontFamily:'Poppins_Regular',
        fontWeight:'bold'
    },
    enter: {
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        borderRadius: 20,
        backgroundColor: "#81B3FF",
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 10 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 5, 
        elevation: 5, 
    },
    containerInput:{
        width:"70%",
        display:'flex',
        gap:20
    },
    containerRegister:{
        display:'flex',
        flexDirection:'row',
        gap:2
    },
    textRegister:{
      color:"#fff" ,
      fontFamily:'Poppins_Regular',
      display:'flex'
    }
})