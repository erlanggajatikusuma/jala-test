import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Splash = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Home')
        }, 3000)
    },[])
    return (
        <View style={styles.page}>
            <Text>Welcome to JALA</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
      },
})
