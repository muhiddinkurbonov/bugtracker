import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteBug } from "../redux/bugSlice";

const BugItem = ({ bug, onEdit }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const openMenu = Boolean(anchorEl);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const truncatedTitle = truncateText(bug.title, 5);
  const truncatedDescription = truncateText(bug.description, 10);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(bug);
    handleMenuClose();
    setOpenDialog(false);
  };

  const handleDelete = () => {
    dispatch(deleteBug(bug._id));
    handleMenuClose();
  };

  const handleCardClick = (event) => {
    if (!anchorEl) {
      setOpenDialog(true);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "error";
      case "In Progress":
        return "warning";
      case "Closed":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <>
      <Card
        sx={{ mb: 2, position: "relative", cursor: "pointer" }}
        onClick={handleCardClick}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ pr: 4 }}>
              <Typography variant="h6" component="div">
                {truncatedTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {truncatedDescription}
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Chip
                  label={`${bug.priority}`}
                  color={getPriorityColor(bug.priority)}
                  size="small"
                  sx={{
                    borderRadius: "5px", 
                    padding: "15px 10px", 
                  }}
                />
              </Box>
            </Box>
            <IconButton
              aria-label="more"
              aria-controls="bug-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </CardContent>
        <Menu
          id="bug-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => {
              handleEdit();
            }}
          >
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Card>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{bug.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {bug.description}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              label={`Status: ${bug.status}`}
              color={getStatusColor(bug.status)}
              size="small"
            />
            <Chip
              label={`Priority: ${bug.priority}`}
              color={getPriorityColor(bug.priority)}
              size="small"
            />
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 2, display: "block" }}
          >
            Created: {new Date(bug.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Updated: {new Date(bug.updatedAt).toLocaleString()}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onEdit(bug);
              handleDialogClose();
            }}
            color="primary"
          >
            Edit
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BugItem;
