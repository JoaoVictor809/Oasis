import { View, Platform, StyleSheet } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function TabBar({ state, descriptors, navigation }) {
    const icons = {
        index: (props)=> <AntDesign name="home" size={24} color={greyColor} {...props} />,
        cursos: (props)=> <AntDesign name="user" size={24} color={greyColor} {...props} />,
        provas: (props)=> <AntDesign name="pluscircleo" size={24} color={greyColor} {...props} />
    }
    const { buildHref } = useLinkBuilder();
    const { colors } = useTheme();
    const greyColor = '#737373'
    const activeColor = '#1261D7'
    return (
        <View style={styles.tabbar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                            if(['_sitemap', '+not-found'].includes(route.name)) return null;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <PlatformPressable
                        href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabbarItem}
                    >
                        {
                            icons[route.name]({
                                color: isFocused?  activeColor: greyColor
                            })
                        }
                        <Text style={{ color: isFocused ? 'activeColor' : greyColor }}>
                            {label}
                        </Text>
                    </PlatformPressable>
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    tabbar:{
        position: 'relative',
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center',
        backgroundColor: '#fff',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 20,
        borderCurve: 'continuous',
        shadowColor: '#000',
        shadowOffset: {width:0 , height:10},
        shadowRadius: 10, 
        shadowOpacity: 0.1
    },
    tabbarItem:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})