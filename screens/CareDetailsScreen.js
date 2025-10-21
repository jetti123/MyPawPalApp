import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Image, TouchableWithoutFeedback } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import colors from '../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../constants/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function CareDetailsScreen({ navigation }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const docRef = doc(db, "pets", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || '');
          setType(data.type || '');
          setBreed(data.breed || '');
          setAge(data.age || '');
          setImage(data.image || null);
          setOriginalData(data);
        }
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };

    fetchPetDetails();
  }, []);

  const hasChanged = () => {
    if (!originalData) return true;

    return (
      originalData.name !== name ||
      originalData.type !== type ||
      originalData.breed !== breed ||
      originalData.age !== age ||
      originalData.image !== image
    );
  };


  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
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

  const handleSaveDetails = async () => {
    const user = auth.currentUser;
    if (!user) return;

    if (!hasChanged()) {
    navigation.navigate('PickSitter');
    return;
  }

  const petData = {
    ownerId: user.uid,
    name,
    type,
    breed,
    age,
    image,
    updatedAt: new Date()
  };

  try {
    await setDoc(doc(db, "pets", user.uid), petData, { merge: true });
    setOriginalData(petData);
    navigation.navigate('PickSitter');
  } catch (error) {
    console.error("Error saving pet details:", error);
    Alert.alert("Failed to save", "Something went wrong while saving pet details.");
  }
};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <BackgroundWrapper style={{ flex: 1 }}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color={colors.brown} />
          </TouchableOpacity>
          <View style={styles.container}>
            <Text style={styles.title}>Care Details:</Text>
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
                  placeholder="Enter your pet's name"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor={colors.brown}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your pet's type"
                  value={type}
                  onChangeText={setType}
                  placeholderTextColor={colors.brown}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your pet's breed"
                  value={breed}
                  onChangeText={setBreed}
                  placeholderTextColor={colors.brown}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your pet's age"
                  value={age}
                  onChangeText={setAge}
                  placeholderTextColor={colors.brown}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <TouchableOpacity style={styles.sectionBtn} onPress={() => navigation.navigate('HealthNeeds')}>
              <Text style={styles.sectionText}>Health and medical needs</Text>
              <Ionicons name="chevron-forward" size={22} color={colors.brown} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sectionBtn} onPress={() => navigation.navigate('FeedingDetails')}>
              <Text style={styles.sectionText}>Feeding details</Text>
              <Ionicons name="chevron-forward" size={22} color={colors.brown} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sectionBtn} onPress={() => navigation.navigate('BehaviorDetails')}>
              <Text style={styles.sectionText}>Behavior</Text>
              <Ionicons name="chevron-forward" size={22} color={colors.brown} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sectionBtn} onPress={() => navigation.navigate('RoutineDetails')}>
              <Text style={styles.sectionText}>Routine details</Text>
              <Ionicons name="chevron-forward" size={22} color={colors.brown} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextBtn} onPress={handleSaveDetails}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </View>
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
    marginLeft: 150,
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
    width: 140,
    height: 140,
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
  sectionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.brown,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 12,
    width: '100%',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionText: {
    color: colors.brown,
    fontSize: 16,
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