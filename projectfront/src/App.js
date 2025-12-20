import logo from './logo.svg';
import './App.css';
import AppBar from './components/Appbar';
import Student from './components/Student';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React, {useEffect, useState} from 'react'


export default function App() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (text) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text
    };

    setMessages(prev => [...prev, userMessage]);

    // fake backend call
    const response = await fetch("http://localhost:8080/chat", {
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

  return (
    
    <div className="App">
    <AppBar/>
    <Container maxWidth="md" sx={{ paddingTop: '32px' }}>
      <Paper sx={{ height: '80vh', display: 'flex', flexDirection: 'column', p: 1 }}>
        <MessageList messages={messages} />
        <MessageInput onSend={sendMessage} />
      </Paper>
    </Container>
    </div>
  );
}
