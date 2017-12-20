import React from 'react';
import {StyleSheet, View, FlatList, DatePickerAndroid} from 'react-native';
import Card from "./src/components/Card";
import Header from "./src/components/Header";
import RNFS from 'react-native-fs'

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

        console.log(this.state.todo)

        this.handleClick = this.handleClick.bind(this);
        this.pickDate = this.pickDate.bind(this);
        this.handleToggleComplete = this.handleToggleComplete.bind(this);
        this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
        this.handleEditTodo = this.handleEditTodo.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.storeData = this.storeData.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        RNFS.readFile(RNFS.DocumentDirectoryPath + '/todo.json').then(data => this.setState({todo: data ? JSON.parse(data) : []}))
    }

    handleToggleComplete(id, complete) {
        const newItems = this.state.todo.map(item => {
            if (item.id !== id) {
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
        this.storeData(newItems)
    }

    storeData(data) {
        const filePath = RNFS.DocumentDirectoryPath + '/todo.json'
        RNFS.writeFile(filePath, JSON.stringify(data))
        this.getData()
    }

    getData() {
        const filePath = RNFS.DocumentDirectoryPath + '/todo.json'
        RNFS.readFile(filePath).then(function (data) {
            console.log(JSON.parse(data))
        })
    }

    handleRemoveTodo(id) {
        let todos = this.state.todo
        todos.forEach((item, i) => {
            if (item.id === id) {
                todos.splice(i, 1);
            }
        })
        this.setState({
            todo: todos
        })
        this.storeData(todos)
    }

    handleEditTodo(id) {
        let todos = this.state.todo
        todos.map((item) => {
            if (item.id === id) {
                item.editing = true
            } else {
                item.editing = false
            }
            return item
        })
        this.setState({
            todo: todos
        })
        this.storeData(todos)
    }

    handleUpdate(id, text) {
        let todos = this.state.todo
        todos.map((item) => {
            if (item.id === id) {
                item.text = text
                item.editing = false
            }
            return item
        })
        this.setState({
            todo: todos
        })
        this.storeData(todos)
    }

    handleClick(text, url) {
        let id = this.state.id
        id++
        let image = url ? url : ''
        this.state.todo.unshift({
            id: id,
            text,
            complete: false,
            url: image,
            editing: false,
            date: this.state.date
        })


        this.setState({
            id: id,
            todo: this.state.todo,
            text: '',
            date: null
        })
        this.storeData(this.state.todo)
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

    _keyExtractor = (item) => item.id;

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
