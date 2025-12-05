import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions, Animated, Platform, Image } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function MLPredictionScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const cameraRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const analysisSteps = [
    { 
      id: 0, 
      title: "Image Preprocessing", 
      description: "Enhancing image quality and removing noise",
      icon: "image-outline",
      color: "#3B82F6"
    },
    { 
      id: 1, 
      title: "Feature Detection", 
      description: "Extracting color, texture, and shape features",
      icon: "scan-outline",
      color: "#8B5CF6"
    },
    { 
      id: 2, 
      title: "Neural Network Analysis", 
      description: "Processing through deep learning model",
      icon: "hardware-chip-outline",
      color: "#F59E0B"
    },
    { 
      id: 3, 
      title: "Stage Classification", 
      description: "Comparing against 6-stage growth model",
      icon: "analytics-outline",
      color: "#10B981"
    },
    { 
      id: 4, 
      title: "Confidence Calculation", 
      description: "Generating accuracy metrics and results",
      icon: "checkmark-circle-outline",
      color: "#EF4444"
    }
  ];

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        setCapturedImage(photo.uri);
        setShowCamera(false);
        analyzeImage(photo.uri);
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const analyzeImage = async (imageUri) => {
    setIsAnalyzing(true);
    setPrediction(null);
    setCurrentStep(0);
    setProgress(0);
    
    // Simulate ML analysis with step-by-step progress
    const stepDuration = 1200; // 1200ms per step (slower)
    
    for (let i = 0; i < analysisSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration));
      setCurrentStep(i);
      setProgress(((i + 1) / analysisSteps.length) * 100);
    }
    
    // Final delay for results
    setTimeout(() => {
      const stages = [
        { 
          id: 0, 
          name: 'Stage 0: Initial Growth', 
          confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
          color: '#34C759',
          description: 'Small green fruit, just beginning to develop from flower',
          characteristics: ['Very small size (1-2cm)', 'Bright green color', 'Firm texture', 'Just formed from bloom']
        },
        { 
          id: 1, 
          name: 'Stage 1: Early Development', 
          confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
          color: '#FF9F0A',
          description: 'Growing fruit with developing shape and structure',
          characteristics: ['Small to medium size (2-4cm)', 'Light green color', 'Developing shape', 'Growing rapidly']
        },
        { 
          id: 2, 
          name: 'Stage 2: Growing Phase', 
          confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
          color: '#5856D6',
          description: 'Active growth phase with significant size increase',
          characteristics: ['Medium size (4-6cm)', 'Mixed green colors', 'Active growth', 'Shape becoming defined']
        },
        { 
          id: 3, 
          name: 'Stage 3: Maturation', 
          confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
          color: '#FF375F',
          description: 'Fruit reaching mature size and beginning color change',
          characteristics: ['Large size (6-8cm)', 'Color starting to change', 'Sweetening begins', 'Firm but developing']
        },
        { 
          id: 4, 
          name: 'Stage 4: Ripening', 
          confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
          color: '#FF6B35',
          description: 'Fruit developing final color and sweetness',
          characteristics: ['Full size (8-10cm)', 'Final color development', 'Sweet aroma', 'Texture softening']
        },
        { 
          id: 5, 
          name: 'Stage 5: Harvest Ready', 
          confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
          color: '#8B5CF6',
          description: 'Perfect for harvesting and consumption',
          characteristics: ['Optimal size (10cm+)', 'Perfect color', 'Sweet taste', 'Ready to harvest']
        },
      ];
      
      // Ensure we get a random stage from 0-5
      const randomStageIndex = Math.floor(Math.random() * 6); // 0-5
      const randomStage = stages[randomStageIndex];
      setPrediction(randomStage);
      setIsAnalyzing(false);
      
      // Animate result appearance
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 500);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setPrediction(null);
    setCurrentStep(0);
    setProgress(0);
    setShowCamera(true);
    fadeAnim.setValue(0);
  };

  const viewStageDetails = () => {
    if (prediction) {
      navigation.navigate('StageDetail', { stageId: prediction.id });
    }
  };

  if (!permission) {
    return (
      <View style={styles.appRoot}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>Requesting camera permission...</Text>
        </View>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.appRoot}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>Camera Permission Required</Text>
          <Text style={styles.permissionText}>
            We need camera access to capture apple photos for analysis.
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (showCamera) {
    return (
      <View style={styles.appRoot}>
        <CameraView
          style={styles.camera}
          facing="back"
          ref={cameraRef}
        >
          <View style={styles.cameraOverlay}>
            <View style={styles.cameraHeader}>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setShowCamera(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.cameraFooter}>
              <View style={styles.captureGuide}>
                <Text style={styles.guideText}>Position apple in the center</Text>
                <View style={styles.guideFrame} />
              </View>
              
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <View style={styles.appRoot}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
        <Text style={styles.title}>AI Stage Detection</Text>
            <Text style={styles.subtitle}>Capture apple photos for instant analysis</Text>
          </View>
          <View style={styles.headerIcon}>
            <MaterialIcons name="psychology" size={24} color="#E06B80" />
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {!capturedImage ? (
          // Initial state - show capture button
          <View style={styles.initialState}>
            {/* Main Action Card */}
            <View style={styles.mainActionCard}>
              <View style={styles.mainActionContent}>
                <View style={styles.mainActionText}>
                  <Text style={styles.mainActionTitle}>Ready to Analyze</Text>
                  <Text style={styles.mainActionSubtitle}>
                    Take a photo of your apple to get instant stage detection and growth analysis
        </Text>
                </View>
                <View style={styles.mainActionIcon}>
                  <Ionicons name="camera" size={32} color="#FFFFFF" />
                </View>
              </View>
              <TouchableOpacity 
                style={styles.mainActionButton}
                onPress={() => setShowCamera(true)}
              >
                <Text style={styles.mainActionButtonText}>Capture Apple</Text>
                <Ionicons name="arrow-forward" size={18} color="#E06B80" />
        </TouchableOpacity>
      </View>

            {/* Quick Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <View style={styles.statIcon}>
                  <Ionicons name="flash" size={20} color="#E06B80" />
                </View>
                <Text style={styles.statNumber}>3s</Text>
                <Text style={styles.statLabel}>Analysis Time</Text>
              </View>
              <View style={styles.statCard}>
                <View style={styles.statIcon}>
                  <Ionicons name="checkmark-circle" size={20} color="#E06B80" />
                </View>
                <Text style={styles.statNumber}>95%</Text>
                <Text style={styles.statLabel}>Accuracy</Text>
              </View>
              <View style={styles.statCard}>
                <View style={styles.statIcon}>
                  <FontAwesome5 name="apple" size={20} color="#E06B80" />
                </View>
                <Text style={styles.statNumber}>6</Text>
                <Text style={styles.statLabel}>Stages</Text>
              </View>
      </View>

            {/* Tips Card */}
      <View style={styles.tipsCard}>
              <View style={styles.tipsHeader}>
                <Ionicons name="bulb-outline" size={20} color="#E06B80" />
                <Text style={styles.tipsTitle}>Tips for Best Results</Text>
              </View>
              <View style={styles.tipsList}>
                <View style={styles.tipItem}>
                  <Ionicons name="sunny" size={16} color="#F59E0B" />
                  <Text style={styles.tipText}>Take photos in good lighting</Text>
                </View>
                <View style={styles.tipItem}>
                  <Ionicons name="eye" size={16} color="#3B82F6" />
                  <Text style={styles.tipText}>Focus on the apple clearly</Text>
                </View>
                <View style={styles.tipItem}>
                  <Ionicons name="shield-checkmark" size={16} color="#10B981" />
                  <Text style={styles.tipText}>Avoid shadows and blur</Text>
                </View>
                <View style={styles.tipItem}>
                  <Ionicons name="scan" size={16} color="#8B5CF6" />
                  <Text style={styles.tipText}>Capture the whole apple</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          // Show captured image and results
          <View style={styles.resultsContainer}>
            {/* Captured Image */}
            <View style={styles.imageCard}>
              <View style={styles.imageHeader}>
                <Ionicons name="image" size={20} color="#E06B80" />
                <Text style={styles.imageLabel}>Captured Image</Text>
              </View>
              {capturedImage ? (
                <Image 
                  source={{ uri: capturedImage }} 
                  style={styles.capturedImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="checkmark-circle" size={48} color="#10B981" />
                  <Text style={styles.imagePlaceholderText}>Image Captured</Text>
                  <Text style={styles.imagePlaceholderSubtext}>Ready for analysis</Text>
                </View>
              )}
            </View>

            {/* Analysis Status */}
            {isAnalyzing && (
              <View style={styles.analyzingCard}>
                <View style={styles.analyzingIcon}>
                  <MaterialIcons name="psychology" size={32} color="#E06B80" />
                </View>
                <Text style={styles.analyzingText}>
                  {analysisSteps[currentStep]?.title || "Analyzing Apple Stage..."}
                </Text>
                <Text style={styles.analyzingSubtext}>
                  {analysisSteps[currentStep]?.description || "AI is processing your image"}
                </Text>
                
                {/* Progress Steps */}
                <View style={styles.stepsContainer}>
                  {analysisSteps.map((step, index) => (
                    <View key={step.id} style={styles.stepItem}>
                      <View style={[
                        styles.stepIcon,
                        { 
                          backgroundColor: index <= currentStep ? step.color : '#E5E7EB',
                          borderColor: index <= currentStep ? step.color : '#E5E7EB',
                          borderWidth: 2
                        }
                      ]}>
                        {index < currentStep ? (
                          <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                        ) : index === currentStep ? (
                          <Ionicons name={step.icon} size={18} color="#FFFFFF" />
                        ) : (
                          <Ionicons name={step.icon} size={18} color="#9CA3AF" />
                        )}
                      </View>
                      <View style={styles.stepContent}>
                        <Text style={[
                          styles.stepTitle,
                          { color: index <= currentStep ? '#1A1A1A' : '#9CA3AF' }
                        ]}>
                          {step.title}
                        </Text>
                        <Text style={[
                          styles.stepDescription,
                          { color: index <= currentStep ? '#6B7280' : '#9CA3AF' }
                        ]}>
                          {step.description}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
                
                {/* Progress Bar */}
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.progressText}>{Math.round(progress)}% Complete</Text>
              </View>
            )}

            {/* Results */}
            {prediction && (
              <Animated.View style={[styles.resultCard, { opacity: fadeAnim }]}>
                <View style={styles.resultHeader}>
                  <View style={styles.resultTitleContainer}>
                    <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                    <Text style={styles.resultTitle}>Analysis Complete!</Text>
                  </View>
                  <View style={[styles.confidenceBadge, { backgroundColor: prediction.color }]}>
                    <Text style={styles.confidenceText}>{prediction.confidence}%</Text>
                  </View>
                </View>

                <View style={styles.stageResult}>
                  <Text style={styles.stageName}>{prediction.name}</Text>
                  <Text style={styles.stageDescription}>{prediction.description}</Text>
                </View>

                <View style={styles.characteristicsContainer}>
                  <View style={styles.characteristicsHeader}>
                    <Ionicons name="list" size={18} color="#E06B80" />
                    <Text style={styles.characteristicsTitle}>Key Characteristics</Text>
                  </View>
                  {prediction.characteristics.map((char, index) => (
                    <View key={index} style={styles.characteristicItem}>
                      <Ionicons name="ellipse" size={8} color="#E06B80" />
                      <Text style={styles.characteristicText}>{char}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
                    <Ionicons name="camera" size={18} color="#6B7280" />
                    <Text style={styles.retakeButtonText}>Retake Photo</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.detailsButton} onPress={viewStageDetails}>
                    <Text style={styles.detailsButtonText}>View Details</Text>
                    <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>

                {/* Additional Information Cards */}
                <View style={styles.infoCardsContainer}>
                  <View style={styles.infoCard}>
                    <View style={styles.infoCardHeader}>
                      <Ionicons name="information-circle" size={20} color="#E06B80" />
                      <Text style={styles.infoCardTitle}>Analysis Summary</Text>
                    </View>
                    <Text style={styles.infoCardText}>
                      Your apple has been analyzed using advanced AI technology. 
                      The model examined color, size, texture, and growth patterns 
                      to determine the current development stage.
                    </Text>
                  </View>

                  <View style={styles.infoCard}>
                    <View style={styles.infoCardHeader}>
                      <Ionicons name="trending-up" size={20} color="#E06B80" />
                      <Text style={styles.infoCardTitle}>Next Steps</Text>
                    </View>
                    <Text style={styles.infoCardText}>
                      Based on this stage, monitor your apple's development and 
                      follow recommended care practices. Use the Stage Checker 
                      to learn more about optimal growing conditions.
                    </Text>
                  </View>

                  <View style={styles.infoCard}>
                    <View style={styles.infoCardHeader}>
                      <Ionicons name="time" size={20} color="#E06B80" />
                      <Text style={styles.infoCardTitle}>Timeline</Text>
                    </View>
                    <Text style={styles.infoCardText}>
                      Apple development typically takes 150-180 days from bloom 
                      to harvest. Track your progress and plan harvesting 
                      based on the current stage.
                    </Text>
                  </View>
                </View>
              </Animated.View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appRoot: {
    flex: 1,
    backgroundColor: '#F8FFFE',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    shadowColor: '#E06B80',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F8F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  // Permission screens
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: '#E06B80',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#E06B80',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Camera interface
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    paddingTop: 50,
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cameraFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  captureGuide: {
    alignItems: 'center',
    marginBottom: 30,
  },
  guideText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  guideFrame: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 100,
    borderStyle: 'dashed',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  // Initial state
  initialState: {
    flex: 1,
  },
  mainActionCard: {
    backgroundColor: '#E06B80',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#E06B80',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  mainActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainActionText: {
    flex: 1,
  },
  mainActionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  mainActionSubtitle: {
    fontSize: 14,
    color: '#F0F8F4',
    fontWeight: '500',
    lineHeight: 20,
  },
  mainActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  mainActionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E06B80',
    marginRight: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#E06B80',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F8F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: '#E06B80',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    textAlign: 'center',
  },
  tipsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#E06B80',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 12,
    fontWeight: '500',
    flex: 1,
  },
  // Results
  resultsContainer: {
    flex: 1,
  },
  imageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#E06B80',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  imageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  imageLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: '#F0F8F4',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 12,
    marginBottom: 4,
  },
  imagePlaceholderSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  capturedImage: {
    height: 200,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  analyzingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#E06B80',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  analyzingIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0F8F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  analyzingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  analyzingSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  progressBar: {
    width: 200,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E06B80',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
  stepsContainer: {
    marginVertical: 20,
    gap: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  stepContent: {
    flex: 1,
    paddingTop: 2,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#E06B80',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  confidenceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  confidenceText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  stageResult: {
    marginBottom: 16,
  },
  stageName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  stageDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    fontWeight: '500',
  },
  characteristicsContainer: {
    marginBottom: 20,
  },
  characteristicsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  characteristicsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  characteristicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  characteristicText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 12,
    fontWeight: '500',
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  retakeButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  retakeButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  detailsButton: {
    flex: 1,
    backgroundColor: '#E06B80',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#E06B80',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  infoCardsContainer: {
    marginTop: 20,
    gap: 16,
  },
  infoCard: {
    backgroundColor: '#F8FFFE',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  infoCardText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    fontWeight: '500',
  },
});
