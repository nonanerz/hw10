import React from 'react';
import {Text, Switch, View, TouchableOpacity, Image, TextInput, StyleSheet} from 'react-native';

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.item.text
        }

        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.editText = this.editText.bind(this);
    }

    handleChangeValue() {
        this.props.onComplete(this.props.item._id, !this.props.item.complete)
    }

    removeTodo() {
        this.props.removeItem(this.props.item._id)
    }

    editTodo() {
        this.props.editItem(this.props.item._id)
    }

    editText() {
        this.props.onUpdate(this.props.item._id, this.state.text)
    }

    render() {
        const textComponent =
            <View>
                <Text style={[styles.complete, {textDecorationLine: this.props.item.complete ? 'line-through' : 'none'}]}
                      onPress={this.editTodo}
                >
                    {this.props.item.text}
                </Text>
            </View>

        const editComponent =
            <View>
                <TextInput
                    style={[styles.complete, {textDecorationLine: (this.props.item.complete ? 'line-through' : 'none')}]}
                    onChangeText={(text) => this.setState({text})}
                    autoFocus
                    value={this.state.text}
                    onSubmitEditing={this.editText}

                />
            </View>
        return (
            <View
                style={styles.container}
            >
                <Switch
                    value={this.props.item.complete}
                    onValueChange={this.handleChangeValue}
                    disabled={this.props.item.editing}
                />

                <View style={styles.dateView}>
                    <TouchableOpacity>
                        {this.props.item.editing ? editComponent : textComponent}
                    </TouchableOpacity>
                    {this.props.item.date ? <Text>{this.props.item.date}</Text> : null}

                </View>
                {this.props.item.url ?
                    <Image
                        style={styles.image}
                        source={{uri: this.props.item.url}}
                    /> : null
                }

                {this.props.item.editing ?
                    <TouchableOpacity onPress={this.editText}>
                        <Text style={styles.submit}>{String.fromCharCode(10003)}</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={this.removeTodo}>
                        <Text style={styles.remove}>X</Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    dateView: {
        flex: 1,
        marginHorizontal: 10
    },
    image: {
        width: 50,
        height: 50
    },
    remove: {
        fontSize: 25,
        color: 'red',
        padding: 5
    },
    submit: {
        fontSize: 25,
        color: 'green'
    },
    complete: {
        fontSize: 24,
        color: '#4d4d4d'
    }
});

