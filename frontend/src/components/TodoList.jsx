import React, { useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Checkbox, IconButton, ButtonGroup, Button, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoList = ({ todos, setTodos, updateTodo }) => {
    const [filter, setFilter] = useState('all');

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:5000/todos/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    const toggleCompletion = async (todo) => {
        const updatedTodo = { ...todo, status: todo.status === 'completed' ? 'ongoing' : 'completed' };
        const res = await axios.put(`http://localhost:5000/todos/${todo._id}`, updatedTodo);
        updateTodo(res.data);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'completed') return todo.status === 'completed';
        if (filter === 'ongoing') return todo.status === 'ongoing';
    });

    return (
        <Box border="1px solid #ccc" borderRadius="10px" p={2}>
            <ButtonGroup variant="contained" fullWidth>
                <Button onClick={() => setFilter('all')}>All</Button>
                <Button onClick={() => setFilter('completed')}>Completed</Button>
                <Button onClick={() => setFilter('ongoing')}>Ongoing</Button>
            </ButtonGroup>
            <Box border="1px solid #ccc" borderRadius="10px" p={1} mt={2}>
                <List>
                    {filteredTodos.map(todo => (
                        <ListItem key={todo._id} dense>
                            <Checkbox
                                edge="start"
                                checked={todo.status === 'completed'}
                                tabIndex={-1}
                                disableRipple
                                onChange={() => toggleCompletion(todo)}
                            />
                            <ListItemText
                                primary={todo.description}
                                sx={{ textDecoration: todo.status === 'completed' ? 'line-through' : 'none' }}
                            />
                            <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default TodoList;
