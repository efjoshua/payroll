import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../config/firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function ViewDepartmentsScreen({ navigation }) {
  const [departments, setDepartments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDepartments = async () => {
    setLoading(true);
    const q = query(collection(db, 'departments'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setDepartments(docs);
    setFiltered(docs);
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchDepartments();
    }, [])
  );

  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(
      departments.filter(
        (item) =>
          item.Department_name.toLowerCase().includes(lower) ||
          item.Department_code.toLowerCase().includes(lower)
      )
    );
  }, [search, departments]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{item.Department_name}</Text>
        <Text style={styles.code}>{item.Department_code}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('EditDepartment', { department: item })}
      >
        <Ionicons name="create-outline" size={22} color="#6C63FF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Departments</Text>
      <TextInput
        placeholder="Search by name or code"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#6C63FF" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
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
    marginBottom: 10,
  },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  code: {
    fontSize: 14,
    color: '#777',
  },
});
