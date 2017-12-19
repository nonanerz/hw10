import React from 'react';
import { Text, Switch, View, TouchableOpacity } from 'react-native';

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
    }

    handleChangeValue() {
        this.props.onComplete(this.props.item.id, !this.props.item.complete)
    }

    removeTodo() {
        this.props.removeItem(this.props.item.id)
    }

    editTodo() {
        alert(123)
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
                    <TouchableOpacity
                        onPress={this.editTodo}
                    >
                        <Text style={completeStyle}>
                            { this.props.item.text }
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={this.removeTodo}
                >
                    <Text style={{fontSize: 25, color: 'red'}}>x</Text>

                </TouchableOpacity>
            </View>
        );
    }
}

