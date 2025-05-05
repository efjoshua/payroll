

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const features = [
  { title: 'Add Lecturers', icon: 'person-add' },
  { title: 'Add Departments', icon: 'business' },
  { title: 'Add Courses', icon: 'book' , route: 'Add Courses'},
  { title: 'Assign Courses', icon: 'swap-horizontal' , route: 'AssignCourses' },
  { title: 'Program Courses', icon: 'calendar', route: 'Program Courses' },
  { title: 'Set Pay Rate', icon: 'cash' },
  { title: 'Generate Payroll', icon: 'document-text' },
  { title: 'View Validation', icon: 'checkmark-done-circle' },
  { title: 'Handle Requests', icon: 'help-buoy' },
  { title: 'View Timetable', icon: 'calendar-outline' ,route: 'Time Table'},
  { title: 'Make Payments', icon: 'card' },
  { title: 'Print Reports', icon: 'print' },
];

export default function AdminDashboard({ navigation }) {
  return (
    <SafeAreaView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Admin Dashboard</Text>
      <View style={styles.grid}>
        {features.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(item.route)}

          >
            <Ionicons name={item.icon} size={32} color="#6C63FF" />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F7F8FD',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardText: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
});
