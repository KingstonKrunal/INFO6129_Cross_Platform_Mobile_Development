import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Modal } from 'react-native';

const NotesItemInput = props => {
    const [enteredNoteItem, setNoteItem] = useState();

    const notesItemInputHandler = (value) => {
        setNoteItem(value);
    }

    const addItemHandler = () => {
        props.onAddItem(enteredNoteItem);
        setNoteItem('');
    }

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput placeholder="Notes" style={styles.input} onChangeText={notesItemInputHandler} value={enteredNoteItem} />
                <View style={styles.buttonContainer}>
                    <View style={styles.button} ><Button title="CANCEL" color="red" onPress={props.onCancel} /></View>
                    <View style={styles.button} ><Button title="ADD" onPress={addItemHandler} /></View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
    button: {
        width: '40%'
    }
});

export default NotesItemInput;