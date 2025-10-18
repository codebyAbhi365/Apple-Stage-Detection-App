import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FloatingChatbotButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.floatingButton} 
      onPress={() => navigation.navigate('Chatbot')}
    >
      <Text style={styles.chatIcon}>💬</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    zIndex: 1000,
  },
  chatIcon: {
    fontSize: 24,
  },
});
