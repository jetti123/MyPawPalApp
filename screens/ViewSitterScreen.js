import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import colors from '../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const SERVICE_ICONS = {
    "In-home pet sitting": <FontAwesome6 name="house" size={28} color={colors.brown} />,
    "Pet walking": <MaterialCommunityIcons name="walk" size={28} color={colors.brown} />,
    "Overnight boarding": <Ionicons name="moon" size={28} color={colors.brown} />,
    "Daycare services": <MaterialCommunityIcons name="white-balance-sunny" size={28} color={colors.brown} />,
    "Drop-in visits": <MaterialCommunityIcons name="clock-fast" size={28} color={colors.brown} />,
    "Specialized care": <FontAwesome5 name="exclamation" size={28} color={colors.brown} />,
    "Pet grooming": <MaterialCommunityIcons name="shower" size={28} color={colors.brown} />,
    "Emergency care": <MaterialCommunityIcons name="ambulance" size={28} color={colors.brown} />,
};

const SERVICE_LABELS = {
    walking: "Pet walking",
    specialized: "Specialized care",
    inhome: "In-home pet sitting",
    boarding: "Overnight boarding",
    daycare: "Daycare services",
    grooming: "Pet grooming",
    emergency: "Emergency care",
    dropin: "Drop-in visits",
};

export default function ViewSitterScreen({ route, navigation }) {
    const { sitter } = route.params;

    return (
        <BackgroundWrapper>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color={colors.brown} />
                </TouchableOpacity>
                <View style={styles.avatarCircle}>
                    {sitter.image ? (
                        <Image source={{ uri: sitter.image }} style={styles.avatarImage} />
                    ) : (
                        <Ionicons name="person" size={60} color={colors.brown} />
                    )}
                </View>
                <Text style={styles.name}>{sitter.name || 'Unnamed'}</Text>
                <Text style={styles.distance}>{sitter.location || '0.0km'}</Text>
                <Text style={styles.description}>{sitter.description || 'No description'}</Text>
                <Text style={styles.sectionTitle}>Services</Text>
                <View style={styles.servicesRow}>
                    {(sitter.services || []).map((service, i) => (
                        <View key={i} style={styles.serviceBlock}>
                            {SERVICE_ICONS[service] || <Ionicons name="help-circle" size={28} color={colors.brown} />}
                            <Text style={styles.serviceLabel}>{SERVICE_LABELS[service] || service}</Text>
                        </View>
                    ))}

                    <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.saveText}>Book now</Text>
                    </TouchableOpacity>
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
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 40,
        paddingHorizontal: 16,
    },
    avatarCircle: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 3,
        borderColor: colors.brown,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginBottom: 12,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 55,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 22,
        color: colors.black,
        marginBottom: 2,
        textAlign: 'center',
    },
    distance: {
        fontSize: 14,
        color: colors.brown,
        marginBottom: 2,
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        color: colors.black,
        marginBottom: 18,
        textAlign: 'center',
        lineHeight: 20,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.black,
        marginTop: 18,
        marginBottom: 30,
        textAlign: 'center',
    },
    servicesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 18,
    },
    serviceBlock: {
        alignItems: 'center',
        marginHorizontal: 12,
        marginBottom: 12,
        maxWidth: 80,
    },
    serviceLabel: {
        fontSize: 12,
        color: colors.brown,
        textAlign: 'center',
        marginTop: 4,
        flexWrap: 'wrap',
    },
    saveBtn: {
        backgroundColor: colors.brown,
        borderRadius: 30,
        paddingVertical: 14,
        paddingHorizontal: 40,
        marginTop: 120,
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
});