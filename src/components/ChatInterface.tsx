import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Mic } from 'lucide-react';

// Initial mock messages
const messages = [
  {
    id: 1,
    type: 'ai',
    content: 'Hello! I am your AI assistant for ocean data. How can I help you today?',
    timestamp: new Date(Date.now() - 5000),
  },
];

const suggestions = [
  'Show me the seasonal variation of salinity in the Indian Ocean over the past year',
  'Compare sea surface temperature and salinity in the Arabian Sea',
  'Highlight regions with unusually low oxygen levels (<2 mg/L)',
  'Show the correlation between air temperature and salinity for this dataset',
  'Compare the current month’s ocean conditions with the same month last year',
];

// Map each suggestion to a visualization type
const visualizationMap: Record<string, string> = {
  'Show me the seasonal variation of salinity in the Indian Ocean over the past year':
    '📊 Time-series chart (Months vs Salinity)',
  'Compare sea surface temperature and salinity in the Arabian Sea':
    '📊 Dual-axis chart (SST vs Salinity)',
  'Highlight regions with unusually low oxygen levels (<2 mg/L)':
    '🗺️ Interactive Map highlighting hypoxic zones',
  'Show the correlation between air temperature and salinity for this dataset':
    '📊 Scatter plot (Air Temp vs Salinity)',
  'Compare the current month’s ocean conditions with the same month last year':
    '📊 Comparison chart (Bar/Radar)',
};

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);
  const [visualization, setVisualization] = useState<string | null>(null);

  const handleSend = () => {
    if (inputValue.trim()) {
      // Add user message
      const newMessage = {
        id: chatMessages.length + 1,
        type: 'user',
        content: inputValue,
        timestamp: new Date(),
      };

      setChatMessages([...chatMessages, newMessage]);

      // Check if input matches a suggestion to trigger visualization
      if (visualizationMap[inputValue]) {
        setVisualization(visualizationMap[inputValue]);

        const aiMessage = {
          id: chatMessages.length + 2,
          type: 'ai',
          content: `Generating visualization: ${visualizationMap[inputValue]}`,
          timestamp: new Date(),
        };

        setChatMessages((prev) => [...prev, newMessage, aiMessage]);
      }

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
            {chatMessages.map((message) => (
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

        {/* Visualization Placeholder */}
        {visualization && (
          <div className="p-4 border rounded-lg bg-muted text-sm">
            <strong>Visualization:</strong> {visualization}
            <div className="mt-2 h-40 flex items-center justify-center bg-white border rounded-md text-muted-foreground">
              [Chart/Map will render here]
            </div>
          </div>
        )}

        {/* Suggestions */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Suggested queries:</p>
          <div className="grid grid-cols-1 gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-left text-xs p-2 h-auto hover:bg-accent/50 transition-smooth"
                onClick={() => {
                  setInputValue(suggestion);
                  handleSend();
                }}
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
