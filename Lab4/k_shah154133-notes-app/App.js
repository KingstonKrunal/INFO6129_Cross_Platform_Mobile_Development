import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, FlatList, TextInput, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import {useState} from "react";

let data = [
    {id: '', title: '', message:''}
];

function addNoteItem(data) {
    return (
        <FlatList
            data={data}
            renderItem={data.title}
            keyExtractor={item => item.id}
        />
    );
}

function HomeScreen({navigation}) {
    return (
        <View style={{flex: 1}}>
            <Text style={styles.titleStyle}>Notes!</Text>
            <Text style={styles.textStyle}>k_shah154113</Text>

            <FlatList
                data={[
                    {key: 'Devin'},
                    {key: 'Dan'},
                    {key: 'Dominic'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                ]}
                renderItem={
                    ({item}) => <Text style={styles.item}>{item.key}</Text>}
            />

            <TouchableOpacity
                activeOpacity={0.2}
                onPress={() => navigation.navigate('AddNote')}
                style={styles.touchableOpacityStyle}>

                <Image
                    source={require('./assets/plus.png')}
                    style={styles.floatingButtonStyle}
                />
            </TouchableOpacity>
        </View>
    );
}

function AddNoteScreen({navigation}) {
    const [titleText, onChangeTitleText] = useState('');
    const [noteText, onChangeNoteText] = useState('');

    return (
        <View style={{flex: 1}}>
            <Text style={{fontSize: 20, marginTop: 80, margin: 10,}}>Title</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeTitleText}
                value={titleText}
                placeholder="Enter Title"
            />

            <Text style={styles.text}>Note</Text>
            <TextInput
                multiline
                editable
                style={styles.input}
                onChangeText={onChangeNoteText}
                value={noteText}
                // placeholder="Enter your message"
                numberOfLines={10}
            />

            <TouchableOpacity
                style={styles.addNoteButton}
                onPress={() =>
                    // navigation.navigate('HomeScreen')
                    Alert.alert(
                        "Note Saved",
                        "Your note has been saved/updated!",
                        [{
                            text: "Okay",
                            onPress: () => navigation.navigate('Home', titleText, noteText)
                        }
                        ]
                    )
                }
                underlayColor='#fff'>

                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

const App = () => {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="AddNote" component={AddNoteScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    titleStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
    textStyle: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
    },
    text: {
        fontSize: 20,
        margin: 10,
    },
    input: {
        padding: 10,
        margin: 10,
        backgroundColor: '#ffffff',
        borderWidth: 1.0,
    },
    addNoteButton: {
        margin: 10,
        marginTop: 80,
        alignItems: "center",
        backgroundColor: 'black',
    },
    buttonText: {
        fontSize: 20,
        padding: 10,
        color: 'white',
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
    },
});