import {View, Text, Button, StyleSheet, TextInput, Alert, TouchableOpacity, Pressable, Linking} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SendSMS from "react-native/Libraries/Network/XMLHttpRequest";

const MultilineTextInput = (props) => {
    return (
        <TextInput
            {...props}
            editable
            maxLength={400}
        />
    );
}

function HomeScreen({navigation}) {
    let textData;

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.labelMidterm}>MIDTERM</Text>
            <Text style={styles.labelUsername}>k_shah154113</Text>

            <Text style={styles.noteText}>Message</Text>

            <MultilineTextInput
                style={styles.noteInput}
                editable
                multiline={true}
                numberOfLines={20}
                onChangeText={(text) => textData = text}
            />

            <TouchableOpacity
                style={styles.emailButton}
                onPress={() => navigation.navigate('Send Email', {message: textData})}
                underlayColor='#fff'>
                <Text style={styles.buttonText}>Email</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.msgButton}
                onPress={() => navigation.navigate('Send Message', {message: textData})}
                underlayColor='#fff'>
                <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
        </View>
    );
}

function SendEmailScreen({route, navigation}) {
    let {message} = route.params;
    let email

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.titleText}>EMAIL</Text>
            <TextInput
                style={styles.titleInput}
                onChangeText={(text) => email = text}
            />

            <Text style={styles.noteText}>Note</Text>
            <MultilineTextInput style={styles.noteInput} editable multiline={true} numberOfLines={20}
                                onChangeText={(text) => message=text}>
                {JSON.stringify(message).replace(/['"?]+/g, '')}
            </MultilineTextInput>

            <TouchableOpacity
                style={styles.emailButton}
                onPress={() =>
                    Linking.openURL('mailto:' + email + '?body=' + message).then(() => {
                        Alert.alert(
                            "Result",
                            "Email sent!",
                            [{
                                text: "Okay",
                                onPress: () => navigation.navigate('Home')
                            }
                            ]
                        )
                    })
                }
                title={email}
                underlayColor='#fff'>

                <Text style={styles.buttonText}>Send Email</Text>
            </TouchableOpacity>
        </View>
    );
}

function SendMsgScreen({route, navigation}) {
    let {message} = route.params;
    let number

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.titleText}>NUMBER</Text>
            <TextInput
                style={styles.titleInput}
                onChangeText={(text) => number = text}/>

            <Text style={styles.noteText}>Note</Text>
            <MultilineTextInput
                style={styles.noteInput}
                editable
                multiline={true}
                numberOfLines={20}
                onChangeText={(text) => message = text}
            >
                {JSON.stringify(message).replace(/['"]+/g, '')}
            </MultilineTextInput>

            <TouchableOpacity
                style={styles.msgButtonInActivity}
                onPress={() =>
                    Linking.openURL('sms:'+number+'?body='+message).then(() => {
                        Alert.alert(
                            "Result",
                            "SMS sent!",
                            [{
                                text: "Okay",
                                onPress: () => navigation.navigate('Home')
                            }
                            ]
                        )
                    })
                }
                underlayColor='#fff'>

                <Text style={styles.buttonText}>Send Message</Text>
            </TouchableOpacity>
        </View>
    );
}

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Send Email" component={SendEmailScreen}/>
                <Stack.Screen name="Send Message" component={SendMsgScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        width: 320,
        textAlign: 'left',
        marginTop: 10,
    },
    titleInput: {
        height: 40,
        width: 320,
        marginTop: 30,
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
    },
    noteText: {
        width: 320,
        marginTop: 0,
    },
    noteInput: {
        width: 320,
        marginTop: 10,
        marginBottom: 130,
        textAlignVertical: 'top',
        borderWidth: 1,
        padding: 10,
    },
    buttonText: {
        fontSize: 20,
        padding: 10,
        color: 'white',
    },
    emailButton: {
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'black',
        position: 'absolute',
        width: 300,
        height: 50,
        justifyContent: 'center',
        bottom: 0,
    },
    msgButton: {
        alignItems: 'center',
        margin: 20,
        backgroundColor: 'black',
        position: 'absolute',
        width: 300,
        height: 50,
        justifyContent: 'center',
        bottom: 50,
    },
    msgButtonInActivity: {
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'black',
        position: 'absolute',
        width: 300,
        height: 50,
        justifyContent: 'center',
        bottom: 0,
    },
    labelMidterm: {
        fontSize: 20,
        marginTop: -50,
    },
    labelUsername: {
        fontSize: 20,
    },
});
