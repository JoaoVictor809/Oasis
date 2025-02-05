import {View, Text} from "react-native"
import React from "react"
import { Stack } from "expo-router";
import ColorList from '../../../components/ColorList'

export default function index(){
    return(
        
        <View>
            <ColorList color="#0891b2" />
        </View>
    )
}