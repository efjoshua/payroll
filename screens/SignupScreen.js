import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

export default function SignupScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#004e92', '#0077b6']}
        style={styles.header}
      >
        <Text style={styles.headerText}>Create Your</Text>
        <Text style={styles.headerText}>Account</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput placeholder="John Smith" style={styles.input} placeholderTextColor="#666" />

        <Text style={styles.label}>Phone or Gmail</Text>
        <TextInput placeholder="example@gmail.com" style={styles.input} placeholderTextColor="#666" />

        <Text style={styles.label}>Location</Text>
        <TextInput placeholder="Douala, Cameroon" style={styles.input} placeholderTextColor="#666" />

        <Text style={styles.label}>Occupation</Text>
        <TextInput placeholder="Tailor / Teacher / Trader" style={styles.input} placeholderTextColor="#666" />

        <Text style={styles.label}>Monthly Income (optional)</Text>
        <TextInput placeholder="e.g. 150,000 CFA" style={styles.input} placeholderTextColor="#666" keyboardType="numeric" />

        <Text style={styles.label}>Referral Code (if any)</Text>
        <TextInput placeholder="INV123" style={styles.input} placeholderTextColor="#666" />

        <Text style={styles.label}>Password</Text>
        <TextInput placeholder="Password" secureTextEntry style={styles.input} placeholderTextColor="#666" />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput placeholder="Re-enter Password" secureTextEntry style={styles.input} placeholderTextColor="#666" />

        <TouchableOpacity>
          <LinearGradient
            colors={['#004e92', '#0077b6']}
            style={styles.button}
          >
            <Text style={styles.buttonText}  >SIGN UP</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.bottomText}>
            Already have an account? <Text style={styles.link}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    height: height * 0.3,
    paddingTop: 80,
    paddingHorizontal: 30,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  form: {
    padding: 30,
    paddingBottom: 60,
  },
  label: {
    color: '#004e92',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 25,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.5,
  },
  bottomText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
    marginTop: 20,
  },
  link: {
    color: '#0077b6',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
