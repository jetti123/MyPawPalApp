import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import colors from '../constants/colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Ionicons } from '@expo/vector-icons';

export default function IWantToScreen({navigation}) {
  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>I want to:</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ChooseService')}
        >
          <FontAwesome6 name="person-walking" size={32} color={colors.brown} />
          <Text style={styles.cardText}>Find someone to take{'\n'}care of my pet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="paw-outline" size={32} color={colors.brown} />
          <Text style={styles.cardText}>Take care of someone's{'\n'}pet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Continue without{'\n'}choosing</Text>
        </TouchableOpacity>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: colors.black,
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.brown,
    paddingVertical: 22,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    color: colors.brown,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
});