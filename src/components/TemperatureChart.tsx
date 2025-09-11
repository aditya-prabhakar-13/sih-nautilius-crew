import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const temperatureData = [
  { month: 'Feb', temperature: 0.5 },
  { month: 'Mar', temperature: 0.6 },
  { month: 'Apr', temperature: 0.73 },
  { month: 'May', temperature: 0.68 },
  { month: 'Jun', temperature: 0.75 },
  { month: 'Jul', temperature: 0.71 },
  { month: 'Aug', temperature: 0.69 },
  { month: 'Sep', temperature: 0.55 },
  { month: 'Oct', temperature: 0.42 },
  { month: 'Nov', temperature: 0.38 },
  { month: 'Dec', temperature: 0.51 },
];

const TemperatureChart = () => {
  return (
    <Card className="shadow-card hover:shadow-hover transition-smooth">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Temperature Anomaly Over Time
        </CardTitle>
        <p className="text-sm text-muted-foreground">°C</p>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Temperature Anomaly</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemperatureChart;