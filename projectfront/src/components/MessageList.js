import { Box } from '@mui/material';
import ChatMessage from './ChatMessage';
import { useEffect, useRef } from 'react';

export default function MessageList({ messages }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, maxHeight: '70vh' }}>
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
      <div ref={endRef} /> {}
    </Box>
  );
}
