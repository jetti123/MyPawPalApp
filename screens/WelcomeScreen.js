import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import colors from '../constants/colors';
import BackgroundWrapper from '../components/BackgroundWrapper';



const screenWidth = Dimensions.get('window').width;


export default function WelcomeScreen({ navigation }) {
    return (
        <BackgroundWrapper>
            <View style={styles.container}>
                {/* Pealkiri */}
                <View style={styles.headerLeft}>
                    <Text style={styles.header}>Welcome to</Text>
                </View>
                <View style={styles.headerRight}>
                    <Image
                        source={require('../assets/images/pawpal-logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                {/* Pilt */}
                <Image
                    source={require('../assets/images/welcome-pets.png')}
                    style={styles.image}
                    resizeMode="cover"
                />

                {/* Info tekst */}
                <Text style={styles.info}>
                    
                    Your pet's care is our priority. Backed by a{'\n'}
                    Money-Back Guarantee, we ensure safety and{'\n'}
                    satisfaction with every booking.
                </Text>

                {/* Nupud */}
                <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}>Register</Text>
                </TouchableOpacity>

                {/* Külalisena jätkamine */}
                <Text style={styles.guestText}>Continue as a guest</Text>
            </View>
        </BackgroundWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        paddingTop: 120,
        zIndex: 1, // et paw pildid oleksid taga
    },
    headerLeft: {
        width: '100%',
        alignItems: 'flex-start',  // vasakule joondus
        paddingHorizontal: 70,
    },
    headerRight: {
        width: '100%',
        alignItems: 'flex-end',    // paremale joondus
        paddingHorizontal: 70,
    },
    header: {
        color: colors.brown,
        fontSize: 28,
        fontWeight: '400',
        marginBottom: 6,        // vahe pealkirja ja logo vahel
    },
    logo: {
        width: 160,
        height: 40,
        marginBottom: 10,
    },
    image: {
        width: screenWidth,
        height: screenWidth * 0.4,  
        marginTop: 30,
        marginBottom: 40,
        borderRadius: 8, 
    },
    info: {
        color: colors.black,
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    loginBtn: {
        backgroundColor: colors.brown,
        borderRadius: 30,
        width: 300,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    loginText: {
        color: colors.white,
        fontSize: 18,

    },
    registerBtn: {
        borderColor: colors.brown,
        borderWidth: 2,
        borderRadius: 30,
        width: 300,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    registerText: {
        color: colors.brown,
        fontSize: 18,
    },
    guestText: {
        color: colors.blue,
        fontSize: 12,
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});