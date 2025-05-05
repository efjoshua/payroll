import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function AssignCourseScreen() {
  const [department, setDepartment] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLecturer, setSelectedLecturer] = useState('');
  const [assignments, setAssignments] = useState([]);

  const departments = ['Computer Science', 'Business', 'General'];
  const lecturers = {
    'Computer Science': ['Mr. Aku', 'Mrs. Mbong'],
    Business: ['Mr. Fongwe', 'Mrs. Luma'],
    General: ['Mr. Ngong', 'Ms. Laura'],
  };

  const courses = {
    'Computer Science': ['CSC101', 'CSC201'],
    Business: ['BIZ101', 'ACC102'],
    General: ['ENG101', 'MATH201'],
  };

  const handleAssign = () => {
    if (!selectedCourse || !selectedLecturer) {
      Alert.alert('Missing Info', 'Please select both course and lecturer.');
      return;
    }

    const exists = assignments.find(
      (item) =>
        item.course === selectedCourse &&
        item.lecturer === selectedLecturer &&
        item.department === department
    );

    if (exists) {
      Alert.alert('Already Assigned', 'This course is already assigned to this lecturer.');
      return;
    }

    setAssignments((prev) => [
      ...prev,
      { course: selectedCourse, lecturer: selectedLecturer, department },
    ]);

    setSelectedCourse('');
    setSelectedLecturer('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Assign Courses</Text>

      <Text style={styles.label}>Department</Text>
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={department}
          onValueChange={(val) => {
            setDepartment(val);
            setSelectedCourse('');
            setSelectedLecturer('');
          }}
        >
          <Picker.Item label="-- Select Department --" value="" />
          {departments.map((dept, i) => (
            <Picker.Item key={i} label={dept} value={dept} />
          ))}
        </Picker>
      </View>

      {department !== '' && (
        <>
          <Text style={styles.label}>Available Courses</Text>
          {courses[department].map((course, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.courseButton,
                selectedCourse === course && styles.active,
              ]}
              onPress={() => setSelectedCourse(course)}
            >
              <Text style={styles.courseText}>{course}</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.label}>Lecturers</Text>
          {lecturers[department].map((lec, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.courseButton,
                selectedLecturer === lec && styles.active,
              ]}
              onPress={() => setSelectedLecturer(lec)}
            >
              <Text style={styles.courseText}>{lec}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.assignBtn} onPress={handleAssign}>
            <Text style={styles.assignText}>Assign Course</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Assigned Courses</Text>
          {assignments.map((item, index) => (
            <View key={index} style={styles.assignedBox}>
              <Text>{`${item.course} → ${item.lecturer}`}</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F7F8FD',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 6,
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  courseButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  active: {
    borderColor: '#6C63FF',
    backgroundColor: '#EAE6FF',
  },
  courseText: {
    fontWeight: '500',
  },
  assignBtn: {
    marginTop: 20,
    backgroundColor: '#6C63FF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  assignText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  assignedBox: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
});
