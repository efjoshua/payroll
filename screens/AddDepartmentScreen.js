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
import { Ionicons } from '@expo/vector-icons';

export default function AddDepartmentScreen() {
  const [deptName, setDeptName] = useState('');
  const [abbreviation, setAbbreviation] = useState('');

  const handleSubmit = () => {
    if (!deptName || !abbreviation) {
      Alert.alert('Error', 'Please fill out both fields.');
      return;
    }

    // Placeholder for backend logic
    Alert.alert('Success', `Department "${deptName}" added successfully.`);

    // Reset form
    setDeptName('');
    setAbbreviation('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add New Department</Text>

      <Text style={styles.label}>Department Name</Text>
      <TextInput
        placeholder="e.g. Computer Science"
        style={styles.input}
        value={deptName}
        onChangeText={setDeptName}
      />

      <Text style={styles.label}>Abbreviation</Text>
      <TextInput
        placeholder="e.g. CSC"
        style={styles.input}
        value={abbreviation}
        onChangeText={setAbbreviation}
        autoCapitalize="characters"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Ionicons name="add-circle" size={20} color="#fff" />
        <Text style={styles.buttonText}>Add Department</Text>
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
