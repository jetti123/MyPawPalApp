import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, Animated, Easing } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import colors from '../constants/colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';

const SERVICES = [
    {
        key: 'inhome',
        label: 'in-home pet sitting',
        icon: <FontAwesome6 name="house" size={50} color={colors.brown} />,
        info: `Care provided in your pet’s familiar environment. Sitters stay at your home or visit regularly to ensure your pet is fed, walked, played with, and follows their usual routine. This service is ideal for pets who feel more comfortable staying at home.`,
    },
    {
        key: 'walking',
        label: 'pet walking',
        icon: <MaterialCommunityIcons name="walk" size={50} color={colors.brown} />,
        info: `A convenient way to ensure your dog gets regular exercise and outdoor time. Professional walkers tailor the walk to your dog’s energy level, and real-time GPS tracking keeps you informed every step of the way.`,
    },
    {
        key: 'boarding',
        label: 'overnight boarding',
        icon: <Ionicons name="moon" size={50} color={colors.brown} />,
        info: `A secure and comfortable option for overnight stays when you’re away. Pets stay at a sitter’s home or a boarding facility where they are fed, entertained, and provided with a cozy sleeping area. Great for longer trips or vacations.`,
    },
    {
        key: 'daycare',
        label: 'daycare services',
        icon: <MaterialCommunityIcons name="white-balance-sunny" size={50} color={colors.brown} />,
        info: `Provides your pet with care and companionship during the day. It includes supervised playtime, meals, and social interaction in a safe environment. Perfect for keeping your pet entertained and happy while you’re at work.`,
    },
    {
        key: 'dropin',
        label: 'drop-in visits',
        icon: <MaterialCommunityIcons name="clock-fast" size={50} color={colors.brown} />,
        info: `Short visits to your home to check on your pet, refresh their water, and provide food. Sitters can also spend a little time playing with your pet or cleaning up after them. This is a great solution for independent pets that only need occasional attention.`,
    },
    {
        key: 'special',
        label: 'specialized care',
        icon: <FontAwesome5 name="exclamation" size={45} color={colors.brown} />,
        info: `Tailored for pets with unique medical, behavioral, or dietary needs. This includes administering medication, following specific feeding routines, or providing extra attention for senior pets or those with health issues.`,
    },
    {
        key: 'grooming',
        label: 'pet grooming',
        icon: <MaterialCommunityIcons name="shower" size={50} color={colors.brown} />, // asendus groomingu jaoks
        info: `Offers services like bathing, brushing, nail trimming, and ear cleaning to keep your pet looking and feeling their best. Groomers use pet-safe products and adapt to your pet’s breed and preferences. Mobile grooming options are also available for convenience.`,
    },
    {
        key: 'emergency',
        label: 'emergency care',
        icon: <MaterialCommunityIcons name="ambulance" size={50} color={colors.brown} />, // asendus emergency jaoks
        info: `Designed for urgent and unexpected situations, this service is available 24/7 to provide immediate assistance. Whether it’s an illness, injury, or sudden travel, emergency care ensures your pet gets the help they need quickly.`,
    },
];
const screenHeight = Dimensions.get('window').height;

export default function ChooseServiceScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('');
    const slideAnim = useRef(new Animated.Value(screenHeight)).current;

    const openModal = (info) => {
        setModalText(info);
        setModalVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 400,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(slideAnim, {
            toValue: screenHeight,
            duration: 400,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setModalVisible(false);
            setModalText('');
        });
    };
    return (
        <BackgroundWrapper>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color={colors.brown} />
            </TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.title}>Choose service:</Text>
                <View style={styles.grid}>
                    {SERVICES.map((service) => (
                        <View key={service.key} style={styles.cardWrap}>
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() => navigation.navigate('CareDetails')}
                                activeOpacity={0.8}
                            >
                                {service.icon}
                            </TouchableOpacity>
                            <View style={styles.labelRow}>
                                <Text style={styles.cardLabel}>{service.label}</Text>
                                <TouchableOpacity
                                    style={styles.qmark}
                                    onPress={() => openModal(service.info)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.qmarkText}>?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
            <Modal
                visible={modalVisible}
                transparent
                animationType="none"
                onRequestClose={closeModal}
            >
                <Pressable style={styles.modalOverlay} onPress={closeModal}>
                    <Animated.View style={[
                        styles.modalBox,
                        { transform: [{ translateY: slideAnim }] }
                    ]}>
                        <Text style={styles.modalText}>{modalText}</Text>
                    </Animated.View>
                </Pressable>
            </Modal>
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
        paddingTop: 100,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 23,
        color: colors.black,
        marginBottom: 16,
        textAlign: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    cardWrap: {
        width: '40%',
        margin: '3%',
        alignItems: 'center',
    },
    card: {
        width: 100,
        height: 100,
        backgroundColor: colors.white,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: colors.brown,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity: 0.20,
        shadowRadius: 4,
        elevation: 12,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6,
        marginBottom: 8,
    },
    cardLabel: {
        color: colors.brown,
        fontSize: 11,
        textAlign: 'center',
        marginRight: 6,
    },
    qmark: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.brown,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    qmarkText: {
        color: colors.brown,
        fontWeight: 'bold',
        fontSize: 11,
    },
    modalOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        backgroundColor: '#f5f5f5',
        borderRadius: 18,
        padding: 18,
        maxWidth: 260,
        minWidth: 180,
        elevation: 6,
    },
    modalText: {
        color: colors.black,
        fontSize: 11,
        textAlign: 'left',
    },
});