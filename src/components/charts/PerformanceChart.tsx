import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useState } from 'react';

interface PerformanceData {
  date: string;
  portfolio: number;
  benchmark: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
  showDrawdowns?: boolean;
}

export function PerformanceChart({ data, showDrawdowns = false }: PerformanceChartProps) {
  const [activeMetric, setActiveMetric] = useState<'portfolio' | 'benchmark'>('portfolio');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm">
                {entry.name === 'portfolio' ? 'Portefeuille' : 'Benchmark'}: 
              </span>
              <span className="text-sm font-semibold">
                ${entry.value.toLocaleString('fr-CA', { maximumFractionDigits: 0 })}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const formatXAxis = (tickItem: string) => {
    return new Date(tickItem).toLocaleDateString('fr-CA', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const formatYAxis = (value: number) => {
    return `$${(value / 1000).toFixed(0)}K`;
  };

  if (showDrawdowns) {
    // Calculate drawdowns
    const portfolioDrawdowns = data.map((point, index) => {
      const peak = Math.max(...data.slice(0, index + 1).map(d => d.portfolio));
      const drawdown = ((point.portfolio - peak) / peak) * 100;
      return {
        ...point,
        drawdown: Math.min(0, drawdown)
      };
    });

    return (
      <div className="space-y-4">
        {/* Performance Chart */}
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxis}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              tickFormatter={formatYAxis}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="portfolio" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={false}
              name="portfolio"
            />
            <Line 
              type="monotone" 
              dataKey="benchmark" 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="benchmark"
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Drawdown Chart */}
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={portfolioDrawdowns}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxis}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              domain={['dataMin', 0]}
              tickFormatter={(value) => `${value.toFixed(1)}%`}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(2)}%`, 'Drawdown']}
              labelFormatter={(label) => formatXAxis(label)}
            />
            <Area 
              type="monotone" 
              dataKey="drawdown" 
              stroke="hsl(var(--destructive))"
              fill="hsl(var(--destructive))"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
        <XAxis 
          dataKey="date" 
          tickFormatter={formatXAxis}
          stroke="hsl(var(--muted-foreground))"
        />
        <YAxis 
          tickFormatter={formatYAxis}
          stroke="hsl(var(--muted-foreground))"
        />
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey="portfolio" 
          stroke="hsl(var(--primary))" 
          strokeWidth={3}
          dot={false}
          name="portfolio"
        />
        <Line 
          type="monotone" 
          dataKey="benchmark" 
          stroke="hsl(var(--muted-foreground))" 
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
          name="benchmark"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}