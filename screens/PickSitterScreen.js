import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import colors from '../constants/colors';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../constants/firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function PickSitterScreen({ navigation, route }) {
    const [sitters, setSitters] = useState([]);
    const { selectedService } = route.params || {};

    useEffect(() => {
        const fetchSitters = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "sitters"));
                const sitterList = [];
                querySnapshot.forEach((doc) => {
                    sitterList.push({ id: doc.id, ...doc.data() });
                });
                const filtered = selectedService
                    ? sitterList.filter(
                        sitter =>
                            Array.isArray(sitter.services) &&
                            sitter.services.some(
                                s => typeof s === 'string' && s.toLowerCase() === selectedService.toLowerCase()
                            )
                    )
                    : sitterList;
                setSitters(filtered);
            } catch (error) {
                console.error("Error fetching sitters:", error);
            }
        };
        fetchSitters();
    }, [selectedService]);

    return (
        <BackgroundWrapper>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color={colors.brown} />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Pick a sitter:</Text>
                <View style={styles.grid}>
                    {sitters.map((sitter, idx) => (
                        <TouchableOpacity
                            key={sitter.id || idx}
                            style={styles.card}
                            onPress={() => navigation.navigate('ViewSitter', { sitter })}
                        >
                            <View style={styles.cardTopBar}>
                                <TouchableOpacity>
                                    <Ionicons name="add-circle-outline" size={22} color="#fff" />
                                </TouchableOpacity>
                                <View style={styles.avatarCircleWrapper}>
                                    <View style={styles.avatarCircle}>
                                        {sitter.image ? (
                                            <Image source={{ uri: sitter.image }} style={styles.avatarImage} />
                                        ) : (
                                            <Text style={styles.plus}>+</Text>
                                        )}
                                    </View>
                                </View>
                                <TouchableOpacity>
                                    <FontAwesome name="heart-o" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.name}>{sitter.name || 'Unnamed'}</Text>
                            <Text style={styles.distance}>{sitter.location || 'Location unknown'}</Text>
                            <Text style={styles.description}>{sitter.description || 'No description'}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </BackgroundWrapper>
    );
}

const styles = StyleSheet.create({
    backBtn: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 2,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
        padding: 4,
    },
    scrollContent: {
        paddingVertical: 40,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: colors.black,
        marginBottom: 18,
        marginTop: 40,
        textAlign: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 18,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 18,
        paddingTop: 0,
        paddingBottom: 16,
        margin: 8,
        width: 160,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.13,
        shadowRadius: 6,
        elevation: 4,
    },
    cardTopBar: {
        width: '100%',
        height: 38,
        backgroundColor: colors.brown,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'relative',
        marginBottom: 10,
    },
    avatarCircleWrapper: {
        position: 'absolute',
        left: '58%',
        top: 40,
        transform: [{ translateX: -35 }, { translateY: -35 }],
        zIndex: 2,
    },
    avatarCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: colors.brown,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 35,
    },
    plus: {
        fontSize: 28,
        color: colors.brown,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.black,
        marginTop: 38,
        marginBottom: 2,
        textAlign: 'center',
    },
    distance: {
        fontSize: 13,
        color: colors.brown,
        marginBottom: 6,
        textAlign: 'center',
    },
    description: {
        fontSize: 12,
        color: colors.black,
        marginBottom: 8,
        textAlign: 'center',
    },
    services: {
        marginTop: 4,
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: 8,
    },
    serviceText: {
        fontSize: 11,
        color: colors.brown,
        marginBottom: 2,
    },
});