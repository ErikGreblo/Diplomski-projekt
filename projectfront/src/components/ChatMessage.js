import { Paper, Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function ChatMessage({ message }) {
  const isUser = message.sender === 'user';

  return (
    <Box
      display="flex"
      justifyContent={isUser ? 'flex-end' : 'flex-start'}
      mb={1}
    >
      <Paper
        sx={{
          p: 1.5,
          maxWidth: '70%',
          bgcolor: isUser ? 'primary.main' : 'grey.300',
          color: isUser ? 'white' : 'black',
          overflowWrap: 'break-word' // ensure long equations wrap
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {message.text}
        </ReactMarkdown>
      </Paper>
    </Box>
  );
}
