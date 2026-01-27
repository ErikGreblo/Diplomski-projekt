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

export default function Home({ messages, setMessages }) {
	const [selectedFile, setSelectedFile] = useState(null);
  const [selectedModel, setSelectedModel] = useState("ollama");

	const onFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};

  const sendMessage = async (text) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text
    };

    setMessages(prev => [...prev, userMessage]);

    const response = await fetch(`http://localhost:8080/chat?provider=${selectedModel}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();

    const assistantMessage = {
      id: Date.now() + 1,
      sender: 'assistant',
      text: data.reply
    };

    setMessages(prev => [...prev, assistantMessage]);
  };


  const handleUpload = async () => {
      // We will fill this out later
    };

const onFileUpload = async () => {
  if (!selectedFile) return;

  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  if (selectedFile.size > MAX_SIZE) {
    alert("File is too large! Maximum allowed size is 10MB.");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);

  const response = await fetch("http://localhost:8080/chat/upload", {
    method: "POST",
    body: formData
  });

  const data = await response.json();
  console.log(data);
};

  return (
    <div className="App">
    <AppBar/>
    <Container className={"all"} maxWidth="lg">
      <Paper className={"chat-box"}>
        <MessageList messages={messages} />
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
