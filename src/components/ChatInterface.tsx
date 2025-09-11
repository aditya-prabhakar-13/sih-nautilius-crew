import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Mic } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, BarChart, Bar, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

// --- Chat messages ---
const initialMessages = [
  {
    id: 1,
    type: 'ai',
    content: 'Hello! I am your AI assistant for ocean data. How can I help you today?',
    timestamp: new Date(Date.now() - 5000),
  },
];

// --- Suggested prompts ---
const suggestions = [
  'Show me the seasonal variation of salinity in the Indian Ocean over the past year',
  'Compare sea surface temperature and salinity in the Arabian Sea',
  'Highlight regions with unusually low oxygen levels (<2 mg/L)',
  'Show the correlation between air temperature and salinity for this dataset',
  'Compare the current month’s ocean conditions with the same month last year',
];

// --- Dummy data for charts ---
const seasonalSalinity = [
  { month: 'Jan', salinity: 34.5 },
  { month: 'Feb', salinity: 34.7 },
  { month: 'Mar', salinity: 35.0 },
  { month: 'Apr', salinity: 34.8 },
  { month: 'May', salinity: 34.4 },
  { month: 'Jun', salinity: 34.6 },
  { month: 'Jul', salinity: 35.2 },
  { month: 'Aug', salinity: 35.1 },
  { month: 'Sep', salinity: 34.9 },
  { month: 'Oct', salinity: 34.7 },
  { month: 'Nov', salinity: 34.5 },
  { month: 'Dec', salinity: 34.8 },
];

const sstVsSalinity = [
  { month: 'Jan', sst: 27, salinity: 34.6 },
  { month: 'Feb', sst: 28, salinity: 34.8 },
  { month: 'Mar', sst: 29, salinity: 35.1 },
  { month: 'Apr', sst: 30, salinity: 35.0 },
  { month: 'May', sst: 31, salinity: 34.7 },
];

const lowOxygenRegions = [
  { region: 'Arabian Sea', oxygen: 1.8 },
  { region: 'Bay of Bengal', oxygen: 2.5 },
  { region: 'Indian Ocean South', oxygen: 1.5 },
  { region: 'Equator Zone', oxygen: 3.2 },
];

const airTempVsSalinity = [
  { airTemp: 25, salinity: 34.5 },
  { airTemp: 26, salinity: 34.6 },
  { airTemp: 27, salinity: 34.9 },
  { airTemp: 28, salinity: 35.1 },
  { airTemp: 29, salinity: 35.3 },
];

const yearComparison = [
  { variable: 'SST', thisYear: 29, lastYear: 28 },
  { variable: 'Salinity', thisYear: 35, lastYear: 34.7 },
  { variable: 'Oxygen', thisYear: 2.1, lastYear: 2.4 },
  { variable: 'pH', thisYear: 8.0, lastYear: 8.1 },
];

// --- Visualization component ---
const Visualization = ({ query }: { query: string }) => {
  switch (query) {
    case suggestions[0]:
      return (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={seasonalSalinity}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="salinity" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      );

    case suggestions[1]:
      return (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={sstVsSalinity}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="sst" stroke="#ff7300" />
            <Line yAxisId="right" type="monotone" dataKey="salinity" stroke="#387908" />
          </LineChart>
        </ResponsiveContainer>
      );

    case suggestions[2]:
      return (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={lowOxygenRegions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="oxygen" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      );

    case suggestions[3]:
      return (
        <ResponsiveContainer width="100%" height={250}>
          <ScatterChart>
            <CartesianGrid />
            <XAxis dataKey="airTemp" name="Air Temp (°C)" />
            <YAxis dataKey="salinity" name="Salinity (PSU)" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Correlation" data={airTempVsSalinity} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      );

    case suggestions[4]:
      return (
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={yearComparison}>
            <PolarGrid />
            <PolarAngleAxis dataKey="variable" />
            <PolarRadiusAxis />
            <Radar name="This Year" dataKey="thisYear" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="Last Year" dataKey="lastYear" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      );

    default:
      return <div className="text-muted-foreground">No visualization available</div>;
  }
};

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState(initialMessages);
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        type: 'user',
        content: inputValue,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, newMessage]);

      if (suggestions.includes(inputValue)) {
        setSelectedQuery(inputValue);
        const aiMessage = {
          id: chatMessages.length + 2,
          type: 'ai',
          content: `Generating visualization for: ${inputValue}`,
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, aiMessage]);
      }

      setInputValue('');
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chatMessages]);

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
      
      <CardContent className="flex-1 flex flex-col p-4 pt-0 overflow-hidden">
        {/* Messages + Visualization */}
        <ScrollArea className="flex-1 -mx-4" ref={scrollAreaRef}>
          <div className="space-y-4 px-4 pb-4">
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

            {/* Visualization */}
            {selectedQuery && (
              <div className="p-4 border rounded-lg bg-muted">
                <Visualization query={selectedQuery} />
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Controls */}
        <div className="mt-auto pt-4 border-t border-border">
          {/* Suggestions */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Suggested queries:</p>
            <div className="grid grid-cols-1 gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left text-xs p-2 h-auto whitespace-normal hover:bg-accent/50 transition-smooth"
                  onClick={() => setInputValue(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="flex space-x-2 mt-4">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
