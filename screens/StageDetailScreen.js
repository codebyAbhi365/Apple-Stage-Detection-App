import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function StageDetailScreen({ route }) {
  const { stageId } = route.params;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: `https://apple-doctor-phi.vercel.app/stage/${stageId}` }}
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
          // Prevent navigation away from the specific stage page
          if (!navState.url.includes(`/stage/${stageId}`)) {
            return false;
          }
          return true;
        }}
        onShouldStartLoadWithRequest={(request) => {
          // Only allow loading the specific stage page
          return request.url.includes(`/stage/${stageId}`);
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
