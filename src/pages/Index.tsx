// src/pages/Index.tsx

import ChatInterface from '@/components/ChatInterface';
import EarthVisualization from '@/components/EarthVisualization';
import TemperatureChart from '@/components/TemperatureChart';
import FloatDataTable from '@/components/FloatDataTable';
import FilterPanel from '@/components/FilterPanel';

const Index = () => {
  return (
    // Main grid now takes the full height of its container
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full p-6">
      {/* Left Column: Chat Interface is now correctly constrained */}
      <div className="lg:col-span-3 h-full">
        <ChatInterface />
      </div>

      {/* Right Wrapper: This container will scroll if content overflows */}
      <div className="lg:col-span-9 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
          {/* Middle Column: Main Content */}
          <div className="lg:col-span-6 space-y-6">
            <EarthVisualization />
            <TemperatureChart />
            <FloatDataTable />
          </div>

          {/* Right Column: Filters */}
          <div className="lg:col-span-3">
            <FilterPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;