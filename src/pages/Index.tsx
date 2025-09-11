import ChatInterface from '@/components/ChatInterface';
import EarthVisualization from '@/components/EarthVisualization';
import TemperatureChart from '@/components/TemperatureChart';
import FloatDataTable from '@/components/FloatDataTable';
import FilterPanel from '@/components/FilterPanel';

const Index = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Chat Interface */}
        <div className="lg:col-span-3">
          <ChatInterface />
        </div>

        {/* Middle Column - Main Content */}
        <div className="lg:col-span-6 space-y-6">
          {/* Earth Visualization */}
          <EarthVisualization />
          
          {/* Temperature Chart */}
          <TemperatureChart />
          
          {/* Float Data Table */}
          <FloatDataTable />
        </div>

        {/* Right Column - Filters */}
        <div className="lg:col-span-3">
          <FilterPanel />
        </div>
      </div>
    </div>
  );
};

export default Index;
