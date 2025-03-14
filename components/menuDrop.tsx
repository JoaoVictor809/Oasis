import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, {useState} from 'react'
import { AntDesign } from "@expo/vector-icons";

export default function MenuDrop(){
    const [expanded, setExpanded] = useState(false)
    return(
    <View>
        <TouchableOpacity style={styles.button}>
            <Text>Quantos horas vc tem</Text>
            <AntDesign name={expanded ? "caretup" : "caretdown"}/>

        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
button:{
    flex:1
}
})