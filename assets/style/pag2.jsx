import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    fundo001:{
        flex: 1,
        justifyContent:"flex-start",
        alignItems:'flex-start',
        zIndex:-1
        
    },
    fundo002:{
        flex: 1,
        justifyContent:"flex-start",
        alignItems:'flex-end',
        zIndex:-1
        
    },
    forma002: {
        position: 'absolute',
        top: 0,
        right:0,
        width: 110, 
        height: 161, 
        zIndex:-1
    },
    containerMain:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:200,
        
    },
    txt:{
        fontSize:20,
        fontFamily:'Super Ocean Personal Use'
    },
    
})