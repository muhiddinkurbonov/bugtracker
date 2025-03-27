import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { addBug, updateBug } from "../redux/bugSlice";

const BugForm = ({ bugToEdit, setBugToEdit, open, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Open",
    priority: "Medium",
  });

  useEffect(() => {
    if (bugToEdit) {
      setFormData({
        title: bugToEdit.title,
        description: bugToEdit.description,
        status: bugToEdit.status,
        priority: bugToEdit.priority,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "Open",
        priority: "Medium",
      });
    }
  }, [bugToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bugToEdit) {
      dispatch(updateBug({ id: bugToEdit._id, bug: formData }));
      setBugToEdit(null);
    } else {
      dispatch(addBug(formData));
    }
    setFormData({
      title: "",
      description: "",
      status: "Open",
      priority: "Medium",
    });
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{bugToEdit ? "Edit Bug" : "Add a Bug"}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Bug Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              label="Priority"
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {bugToEdit ? "Update Bug" : "Add Bug"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default BugForm;
