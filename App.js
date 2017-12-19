import React from 'react';
import { StyleSheet, View, FlatList, DatePickerAndroid } from 'react-native';
import Card from "./src/components/Card";
import Header from "./src/components/Header";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            todo: [],
            text: '',
            url: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.pickDate = this.pickDate.bind(this);
        this.handleToggleComplete = this.handleToggleComplete.bind(this);
        this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
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
    }

    handleClick(text, url) {
        let id = this.state.id
        id++
        this.state.todo.unshift({
            id: id,
            text,
            complete: false,
            url
        })


        this.setState({
            id: id,
            todo: this.state.todo,
            text: ''
        })
        console.log(this.state.todo)

    }

    async pickDate() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });

            this.setState({
                text: year + ' ' + month + ' ' + day
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
              />

              <View style={styles.content}>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={this.state.todo}
                    extraData={this.state}
                    renderItem={({item}) => <Card removeItem={this.handleRemoveTodo} onComplete={this.handleToggleComplete} item={item}/>}
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
