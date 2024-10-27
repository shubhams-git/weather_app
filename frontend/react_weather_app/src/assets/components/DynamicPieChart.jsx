import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DynamicPieChart = ({ predictions }) => {
  const chartRef = useRef();
  const [selectedMetric, setSelectedMetric] = useState("precipitation"); // Default to "Precipitation"

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
      const equalValue = 1 / 4;
      return Array(4).fill().map((_, index) => ({
        day: `Day ${index + 1}`,
        value: equalValue,
        displayValue: 0.0,
      }));
    }
  
    return aggregatedData.map(d => ({
      ...d,
      displayValue: d.value.toFixed(1),
    }));
  };

  useEffect(() => {
    d3.select(chartRef.current).selectAll('*').remove();
    const data = aggregateByDay(selectedMetric);
  
    const width = 600;
    const height = Math.min(600, width / 1.2);
    const outerRadius = height / 2.2;
    const innerRadius = outerRadius * 0.6;
  
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.day))
      .range(['#FF9800', '#FF5722', '#03A9F4', '#4CAF50']);
  
    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("viewBox", [-width / 2, -height / 2, width, height]);
  
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
  
    const pie = d3.pie()
      .sort(null)
      .value((d) => d.value || 1);
  
    svg.datum(data).selectAll("path")
      .data(pie)
      .join("path")
      .attr("fill", (d, i) => color(i))
      .attr("stroke", "#121212")
      .attr("stroke-width", 2)
      .transition()
      .duration(1500)
      .attrTween("d", function(d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function(t) {
          return arc(interpolate(t));
        };
      });
  
    setTimeout(() => {
      svg.selectAll('text')
        .data(pie(data))
        .join('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .style('font-size', '18px')
        .each(function(d) {
          const text = d3.select(this);
          
          text.append('tspan')
            .attr('x', 0)
            .attr('dy', '0.25em')
            .text(d.data.day);
      
          text.append('tspan')
            .attr('x', 0)
            .attr('dy', '1.2em')
            .text(d.data.value.toFixed(1));
        });
    }, 1500);
  
  }, [selectedMetric, predictions]);
  
  const handleMetricChange = (event) => {
    setSelectedMetric(event.target.value);
  };

  return (
    <div className="pie-chart-container text-center text-white w-full lg:w-3/4 mx-auto p-4">
      <div className="radio-buttons flex flex-wrap justify-center space-x-4 lg:space-x-6 my-4">
        {["precipitation", "wind_speed", "pressure"].map((metric) => (
          <label key={metric} className="inline-flex items-center space-x-2 hover:text-orange-500 transition duration-300 ease-in-out">
            <input
              type="radio"
              value={metric}
              checked={selectedMetric === metric}
              onChange={handleMetricChange}
              className="form-radio text-orange-500 bg-slate-800 border-slate-700"
            />
            <span className="text-sm md:text-base lg:text-lg font-medium capitalize">{metric.replace('_', ' ')}</span>
          </label>
        ))}
      </div>
      <div ref={chartRef} className="w-full h-full"></div>
    </div>
  );
};

export default DynamicPieChart;
