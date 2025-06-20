<<<<<<< HEAD
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'

const ColorList = ({ color }) => {
    return (
        <ScrollView
            contentContainerStyle={styles.container}>
            {
                [1, 0.8, 0.5].map(opacity => (
                    <View
                        key={opacity}
                        style={[styles.color, { backgroundColor: color, opacity }]}
                    />
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    color: {
        width: '100%',
        height: 150,
        borderRadius: 25,
        borderCurve: 'continuous',
        marginBottom: 15,
    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: '100%'
    }
})

=======
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'

const ColorList = ({ color }) => {
    return (
        <ScrollView
            contentContainerStyle={styles.container}>
            {
                [1, 0.8, 0.5].map(opacity => (
                    <View
                        key={opacity}
                        style={[styles.color, { backgroundColor: color, opacity }]}
                    />
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    color: {
        width: '100%',
        height: 150,
        borderRadius: 25,
        borderCurve: 'continuous',
        marginBottom: 15,
    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: '100%'
    }
})

>>>>>>> aa6aa583bf99ca074b8092dbb29ee8385c4cb579
export default ColorList;