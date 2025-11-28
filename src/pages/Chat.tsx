import { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Plus, Trash2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  model: string;
}

const Chat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('gpt-4o');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find((c) => c.id === currentChatId);

  // Load chats from localStorage
  useEffect(() => {
    const storedChats = localStorage.getItem('vinony_chats');
    if (storedChats) {
      const parsedChats = JSON.parse(storedChats);
      setChats(parsedChats);
      if (parsedChats.length > 0) {
        setCurrentChatId(parsedChats[0].id);
      }
    } else {
      // Create first chat
      createNewChat();
    }
  }, []);

  // Save chats to localStorage
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('vinony_chats', JSON.stringify(chats));
    }
  }, [chats]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      model: 'gpt-4o',
    };
    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
    toast({ title: 'New chat created' });
  };

  const deleteChat = (chatId: string) => {
    const updatedChats = chats.filter((c) => c.id !== chatId);
    setChats(updatedChats);
    
    if (currentChatId === chatId) {
      setCurrentChatId(updatedChats[0]?.id || null);
    }
    
    if (updatedChats.length === 0) {
      createNewChat();
    }
    
    toast({ title: 'Chat deleted' });
  };

  const sendMessage = async () => {
    if (!input.trim() || !currentChatId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    // Add user message
    setChats(
      chats.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
              title: chat.messages.length === 0 ? input.slice(0, 30) + '...' : chat.title,
            }
          : chat
      )
    );

    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `This is a simulated response to: "${input}"\n\nHere's what I can help you with:\n\n- Answer questions\n- Write code\n- Analyze data\n- And much more!\n\n\`\`\`javascript\nconst example = "This is a code block";\nconsole.log(example);\n\`\`\``,
        timestamp: new Date(),
      };

      setChats(
        chats.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, userMessage, aiMessage] }
            : chat
        )
      );

      setIsLoading(false);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="h-screen flex">
        {/* Chat List Sidebar */}
        <div className="w-64 border-r border-border/50 glass p-4 overflow-y-auto">
          <Button
            onClick={createNewChat}
            className="w-full mb-4 gradient-primary glow-primary"
          >
            <Plus className="mr-2 w-4 h-4" />
            New Chat
          </Button>

          <div className="space-y-2">
            {chats.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="group"
              >
                <Card
                  className={`p-3 cursor-pointer transition-all hover:border-accent ${
                    currentChatId === chat.id ? 'border-accent bg-accent/10' : 'border-border/50'
                  }`}
                  onClick={() => setCurrentChatId(chat.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm truncate flex-1">{chat.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3 text-destructive" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Model Selector */}
          <div className="border-b border-border/50 p-4 glass">
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                <SelectItem value="claude-sonnet">Claude Sonnet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence>
              {currentChat?.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-gradient-primary text-white glow-primary'
                        : 'glass border border-border/50'
                    }`}
                  >
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown
                        components={{
                          code({ className, children, ...props }: any) {
                            const match = /language-(\w+)/.exec(className || '');
                            const inline = !match;
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="glass border border-border/50 rounded-2xl p-4">
                  <Loader2 className="w-5 h-5 animate-spin text-accent" />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border/50 p-4 glass">
            <div className="max-w-4xl mx-auto flex gap-4">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Type your message... (Shift+Enter for new line)"
                className="min-h-[60px] max-h-[200px]"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="gradient-primary glow-primary hover:scale-105 transition-transform"
                size="icon"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
