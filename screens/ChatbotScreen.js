import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Modal, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ChatbotScreen() {
  const [lang, setLang] = useState('en');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', icon: 'language' },
    { code: 'hi', name: 'हिंदी', icon: 'language' },
    { code: 'mr', name: 'मराठी', icon: 'language' },
  ];

  const presets = {
    en: {
      welcome: 'Hello! I\'m your Apple Assistant. Ask me about apple stages, diseases, prevention, or any farming questions you have.',
      placeholder: 'Type your question...',
      responses: [
        'Maintain proper watering and sunlight for healthy apples.',
        'Monitor for common diseases like apple scab and powdery mildew.',
        'Apply appropriate fertilizers during different growth stages.',
        'Check for pests like aphids and codling moths regularly.',
        'Ensure good air circulation around your apple trees.',
        'Prune trees during dormant season for better fruit quality.'
      ]
    },
    hi: {
      welcome: 'नमस्ते! मैं आपका सेब सहायक हूं। सेब के चरणों, रोगों, रोकथाम या किसी भी खेती के सवालों के बारे में पूछें।',
      placeholder: 'अपना सवाल टाइप करें...',
      responses: [
        'सेब के लिए उचित पानी और धूप सुनिश्चित करें।',
        'सेब स्कैब और पाउडरी मिल्ड्यू जैसे रोगों की निगरानी करें।',
        'विभिन्न विकास चरणों में उपयुक्त उर्वरक लगाएं।',
        'एफिड्स और कोडलिंग मोथ जैसे कीटों की नियमित जांच करें।',
        'अपने सेब के पेड़ों के आसपास अच्छा वायु संचार सुनिश्चित करें।',
        'बेहतर फल गुणवत्ता के लिए निष्क्रिय मौसम के दौरान पेड़ों की छंटाई करें।'
      ]
    },
    mr: {
      welcome: 'नमस्कार! मी तुमचा सफरचंद सहायक आहे. सफरचंदाच्या टप्पे, रोग, प्रतिबंध किंवा कोणत्याही शेतीच्या प्रश्नांबद्दल विचारा.',
      placeholder: 'आपला प्रश्न टाइप करा...',
      responses: [
        'निरोगी सफरचंदांसाठी योग्य पाणी आणि सूर्यप्रकाश सुनिश्चित करा.',
        'सफरचंद स्कॅब आणि पावडरी मिल्ड्यू सारख्या रोगांचे निरीक्षण करा.',
        'वेगवेगळ्या वाढीच्या टप्प्यांमध्ये योग्य खते लावा.',
        'एफिड्स आणि कोडलिंग मॉथ सारख्या कीटकांची नियमित तपासणी करा.',
        'तुमच्या सफरचंद झाडांच्या आसपास चांगला हवा संचार सुनिश्चित करा.',
        'चांगल्या फळांच्या गुणवत्तेसाठी निष्क्रिय हंगामात झाडांची छाटणी करा.'
      ]
    }
  };

  const currentPreset = presets[lang];

  function changeLanguage(languageCode) {
    setLang(languageCode);
    setShowDropdown(false);
    setMessages([{ role: 'system', content: presets[languageCode].welcome }]);
  }

  function sendMessage() {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      const randomResponse = currentPreset.responses[Math.floor(Math.random() * currentPreset.responses.length)];
      const botMsg = { role: 'assistant', content: randomResponse };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  }

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, isTyping]);

  const selectedLanguage = languages.find(l => l.code === lang);

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.assistantIcon}>
            <MaterialIcons name="psychology" size={24} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.title}>Apple Assistant</Text>
            <Text style={styles.subtitle}>AI-Powered Farming Help</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.languageButton}
          onPress={() => setShowDropdown(true)}
        >
          <Ionicons name="language" size={16} color="#E06B80" />
          <Text style={styles.languageText}>{selectedLanguage.name}</Text>
          <Ionicons name="chevron-down" size={16} color="#E06B80" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer} 
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.length === 0 && (
          <View style={styles.welcomeContainer}>
            <View style={styles.welcomeIcon}>
              <MaterialIcons name="eco" size={48} color="#E06B80" />
            </View>
            <Text style={styles.welcomeText}>{currentPreset.welcome}</Text>
          </View>
        )}
        {messages.map((message, index) => (
          <View key={index} style={[
            styles.messageContainer,
            message.role === 'user' ? styles.userMessage : styles.botMessage
          ]}>
            {message.role === 'assistant' && (
              <View style={styles.botAvatar}>
                <MaterialIcons name="psychology" size={16} color="#FFFFFF" />
              </View>
            )}
            <View style={[
              styles.messageBubble,
              message.role === 'user' ? styles.userBubble : styles.botBubble
            ]}>
              <Text style={[
                styles.messageText,
                message.role === 'user' ? styles.userText : styles.botText
              ]}>
                {message.content}
              </Text>
            </View>
          </View>
        ))}
        {isTyping && (
          <View style={[styles.messageContainer, styles.botMessage]}>
            <View style={styles.botAvatar}>
              <MaterialIcons name="psychology" size={16} color="#FFFFFF" />
            </View>
            <View style={[styles.messageBubble, styles.botBubble]}>
              <View style={styles.typingIndicator}>
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder={currentPreset.placeholder}
            style={styles.textInput}
            multiline
            maxLength={500}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity 
            onPress={sendMessage} 
            style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
            disabled={!input.trim()}
          >
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowDropdown(false)}
        >
          <View style={styles.dropdownContainer}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.dropdownItem,
                  lang === language.code && styles.selectedItem
                ]}
                onPress={() => changeLanguage(language.code)}
              >
                <Ionicons name={language.icon} size={20} color="#E06B80" />
                <Text style={styles.dropdownText}>{language.name}</Text>
                {lang === language.code && (
                  <Ionicons name="checkmark" size={20} color="#E06B80" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FFFE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    shadowColor: '#E06B80',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  assistantIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E06B80',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#E06B80',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8F4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E06B80',
  },
  languageText: {
    color: '#E06B80',
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 6,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  welcomeIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F8F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#E06B80',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E06B80',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 4,
  },
  messageBubble: {
    maxWidth: width * 0.75,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#E06B80',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderBottomLeftRadius: 4,
    shadowColor: '#E06B80',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  botText: {
    color: '#1A1A1A',
    fontWeight: '500',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E06B80',
    marginHorizontal: 2,
    opacity: 0.6,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#E06B80',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F8FFFE',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#E06B80',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    maxHeight: 100,
    marginRight: 8,
    paddingVertical: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E06B80',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E06B80',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0.1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 8,
    minWidth: 200,
    shadowColor: '#E06B80',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectedItem: {
    backgroundColor: '#F0F8F4',
  },
  dropdownText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
    marginLeft: 12,
    flex: 1,
  },
});
