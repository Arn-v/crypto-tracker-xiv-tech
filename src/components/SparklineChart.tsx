
import React from 'react';

interface SparklineChartProps {
  trend: 'up' | 'down';
}

const SparklineChart: React.FC<SparklineChartProps> = ({ trend }) => {
  const color = trend === 'up' ? '#10B981' : '#EF4444';
  
  // SVG path for an uptrend or downtrend
  const path = trend === 'up' 
    ? 'M0,15 Q10,13 20,14 T40,8 T60,10 T80,5 L100,0' 
    : 'M0,5 Q10,8 20,7 T40,12 T60,9 T80,15 L100,18';

  return (
    <div className="w-24 h-8">
      <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
        <path
          d={path}
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default SparklineChart;
