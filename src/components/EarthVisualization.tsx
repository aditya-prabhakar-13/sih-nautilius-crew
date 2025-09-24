import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;


const EarthVisualization = () => {
  // Centered to show Indian Ocean, Arabian Sea, and Bay of Bengal
  const position: L.LatLngExpression = [10, 80]; 

  return (
    <Card className="shadow-card hover:shadow-hover transition-smooth relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">Ocean Data Dashboard</h3>
            <div className="flex items-center space-x-2">
              <Badge className="bg-gradient-data text-primary-foreground">
                Live Trajectories
              </Badge>
              <span className="text-sm text-muted-foreground">Global Coverage</span>
            </div>
          </div>
        </div>

        {/* Leaflet Map Container */}
        <div className="relative rounded-lg overflow-hidden bg-muted">
          <MapContainer center={position} zoom={4} scrollWheelZoom={true} className="w-full h-96 rounded-lg">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[10, 80]}>
              <Popup>
                Indian Ocean.
              </Popup>
            </Marker>
          </MapContainer>
           {/* Overlay information */}
           <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-ocean z-[1000] pointer-events-none">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Live Data Points</p>
              <p className="text-2xl font-bold text-primary">2,847</p>
            </div>
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