import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export interface ChatMessage {
  id: string;
  username: string;
  avatar: string;
  message: string;
  timestamp: string;
  isVIP?: boolean;
  isSystem?: boolean;
}

interface GlobalChatModalProps {
  visible: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  currentUser: {
    username: string;
    avatar: string;
    isVIP: boolean;
  };
  onlineCount: number;
}

export const GlobalChatModal: React.FC<GlobalChatModalProps> = ({
  visible,
  onClose,
  messages,
  onSendMessage,
  currentUser,
  onlineCount,
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const [showEmojis, setShowEmojis] = useState(false);

  const QUICK_EMOJIS = ['👋', '😄', '😂', '👏', '🎉', '❤️', '🔥', '🏆', '💪', '🤔'];

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const addEmoji = (emoji: string) => {
    setInputMessage(prev => prev + emoji);
    setShowEmojis(false);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [visible, messages]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.chatContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.title}>🌍 Global Chat</Text>
              <View style={styles.onlineBadge}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>{onlineCount} online</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
              <Text style={styles.closeIconText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageRow,
                  msg.username === currentUser.username && styles.ownMessageRow,
                  msg.isSystem && styles.systemMessageRow,
                ]}
              >
                {msg.isSystem ? (
                  <Text style={styles.systemMessage}>{msg.message}</Text>
                ) : (
                  <>
                    <Text style={styles.messageAvatar}>{msg.avatar}</Text>
                    <View style={styles.messageBubble}>
                      <View style={styles.messageHeader}>
                        <Text style={styles.messageUsername}>{msg.username}</Text>
                        {msg.isVIP && (
                          <View style={styles.vipBadge}>
                            <Text style={styles.vipText}>VIP</Text>
                          </View>
                        )}
                        <Text style={styles.messageTime}>{formatTime(msg.timestamp)}</Text>
                      </View>
                      <Text style={styles.messageText}>{msg.message}</Text>
                    </View>
                  </>
                )}
              </View>
            ))}
          </ScrollView>

          {/* Emoji Picker */}
          {showEmojis && (
            <View style={styles.emojiPicker}>
              {QUICK_EMOJIS.map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  style={styles.emojiButton}
                  onPress={() => addEmoji(emoji)}
                >
                  <Text style={styles.emojiText}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Input */}
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.emojiToggle}
              onPress={() => setShowEmojis(!showEmojis)}
            >
              <Text style={styles.emojiToggleText}>😊</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor="#666"
              value={inputMessage}
              onChangeText={setInputMessage}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !inputMessage.trim() && styles.sendButtonDisabled,
              ]}
              onPress={handleSend}
              disabled={!inputMessage.trim()}
            >
              <Text style={styles.sendIcon}>➤</Text>
            </TouchableOpacity>
          </View>

          {/* Rules */}
          <Text style={styles.rulesText}>
            Be kind and respectful. No spam or inappropriate content.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// Chat Button for Home Screen
export const ChatButton: React.FC<{
  unreadCount: number;
  onPress: () => void;
}> = ({ unreadCount, onPress }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (unreadCount > 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.1, duration: 500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [unreadCount]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={[
          styles.chatButton,
          { transform: [{ scale: pulseAnim }] },
        ]}
      >
        <Text style={styles.chatButtonIcon}>💬</Text>
        {unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </Text>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'flex-end',
  },
  chatContainer: {
    backgroundColor: '#1a1a2e',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: height * 0.75,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 12,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
    marginRight: 6,
  },
  onlineText: {
    color: '#22c55e',
    fontSize: 12,
  },
  closeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIconText: {
    color: '#fff',
    fontSize: 16,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  ownMessageRow: {
    flexDirection: 'row-reverse',
  },
  systemMessageRow: {
    justifyContent: 'center',
  },
  systemMessage: {
    color: '#9ca3af',
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 12,
  },
  messageAvatar: {
    fontSize: 32,
    marginRight: 8,
  },
  messageBubble: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 12,
    maxWidth: '75%',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  messageUsername: {
    color: '#8b5cf6',
    fontWeight: '600',
    fontSize: 12,
  },
  vipBadge: {
    backgroundColor: '#fbbf24',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  vipText: {
    color: '#1a1a2e',
    fontSize: 10,
    fontWeight: 'bold',
  },
  messageTime: {
    color: '#9ca3af',
    fontSize: 10,
  },
  messageText: {
    color: '#fff',
    lineHeight: 20,
  },
  emojiPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  emojiButton: {
    padding: 8,
  },
  emojiText: {
    fontSize: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    gap: 8,
  },
  emojiToggle: {
    padding: 8,
  },
  emojiToggleText: {
    fontSize: 24,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#8b5cf6',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendIcon: {
    color: '#fff',
    fontSize: 18,
  },
  rulesText: {
    color: '#9ca3af',
    fontSize: 10,
    textAlign: 'center',
    paddingBottom: 16,
  },
  chatButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  chatButtonIcon: {
    fontSize: 28,
  },
  unreadBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ef4444',
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  unreadText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default GlobalChatModal;
