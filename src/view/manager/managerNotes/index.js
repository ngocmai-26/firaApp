import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function NotesApp() {
  const [plannedNotes, setPlannedNotes] = useState([]);
  const [completedNotes, setCompletedNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [showAddBox, setShowAddBox] = useState(false);
  const [showPlannedNotes, setShowPlannedNotes] = useState(true);
  const [showOptions, setShowOptions] = useState({ index: null, show: false });
  const [selectedStatus, setSelectedStatus] = useState(2); // Mặc định khi không chọn

  const [pickerValue, setPickerValue] = useState(null); // Lưu giá trị của Picker

  const addNote = () => {
    if (newNoteTitle || newNoteContent) {
      const status = pickerValue !== null ? pickerValue : selectedStatus; // Sử dụng giá trị từ Picker nếu đã chọn, nếu không sẽ sử dụng giá trị mặc định
      const newNote = {
        title: newNoteTitle ? newNoteTitle : `Kế hoạch ${plannedNotes.length + 1}`,
        content: newNoteContent,
        status: status,
        createdAt: new Date().toLocaleString(),
      };
      setPlannedNotes([...plannedNotes, newNote]);
      setNewNoteTitle('');
      setNewNoteContent('');
      setPickerValue(null); // Reset giá trị của Picker sau khi thêm ghi chú
      setShowAddBox(false);
    }
  };

  const markAsCompleted = (index) => {
    const completedNote = plannedNotes[index];
    setCompletedNotes([...completedNotes, completedNote]);
    deleteNoteFromPlanned(index);
    setShowOptions({ index: null, show: false });
  };

  const deleteNoteFromPlanned = (index) => {
    const newPlannedNotes = [...plannedNotes];
    newPlannedNotes.splice(index, 1);
    setPlannedNotes(newPlannedNotes);
    setShowOptions({ index: null, show: false });
  };

  const deleteNoteFromCompleted = (index) => {
    const newCompletedNotes = [...completedNotes];
    newCompletedNotes.splice(index, 1);
    setCompletedNotes(newCompletedNotes);
  };

  const handleMoreOptions = (index, isCompleted) => {
    if (!isCompleted) {
      setShowOptions({ index, show: true });
    } else {
      deleteNoteFromCompleted(index);
    }
  };

  const handleOutsidePress = () => {
    setShowOptions({ ...showOptions, show: false });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return '#FFEFD5'; // Màu vàng nhạt
      case 2:
        return '#90EE90'; // Màu xanh lá
      case 3:
        return '#ADD8E6'; // Màu xanh dương
      default:
        return '#fff';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.headerButton,
            showPlannedNotes ? styles.activeHeaderButton : null,
          ]}
          onPress={() => setShowPlannedNotes(true)}
        >
          <Text style={styles.headerButtonText}>Chưa hoàn thành</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.headerButton,
            !showPlannedNotes ? styles.activeHeaderButton : null,
          ]}
          onPress={() => setShowPlannedNotes(false)}
        >
          <Text style={styles.headerButtonText}>Đã hoàn thành</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.notesContainer}>
        {showPlannedNotes
          ? plannedNotes.map((note, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.note, { backgroundColor: getStatusColor(note.status) }]}
              >
                <View>
                  <Text style={styles.noteTitle}>{note.title}</Text>
                  <Text>{note.content}</Text>
                  <Text style={styles.noteDate}>{note.createdAt}</Text>
                </View>
                <View style={styles.optionsBox}>
                  <TouchableOpacity
                    onPress={() => markAsCompleted(index)}
                  >
                    <Ionicons name="checkmark-done-circle" size={24} color="green" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteNoteFromPlanned(index)}
                  >
                    <Ionicons name="trash-bin" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          : completedNotes.map((note, index) => (
              <TouchableOpacity key={index} style={styles.note}>
                <View>
                  <Text style={styles.noteTitle}>{note.title}</Text>
                  <Text>{note.content}</Text>
                  <Text style={styles.noteDate}>{note.createdAt}</Text>
                </View>
              </TouchableOpacity>
            ))}
      </ScrollView>

      <View style={[styles.addBoxContainer, showAddBox && styles.centered]}>
        <TouchableOpacity
          onPress={() => setShowAddBox(true)}
          style={styles.addButton}
        >
          <Ionicons name="add-circle" size={64} color="blue" />
        </TouchableOpacity>
      </View>
      <View style={styles.showAddBox} >
        {showAddBox && (
          <View style={styles.addBox}>
            <TextInput
              style={[styles.input]}
              placeholder="Tên kế hoạch"
              value={newNoteTitle}
              onChangeText={setNewNoteTitle}
            />
            <TextInput
              style={[styles.input]}
              placeholder="Nội dung"
              value={newNoteContent}
              onChangeText={setNewNoteContent}
            />
            <Picker
              selectedValue={pickerValue}
              style={[styles.picker]}
              onValueChange={(itemValue) => setPickerValue(itemValue)}
            >
              <Picker.Item label="Chọn thuộc" value={null} />
              <Picker.Item label="Công việc" value={1} />
              <Picker.Item label="Cá nhân" value={2} />
              <Picker.Item label="KPI" value={3} />
            </Picker>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setShowAddBox(false)}
                style={[styles.button, { backgroundColor: 'gray' }]}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addNote}
                style={[styles.button, { backgroundColor: 'blue' }]}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    position: "relative",
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: 'grey',
    paddingVertical: 3,
  },
  headerButton: {
    padding: 10,
    borderRadius: 5,
  },
  activeHeaderButton: {
    backgroundColor: 'lightblue',
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addBoxContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  centered: {
    alignItems: 'center',
  },
  showAddBox: {
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 10,
  },
  addBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
    width: 350,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  notesContainer: {
    flex: 1,
  },
  note: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  noteTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteDate: {
    color: '#888',
    fontSize: 12,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  option: {
    position: 'relative',
  },
  optionsBox: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
    right: 10,
    zIndex: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

