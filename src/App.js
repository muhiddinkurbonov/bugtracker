import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container, Typography, Box, Button } from "@mui/material";
import { fetchBugs } from "./redux/bugSlice";
import Navbar from "./components/Navbar";
import BugForm from "./components/BugForm";
import BugList from "./components/BugList";

const theme = createTheme();

function App() {
  const dispatch = useDispatch();
  const { bugs, loading, error } = useSelector((state) => state.bugs);
  const [bugToEdit, setBugToEdit] = useState(null);
  const [openFormDialog, setOpenFormDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchBugs());
  }, [dispatch]);

  const handleOpenForm = (bugToEdit = null) => {
    setBugToEdit(bugToEdit);
    setOpenFormDialog(true);
  };

  const handleCloseForm = () => {
    setOpenFormDialog(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        {loading && (
          <Box sx={{ textAlign: "center", my: 2 }}>
            <Typography>Loading...</Typography>
          </Box>
        )}
        {error && (
          <Box sx={{ textAlign: "center", my: 2 }}>
            <Typography color="error">Error: {error}</Typography>
          </Box>
        )}
        {!loading && !error && (
          <>
            <Box sx={{ my: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenForm(null)} // Add new bug
              >
                Add a Bug
              </Button>
            </Box>
            <BugList bugs={bugs} onEdit={handleOpenForm} />
            <BugForm
              bugToEdit={bugToEdit}
              setBugToEdit={setBugToEdit}
              open={openFormDialog}
              onClose={handleCloseForm}
            />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
