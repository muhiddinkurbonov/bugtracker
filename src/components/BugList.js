import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
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
    <Box sx={{ m: 2 }}>
      <Grid container spacing={2}>
        {statusColumns.map((column) => (
          <Grid
            item
            xs={12}
            md={4}
            key={column.status}
            sx={{
              width: {
                xs: "100%",
                md: "30%",
              },
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BugList;
