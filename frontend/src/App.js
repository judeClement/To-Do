import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Typography } from '@mui/material';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#365486',
    },
    secondary: {
      main: '#7FC7D9',
    },
    background: {
      default: '#DCF2F1',
    },
  },
});

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await axios.get('http://localhost:5000/todos');
      setTodos(res.data);
    };
    fetchTodos();
  }, []);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => (todo._id === updatedTodo._id ? updatedTodo : todo)));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ padding: "30px" }}>
        <Typography sx={{ padding: "30px", textAlign: "center" }} variant="h3" component="h1" gutterBottom>
          TODO APP
        </Typography>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} setTodos={setTodos} updateTodo={updateTodo} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
