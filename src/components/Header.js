import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, PixelRatio } from 'react-native';
import ImagePicker from 'react-native-image-picker'
import RNFS from 'react-native-fs'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text:'',
            avatarSource: null,
        };
        this.handleData = this.handleData.bind(this);
    }


    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let filePath = RNFS.DocumentDirectoryPath + '/test-image.jpeg'
                console.log('response', response)
                RNFS.writeFile(filePath, response.data, 'base64')
                    .then(() => {
                        console.log('saved file', filePath)
                    })
                    .catch(err => {
                        console.log('error save file', err)
                    })
                this.setState({
                    avatarSource: { uri: response.uri }
                }, () => { console.log('avatar', this.state.avatarSource) })
                this.props.url = this.state.avatarSource.uri
            }
        })
    }

    handleData() {
        this.props.onAddItem(this.props.text, this.state.avatarSource.uri)
        this.setState({
            avatarSource: null
        })
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
                    onSubmitEditing={this.handleData}
                />

                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                        { this.state.avatarSource === null ? <Text>Photo</Text> :
                            <Image style={styles.avatar} source={this.state.avatarSource} />
                        }
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.handleData}
                >
                    <Text style={{fontSize: 25, color: 'green'}}>{String.fromCharCode(10003)}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 75,
        width: 50,
        height: 50
    }
});
