import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import colors from '../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CareDetailsScreen({ navigation }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');

  return (
    <BackgroundWrapper>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color={colors.brown} />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>Care Details:</Text>
        <View style={styles.row}>
          <View style={styles.avatarCircle}>
            <Text style={styles.plus}>+</Text>
          </View>
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
        <TouchableOpacity style={styles.nextBtn}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
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
    paddingTop: 120,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: colors.black,
    marginBottom: 16,
    textAlign: 'left',         // vasakule joondus
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
    width: 200,         // <-- Lisa see rida (või nt 150, 200 vastavalt soovile)

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