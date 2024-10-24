import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DynamicPieChart = ({ predictions }) => {
  const chartRef = useRef();
  const [selectedMetric, setSelectedMetric] = useState("precipitation"); // Default to "Precipitation"

  // Helper function to aggregate data by day
  const aggregateByDay = (metric) => {
    const dayMap = {};
  
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
  
    const aggregatedData = Object.entries(dayMap).map(([day, data]) => ({
      day: day,
      value: data.totalValue / data.count,
    }));
  
    const allZero = aggregatedData.every(d => d.value === 0);
  
    if (allZero) {
      // Assign equal slices and avoid collapse
      const equalValue = 1 / 4; // Always 4 equal parts
      return Array(4).fill().map((_, index) => ({
        day: `Day ${index + 1}`,
        value: equalValue,
        displayValue: 0.0, // Display "0.0"
      }));
    }
  
    return aggregatedData.map(d => ({
      ...d,
      displayValue: d.value.toFixed(1),
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
      .value((d) => d.value || 1); // Ensure each slice has a non-zero value
  
  
    // Draw the pie chart with a transition
    const path = svg.datum(data).selectAll("path")
      .data(pie)
      .join("path")
      .attr("fill", (d, i) => color(i))
      .attr("stroke", "#121212") // Add stroke for better visibility on dark backgrounds
      .attr("stroke-width", 2)
      .transition() // Add transition
      .duration(1500) // Transition lasts 1.5 seconds
      .attrTween("d", function(d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function(t) {
          return arc(interpolate(t));
        };
      });
  
    // Delay adding labels until the transition is over
    setTimeout(() => {
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
    }, 1500); // Set the delay to match the transition duration (1.5 seconds)
  
  }, [selectedMetric, predictions]);
  
  
  // Radio button handler to update selected metric
  const handleMetricChange = (event) => {
    setSelectedMetric(event.target.value);
  };

  return (
    <div className="pie-chart-container text-center text-white">
      {/* Radio buttons for selecting the metric */}
      <div className="radio-buttons flex justify-center space-x-6">
        <label className="inline-flex items-center space-x-2 hover:text-orange-500 transition duration-300 ease-in-out">
          <input
            type="radio"
            value="precipitation"
            checked={selectedMetric === "precipitation"}
            onChange={handleMetricChange}
            className="form-radio text-orange-500 bg-slate-800 border-slate-700"
          />
          <span className="text-base font-medium">Precipitation</span>
        </label>
        <label className="inline-flex items-center space-x-2 hover:text-orange-500 transition duration-300 ease-in-out">
          <input
            type="radio"
            value="wind_speed"
            checked={selectedMetric === "wind_speed"}
            onChange={handleMetricChange}
            className="form-radio text-orange-500 bg-slate-800 border-slate-700"
          />
          <span className="text-base font-medium">Wind Speed</span>
        </label>
        <label className="inline-flex items-center space-x-2 hover:text-orange-500 transition duration-300 ease-in-out">
          <input
            type="radio"
            value="pressure"
            checked={selectedMetric === "pressure"}
            onChange={handleMetricChange}
            className="form-radio text-orange-500 bg-slate-800 border-slate-700"
          />
          <span className="text-base font-medium">Pressure</span>
        </label>
      </div>
      {/* Pie chart rendering */}
      <div ref={chartRef}></div>
    </div>
  );
};

export default DynamicPieChart;
