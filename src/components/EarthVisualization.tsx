import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import earthImage from '@/assets/earth-ocean.jpg';

const EarthVisualization = () => {
  return (
    <Card className="shadow-card hover:shadow-hover transition-smooth relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">Ocean Data Dashboard</h3>
            <div className="flex items-center space-x-2">
              <Badge className="bg-gradient-data text-primary-foreground">
                Trajectories
              </Badge>
              <span className="text-sm text-muted-foreground">Profiles Comparison</span>
              <span className="text-sm text-muted-foreground">Temperature</span>
            </div>
          </div>
        </div>

        {/* Earth Image */}
        <div className="relative rounded-lg overflow-hidden bg-gradient-ocean p-4">
          <img
            src={earthImage}
            alt="Earth showing ocean data coverage"
            className="w-full h-64 object-cover rounded-lg animate-float"
          />
          
          {/* Overlay information */}
          <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-ocean">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Live Data Points</p>
              <p className="text-2xl font-bold text-primary">2,847</p>
            </div>
          </div>

          {/* Data points overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Simulated data points */}
            <div className="absolute top-16 left-12 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="absolute top-24 right-20 w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 left-16 w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-32 right-24 w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 bg-accent/30 rounded-lg">
            <p className="text-sm text-muted-foreground">Active Floats</p>
            <p className="text-xl font-bold text-primary">156</p>
          </div>
          <div className="text-center p-3 bg-accent/30 rounded-lg">
            <p className="text-sm text-muted-foreground">Data Points</p>
            <p className="text-xl font-bold text-primary">2.8K</p>
          </div>
          <div className="text-center p-3 bg-accent/30 rounded-lg">
            <p className="text-sm text-muted-foreground">Coverage</p>
            <p className="text-xl font-bold text-primary">Global</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarthVisualization;