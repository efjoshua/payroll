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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#6C63FF', '#A084E8']} style={styles.topGradient} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.topLink}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <Text style={styles.topLinkBold} onPress={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Get Started' : 'Sign in'}
            </Text>
          </Text>
          <Text style={styles.logo}>Jobsly</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Get started free.'}</Text>
          <Text style={styles.subtitle}>
            {isLogin
              ? 'Enter your details below'
              : 'Free forever. No credit card needed.'}
          </Text>

          <TextInput placeholder="Email Address" style={styles.input} keyboardType="email-address" />

          {!isLogin && (
            <TextInput placeholder="Your name" style={styles.input} />
          )}

          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />

          <LinearGradient colors={['#6C63FF', '#A084E8']} style={styles.button}>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.buttonText}>{isLogin ? 'Sign in' : 'Sign up'}</Text>
            </TouchableOpacity>
          </LinearGradient>

          {isLogin && (
            <Text style={styles.forgot}>Forgot your password?</Text>
          )}

          <Text style={styles.or}>Or sign in with</Text>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <AntDesign name="google" size={20} color="#DB4437" />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <AntDesign name="facebook-square" size={20} color="#4267B2" />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 24,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
    zIndex: -1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  topLink: {
    fontSize: 14,
    color: '#eee',
  },
  topLinkBold: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  form: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: -30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#999',
    marginBottom: 24,
  },
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
  or: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 16,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  socialText: {
    marginLeft: 8,
    fontWeight: '500',
  },
});
