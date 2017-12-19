import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker'

export default class Header extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            avatarSource: {}
        }
        this.selectImage = this.selectImage.bind(this)
    }
    selectImage () {

    }
    render() {
        return (
            <View style={{paddingHorizontal: 15, flexDirection: "row", alignItems: "center"}}>
                <TextInput
                    placeholder="What is your main focus for today?"
                    returnKeyType="done"
                    style={{flex: 1, height: 50, marginLeft: 16}}
                    value={this.props.text}
                    onChangeText={this.props.onChange}
                    onSubmitEditing={this.props.onAddItem}
                />
                <TouchableOpacity
                    onPress={this.selectImage}>
                    <Text style={styles.photoButtonText}>
                        Upload image
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.props.onAddItem}
                >
                    <Text style={{fontSize: 25, color: 'green'}}>{String.fromCharCode(10003)}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    photoButton: {
        flex: 0,
        padding: 20,
        marginBottom: 10,
        backgroundColor: 'grey',
        justifyContent: 'center'
    },
    photoButtonText: {
        color: 'blue',
        textAlign: 'center'
    },
    uploadAvatar: {
        width: 400,
        height: 400,
        backgroundColor: 'grey'
    }
})

