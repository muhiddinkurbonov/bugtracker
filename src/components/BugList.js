import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import BugItem from "./BugItem";

const BugList = ({ bugs, onEdit }) => {
  const statusColumns = [
    { status: "Open", bugs: bugs.filter((bug) => bug.status === "Open") },
    {
      status: "In Progress",
      bugs: bugs.filter((bug) => bug.status === "In Progress"),
    },
    { status: "Closed", bugs: bugs.filter((bug) => bug.status === "Closed") },
  ];

  return (
    <Box sx={{ m: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
      {statusColumns.map((column) => (
        <Box
          key={column.status}
          sx={{
            flex: "1 1 30%", 
            minWidth: { xs: "100%", md: "300px" },
          }}
        >
          <Paper sx={{ p: 2, minHeight: "400px", width: "100%" }}>
            <Typography variant="h6" gutterBottom>
              {column.status} ({column.bugs.length})
            </Typography>
            {column.bugs.map((bug) => (
              <BugItem key={bug._id} bug={bug} onEdit={onEdit} />
            ))}
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default BugList;
