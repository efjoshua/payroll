import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../config/firebaseConfig';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';

export default function AddDepartmentScreen({ navigation }) {
  const [deptName, setDeptName] = useState('');
  const [departmentcode, setDepartmentcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentDepartments, setRecentDepartments] = useState([]);

  const handleSubmit = async () => {
    if (!deptName || !departmentcode) {
      Alert.alert('Error', 'Please fill out both fields.');
      return;
    }

    setLoading(true); // Start loading

    try {
      // 🔎 Check for duplicates
      const q = query(
        collection(db, 'departments'),
        where('Department_name', '==', deptName),
      );
      const q2 = query(
        collection(db, 'departments'),
        where('Department_code', '==', departmentcode.toUpperCase()),
      );

      const [nameSnapshot, codeSnapshot] = await Promise.all([
        getDocs(q),
        getDocs(q2),
      ]);

      if (!nameSnapshot.empty || !codeSnapshot.empty) {
        Alert.alert('Duplicate Found', 'This department already exists.');
        setLoading(false);
        return;
      }

      // ✅ Add to Firestore
      await addDoc(collection(db, 'departments'), {
        Department_name: deptName,
        Department_code: departmentcode.toUpperCase(),
        createdAt: new Date(),
      });

      setDeptName('');
      setDepartmentcode('');
      Alert.alert('Success', `Department "${deptName}" added successfully.`);
    } catch (error) {
      console.error('Error adding department:', error);
      Alert.alert('Error', 'Failed to add department.');
    } finally {
      setLoading(false); // Stop loading in all cases
    }
  };

  // 🔃 Fetch latest 3 departments
  useEffect(() => {
    const q = query(
      collection(db, 'departments'),
      orderBy('createdAt', 'desc'),
      limit(3)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const departments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecentDepartments(departments);
    });

    return () => unsubscribe();
  }, []);

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

      <Text style={styles.label}>Department Code</Text>
      <TextInput
        placeholder="e.g. CSC"
        style={styles.input}
        value={departmentcode}
        onChangeText={setDepartmentcode}
        autoCapitalize="characters"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="add-circle" size={20} color="#fff" />
            <Text style={styles.buttonText}>Add Department</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Recent List */}
      <Text style={styles.subheading}>Recently Added</Text>
      {recentDepartments.map((dept) => (
        <View key={dept.id} style={styles.card}>
          <Text style={styles.deptTitle}>{dept.Department_name}</Text>
          <Text style={styles.deptCode}>{dept.Department_code}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.viewMore}
        onPress={() => navigation.navigate('DepartmentList')}
      >
        <Text style={styles.viewMoreText}>View All Departments →</Text>
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
  subheading: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
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
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#6C63FF',
  },
  deptTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deptCode: {
    color: '#777',
  },
  viewMore: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  viewMoreText: {
    color: '#6C63FF',
    fontWeight: '600',
  },
});
