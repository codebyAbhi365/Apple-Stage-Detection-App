import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Platform, Dimensions, Animated } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.appRoot}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Animated Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.topBar}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>Good Morning! 👋</Text>
              <Text style={styles.userName}>Ready to check your apples?</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={20} color="#E06B80" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search-outline" size={18} color="#9CA3AF" style={styles.searchIcon} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search diseases, stages..."
                placeholderTextColor="#9CA3AF"
                style={styles.searchInput}
                returnKeyType="search"
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options-outline" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Stats Cards Row */}
        <Animated.View style={[styles.statsContainer, { opacity: fadeAnim }]}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Apples Analyzed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Healthy Trees</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Issues Found</Text>
          </View>
        </Animated.View>

        {/* Main Action Card */}
        <Animated.View style={[styles.mainActionCard, { opacity: fadeAnim }]}>
          <View style={styles.mainActionContent}>
            <View style={styles.mainActionText}>
              <Text style={styles.mainActionTitle}>AI-Powered Analysis</Text>
              <Text style={styles.mainActionSubtitle}>Get instant insights about your apple health</Text>
            </View>
            <View style={styles.mainActionIcon}>
              <MaterialIcons name="psychology" size={32} color="#FFFFFF" />
            </View>
          </View>
          <TouchableOpacity 
            style={styles.mainActionButton}
            onPress={() => navigation.navigate('MLPrediction')}
          >
            <Text style={styles.mainActionButtonText}>Start Analysis</Text>
            <Ionicons name="arrow-forward" size={18} color="#E06B80" />
          </TouchableOpacity>
        </Animated.View>

        {/* Quick Access Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Access Grid - 2 per row */}
        <View style={styles.quickAccessGrid}>
          <QuickAccessCard
            title="Stage Checker"
            subtitle="3D Apple Stages"
            icon="apple"
            iconType="FontAwesome5"
            color="#E06B80"
            onPress={() => navigation.navigate('StageMap')}
          />
          <QuickAccessCard
            title="AI Assistant"
            subtitle="Get Help & Tips"
            icon="chatbubble-outline"
            iconType="Ionicons"
            color="#E06B80"
            onPress={() => navigation.navigate('Chatbot')}
          />
          <QuickAccessCard
            title="Resources"
            subtitle="Farming Guides"
            icon="book-outline"
            iconType="Ionicons"
            color="#E06B80"
            onPress={() => navigation.navigate('Resources')}
          />
          <QuickAccessCard
            title="About"
            subtitle="Learn More"
            icon="information-circle-outline"
            iconType="Ionicons"
            color="#E06B80"
            onPress={() => navigation.navigate('About')}
          />
        </View>

        {/* Recent Activity */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
        </View>
        
        <View style={styles.activityCard}>
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="checkmark-circle" size={20} color="#E06B80" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Apple #12 Analysis Complete</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
            <View style={styles.activityStatus}>
              <Text style={styles.statusText}>Healthy</Text>
            </View>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="warning" size={20} color="#F59E0B" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Apple #8 Needs Attention</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
            <View style={styles.activityStatusWarning}>
              <Text style={styles.statusTextWarning}>Issue</Text>
            </View>
          </View>
        </View>

        {/* Weather & Tips Card */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherHeader}>
            <Text style={styles.weatherTitle}>Today's Conditions</Text>
            <Ionicons name="sunny" size={24} color="#F59E0B" />
          </View>
          <View style={styles.weatherInfo}>
            <Text style={styles.weatherTemp}>24°C</Text>
            <Text style={styles.weatherDesc}>Perfect for apple growth</Text>
          </View>
          <View style={styles.tipContainer}>
            <View style={styles.tipHeader}>
              <Ionicons name="bulb-outline" size={16} color="#E06B80" />
              <Text style={styles.tipText}>Tip: Water your trees early morning for best results</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function QuickAccessCard({ title, subtitle, icon, iconType, color, onPress }) {
  const renderIcon = () => {
    const iconProps = { size: 22, color: '#FFFFFF' };
    
    switch (iconType) {
      case 'FontAwesome5':
        return <FontAwesome5 name={icon} {...iconProps} />;
      case 'MaterialIcons':
        return <MaterialIcons name={icon} {...iconProps} />;
      case 'AntDesign':
        return <AntDesign name={icon} {...iconProps} />;
      default:
        return <Ionicons name={icon} {...iconProps} />;
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.quickAccessCard}>
      <View style={[styles.quickAccessIcon, { backgroundColor: color }]}>
        {renderIcon()}
      </View>
      <Text style={styles.quickAccessTitle}>{title}</Text>
      <Text style={styles.quickAccessSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appRoot: {
    flex: 1,
    backgroundColor: '#F8FFFE',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E06B80',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    position: 'relative',
  },
  notificationIcon: {
    // Icon styling handled by Ionicons component
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: '#E06B80',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1A1A1A',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#E06B80',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E06B80',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  filterIcon: {
    // Icon styling handled by Ionicons component
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
  statNumber: {
    fontSize: 24,
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
  mainActionCard: {
    backgroundColor: '#E06B80',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
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
  },
  mainActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainActionEmoji: {
    // Icon styling handled by MaterialIcons component
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
  mainActionArrow: {
    marginLeft: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  seeAllText: {
    fontSize: 14,
    color: '#E06B80',
    fontWeight: '600',
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  quickAccessCard: {
    width: (width - 52) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#E06B80',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  quickAccessIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#E06B80',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  quickAccessIconText: {
    // Icon styling handled by icon components
  },
  quickAccessTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
    textAlign: 'center',
  },
  quickAccessSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#E06B80',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityEmoji: {
    // Icon styling handled by Ionicons component
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  activityStatus: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  activityStatusWarning: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusTextWarning: {
    fontSize: 12,
    color: '#D97706',
    fontWeight: '600',
  },
  weatherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#E06B80',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  weatherTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  weatherIcon: {
    // Icon styling handled by Ionicons component
  },
  weatherInfo: {
    marginBottom: 16,
  },
  weatherTemp: {
    fontSize: 32,
    fontWeight: '800',
    color: '#E06B80',
    marginBottom: 4,
  },
  weatherDesc: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  tipContainer: {
    backgroundColor: '#F0F8F4',
    borderRadius: 12,
    padding: 12,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
    lineHeight: 20,
    marginLeft: 8,
    flex: 1,
  },
});
