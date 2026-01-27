import logo from './logo.svg';
import './App.css';
import AppBar from './Appbar';
import Student from './Student';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ModelDropdown from './ModelDropdown';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React, {useEffect, useState} from 'react'
import axios from "axios";
import 'katex/dist/katex.min.css';
import { LinearProgress, CircularProgress } from '@mui/material';
import { List, ListItem, ListItemText, Typography, IconButton} from '@mui/material';
import 'katex/dist/katex.min.css';

export default function Home({ messagesO, messagesC, setMessagesO, setMessagesC, selectedModel, setSelectedModel}) {
	const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

	const onFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};

  const sendMessage = async (text) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text
    };

    if (selectedModel == "ollama") {
      setMessagesO(prev => [...prev, userMessage]);
    }
    else {
      setMessagesC(prev => [...prev, userMessage]);
    }
    setIsLoading(true)
    const response = await fetch(`http://localhost:8080/chat?provider=${selectedModel}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });


    const data = await response.json();
    setIsLoading(false)

    const assistantMessage = {
      id: Date.now() + 1,
      sender: 'assistant',
      text: data.reply
    };

    if (selectedModel == "ollama") {
      setMessagesO(prev => [...prev, assistantMessage]);
    }
    else {
      setMessagesC(prev => [...prev, assistantMessage]);
    }
  };

const onFileUpload = async () => {
  if (!selectedFile) return;

  const MAX_SIZE = 10 * 1024 * 1024;
  if (selectedFile.size > MAX_SIZE) {
    alert("File is too large! Maximum allowed size is 10MB.");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const response = await fetch("http://localhost:8080/chat/upload", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      console.log("File uploaded:", data);
      setSelectedFile(null);
      document.querySelector('.btn-file').value = ""; 
      
      alert("File uploaded successfully!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <div className="App">
    <AppBar/>
    <Container className={"all"} maxWidth="lg">
      <Paper className={"chat-box"}>
        <MessageList messages={selectedModel === "ollama" ? messagesO : messagesC} />
        {isLoading && <LinearProgress sx={{ backgroundColor: 'rgba(65, 105, 225, 0.2)', '& .MuiLinearProgress-bar': {backgroundColor: 'royalblue'}, marginBottom: '0.2vw'}}/>}
        <MessageInput onSend={sendMessage} />
        <Box className={"box-under"}>
          <input className={"btn-file"} type="file" onChange={onFileChange} />
          <div className='btn-upload-container'>
            <Button className={"btn-upload"} onClick={onFileUpload} variant="contained"> Upload learning material </Button>
          </div>
          <ModelDropdown
          value={selectedModel}
          onChange={setSelectedModel}
          />
        </Box>
      </Paper>
    </Container>
    </div>
  );
}
