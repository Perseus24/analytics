// components/PieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, RadialLinearScale);

interface PieChartProps {
    data: {
        labels: string[];
        values: number[];
    };
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
        {
            data: data.values,
            backgroundColor: ['#F01830', '#FA8B1F', '#4DA3D4', '#8FCD2A', '#17B791'], // daylio colors
            hoverBackgroundColor: ['#F01830', '#FA8B1F', '#4DA3D4', '#8FCD2A', '#17B791'],
        },
        ],
    };

    return <Pie data={chartData} />;
};

export default PieChart;
