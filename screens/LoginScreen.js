import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Platform } from 'react-native';

export default function LoginScreen({ navigation }) {
    return (
        <BackgroundWrapper>
            {/* Tagasi-nool */}
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color={colors.brown} />
            </TouchableOpacity>

            <View style={styles.container}>
                <Text style={styles.title}>Welcome back! Glad to{'\n'}see you again</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter your email or username"
                    placeholderTextColor="#bbb"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#bbb"
                    secureTextEntry
                />

                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('IWantTo')}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.orRow}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>Or Login with</Text>
                    <View style={styles.line} />
                </View>

                <View style={styles.socialRow}>
                    <FontAwesome5 name="facebook" size={24} color="black" style={styles.socialIcon} />
                    <FontAwesome5 name="apple" size={24} color="black" style={styles.socialIcon} />
                    <FontAwesome name="envelope" size={24} color="black" style={styles.socialIcon} />
                </View>

                <View style={styles.registerRow}>
                    <Text style={styles.noAccount}>Don't have an account? </Text>
                    <TouchableOpacity>
                        <Text style={styles.registerNow}>Register Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BackgroundWrapper>
    );
}

const styles = StyleSheet.create({
    backBtn: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 2,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 30,
        paddingTop: 120,
    },
    title: {
        fontSize: Platform.OS === 'ios' ? 20 : 26,
        color: colors.black,
        marginBottom: 60,
        width: '100%',              // kogu rida
        paddingLeft: 20,
    },
    input: {
        backgroundColor: colors.white,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#eee',
        paddingHorizontal: 25,
        paddingVertical: 12,
        fontSize: 12,
        marginBottom: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.30,
        shadowRadius: 6,
        elevation: 4,
    },
    forgot: {
        alignSelf: 'flex-end',
        color: colors.black,
        fontSize: Platform.OS === 'ios' ? 10 : 12,
        marginTop: 10,
        marginBottom: 30,
        marginRight: 2,
    },
    loginBtn: {
        backgroundColor: colors.brown,
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 30,
    },
    loginText: {
        color: colors.white,
        fontSize: 18,
        //fontWeight: 'bold',
    },
    orRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
    },
    orText: {
        marginHorizontal: 10,
        color: '#888',
        fontSize: 11,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    socialIcon: {
        marginHorizontal: 16,
    },
    registerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 60,
    },
    noAccount: {
        color: '#222',
        fontSize: 11,
    },
    registerNow: {
        color: colors.blue,
        fontSize: 11,
        textDecorationLine: 'underline',
    },
});