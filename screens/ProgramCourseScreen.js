import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ProgramCourseScreen() {
  const [department, setDepartment] = useState('');
  const [course, setCourse] = useState('');
  const [lecturer, setLecturer] = useState('');
  const [level, setLevel] = useState('');
  const [shift, setShift] = useState('');
  const [session, setSession] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [programmedCourses, setProgrammedCourses] = useState([]);

  const departments = ['Computer Science', 'Business', 'General'];
  const levels = ['HND1', 'HND2', 'BTS1', 'BTS2', 'Degree'];
  const sessions = ['2023/2024', '2024/2025'];

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

  const handleProgram = () => {
    if (!department || !course || !lecturer || !level || !shift || !startTime || !endTime || !session) {
      Alert.alert('Error', 'Please complete all fields.');
      return;
    }

    const newProgram = {
      department,
      course,
      lecturer,
      level,
      shift,
      session,
      date: date.toISOString().split('T')[0],
      time: `${startTime} - ${endTime}`,
    };

    setProgrammedCourses((prev) => [...prev, newProgram]);

    // Reset fields
    setCourse('');
    setLecturer('');
    setLevel('');
    setShift('');
    setStartTime('');
    setEndTime('');
    setSession('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Program Course</Text>

      <Text style={styles.label}>Department</Text>
      <View style={styles.picker}>
        <Picker selectedValue={department} onValueChange={(val) => {
          setDepartment(val);
          setCourse('');
          setLecturer('');
        }}>
          <Picker.Item label="-- Select Department --" value="" />
          {departments.map((dept, i) => (
            <Picker.Item key={i} label={dept} value={dept} />
          ))}
        </Picker>
      </View>

      {department !== '' && (
        <>
          <Text style={styles.label}>Course</Text>
          <View style={styles.picker}>
            <Picker selectedValue={course} onValueChange={(val) => setCourse(val)}>
              <Picker.Item label="-- Select Course --" value="" />
              {courses[department].map((c, i) => (
                <Picker.Item key={i} label={c} value={c} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Lecturer</Text>
          <View style={styles.picker}>
            <Picker selectedValue={lecturer} onValueChange={(val) => setLecturer(val)}>
              <Picker.Item label="-- Select Lecturer --" value="" />
              {lecturers[department].map((lec, i) => (
                <Picker.Item key={i} label={lec} value={lec} />
              ))}
            </Picker>
          </View>
        </>
      )}

      <Text style={styles.label}>Level</Text>
      <View style={styles.picker}>
        <Picker selectedValue={level} onValueChange={(val) => setLevel(val)}>
          <Picker.Item label="-- Select Level --" value="" />
          {levels.map((lvl, i) => (
            <Picker.Item key={i} label={lvl} value={lvl} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Shift</Text>
      <View style={styles.picker}>
        <Picker selectedValue={shift} onValueChange={(val) => setShift(val)}>
          <Picker.Item label="-- Select Shift --" value="" />
          <Picker.Item label="Day" value="Day" />
          <Picker.Item label="Evening" value="Evening" />
        </Picker>
      </View>

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity onPress={() => setShowDate(true)} style={styles.dateBtn}>
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDate && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(e, selectedDate) => {
            setShowDate(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Start Time</Text>
      <TextInput
        placeholder="e.g. 08:00 AM"
        style={styles.input}
        value={startTime}
        onChangeText={setStartTime}
      />

      <Text style={styles.label}>End Time</Text>
      <TextInput
        placeholder="e.g. 10:00 AM"
        style={styles.input}
        value={endTime}
        onChangeText={setEndTime}
      />

      <Text style={styles.label}>Session</Text>
      <View style={styles.picker}>
        <Picker selectedValue={session} onValueChange={(val) => setSession(val)}>
          <Picker.Item label="-- Select Session --" value="" />
          {sessions.map((s, i) => (
            <Picker.Item key={i} label={s} value={s} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleProgram}>
        <Text style={styles.btnText}>Program Course</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Programmed Courses</Text>
      {programmedCourses.map((item, index) => (
        <View key={index} style={styles.record}>
          <Text>{`${item.course} → ${item.lecturer} | ${item.level} | ${item.shift}`}</Text>
          <Text>{`${item.date} | ${item.time} | ${item.session}`}</Text>
        </View>
      ))}
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
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  dateBtn: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: Platform.OS === 'ios' ? 14 : 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#6C63FF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  record: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
