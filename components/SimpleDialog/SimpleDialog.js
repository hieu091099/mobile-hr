import React, { useState } from 'react';
import {
    Button,
    Dialog,
} from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';



const SimpleDialog = () => {
    const [visible, setVisible] = useState(false);
    const toggleDialog = () => {
        setVisible(!visible);
    };
    return (
        <View>
            {/* <View style={styles.buttonContainer}>
                <Button
                    title="Open Mutli Action Dialog"
                    onPress={toggleDialog}
                    buttonStyle={styles.button}
                />
            </View> */}

            <Dialog
                isVisible={visible}
                onBackdropPress={toggleDialog}
            >
                <Dialog.Title title="Dialog Title" />
                <Text>Dialog body text. Add relevant information here.</Text>
                <Dialog.Actions>

                    <Dialog.Button titleStyle={{ color: 'rgba(214, 61, 57, 1)' }} title="Cancel" onPress={() => toggleDialog()} />
                    <Dialog.Button title="OK" onPress={() => toggleDialog()} />
                </Dialog.Actions>
            </Dialog>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        width: 220,
        margin: 20,
    },
    buttonContainer: {
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SimpleDialog;