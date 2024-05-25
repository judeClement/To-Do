import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const TodoForm = ({ addTodo }) => {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('ongoing');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = { description, status };
    const res = await axios.post('http://localhost:5000/todos', newTodo);
    addTodo(res.data);
    setDescription('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, padding: "50px" }}>
      <TextField
        label="New Task"
        variant="outlined"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="ongoing">Ongoing</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Add
      </Button>
    </Box>
  );
};

export default TodoForm;
