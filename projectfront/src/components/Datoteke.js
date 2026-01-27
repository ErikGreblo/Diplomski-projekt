import './App.css';
import AppBar from './Appbar';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Paper,
  Box 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Datoteke = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/chat/files");
        console.log(response.data)
        setFiles(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

  useEffect(() => {
    fetchFiles();
  }, []); 

  const handleDelete = async (id) => {
      if (window.confirm("Are you sure?")) {
        try {
          await axios.delete(`http://localhost:8080/chat/files/${id}`);
          setFiles(files.filter(file => file.id !== id));
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

  return (
      <div className="App-datoteke">
        <AppBar />
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom sx={{textAlign: "center"}}>
            List of uploaded files
          </Typography>
          <Paper elevation={3}>
            <List className = {"file-list"}>
              {files.length === 0 ? (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="textSecondary">No files found.</Typography>
                </Box>
              ) : (
                files.map((file) => (
                  <ListItem
                    key={file.id}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(file.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={file.filename} 
                      secondary={`ID: ${file.id}, Upload date: ${new Date(file.uploadDate).toLocaleString('hr-HR')}`}
                    />
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        </Container>
      </div>
    );
};

export default Datoteke;
