import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function ResourcesScreen() {
  const resources = [
    {
      title: 'Farming Guide',
      description: 'Complete apple cultivation guide',
      icon: 'leaf-outline',
      iconType: 'Ionicons',
      color: '#E06B80'
    },
    {
      title: 'Disease Control',
      description: 'Identify and treat diseases',
      icon: 'shield-checkmark-outline',
      iconType: 'Ionicons',
      color: '#E06B80'
    },
    {
      title: 'Fertilization',
      description: 'Optimal nutrition schedules',
      icon: 'nutrition',
      iconType: 'Ionicons',
      color: '#E06B80'
    },
    {
      title: 'Harvest Guide',
      description: 'Best harvesting practices',
      icon: 'cube-outline',
      iconType: 'Ionicons',
      color: '#E06B80'
    },
    {
      title: 'Weather Tips',
      description: 'Weather impact on apples',
      icon: 'partly-sunny-outline',
      iconType: 'Ionicons',
      color: '#E06B80'
    },
    {
      title: 'Market Prep',
      description: 'Prepare for market sale',
      icon: 'cash-outline',
      iconType: 'Ionicons',
      color: '#E06B80'
    }
  ];

  const handleResourcePress = (resource) => {
    alert(`Opening: ${resource.title}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Resources</Text>
        <Text style={styles.subtitle}>Essential guides for apple farming</Text>
      </View>

      {/* Resources Grid */}
      <View style={styles.resourcesGrid}>
        {resources.map((resource, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.resourceCard, { borderColor: resource.color }]}
            onPress={() => handleResourcePress(resource)}
          >
            <View style={[styles.resourceIconContainer, { backgroundColor: resource.color }]}>
              <Ionicons name={resource.icon} size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.resourceDesc}>{resource.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Links */}
      <View style={styles.linksSection}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <View style={styles.linkList}>
          <ResourceLink title="Extension Services" url="https://example.com" icon="business-outline" />
          <ResourceLink title="Growers Association" url="https://example.com" icon="people-outline" />
          <ResourceLink title="Weather Services" url="https://example.com" icon="partly-sunny-outline" />
          <ResourceLink title="Market Prices" url="https://example.com" icon="trending-up-outline" />
        </View>
      </View>

      {/* Support */}
      <View style={styles.supportSection}>
        <Text style={styles.supportTitle}>Need Help?</Text>
        <Text style={styles.supportText}>Our team is here to assist you</Text>
        <TouchableOpacity style={styles.supportButton}>
          <Ionicons name="help-circle-outline" size={20} color="#FFFFFF" style={styles.supportButtonIcon} />
          <Text style={styles.supportButtonText}>Get Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function ResourceLink({ title, url, icon }) {
  const handlePress = () => {
    Linking.openURL(url).catch(err => console.error('Could not open URL:', err));
  };

  return (
    <TouchableOpacity style={styles.linkItem} onPress={handlePress}>
      <View style={styles.linkLeft}>
        <Ionicons name={icon} size={20} color="#E06B80" style={styles.linkIcon} />
        <Text style={styles.linkText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#64748B" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8FAFC',
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
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  resourceCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  resourceIconContainer: {
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
  resourceIcon: {
    // Icon styling handled by Ionicons component
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
    textAlign: 'center',
  },
  resourceDesc: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
  linksSection: {
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  linkList: {
    gap: 12,
  },
  linkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  linkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  linkIcon: {
    marginRight: 12,
  },
  linkText: {
    fontSize: 16,
    color: '#E06B80',
    fontWeight: '500',
  },
  linkArrow: {
    // Icon styling handled by Ionicons component
  },
  supportSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  supportTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  supportText: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 20,
    textAlign: 'center',
  },
  supportButton: {
    backgroundColor: '#E06B80',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#E06B80',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportButtonIcon: {
    marginRight: 8,
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
