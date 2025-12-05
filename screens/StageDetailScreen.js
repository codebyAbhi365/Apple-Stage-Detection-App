import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function StageDetailScreen({ route }) {
  const { stageId } = route.params;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://applehealthcheck.vercel.app/apple-visualizer' }}
        style={styles.webview}
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
          // Allow navigation within the visualizer
          return true;
        }}
        onShouldStartLoadWithRequest={(request) => {
          // Allow all requests within the visualizer domain
          return request.url.includes('applehealthcheck.vercel.app') || 
                 request.url.includes('apple-visualizer');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
});
