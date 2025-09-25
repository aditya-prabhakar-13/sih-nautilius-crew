import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';

const FilterPanel = () => {

  // This function handles downloading a file from the public folder.
  const handleDownload = (filePath: string) => {
    // In a Vite project, files in the 'public' directory are served at the root.
    // We create a link element to trigger the download.
    const link = document.createElement('a');
    link.href = filePath;
    
    // Extract filename from the path to set the download attribute
    link.setAttribute('download', filePath.substring(filePath.lastIndexOf('/') + 1));
    
    // Append to the document, click, and then remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Filters & Export
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Region Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Region</Label>
          <Select defaultValue="arabian-sea">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="indian-ocean">Indian Ocean</SelectItem>
              <SelectItem value="pacific-ocean">Pacific Ocean</SelectItem>
              <SelectItem value="atlantic-ocean">Atlantic Ocean</SelectItem>
              <SelectItem value="arabian-sea">Arabian Sea</SelectItem>
              <SelectItem value="bay-of-bengal">Bay of Bengal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Time Range */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Date</Label>
          <Input 
            type="date" 
            defaultValue="2025-09-23"
            className="w-full"
          />
        </div>

        {/* Parameters */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Parameters</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="temperature" />
              <Label htmlFor="temperature" className="text-sm text-muted-foreground">
                Temperature
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="salinity" />
              <Label htmlFor="salinity" className="text-sm text-muted-foreground">
                Salinity
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="oxygen" />
              <Label htmlFor="oxygen" className="text-sm text-muted-foreground">
                Oxygen
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="nitrate" />
              <Label htmlFor="nitrate" className="text-sm text-muted-foreground">
                Nitrate
              </Label>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-3 pt-4 border-t border-border">
          <Label className="text-sm font-medium text-foreground">Export Data</Label>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start text-sm"
              onClick={() => handleDownload('/profile_data.csv')}
            >
              <Download className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-sm"
              onClick={() => handleDownload('/20250924_prof.nc')}
            >
              <Download className="mr-2 h-4 w-4" />
              Download NetCDF
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start text-sm"
              onClick={() => handleDownload('/20250924_prof.txt')}
            >
              <Download className="mr-2 h-4 w-4" />
              Download ASCII
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;

