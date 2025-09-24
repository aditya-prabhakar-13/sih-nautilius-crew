import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Mic } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, BarChart, Bar, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area, ComposedChart
} from 'recharts';

// Initial mock messages (used if no history exists)
const initialMessages = [
  {
    id: 1,
    type: 'ai',
    content: 'Hello! I am your AI assistant for ocean data. How can I help you today?',
    timestamp: new Date(Date.now() - 5000).toISOString(),
  },
];

// Suggested queries
const suggestions = [
  'Show me the seasonal variation of salinity in the Indian Ocean over the past year',
  'Compare sea surface temperature and salinity in the Arabian Sea',
  'Highlight regions with unusually low oxygen levels (<2 mg/L)',
  'Show the correlation between air temperature and salinity for this dataset',
  'Compare the current month’s ocean conditions with the same month last year',
  'Analyze Nitrate levels by depth',
  'Show Phosphate distribution in major ocean basins',
  'Track Chlorophyll concentration for the last 6 months',
  'Display the trend of ocean acidity (pH) over the last decade',
  'Summarize significant wave heights for the past week',
  'Visualize tidal patterns for today in the Bay of Bengal',
  'Compare dissolved organic carbon across different seas',
  'Correlate ocean current speed with sea surface temperature',
  'Detect salinity anomalies in the North Atlantic',
  'Compare average deep sea vs. surface temperature'
];

// Dummy datasets
const seasonalSalinity = [
  { month: 'Jan', salinity: 34.5 }, { month: 'Feb', salinity: 34.7 }, { month: 'Mar', salinity: 35.0 },
  { month: 'Apr', salinity: 34.8 }, { month: 'May', salinity: 34.4 }, { month: 'Jun', salinity: 34.6 },
  { month: 'Jul', salinity: 35.2 }, { month: 'Aug', salinity: 35.1 }, { month: 'Sep', salinity: 34.9 },
  { month: 'Oct', salinity: 34.7 }, { month: 'Nov', salinity: 34.5 }, { month: 'Dec', salinity: 34.8 },
];
const sstVsSalinity = [
  { month: 'Jan', sst: 27, salinity: 34.6 }, { month: 'Feb', sst: 28, salinity: 34.8 }, { month: 'Mar', sst: 29, salinity: 35.1 },
  { month: 'Apr', sst: 30, salinity: 35.0 }, { month: 'May', sst: 31, salinity: 34.7 },
];
const lowOxygenRegions = [
  { region: 'Arabian Sea', oxygen: 1.8 }, { region: 'Bay of Bengal', oxygen: 2.5 },
  { region: 'Indian Ocean South', oxygen: 1.5 }, { region: 'Equator Zone', oxygen: 3.2 },
];
const airTempVsSalinity = [
  { airTemp: 25, salinity: 34.5 }, { airTemp: 26, salinity: 34.6 }, { airTemp: 27, salinity: 34.9 },
  { airTemp: 28, salinity: 35.1 }, { airTemp: 29, salinity: 35.3 },
];
const yearComparison = [
  { variable: 'SST', thisYear: 29, lastYear: 28 }, { variable: 'Salinity', thisYear: 35, lastYear: 34.7 },
  { variable: 'Oxygen', thisYear: 2.1, lastYear: 2.4 }, { variable: 'pH', thisYear: 8.0, lastYear: 8.1 },
];
// New Datasets
const nitrateByDepth = [
  { depth: 0, nitrate: 0.5 }, { depth: 50, nitrate: 0.8 }, { depth: 100, nitrate: 2.1 },
  { depth: 200, nitrate: 5.5 }, { depth: 500, nitrate: 15.2 }, { depth: 1000, nitrate: 25.0 },
];
const phosphateDistribution = [
  { basin: 'Atlantic', phosphate: 1.2 }, { basin: 'Pacific', phosphate: 2.5 },
  { basin: 'Indian', phosphate: 1.8 }, { basin: 'Arctic', phosphate: 0.9 },
];
const chlorophyllData = [
  { month: 'Apr', concentration: 0.8 }, { month: 'May', concentration: 1.2 }, { month: 'Jun', concentration: 2.5 },
  { month: 'Jul', concentration: 1.8 }, { month: 'Aug', concentration: 1.1 }, { month: 'Sep', concentration: 0.7 },
];
const acidityTrend = [
  { year: 2015, pH: 8.10 }, { year: 2016, pH: 8.09 }, { year: 2017, pH: 8.09 },
  { year: 2018, pH: 8.08 }, { year: 2019, pH: 8.07 }, { year: 2020, pH: 8.07 },
  { year: 2021, pH: 8.06 }, { year: 2022, pH: 8.05 }, { year: 2023, pH: 8.05 }, { year: 2024, pH: 8.04 },
];
const waveHeights = [
  { day: 'Mon', height: 2.1 }, { day: 'Tue', height: 2.5 }, { day: 'Wed', height: 3.0 },
  { day: 'Thu', height: 2.8 }, { day: 'Fri', height: 2.2 }, { day: 'Sat', height: 1.9 }, { day: 'Sun', height: 2.0 },
];
const tidalPatterns = [
  { time: '00:00', level: 1.2 }, { time: '03:00', level: 2.8 }, { time: '06:00', level: 1.1 },
  { time: '09:00', level: -0.5 }, { time: '12:00', level: 1.3 }, { time: '15:00', level: 3.0 },
  { time: '18:00', level: 0.9 }, { time: '21:00', level: -0.2 },
];
const organicCarbon = [
  { sea: 'Mediterranean', carbon: 60 }, { sea: 'Red Sea', carbon: 45 }, { sea: 'Baltic Sea', carbon: 80 },
  { sea: 'Black Sea', carbon: 75 }, { sea: 'North Sea', carbon: 70 },
];
const currentVsTemp = [
  { speed: 0.5, temp: 22 }, { speed: 0.8, temp: 24 }, { speed: 1.2, temp: 25 },
  { speed: 1.5, temp: 26 }, { speed: 0.6, temp: 23 }, { speed: 1.8, temp: 27 },
];
const salinityAnomalies = [
  { month: 'Jan', salinity: 35.0, anomaly: 0.1 }, { month: 'Feb', salinity: 35.1, anomaly: 0.0 },
  { month: 'Mar', salinity: 34.8, anomaly: -0.3 }, { month: 'Apr', salinity: 35.5, anomaly: 0.4 },
  { month: 'May', salinity: 35.3, anomaly: 0.1 }, { month: 'Jun', salinity: 34.5, anomaly: -0.6 },
];
const deepVsSurfaceTemp = [
  { location: 'Equator', surface: 28, deep: 4 }, { location: 'Mid-Latitudes', surface: 15, deep: 3 },
  { location: 'Poles', surface: 2, deep: 1 },
];


// Visualization renderer
const Visualization = ({ query }: { query: string }) => {
  switch (query) {
    case suggestions[0]: return (<ResponsiveContainer width="100%" height={250}><LineChart data={seasonalSalinity}><CartesianGrid /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="salinity" stroke="#8884d8" /></LineChart></ResponsiveContainer>);
    case suggestions[1]: return (<ResponsiveContainer width="100%" height={250}><LineChart data={sstVsSalinity}><CartesianGrid /><XAxis dataKey="month" /><YAxis yAxisId="left" /><YAxis yAxisId="right" orientation="right" /><Tooltip /><Legend /><Line yAxisId="left" type="monotone" dataKey="sst" stroke="#ff7300" /><Line yAxisId="right" type="monotone" dataKey="salinity" stroke="#387908" /></LineChart></ResponsiveContainer>);
    case suggestions[2]: return (<ResponsiveContainer width="100%" height={250}><BarChart data={lowOxygenRegions}><CartesianGrid /><XAxis dataKey="region" /><YAxis /><Tooltip /><Legend /><Bar dataKey="oxygen" fill="#82ca9d" /></BarChart></ResponsiveContainer>);
    case suggestions[3]: return (<ResponsiveContainer width="100%" height={250}><ScatterChart><CartesianGrid /><XAxis dataKey="airTemp" name="Air Temp (°C)" /><YAxis dataKey="salinity" name="Salinity (PSU)" /><Tooltip /><Scatter name="Correlation" data={airTempVsSalinity} fill="#8884d8" /></ScatterChart></ResponsiveContainer>);
    case suggestions[4]: return (<ResponsiveContainer width="100%" height={250}><RadarChart data={yearComparison}><PolarGrid /><PolarAngleAxis dataKey="variable" /><PolarRadiusAxis /><Radar name="This Year" dataKey="thisYear" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} /><Radar name="Last Year" dataKey="lastYear" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /><Legend /></RadarChart></ResponsiveContainer>);
    case suggestions[5]: return (<ResponsiveContainer width="100%" height={250}><AreaChart data={nitrateByDepth}><CartesianGrid /><XAxis dataKey="depth" unit="m" /><YAxis /><Tooltip /><Area type="monotone" dataKey="nitrate" stroke="#8884d8" fill="#8884d8" /></AreaChart></ResponsiveContainer>);
    case suggestions[6]: return (<ResponsiveContainer width="100%" height={250}><BarChart layout="vertical" data={phosphateDistribution}><CartesianGrid /><XAxis type="number" /><YAxis dataKey="basin" type="category" width={80} /><Tooltip /><Legend /><Bar dataKey="phosphate" fill="#ffc658" /></BarChart></ResponsiveContainer>);
    case suggestions[7]: return (<ResponsiveContainer width="100%" height={250}><LineChart data={chlorophyllData}><CartesianGrid /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="concentration" stroke="#34a853" name="Chlorophyll (mg/m³)" /></LineChart></ResponsiveContainer>);
    case suggestions[8]: return (<ResponsiveContainer width="100%" height={250}><ComposedChart data={acidityTrend}><CartesianGrid /><XAxis dataKey="year" /><YAxis domain={['dataMin - 0.01', 'dataMax + 0.01']} /><Tooltip /><Legend /><Area type="monotone" dataKey="pH" fill="#8884d8" stroke="#8884d8" /><Line type="monotone" dataKey="pH" stroke="#ff7300" /></ComposedChart></ResponsiveContainer>);
    case suggestions[9]: return (<ResponsiveContainer width="100%" height={250}><BarChart data={waveHeights}><CartesianGrid /><XAxis dataKey="day" /><YAxis /><Tooltip /><Legend /><Bar dataKey="height" fill="#4285f4" name="Wave Height (m)" /></BarChart></ResponsiveContainer>);
    case suggestions[10]: return (<ResponsiveContainer width="100%" height={250}><LineChart data={tidalPatterns}><CartesianGrid /><XAxis dataKey="time" /><YAxis /><Tooltip /><Legend /><Line type="step" dataKey="level" stroke="#d93025" name="Tide Level (m)" /></LineChart></ResponsiveContainer>);
    case suggestions[11]: return (<ResponsiveContainer width="100%" height={250}><RadarChart data={organicCarbon}><PolarGrid /><PolarAngleAxis dataKey="sea" /><PolarRadiusAxis /><Tooltip /><Radar name="Dissolved Organic Carbon" dataKey="carbon" stroke="#1a73e8" fill="#1a73e8" fillOpacity={0.6} /></RadarChart></ResponsiveContainer>);
    case suggestions[12]: return (<ResponsiveContainer width="100%" height={250}><ScatterChart><CartesianGrid /><XAxis dataKey="speed" name="Current Speed (m/s)" /><YAxis dataKey="temp" name="SST (°C)" /><Tooltip /><Scatter name="Correlation" data={currentVsTemp} fill="#fbbc05" /></ScatterChart></ResponsiveContainer>);
    case suggestions[13]: return (<ResponsiveContainer width="100%" height={250}><ComposedChart data={salinityAnomalies}><CartesianGrid /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Bar dataKey="anomaly" barSize={20} fill="#ea4335" /><Line type="monotone" dataKey="salinity" stroke="#34a853" /></ComposedChart></ResponsiveContainer>);
    case suggestions[14]: return (<ResponsiveContainer width="100%" height={250}><BarChart data={deepVsSurfaceTemp}><CartesianGrid /><XAxis dataKey="location" /><YAxis /><Tooltip /><Legend /><Bar dataKey="surface" fill="#4285f4" name="Surface Temp (°C)" /><Bar dataKey="deep" fill="#1a73e8" name="Deep Sea Temp (°C)" /></BarChart></ResponsiveContainer>);
    default: return null;
  }
};

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const savedMessages = localStorage.getItem('chatHistory');
      return savedMessages ? JSON.parse(savedMessages) : initialMessages;
    } catch (error) {
      console.error("Could not parse chat history from localStorage", error);
      return initialMessages;
    }
  });
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);
  const [randomSuggestions, setRandomSuggestions] = useState<string[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('chatHistory', JSON.stringify(chatMessages));
    } catch (error) {
      console.error("Could not save chat history to localStorage", error);
    }
  }, [chatMessages]);

  const getRandomSuggestions = useCallback(() => {
    const shuffled = [...suggestions].sort(() => 0.5 - Math.random());
    setRandomSuggestions(shuffled.slice(0, 2));
  }, []);

  useEffect(() => {
    getRandomSuggestions();
  }, [getRandomSuggestions]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        type: 'user' as const,
        content: inputValue,
        timestamp: new Date().toISOString(),
      };

      if (suggestions.includes(inputValue)) {
        setSelectedQuery(inputValue);
        const aiMessage = {
          id: chatMessages.length + 2,
          type: 'ai' as const,
          content: `Generating visualization for: ${inputValue}`,
          timestamp: new Date().toISOString(),
        };
        setChatMessages((prev) => [...prev, newMessage, aiMessage]);
      } else {
        setChatMessages((prev) => [...prev, newMessage]);
        setSelectedQuery(null);
      }

      setInputValue('');
      getRandomSuggestions();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chatMessages, selectedQuery]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Card className="h-[90vh] flex flex-col shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-primary">AI Chat</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4 pt-0 overflow-hidden">
        <ScrollArea className="flex-1 -mx-4" ref={scrollAreaRef}>
          <div className="space-y-4 px-4 pb-4">
            {chatMessages.map((message: any) => (
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
            {/* Visualization Output */}
            {selectedQuery && (
              <div className="p-4 border rounded-lg bg-muted text-sm">
                <strong>Visualization:</strong>
                <div className="mt-2 h-64 bg-white border rounded-md flex items-center justify-center">
                  <Visualization query={selectedQuery} />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggestions & Input */}
        <div className="mt-auto pt-4 border-t border-border">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Suggested queries:</p>
            <div className="grid grid-cols-1 gap-2">
              {randomSuggestions.map((suggestion, index) => (
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