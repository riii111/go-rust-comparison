'use client';

import { LineChart, Line } from 'recharts';

const LineChartComponent = () => {
    const detarameData = [
        { value: 30 }, { value: 40 }, { value: 35 }, { value: 50 },
        { value: 45 }, { value: 55 }, { value: 48 }, { value: 52 }
    ];

    return (
        <div className="h-16">
            <LineChart width={300} height={60} data={detarameData}>
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="0 0"
                />
            </LineChart>
        </div>
    );
};

export default LineChartComponent;