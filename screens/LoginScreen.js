import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../config/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

const { height } = Dimensions.get('window');

export default function AuthScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && !name)) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Logged in!');
        navigation.replace('AdminDrawer');
      } else {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, { displayName: name });
        Alert.alert('Success', 'Account created!');
        navigation.replace('AdminDrawer');
      }
    } catch (error) {
      Alert.alert('Auth Failed', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <LinearGradient colors={['#6C63FF', '#A084E8']} style={styles.topGradient} />

          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <Text style={styles.topLink}>
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <Text style={styles.topLinkBold} onPress={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'Get Started' : 'Sign in'}
                </Text>
              </Text>
              <Text style={styles.logo}>Phibmat</Text>
            </View>

            <View style={styles.formWrapper}>
              <View style={styles.form}>
                <Text style={styles.title}>
                  {isLogin ? 'Welcome Back' : 'Get started free.'}
                </Text>
                <Text style={styles.subtitle}>
                  {isLogin
                    ? 'Enter your details below'
                    : 'Free forever. No credit card needed.'}
                </Text>

                <TextInput
                  placeholder="Email Address"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                {!isLogin && (
                  <TextInput
                    placeholder="Your Name"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                  />
                )}

                <TextInput
                  placeholder="Password"
                  secureTextEntry
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                />

                <LinearGradient colors={['#6C63FF', '#A084E8']} style={styles.button}>
                  <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center' }}
                    onPress={handleAuth}
                  >
                    <Text style={styles.buttonText}>{isLogin ? 'Sign in' : 'Sign up'}</Text>
                  </TouchableOpacity>
                </LinearGradient>

                {isLogin && <Text style={styles.forgot}>Forgot your password?</Text>}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FD' },
  scrollContainer: { flexGrow: 1, padding: 0 },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.75,
    zIndex: -1,
  },
  header: { alignItems: 'center', marginTop: 80, marginBottom: 20 },
  topLink: { fontSize: 14, color: '#eee' },
  topLinkBold: { color: '#ffffff', fontWeight: 'bold' },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginTop: 10 },
  formWrapper: {
    flex: 1,
    backgroundColor: '#F7F8FD',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    marginTop: 100,
  },
  form: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { color: '#999', marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  forgot: {
    color: '#6C63FF',
    textAlign: 'center',
    marginBottom: 16,
  },
});
