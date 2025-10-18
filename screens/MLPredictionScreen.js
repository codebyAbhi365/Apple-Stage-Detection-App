import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function MLPredictionScreen({ navigation }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const simulateImageUpload = () => {
    Alert.alert(
      'Image Upload',
      'This feature will be available soon! For now, you can use the Stage Checker to explore apple development stages.',
      [
        { text: 'OK', onPress: () => {} },
        { text: 'Go to Stage Checker', onPress: () => navigation.navigate('StageMap') }
      ]
    );
  };

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    
    // Simulate ML analysis
    setTimeout(() => {
      const stages = [
        { id: 0, name: 'Initial Growth', confidence: 85, color: '#34C759' },
        { id: 1, name: 'Early Development', confidence: 92, color: '#FF9F0A' },
        { id: 2, name: 'Growing Phase', confidence: 78, color: '#5856D6' },
        { id: 3, name: 'Maturation', confidence: 88, color: '#FF375F' },
        { id: 4, name: 'Ripening', confidence: 95, color: '#FF6B35' },
        { id: 5, name: 'Harvest Ready', confidence: 90, color: '#8B5CF6' },
      ];
      
      const randomStage = stages[Math.floor(Math.random() * stages.length)];
      setPrediction(randomStage);
      setIsAnalyzing(false);
    }, 2000);
  };

  const viewStageDetails = () => {
    if (prediction) {
      navigation.navigate('StageDetail', { stageId: prediction.id });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AI Stage Detection</Text>
        <Text style={styles.subtitle}>Coming Soon - Upload apple photos for instant analysis</Text>
      </View>

      {/* Coming Soon Card */}
      <View style={styles.comingSoonCard}>
        <Text style={styles.comingSoonIcon}>🚀</Text>
        <Text style={styles.comingSoonTitle}>Feature Coming Soon!</Text>
        <Text style={styles.comingSoonText}>
          We're working on integrating AI-powered apple stage detection. 
          Upload photos of your apples and get instant analysis of their development stage.
        </Text>
        
        <TouchableOpacity style={styles.demoButton} onPress={simulateImageUpload}>
          <Text style={styles.demoButtonText}>Try Demo</Text>
        </TouchableOpacity>
      </View>

      {/* Alternative Action */}
      <View style={styles.alternativeCard}>
        <Text style={styles.alternativeTitle}>Explore Apple Stages Now</Text>
        <Text style={styles.alternativeText}>
          Use our interactive 3D stage checker to learn about apple development phases
        </Text>
        <TouchableOpacity style={styles.alternativeButton} onPress={() => navigation.navigate('StageMap')}>
          <Text style={styles.alternativeButtonText}>Open Stage Checker →</Text>
        </TouchableOpacity>
      </View>

      {/* Tips */}
      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>📝 Tips for Best Results</Text>
        <Text style={styles.tipItem}>• Take photos in good lighting</Text>
        <Text style={styles.tipItem}>• Focus on the apple clearly</Text>
        <Text style={styles.tipItem}>• Avoid shadows and blur</Text>
        <Text style={styles.tipItem}>• Capture the whole apple</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  comingSoonCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  comingSoonIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  demoButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#FF6B35',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  demoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  alternativeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  alternativeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  alternativeText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 16,
  },
  alternativeButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  alternativeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tipsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  tipItem: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 8,
    lineHeight: 24,
  },
});
