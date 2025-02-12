import { StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'flex-start', 
        alignItems: 'flex-end', 
    },
    forma001: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 150,
        height: 150, 
    },
    container002: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start', 
    },
    forma002: {
        position: 'absolute',
        bottom: 0,
        left:0,
        width: 150, 
        height: 150, 
    },
    title:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        gap:"10%"
    },
    botao:{
        position: 'absolute',
        bottom: 35,
        right:20,
    },
    txt:{
        fontSize:25,
        fontFamily:'MinhaFonte-Regular',
        color:"#fff",
        textAlign:"center"
    },
    caixa:{
        alignItems:"center"
    },
    input:{
        height: 200,
        margin: 12,
        padding: 10,
        width:"75%",
        borderRadius:20,
        backgroundColor:"#585454af",
        color:"#fff"
    },
    enter:{
        
        height: 45,
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        borderRadius:20,
        backgroundColor:"#81B3FF"
    }
})