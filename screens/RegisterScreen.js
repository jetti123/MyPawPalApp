import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function RegisterScreen({ navigation }) {
    return (
        <BackgroundWrapper>
            {/* Tagasi-nool */}
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color={colors.brown} />
            </TouchableOpacity>

            <View style={styles.container}>
                <Text style={styles.title}>Hello! Register to get{'\n'}started</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#bbb"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#bbb"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#bbb"
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    placeholderTextColor="#bbb"
                    secureTextEntry
                />

                <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.navigate('IWantTo')}>
                    <Text style={styles.registerText}>Register</Text>
                </TouchableOpacity>

                <View style={styles.orRow}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>Or Register with</Text>
                    <View style={styles.line} />
                </View>

                <View style={styles.socialRow}>
                    <FontAwesome5 name="facebook" size={24} color="black" style={styles.socialIcon} />
                    <FontAwesome5 name="apple" size={24} color="black" style={styles.socialIcon} />
                    <FontAwesome name="envelope" size={24} color="black" style={styles.socialIcon} />
                </View>

                <View style={styles.loginRow}>
                    <Text style={styles.alreadyAccount}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginNow}>Login Now</Text>
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
        marginBottom: 40,
        width: '100%',
        paddingLeft: 20,
    },
    input: {
        backgroundColor: '#f5f5f5',
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
    registerBtn: {
        backgroundColor: colors.brown,
        borderRadius: 30,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 24,
    },
    registerText: {
        color: colors.white,
        fontSize: 18,
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
    loginRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 40,
    },
    alreadyAccount: {
        color: '#222',
        fontSize: 11,
    },
    loginNow: {
        color: colors.blue,
        fontSize: 11,
        textDecorationLine: 'underline',
    },
});