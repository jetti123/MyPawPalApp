import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BackgroundWrapper from '../components/BackgroundWrapper';
import colors from '../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db, auth } from '../constants/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function SitterProfileScreen({ navigation }) {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            const user = auth.currentUser;
            if (!user) return;

            try {
                const docRef = doc(db, "sitters", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setName(data.name || '');
                    setLocation(data.location || '');
                    setDescription(data.description || '');
                    setSelectedServices(data.services || []);
                    setImage(data.image || null);
                }
            } catch (error) {
                console.error("Error fetching sitter profile:", error);
            }
        };

        fetchProfile();
    }, []);

    const services = [
        "In-home pet sitting",
        "Pet walking",
        "Overnight boarding",
        "Daycare services",
        "Drop-in visits",
        "Specialized care",
        "Pet grooming",
        "Emergency care"
    ];

    const toggleService = (service) => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter(s => s !== service));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const handleSaveProfile = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                alert("You must be logged in!");
                return;
            }

            await setDoc(doc(db, "sitters", user.uid), {
                name,
                location,
                description,
                services: selectedServices,
                image: image || null,
                createdAt: new Date(),
            });

            alert("Profile saved!");
            navigation.navigate("IWantTo");
        } catch (error) {
            console.error("Error saving sitter profile:", error);
            alert("Failed to save profile");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1 }}>
                <BackgroundWrapper style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={28} color={colors.brown} />
                    </TouchableOpacity>

                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >

                        <View style={styles.container}>
                            <Text style={styles.title}>Sitter Profile</Text>
                            <View style={styles.row}>
                                <TouchableOpacity style={styles.avatarCircle} onPress={pickImage}>
                                    {image ? (
                                        <Image source={{ uri: image }} style={styles.avatarImage} />
                                    ) : (
                                        <Text style={styles.plus}>+</Text>
                                    )}
                                </TouchableOpacity>

                                <View style={styles.inputCol}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Your name"
                                        value={name}
                                        onChangeText={setName}
                                        placeholderTextColor={colors.brown}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Your location"
                                        value={location}
                                        onChangeText={setLocation}
                                        placeholderTextColor={colors.brown}
                                    />
                                    <TextInput
                                        style={[styles.input, { height: 60 }]}
                                        placeholder="Describe yourself"
                                        value={description}
                                        onChangeText={setDescription}
                                        multiline={true}
                                        placeholderTextColor={colors.brown}
                                    />
                                </View>
                            </View>

                            <Text style={styles.sectionTitle}>Select services you offer:</Text>
                            {services.map((service, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.serviceBtn,
                                        selectedServices.includes(service) && styles.serviceBtnSelected
                                    ]}
                                    onPress={() => toggleService(service)}
                                >
                                    <Text
                                        style={[
                                            styles.serviceText,
                                            selectedServices.includes(service) && styles.serviceTextSelected
                                        ]}
                                    >
                                        {service}
                                    </Text>
                                </TouchableOpacity>
                            ))}

                            <TouchableOpacity style={styles.nextBtn} onPress={handleSaveProfile}>
                                <Text style={styles.nextText}>Save and continue</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </BackgroundWrapper>
            </View>
        </TouchableWithoutFeedback>
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
        alignItems: 'flex-start',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        color: colors.black,
        marginBottom: 16,
        textAlign: 'left',
        marginLeft: 100,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 18,
        width: '100%',
        justifyContent: 'center',
    },
    avatarCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 2,
        borderColor: colors.brown,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 18,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 6,
        elevation: 4,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 70,
    },
    plus: {
        fontSize: 36,
        color: colors.brown,
    },
    inputCol: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.brown,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginBottom: 10,
        fontSize: 11,
        color: colors.brown,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 4,
        elevation: 2,
        width: 200,
    },
    sectionTitle: {
        fontSize: 18,
        color: colors.black,
        marginVertical: 10,
    },
    serviceBtn: {
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.brown,
        paddingVertical: 12,
        paddingHorizontal: 18,
        marginBottom: 10,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 4,
        elevation: 2,
    },
    serviceBtnSelected: {
        backgroundColor: colors.brown,
    },
    serviceText: {
        color: colors.brown,
        fontSize: 14,
    },
    serviceTextSelected: {
        color: '#fff',
        fontWeight: 'bold',
    },
    nextBtn: {
        backgroundColor: colors.brown,
        borderRadius: 30,
        paddingVertical: 14,
        paddingHorizontal: 40,
        marginTop: 18,
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 4,
        elevation: 2,
    },
    nextText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
