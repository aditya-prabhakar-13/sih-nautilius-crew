import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const floats = [
  {
    id: '12345',
    location: 'Indian Ocean',
    lastUpdated: '2024-07-20',
    battery: 85,
    status: 'active'
  },
  {
    id: '67890',
    location: 'Pacific Ocean',
    lastUpdated: '2024-07-19',
    battery: 92,
    status: 'active'
  },
  {
    id: '11223',
    location: 'Arabian Sea',
    lastUpdated: '2024-07-21',
    battery: 78,
    status: 'active'
  },
  {
    id: '44556',
    location: 'Atlantic Ocean',
    lastUpdated: '2024-07-18',
    battery: 89,
    status: 'active'
  },
];

const FloatDataTable = () => {
  const getBatteryColor = (battery: number) => {
    if (battery >= 80) return 'bg-green-500';
    if (battery >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="shadow-card hover:shadow-hover transition-smooth">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Float Data Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Float ID</TableHead>
                <TableHead className="text-muted-foreground">Location</TableHead>
                <TableHead className="text-muted-foreground">Last Updated</TableHead>
                <TableHead className="text-muted-foreground">Battery</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {floats.map((float) => (
                <TableRow key={float.id} className="border-border hover:bg-accent/30 transition-smooth">
                  <TableCell className="font-medium text-foreground">
                    {float.id}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {float.location}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {float.lastUpdated}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${getBatteryColor(float.battery)}`}></div>
                        <span className="text-sm text-muted-foreground">{float.battery}%</span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FloatDataTable;