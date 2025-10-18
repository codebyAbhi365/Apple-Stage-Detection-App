import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hero Header */}
      <View style={styles.heroHeader}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <MaterialIcons name="eco" size={40} color="#FFFFFF" />
          </View>
        </View>
        <Text style={styles.heroTitle}>FruitDoctor</Text>
        <Text style={styles.heroSubtitle}>AI-Powered Apple Care Revolution</Text>
      </View>

      {/* Features Showcase */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Core Features</Text>
        <View style={styles.featuresGrid}>
          <FeatureCard
            icon="psychology"
            iconType="MaterialIcons"
            title="AI Detection"
            description="Upload photos for instant analysis"
            color="#E06B80"
          />
          <FeatureCard
            icon="cube-outline"
            iconType="Ionicons"
            title="3D Visualization"
            description="Interactive apple development models"
            color="#E06B80"
          />
          <FeatureCard
            icon="language"
            iconType="MaterialIcons"
            title="Multi-Language"
            description="English, Hindi & Marathi support"
            color="#E06B80"
          />
          <FeatureCard
            icon="chatbubble-outline"
            iconType="Ionicons"
            title="Smart Assistant"
            description="AI-powered farming guidance"
            color="#E06B80"
          />
        </View>
      </View>

      {/* How It Works */}
      <View style={styles.howToSection}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepsContainer}>
          <StepItem number="1" text="Upload apple photo" color="#FF6B35" />
          <StepItem number="2" text="AI analyzes stage" color="#34C759" />
          <StepItem number="3" text="View 3D models" color="#5856D6" />
          <StepItem number="4" text="Get expert tips" color="#FF9F0A" />
        </View>
      </View>

      {/* Technology Stack */}
      <View style={styles.techSection}>
        <Text style={styles.sectionTitle}>Powered By</Text>
        <View style={styles.techGrid}>
          <TechCard icon="logo-react" iconType="Ionicons" title="React Native" />
          <TechCard icon="psychology" iconType="MaterialIcons" title="AI/ML" />
          <TechCard icon="cloud-outline" iconType="Ionicons" title="Cloud" />
          <TechCard icon="phone-portrait-outline" iconType="Ionicons" title="Mobile First" />
        </View>
      </View>

      {/* Credits */}
      <View style={styles.creditsSection}>
        <Ionicons name="heart" size={36} color="#E06B80" style={styles.creditsIcon} />
        <Text style={styles.creditsText}>Built for farmers worldwide</Text>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

function FeatureCard({ icon, iconType, title, description, color }) {
  const renderIcon = () => {
    const iconProps = { size: 32, color: '#FFFFFF' };
    
    switch (iconType) {
      case 'MaterialIcons':
        return <MaterialIcons name={icon} {...iconProps} />;
      case 'Ionicons':
        return <Ionicons name={icon} {...iconProps} />;
      case 'FontAwesome5':
        return <FontAwesome5 name={icon} {...iconProps} />;
      case 'AntDesign':
        return <AntDesign name={icon} {...iconProps} />;
      default:
        return <Ionicons name={icon} {...iconProps} />;
    }
  };

  return (
    <View style={[styles.featureCard, { borderColor: color }]}>
      <View style={[styles.featureIcon, { backgroundColor: color }]}>
        {renderIcon()}
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDesc}>{description}</Text>
    </View>
  );
}

function StepItem({ number, text, color }) {
  return (
    <View style={styles.stepItem}>
      <View style={[styles.stepNumber, { backgroundColor: color }]}>
        <Text style={styles.stepNumberText}>{number}</Text>
      </View>
      <Text style={styles.stepText}>{text}</Text>
    </View>
  );
}

function TechCard({ icon, iconType, title }) {
  const renderIcon = () => {
    const iconProps = { size: 36, color: '#E06B80' };
    
    switch (iconType) {
      case 'MaterialIcons':
        return <MaterialIcons name={icon} {...iconProps} />;
      case 'Ionicons':
        return <Ionicons name={icon} {...iconProps} />;
      case 'FontAwesome5':
        return <FontAwesome5 name={icon} {...iconProps} />;
      case 'AntDesign':
        return <AntDesign name={icon} {...iconProps} />;
      default:
        return <Ionicons name={icon} {...iconProps} />;
    }
  };

  return (
    <View style={styles.techCard}>
      {renderIcon()}
      <Text style={styles.techTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F7F9F8',
  },
  heroHeader: {
    alignItems: 'center',
    marginBottom: 40,
    paddingVertical: 24,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E06B80',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E06B80',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 16,
  },
  logoIcon: {
    // Icon styling handled by MaterialIcons component
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#2D3A35',
    marginBottom: 12,
    letterSpacing: -1.5,
  },
  heroSubtitle: {
    fontSize: 20,
    color: '#E06B80',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 28,
  },
  featuresSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D3A35',
    marginBottom: 24,
    letterSpacing: -1,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  featureCard: {
    width: (width - 68) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#E06B80',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  featureIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  featureIconText: {
    // Icon styling handled by icon components
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3A35',
    marginBottom: 10,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 15,
    color: '#E06B80',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '600',
  },
  howToSection: {
    marginBottom: 40,
  },
  stepsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#E06B80',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  stepNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    fontSize: 18,
    color: '#4A5D52',
    fontWeight: '600',
  },
  techSection: {
    marginBottom: 40,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  techCard: {
    width: (width - 64) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E8F0ED',
    shadowColor: '#E06B80',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  techIcon: {
    marginBottom: 16,
  },
  techTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3A35',
    textAlign: 'center',
  },
  creditsSection: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 36,
    shadowColor: '#E06B80',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  creditsIcon: {
    marginBottom: 20,
  },
  creditsText: {
    fontSize: 22,
    color: '#2D3A35',
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  versionText: {
    fontSize: 16,
    color: '#E06B80',
    textAlign: 'center',
    fontWeight: '600',
  },
});
