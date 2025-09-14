import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import colors from '../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { KeyboardAvoidingView, Platform, Keyboard, Pressable, ScrollView } from 'react-native';

export default function HealthNeedsScreen({ navigation }) {
    const [allergies, setAllergies] = useState('');
    const [medications, setMedications] = useState('');
    const [vetContact, setVetContact] = useState('');

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={30} // proovi 100 või isegi 120  >
            >
                <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                    <BackgroundWrapper>
                        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={28} color={colors.brown} />
                        </TouchableOpacity>

                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.container}>
                                <Text style={styles.title}>Health and{'\n'}medical details:</Text>

                                <Text style={styles.label}>Allergies:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder={`Enter your pet's allergies (e.g., "No chicken products")`}
                                    value={allergies}
                                    onChangeText={setAllergies}
                                    placeholderTextColor={colors.placeholder}
                                    multiline={true}
                                    numberOfLines={3} // nt 3 rida, piirab kõrguse
                                    maxLength={200}
                                    returnKeyType="default"

                                />
                                <Text style={styles.charCount}>{allergies.length}/200</Text>

                                <Text style={styles.label}>Medications:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder={`Enter your pet's medication intake (e.g., "Pain reliever at 8 AM daily")`}
                                    value={medications}
                                    onChangeText={setMedications}
                                    placeholderTextColor={colors.placeholder}
                                    multiline={true} // Lisa see!
                                    numberOfLines={3}
                                    maxLength={200}
                                    returnKeyType="default"

                                />
                                <Text style={styles.charCount}>{medications.length}/200</Text>
                                <Text style={styles.label}>Veterinary contact information:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder={`Enter your pet's veterinary contact information`}
                                    value={vetContact}
                                    onChangeText={setVetContact}
                                    placeholderTextColor={colors.placeholder}
                                    multiline={true} // Lisa see!
                                    numberOfLines={3}
                                    maxLength={200}
                                    returnKeyType="default"

                                />
                                <Text style={styles.charCount}>{vetContact.length}/300</Text>

                                <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.goBack()}>
                                    <Text style={styles.saveText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </BackgroundWrapper>
                </Pressable>
            </KeyboardAvoidingView>
        </>
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
        paddingTop: 120,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        color: colors.black,
        marginBottom: 32,
        textAlign: 'left',         // vasakule joondus
        marginLeft: 120,
    },
    label: {
        alignSelf: 'flex-start',
        color: colors.black,
        fontSize: 15,
        marginBottom: 10,
        marginTop: 10,

    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.black,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 10,
        fontSize: 14,
        color: colors.black,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.13,
        shadowRadius: 6,
        elevation: 4,
        textAlignVertical: 'top',
        height: 80,
    },
    saveBtn: {
        backgroundColor: colors.brown,
        borderRadius: 30,
        paddingVertical: 14,
        paddingHorizontal: 40,
        marginTop: 28,
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 4,
        elevation: 2,
    },
    saveText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    charCount: {
        alignSelf: 'flex-end',
        fontSize: 12,
        color: colors.placeholder,
        marginBottom: 10,
    },
});