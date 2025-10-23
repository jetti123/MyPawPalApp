import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, Pressable, ScrollView, Alert } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import colors from '../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth, db } from '../constants/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function BehaviorDetailsScreen({ navigation }) {
    const [temperament, setTemperament] = useState('');
    const [playtime, setPlaytime] = useState('');
    const [triggers, setTriggers] = useState('');

    useEffect(() => {
        const fetchBehaviorData = async () => {
            const user = auth.currentUser;
            if (!user) return;

            try {
                const behaviorRef = doc(db, "pets", user.uid, "behavior", "details");
                const docSnap = await getDoc(behaviorRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTemperament(data.temperament || '');
                    setPlaytime(data.playtime || '');
                    setTriggers(data.triggers || '');
                }
            } catch (error) {
                console.error("Error fetching behavior data:", error);
            }
        };

        fetchBehaviorData();
    }, []);

    const handleSave = async () => {
        const user = auth.currentUser;
        if (!user) return;

        try {
            const behaviorRef = doc(db, "pets", user.uid, "behavior", "details");

            await setDoc(behaviorRef, {
                temperament,
                playtime,
                triggers,
                updatedAt: new Date(),
            });

            Alert.alert("Success", "Behavior details saved!");
            navigation.goBack();
        } catch (error) {
            console.error("Error saving behavior data:", error);
            Alert.alert("Error", "Failed to save behavior details.");
        }
    };


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={30}
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
                            <Text style={styles.title}>Behavior:</Text>

                            <Text style={styles.label}>Temperament:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={`Enter your pet's temperament info (e.g., "Friendly but shy with strangers")`}
                                value={temperament}
                                onChangeText={setTemperament}
                                placeholderTextColor={colors.placeholder}
                                multiline={true}
                                numberOfLines={3}
                                maxLength={200}
                                returnKeyType="default"
                            />
                            <Text style={styles.charCount}>{temperament.length}/200</Text>

                            <Text style={styles.label}>Playtime preferences:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={`Enter your pet's playtime preferences (e.g., "Loves tug-of-war")`}
                                value={playtime}
                                onChangeText={setPlaytime}
                                placeholderTextColor={colors.placeholder}
                                multiline={true}
                                numberOfLines={3}
                                maxLength={200}
                                returnKeyType="default"
                            />
                            <Text style={styles.charCount}>{playtime.length}/200</Text>

                            <Text style={styles.label}>Triggers or fears:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={`Enter your pet's triggers or fears (e.g., "Afraid of loud noises")`}
                                value={triggers}
                                onChangeText={setTriggers}
                                placeholderTextColor={colors.placeholder}
                                multiline={true}
                                numberOfLines={3}
                                maxLength={200}
                                returnKeyType="default"
                            />
                            <Text style={styles.charCount}>{triggers.length}/200</Text>

                            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                                <Text style={styles.saveText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </BackgroundWrapper>
            </Pressable>
        </KeyboardAvoidingView>
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
        textAlign: 'left',
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
    scrollContent: {
        flexGrow: 1,
    },
});