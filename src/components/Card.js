import React from 'react';
import { Text, Switch, View, TouchableOpacity, Image } from 'react-native';

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
    }

    handleChangeValue() {
        this.props.onComplete(this.props.item.id, !this.props.item.complete)
    }

    removeTodo() {
        this.props.removeItem(this.props.item.id)
    }

    editTodo() {
        this.props.editItem(this.props.item.id, 'asd')
    }

    render() {
        const completeStyle = !this.props.item.complete ? {fontSize: 24, color: '#4d4d4d'} : {fontSize: 24, color: '#4d4d4d', textDecorationLine:'line-through'}
        return (
            <View
                style={{padding: 10, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}
            >
                <Switch
                    value={this.props.item.complete}
                    onValueChange={this.handleChangeValue}
                />

                <View style={{ flex: 1, marginHorizontal: 10 }}>
                    <TouchableOpacity>
                        <Text style={completeStyle}
                              onPress={this.editTodo}
                        >
                            { this.props.item.text }
                        </Text>
                    </TouchableOpacity>

                </View>
                { this.props.item.url ?
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: this.props.item.url}}
                    /> : null
                }
                <TouchableOpacity
                    onPress={this.removeTodo}
                >
                    <Text style={{fontSize: 25, color: 'red', padding: 5}}>X</Text>

                </TouchableOpacity>
            </View>
        );
    }
}

