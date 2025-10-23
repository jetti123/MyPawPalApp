import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, Pressable, ScrollView, Alert } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import colors from '../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth, db } from '../constants/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';


export default function RoutineDetailsScreen({ navigation }) {
    const [walkTimes, setWalkTimes] = useState('');
    const [walkDuration, setWalkDuration] = useState('');
    const [pottyBreaks, setPottyBreaks] = useState('');

    useEffect(() => {
        const fetchRoutineData = async () => {
            const user = auth.currentUser;
            if (!user) return;

            try {
                const routineRef = doc(db, "pets", user.uid, "routine", "details");
                const docSnap = await getDoc(routineRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setWalkTimes(data.walkTimes || '');
                    setWalkDuration(data.walkDuration || '');
                    setPottyBreaks(data.pottyBreaks || '');
                }
            } catch (error) {
                console.error("Error fetching routine data:", error);
            }
        };

        fetchRoutineData();
    }, []);

    const handleSave = async () => {
        const user = auth.currentUser;
        if (!user) return;

        try {
            const routineRef = doc(db, "pets", user.uid, "routine", "details");

            await setDoc(routineRef, {
                walkTimes,
                walkDuration,
                pottyBreaks,
                updatedAt: new Date(),
            });

            Alert.alert("Success", "Routine details saved!");
            navigation.goBack();
        } catch (error) {
            console.error("Error saving routine data:", error);
            Alert.alert("Error", "Failed to save routine details.");
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
                            <Text style={styles.title}>Routine details:</Text>

                            <Text style={styles.label}>Walk times:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={`Enter your pet's walk times (e.g., "Morning: 7:30 AM, Evening: 6:30 PM")`}
                                value={walkTimes}
                                onChangeText={setWalkTimes}
                                placeholderTextColor={colors.placeholder}
                                multiline={true}
                                numberOfLines={3}
                                maxLength={200}
                                returnKeyType="default"
                            />
                            <Text style={styles.charCount}>{walkTimes.length}/200</Text>

                            <Text style={styles.label}>Duration of walks:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={`Enter your pet's duration of walks (e.g., "30 minutes per walk")`}
                                value={walkDuration}
                                onChangeText={setWalkDuration}
                                placeholderTextColor={colors.placeholder}
                                multiline={true}
                                numberOfLines={3}
                                maxLength={200}
                                returnKeyType="default"
                            />
                            <Text style={styles.charCount}>{walkDuration.length}/200</Text>

                            <Text style={styles.label}>Potty breaks:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={`Enter your pet's potty breaks (e.g., "Every 4 hours")`}
                                value={pottyBreaks}
                                onChangeText={setPottyBreaks}
                                placeholderTextColor={colors.placeholder}
                                multiline={true}
                                numberOfLines={3}
                                maxLength={200}
                                returnKeyType="default"
                            />
                            <Text style={styles.charCount}>{pottyBreaks.length}/200</Text>

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