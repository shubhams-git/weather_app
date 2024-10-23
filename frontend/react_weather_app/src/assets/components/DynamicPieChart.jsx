import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DynamicPieChart = ({ predictions }) => {
  const chartRef = useRef();
  const [selectedMetric, setSelectedMetric] = useState("precipitation"); // Default to "Precipitation"

  // Helper function to aggregate data by day
  const aggregateByDay = (metric) => {
    const dayMap = {};

    // Group data by the "day" field
    predictions.forEach((prediction) => {
      const day = prediction.day;
      if (!dayMap[day]) {
        dayMap[day] = {
          count: 0,
          totalValue: 0,
        };
      }
      dayMap[day].count += 1;
      dayMap[day].totalValue += prediction.weather_data[metric];
    });

    // Calculate average for each day
    const aggregatedData = Object.entries(dayMap).map(([day, data]) => ({
      day: day,
      value: data.totalValue / data.count,
    }));

    // Check if all values are zero
    const allZero = aggregatedData.every(d => d.value === 0);

    if (allZero) {
      // If all values are zero, assign equal slices
      const equalValue = 1 / aggregatedData.length;
      return aggregatedData.map(d => ({
        day: d.day,
        value: equalValue, // Set equal value for each day
        displayValue: 0.0  // Show "0.0" as the display value
      }));
    }

    return aggregatedData.map(d => ({
      ...d,
      displayValue: d.value.toFixed(1), // Set display value with one decimal
    }));
  };

  useEffect(() => {
    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();

    // Prepare the data for the pie chart based on selected metric
    const data = aggregateByDay(selectedMetric);

    // Set up the chart dimensions (enlarged for better visibility)
    const width = 600;  // Increased width
    const height = Math.min(600, width / 1.2);  // Adjusted height
    const outerRadius = height / 2.2;
    const innerRadius = outerRadius * 0.6;  // Slightly larger inner radius for donut style

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.day)) // Create color based on the "day" field
      .range(['#FF9800', '#FF5722', '#03A9F4', '#4CAF50']); // Added a 4th color for the extra day

    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pie = d3.pie()
      .sort(null)
      .value((d) => d.value);

    // Draw the pie chart
    const path = svg.datum(data).selectAll("path")
      .data(pie)
      .join("path")
      .attr("fill", (d, i) => color(i))
      .attr("d", arc)
      .attr("stroke", "#121212") // Add stroke for better visibility on dark backgrounds
      .attr("stroke-width", 2);

    // Add labels to each pie slice (positioned to avoid overflowing)
    svg.selectAll('text')
    .data(pie(data))
    .join('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')  // White text for dark background
    .style('font-size', '18px')  // Adjusted font size
    .each(function(d) {
      const text = d3.select(this);
      
      // Add first line (day)
      text.append('tspan')
        .attr('x', 0)
        .attr('dy', '0.25em')
        .text(d.data.day);
  
      // Add second line (value)
      text.append('tspan')
        .attr('x', 0)
        .attr('dy', '1.2em')  // Adjust this to control vertical spacing
        .text(d.data.value.toFixed(1));
    });
  
  }, [selectedMetric, predictions]);

  // Radio button handler to update selected metric
  const handleMetricChange = (event) => {
    setSelectedMetric(event.target.value);
  };

  return (
    <div className="pie-chart-container text-center text-white">
      {/* Radio buttons for selecting the metric */}
      <div className="radio-buttons flex justify-center space-x-4">
        <label className="inline-flex items-center space-x-2">
          <input
            type="radio"
            value="precipitation"
            checked={selectedMetric === "precipitation"}
            onChange={handleMetricChange}
            className="form-radio text-orange-500 bg-slate-800 border-slate-700 focus:ring-orange-500"
          />
          <span className="text-sm">Precipitation</span>
        </label>
        <label className="inline-flex items-center space-x-2">
          <input
            type="radio"
            value="wind_speed"
            checked={selectedMetric === "wind_speed"}
            onChange={handleMetricChange}
            className="form-radio text-orange-500 bg-slate-800 border-slate-700 focus:ring-orange-500"
          />
          <span className="text-sm">Wind Speed</span>
        </label>
        <label className="inline-flex items-center space-x-2">
          <input
            type="radio"
            value="pressure"
            checked={selectedMetric === "pressure"}
            onChange={handleMetricChange}
            className="form-radio text-orange-500 bg-slate-800 border-slate-700 focus:ring-orange-500"
          />
          <span className="text-sm">Pressure</span>
        </label>
      </div>
      {/* Pie chart rendering */}
      <div ref={chartRef}></div>
    </div>
  );
};

export default DynamicPieChart;
