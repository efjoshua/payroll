import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../config/firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
} from 'firebase/firestore';

export default function AddCourseScreen() {
  const [department, setDepartment] = useState('');
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [credits, setCredits] = useState('');
  const [hours, setHours] = useState('');
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  // 🔃 Fetch departments from Firestore
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const q = query(collection(db, 'departments'), orderBy('Department_name'));
        const snapshot = await getDocs(q);
        const deptList = snapshot.docs.map((doc) => doc.data().Department_name);
        setDepartments(deptList);
      } catch (error) {
        console.error('Error fetching departments:', error);
        Alert.alert('Error', 'Failed to load departments.');
      }
    };

    fetchDepartments();
  }, []);

  const handleSubmit = async () => {
    if (!department || !title || !code || !credits || !hours) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }

    setLoading(true);
    try {
      // 🔎 Check if course already exists in `courses` collection
      const courseQuery = query(
        collection(db, 'courses'),
        where('code', '==', code.toUpperCase())
      );
      const courseNameQuery = query(
        collection(db, 'courses'),
        where('title', '==', title)
      );

      const [codeSnap, nameSnap] = await Promise.all([
        getDocs(courseQuery),
        getDocs(courseNameQuery),
      ]);

      let courseExists = false;

      if (!codeSnap.empty || !nameSnap.empty) {
        courseExists = true;
      }

      // 🔘 If course does not exist, insert it
      if (!courseExists) {
        await addDoc(collection(db, 'courses'), {
          title,
          code: code.toUpperCase(),
        });
      }

      // ➕ Always insert into department_course
      await addDoc(collection(db, 'department_course'), {
        department,
        course_code: code.toUpperCase(),
        credits: Number(credits),
        hours: Number(hours),
      });

      Alert.alert('Success', `Course "${title}" added for ${department}`);
      // Reset form
      setTitle('');
      setCode('');
      setCredits('');
      setHours('');
      setDepartment('');
    } catch (error) {
      console.error('Error adding course:', error);
      Alert.alert('Error', 'Failed to add course.');
    } finally {
      setLoading(false);
    }
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
        autoCapitalize="characters"
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

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="add-circle" size={20} color="#fff" />
            <Text style={styles.buttonText}>Add Course</Text>
          </>
        )}
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
  