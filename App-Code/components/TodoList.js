import React, { useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo';
import Modal from 'react-modal';

function TodoList() {
    const [todos, setTodos] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const addTodo = todo => {
        const newTodos = [todo, ...todos]
        
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        if (newTodos.length !== 0) {
            var i = 1
            while (i < newTodos.length) {
                if (newTodos[i].text === todo.text) {
                    setModalIsOpen(true);
                }
                i++;
            }
        }
        setTodos(newTodos)
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    };

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)

        setTodos(removeArr);
    };

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    // const setModal = (todos) => {
    //     if (newTodos.length != 0) {
    //         var i = 0;
    //         while (i < newTodos.length) {
    //             if (newTodos[i] == todo.text) {
    //                 return setModalIsOpen(true);
    //             }
    //             i++;
    //         }
    //     }
    //     setTodos(newTodos)
    // };


    return (
        <div>
            <h1>What's the task for Today?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo todos={todos} completeTodo={completeTodo}
                removeTodo={removeTodo} updateTodo={updateTodo} />
            <Modal className="modal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2>Ooops!</h2>
                <p>It's look like you already add this task...</p>
                <button onClick={() => setModalIsOpen(false)}>I Know</button>
            </Modal>
        </div>
    )
}

export default TodoList;
