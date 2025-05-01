import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,

} from 'react-native';

import { Picker } from '@react-native-picker/picker';

const timetableData = {
  "HND1": {
    "Computer Science": {
      Monday: [
        { subject: "CSC101", time: "9:00 - 10:30 AM", lecturer: "Mr. Aku", room: "Room 1" },
        { subject: "ENG101", time: "10:45 - 12:15 PM", lecturer: "Ms. Laura", room: "Room 2" },
      ],
      Tuesday: [
        { subject: "CSC201", time: "8:00 - 9:30 AM", lecturer: "Mr. Aku", room: "Lab 1" },
      ],
      // ...more days
    }
  }
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function TimetableScreen() {
  const [department, setDepartment] = useState('Computer Science');
  const [level, setLevel] = useState('HND1');

  const currentData = timetableData[level]?.[department] || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weekly Timetable</Text>

      <View style={styles.filters}>
        <Text style={styles.label}>Level:</Text>
        <Picker
          selectedValue={level}
          style={styles.picker}
          onValueChange={(val) => setLevel(val)}
        >
          <Picker.Item label="HND1" value="HND1" />
          <Picker.Item label="HND2" value="HND2" />
          {/* Add more */}
        </Picker>

        <Text style={styles.label}>Department:</Text>
        <Picker
          selectedValue={department}
          style={styles.picker}
          onValueChange={(val) => setDepartment(val)}
        >
          <Picker.Item label="Computer Science" value="Computer Science" />
          <Picker.Item label="Business" value="Business" />
          {/* Add more */}
        </Picker>
      </View>

      <View style={styles.grid}>
        {days.map((day) => (
          <View key={day} style={styles.dayColumn}>
            <Text style={styles.dayTitle}>{day}</Text>
            {currentData[day]?.length > 0 ? (
              currentData[day].map((cls, idx) => (
                <View key={idx} style={styles.classCard}>
                  <Text style={styles.subject}>{cls.subject}</Text>
                  <Text style={styles.info}>{cls.time}</Text>
                  <Text style={styles.info}>{cls.lecturer}</Text>
                  <Text style={styles.info}>{cls.room}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noClass}>Not Scheduled</Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F7F8FD',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filters: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginTop: 8,
  },
  picker: {
    height: 44,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayColumn: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  dayTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  classCard: {
    backgroundColor: '#E9E6FF',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  subject: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
    color: '#333',
  },
  noClass: {
    fontStyle: 'italic',
    color: 'red',
  },
});
