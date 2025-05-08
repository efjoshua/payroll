import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { db } from '../config/firebaseConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function EditDepartmentScreen({ route, navigation }) {
  const { department } = route.params;
  const [deptName, setDeptName] = useState('');
  const [deptCode, setDeptCode] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDeptName(department?.Department_name || '');
    setDeptCode(department?.Department_code || '');
  }, [department]);

  const handleUpdate = async () => {
    if (!deptName || !deptCode) {
      Alert.alert('Error', 'Both fields are required.');
      return;
    }

    setLoading(true);
    try {
      const docRef = doc(db, 'departments', department.id);
      await updateDoc(docRef, {
        Department_name: deptName.trim(),
        Department_code: deptCode.trim().toUpperCase(),
      });
      Alert.alert('Success', 'Department updated successfully.');
      navigation.navigate('DepartmentList');
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Update failed.');
    }
    setLoading(false);
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this department?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'departments', department.id));
              Alert.alert('Deleted', 'Department has been deleted.');
              navigation.navigate('DepartmentList');
            } catch (error) {
              console.error('Delete error:', error);
              Alert.alert('Error', 'Failed to delete department.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Department</Text>

      <Text style={styles.label}>Department Name</Text>
      <TextInput
        style={styles.input}
        value={deptName}
        onChangeText={setDeptName}
      />

      <Text style={styles.label}>Department Code</Text>
      <TextInput
        style={styles.input}
        value={deptCode}
        onChangeText={setDeptCode}
        autoCapitalize="characters"
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleUpdate}
        disabled={loading}
      >
        <Ionicons name="save-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.deleteButton, loading && { opacity: 0.6 }]}
        onPress={handleDelete}
        disabled={loading}
      >
        <MaterialIcons name="delete-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F8FD',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
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
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E53935',
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
});
