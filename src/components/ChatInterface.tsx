import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Mic } from 'lucide-react';

const messages = [
  {
    id: 1,
    type: 'ai',
    content: 'Hello! I am your AI assistant for ocean data. How can I help you today?',
    timestamp: new Date(Date.now() - 5000),
  },
  {
    id: 2,
    type: 'user',
    content: 'Show me salinity profiles near the equator in March 2023.',
    timestamp: new Date(Date.now() - 4000),
  },
  {
    id: 3,
    type: 'ai',
    content: 'Analyzing data for salinity profiles near the equator for March 2023. This might take a moment...',
    timestamp: new Date(Date.now() - 3000),
  },
  {
    id: 4,
    type: 'ai',
    content: 'Done! I found 15 profiles. The average salinity was 34.5 PSU. Would you like a detailed plot or a summary table?',
    timestamp: new Date(Date.now() - 2000),
  },
];

const suggestions = [
  'Show me salinity profiles near the equator in March 2023',
  'Compare BGC parameters in the Arabian Sea for the last 6 months',
  'What is the average temperature in the Indian Ocean?',
  'Visualize oxygen levels at 100m depth for 2022',
];

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      // Handle sending message
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Card className="h-full flex flex-col shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-primary">AI Chat</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-4 p-4 pt-0">
        {/* Messages */}
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm transition-smooth ${
                    message.type === 'user'
                      ? 'bg-gradient-data text-primary-foreground'
                      : 'bg-accent text-accent-foreground'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Suggestions */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Suggested queries:</p>
          <div className="grid grid-cols-1 gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-left text-xs p-2 h-auto hover:bg-accent/50 transition-smooth"
                onClick={() => setInputValue(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button size="sm" onClick={handleSend} className="bg-gradient-data hover:opacity-90">
            <Send className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline">
            <Mic className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;