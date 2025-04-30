import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export default function AddCourseScreen() {
  const [department, setDepartment] = useState('');
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [credits, setCredits] = useState('');
  const [hours, setHours] = useState('');

  const departments = [
    'Computer Science',
    'Business Management',
    'Law',
    'Education',
    'Engineering',
    'Medical Science',
  ];

  const handleSubmit = () => {
    if (!department || !title || !code || !credits || !hours) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }
    // Placeholder for backend logic
    Alert.alert('Success', `Course "${title}" added for ${department}`);
    // Reset form
    setTitle('');
    setCode('');
    setCredits('');
    setHours('');
    setDepartment('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add New Course</Text>

      <Text style={styles.label}>Department</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={department}
          onValueChange={(itemValue) => setDepartment(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="-- Select Department --" value="" />
          {departments.map((dept, index) => (
            <Picker.Item label={dept} value={dept} key={index} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Course Title</Text>
      <TextInput
        placeholder="e.g. Introduction to AI"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Course Code</Text>
      <TextInput
        placeholder="e.g. CSC201"
        style={styles.input}
        value={code}
        onChangeText={setCode}
      />

      <Text style={styles.label}>Credit Value</Text>
      <TextInput
        placeholder="e.g. 4"
        keyboardType="numeric"
        style={styles.input}
        value={credits}
        onChangeText={setCredits}
      />

      <Text style={styles.label}>Total Hours</Text>
      <TextInput
        placeholder="e.g. 45"
        keyboardType="numeric"
        style={styles.input}
        value={hours}
        onChangeText={setHours}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Ionicons name="add-circle" size={20} color="#fff" />
        <Text style={styles.buttonText}>Add Course</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#F7F8FD',
      flexGrow: 1,
    },
    heading: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    label: {
      fontWeight: '600',
      marginTop: 12,
      marginBottom: 6,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: Platform.OS === 'ios' ? 14 : 10,
      paddingHorizontal: 12,
      backgroundColor: '#fff',
    },
    pickerWrapper: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      backgroundColor: '#fff',
      marginBottom: 8,
    },
    picker: {
      height: 50,
      width: '100%',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#6C63FF',
      paddingVertical: 14,
      borderRadius: 8,
      justifyContent: 'center',
      marginTop: 24,
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      marginLeft: 8,
      fontSize: 16,
    },
  });
  