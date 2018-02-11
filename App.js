import React from 'react';
import {StyleSheet, View, FlatList, DatePickerAndroid} from 'react-native';
import Card from "./src/components/Card";
import Header from "./src/components/Header";
import RNFS from 'react-native-fs'
import axios from 'axios'

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            todo: [],
            text: '',
            url: '',
            date: null
        }

        this.handleClick = this.handleClick.bind(this);
        this.pickDate = this.pickDate.bind(this);
        this.handleToggleComplete = this.handleToggleComplete.bind(this);
        this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
        this.handleEditTodo = this.handleEditTodo.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentWillMount() {
        axios.get('http://192.168.1.109:3005/api/v1/todos')
            .then(response => this.setState({todo: response.data.todos}))
    }

    handleToggleComplete(id, complete) {
        const newItems = this.state.todo.map(item => {
            if (item._id !== id) {
                return item
            }
            return {
                ...item,
                complete
            }
        })

        this.setState({
            todo: newItems
        })

        console.log(complete, 'complete')

        axios.put(`http://192.168.1.109:3005/api/v1/todos/${id}`, {
            todo: {
                complete,
            }
        })
            .then(response => console.log('edited'))

    }

    handleRemoveTodo(id) {
        let todos = this.state.todo
        todos.forEach((item, i) => {
            if (item._id === id) {
                todos.splice(i, 1);
            }
        })
        axios.delete(`http://192.168.1.109:3005/api/v1/todos/${id}`)
            .then(function (response) {
                console.log('removed', response)
            })
        this.setState({
            todo: todos
        })
    }

    handleEditTodo(id) {
        let todos = this.state.todo
        todos.map((item) => {
            if (item._id === id) {
                item.editing = true
            } else {
                item.editing = false
            }
            return item
        })
        this.setState({
            todo: todos
        })
    }

    handleUpdate(id, text) {
        let todos = this.state.todo
        todos.map((item) => {
            if (item._id === id) {
                item.text = text
                item.editing = false
            }
            return item
        })
        this.setState({
            todo: todos
        })
        axios.put(`http://192.168.1.109:3005/api/v1/todos/${id}`, {
            todo: {
                text,
            }
        })
            .then(response => console.log('edited'))
    }

    handleClick(text, url) {
        let image = url ? url : ''

        axios.post(`http://192.168.1.109:3005/api/v1/todos`, {
            todo: {
                text,
                complete: false,
                url: image,
                editing: false,
                date: this.state.date
            }
        })
            .then(response => this.setState({todos: this.state.todo.push(response.data.todo), text: ''}))
    }

    async pickDate() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });

            this.setState({
                date: year + '/' + month + '/' + day
            })
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    _keyExtractor = (item) => item._id;

    render() {
        return (
            <View style={styles.container}>

                <Header
                    text={this.state.text}
                    url={this.state.url}
                    onAddItem={this.handleClick}
                    onChange={(text) => this.setState({text})}
                    pickDate={this.pickDate}
                    date={this.state.date}
                />

                <View style={styles.content}>
                    <FlatList
                        keyExtractor={this._keyExtractor}
                        data={this.state.todo}
                        extraData={this.state}
                        renderItem={({item}) =>
                            <Card onUpdate={this.handleUpdate} editItem={this.handleEditTodo}
                                  removeItem={this.handleRemoveTodo}
                                  onComplete={this.handleToggleComplete} item={item}
                            />
                        }
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1
    },
    input: {
        paddingTop: 30
    },
    content: {
        flex: 1
    }
});
