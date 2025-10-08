import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

export default function BackgroundWrapper({ children }) {
  return (
    <View style={styles.wrapper}>
      {/* Käpajäljed taustal */}
      <View style={styles.topLeft}>
        <Ionicons name="paw-outline" size={55} color={colors.brown} />
      </View>
      <View style={styles.topRight}>
        <Ionicons name="paw-outline" size={55} color={colors.brown} />
      </View>
      <View style={styles.bottomLeft}>
        <Ionicons name="paw-outline" size={55} color={colors.brown} />
      </View>
      <View style={styles.bottomRight}>
        <Ionicons name="paw-outline" size={55} color={colors.brown} />
      </View>

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
    overflow: 'visible',
  },
  content: {
    flex: 1,
    zIndex: 1, 
  },
  topLeft: {
    position: 'absolute',
    top: 150,
    left: -10,
    width: 60,         
    height: 60,        
    transform: [{ rotate: '40deg' }],
    opacity: 0.2,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRight: {
    position: 'absolute',
    top: 80,
    right: 10,
    width: 60,
    height: 60,
    transform: [{ rotate: '20deg' }],
    opacity: 0.2,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 150,
    left: -10,
    width: 60,
    height: 60,
    transform: [{ rotate: '30deg' }],
    opacity: 0.2,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRight: {
    position: 'absolute',
    bottom: 50,
    right: -5,
    width: 60,
    height: 60,
    transform: [{ rotate: '-50deg' }],
    opacity: 0.2,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
