import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

export default function StageMapScreen({ navigation }) {
  const stages = [
    { id: 0, title: 'Stage 0', desc: 'Initial Growth', color: '#34C759' },
    { id: 1, title: 'Stage 1', desc: 'Early Development', color: '#FF9F0A' },
    { id: 2, title: 'Stage 2', desc: 'Growing Phase', color: '#5856D6' },
    { id: 3, title: 'Stage 3', desc: 'Maturation', color: '#FF375F' },
    { id: 4, title: 'Stage 4', desc: 'Ripening', color: '#FF6B35' },
    { id: 5, title: 'Stage 5', desc: 'Harvest Ready', color: '#8B5CF6' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Apple Stage Checker</Text>
          <Text style={styles.subtitle}>Select a stage to view detailed information</Text>
        </View>

        <View style={styles.stagesGrid}>
          {stages.map((stage) => (
            <TouchableOpacity
              key={stage.id}
              style={[styles.stageCard, { borderColor: stage.color }]}
              onPress={() => navigation.navigate('StageDetail', { stageId: stage.id })}
            >
              <View style={[styles.stageIcon, { backgroundColor: stage.color }]}>
                <Text style={styles.stageNumber}>{stage.id}</Text>
              </View>
              <View style={styles.stageInfo}>
                <Text style={styles.stageTitle}>{stage.title}</Text>
                <Text style={styles.stageDesc}>{stage.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Interactive 3D Apple Models</Text>
          <View style={styles.previewContainer}>
            <WebView
              source={{ uri: 'https://apple-doctor-phi.vercel.app/stage/0' }}
              style={styles.previewWebview}
              setSupportMultipleWindows={false}
              originWhitelist={["*"]}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              scalesPageToFit={true}
              mixedContentMode="compatibility"
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              onNavigationStateChange={(navState) => {
                // Prevent navigation away from stage pages
                if (!navState.url.includes('/stage/')) {
                  return false;
                }
                return true;
              }}
              onShouldStartLoadWithRequest={(request) => {
                // Only allow loading stage pages
                return request.url.includes('/stage/');
              }}
            />
          </View>
          <Text style={styles.previewHint}>Interactive 3D Preview - Select a stage for full experience</Text>
          <Text style={styles.infoText}>
            Select any stage below to view detailed 3D models and get expert care tips for each development phase.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 28,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  stagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  stageCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  stageIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  stageNumber: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  stageInfo: {
    alignItems: 'center',
  },
  stageTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  stageDesc: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  previewContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: 12,
  },
  previewWebview: {
    flex: 1,
  },
  previewHint: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 8,
  },
});
