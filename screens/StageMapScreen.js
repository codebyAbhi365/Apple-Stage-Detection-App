import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Linking, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default function StageMapScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const webViewRef = useRef(null);
  const [isWebViewReady, setIsWebViewReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const loadingTimeoutRef = useRef(null);

  useEffect(() => {
    // Preload the WebView
    const timer = setTimeout(() => {
      setIsWebViewReady(true);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
    setLoadingProgress(0);
    
    // Set a timeout for 3D content loading (30 seconds)
    loadingTimeoutRef.current = setTimeout(() => {
      if (loading) {
        console.warn('3D content loading timeout - forcing load end');
        setLoading(false);
      }
    }, 30000);
  };

  const handleLoadEnd = () => {
    setLoading(false);
    setLoadingProgress(100);
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
  };

  const handleLoadProgress = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    setLoadingProgress(nativeEvent.progress * 100);
  };

  const handleError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);
    console.warn('Error details: ', nativeEvent.description);
    setError(true);
    setLoading(false);
  };

  const handleHttpError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('HTTP error: ', nativeEvent);
    // Don't set error for HTTP errors, let the page handle it
  };

  const handleRetry = () => {
    setError(false);
    setLoading(true);
    setLoadingProgress(0);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const handleWebViewMessage = (event) => {
    // Handle messages from the website if needed
    console.log('WebView message:', event.nativeEvent.data);
  };

  const openInBrowser = async () => {
    const url = 'https://applehealthcheck.vercel.app/apple-visualizer';
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open browser');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open browser');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.title}>Apple Stage Checker</Text>
            <Text style={styles.subtitle}>Interactive 3D Apple Growth Visualization</Text>
          </View>
          <TouchableOpacity style={styles.browserButton} onPress={openInBrowser}>
            <Text style={styles.browserButtonText}>🌐 Test in Browser</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#34C759" />
          <Text style={styles.loadingText}>Loading 3D Apple Models...</Text>
          <Text style={styles.progressText}>{Math.round(loadingProgress)}% loaded</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${loadingProgress}%` }]} />
          </View>
          <Text style={styles.loadingHint}>Loading 3D models and multilingual data...</Text>
        </View>
      )}

      {/* Error State */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Unable to Load Visualizer</Text>
          <Text style={styles.errorText}>
            Please check your internet connection and try again.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* WebView Container */}
      {isWebViewReady && (
        <View style={styles.webviewContainer}>
          <WebView
            ref={webViewRef}
            source={{ uri: 'https://applehealthcheck.vercel.app/apple-visualizer' }}
            style={styles.webview}
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
            onLoadProgress={handleLoadProgress}
            onError={handleError}
            onHttpError={handleHttpError}
            onMessage={handleWebViewMessage}
            // Core settings
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            scalesPageToFit={true}
            // Performance optimizations for 3D content
            cacheEnabled={true}
            cacheMode="LOAD_CACHE_ELSE_NETWORK"
            // Network optimizations
            thirdPartyCookiesEnabled={false}
            sharedCookiesEnabled={false}
            // Hardware acceleration for 3D models
            renderToHardwareTextureAndroid={true}
            androidLayerType="hardware"
            // 3D content optimizations
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            // Enable WebGL and 3D acceleration
            webGLEnabled={true}
            allowsAirPlayForMediaPlayback={false}
            // Faster rendering
            setSupportMultipleWindows={false}
            // Security and navigation
            originWhitelist={["*"]}
            allowsBackForwardNavigationGestures={true}
            bounces={false}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            // Additional performance settings - simplified for Android compatibility
            automaticallyAdjustContentInsets={false}
            contentInsetAdjustmentBehavior="never"
            // Mixed content handling
            mixedContentMode="compatibility"
            // Navigation handling
            onNavigationStateChange={(navState) => {
              return true;
            }}
            onShouldStartLoadWithRequest={(request) => {
              return request.url.includes('applehealthcheck.vercel.app') || 
                     request.url.includes('apple-visualizer');
            }}
            // Additional performance props
            incognito={false}
            allowsFullscreenVideo={false}
            allowsProtectedMedia={false}
            // Faster loading props
            pullToRefreshEnabled={false}
            // Optimize for speed - remove problematic zoom props
            // textZoom={100} - Removed to fix Android casting error
            // minimumZoomScale={1} - Removed to fix Android casting error  
            // maximumZoomScale={1} - Removed to fix Android casting error
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  browserButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
  browserButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    color: '#34C759',
    fontWeight: '600',
  },
  progressBarContainer: {
    width: 200,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 2,
  },
  loadingHint: {
    marginTop: 12,
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#fff',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#EF4444',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
