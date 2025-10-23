import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, Pressable, ScrollView, Alert } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import colors from '../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth, db } from '../constants/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function FeedingDetailsScreen({ navigation }) {
    const [mealTimes, setMealTimes] = useState('');
    const [foodType, setFoodType] = useState('');
    const [specialDiet, setSpecialDiet] = useState('');

    useEffect(() => {
        const fetchFeedingData = async () => {
            const user = auth.currentUser;
            if (!user) return;

            try {
                const feedingRef = doc(db, "pets", user.uid, "feeding", "details");
                const docSnap = await getDoc(feedingRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setMealTimes(data.mealTimes || '');
                    setFoodType(data.foodType || '');
                    setSpecialDiet(data.specialDiet || '');
                }
            } catch (error) {
                console.error("Error fetching feeding data:", error);
            }
        };

        fetchFeedingData();
    }, []);

    const handleSave = async () => {
        const user = auth.currentUser;
        if (!user) return;

        try {
            const feedingRef = doc(db, "pets", user.uid, "feeding", "details");

            await setDoc(feedingRef, {
                mealTimes,
                foodType,
                specialDiet,
                updatedAt: new Date(),
            });

            Alert.alert("Success", "Feeding details saved!");
            navigation.goBack();
        } catch (error) {
            console.error("Error saving feeding data:", error);
            Alert.alert("Error", "Failed to save feeding details.");
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
                            <Text style={styles.title}>Feeding details:</Text>

                            <Text style={styles.label}>Meal times:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={`Enter your pet's meal times (e.g., "Morning: 7 AM, Evening: 6 PM")`}
                                value={mealTimes}
                                onChangeText={setMealTimes}
                                placeholderTextColor={colors.placeholder}
                                multiline={true}
                                numberOfLines={3}
                                maxLength={200}
                                returnKeyType="default"
                            />
                            <Text style={styles.charCount}>{mealTimes.length}/200</Text>

                            <Text style={styles.label}>Food type:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={`Enter your pet's food type (e.g., "Grain-free kibble, 1 cup per meal")`}
                                value={foodType}
                                onChangeText={setFoodType}
                                placeholderTextColor={colors.placeholder}
                                multiline={true}
                                numberOfLines={3}
                                maxLength={200}
                                returnKeyType="default"
                            />
                            <Text style={styles.charCount}>{foodType.length}/200</Text>

                            <Text style={styles.label}>Special diet instructions:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={`Enter your pet's special diet instructions`}
                                value={specialDiet}
                                onChangeText={setSpecialDiet}
                                placeholderTextColor={colors.placeholder}
                                multiline={true}
                                numberOfLines={3}
                                maxLength={200}
                                returnKeyType="default"
                            />
                            <Text style={styles.charCount}>{specialDiet.length}/200</Text>

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