import { Paper, Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function ChatMessage({ message }) {
  const isUser = message.sender === 'user';

  return (
    <Box
        className={"chat-all"}
      display="flex"
      justifyContent={isUser ? 'flex-end' : 'flex-start'}
      mb={1}
    >
      <Paper
          className={"msg-box"}
        sx={{
          maxWidth: '70%',
          bgcolor: isUser ? 'primary.main' : 'grey.300',
          color: isUser ? 'white' : 'black',
          overflowWrap: 'break-word'
        }}
      >
      <Box className="markdown-container">
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {message.text}
        </ReactMarkdown>
      </Box>
      </Paper>
    </Box>
  );
}
