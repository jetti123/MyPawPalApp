import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

export default function BackgroundWrapper({ children }) {
  return (
    <View style={styles.wrapper}>
      {/* Käpajäljed taustal */}
      <Ionicons name="paw-outline" size={60} color={colors.brown} style={styles.topLeft} />
      <Ionicons name="paw-outline" size={60} color={colors.brown} style={styles.topRight} />
      <Ionicons name="paw-outline" size={60} color={colors.brown} style={styles.bottomLeft} />
      <Ionicons name="paw-outline" size={60} color={colors.brown} style={styles.bottomRight} />

      {/* Laps (nt WelcomeScreen) */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.white, 
  },
  content: {
    flex: 1,
    zIndex: 1, // toob sisu käppade kohale
  },
  topLeft: {
    position: 'absolute',
    top: 80,
    left: -10,
    transform: [{ rotate: '40deg' }],
    opacity: 0.2,
    zIndex: 0,
  },
  topRight: {
    position: 'absolute',
    top: 30,
    right: 10,
    transform: [{ rotate: '20deg' }],
    opacity: 0.3,
    zIndex: 0,
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 150,
    left: -10,
    transform: [{ rotate: '30deg' }],
    opacity: 0.2,
    zIndex: 0,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 50,
    right: -5,
    transform: [{ rotate: '-50deg' }],
    opacity: 0.3,
    zIndex: 0,
  },
});
