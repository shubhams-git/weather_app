import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DifferenceLineChart = ({ predictions }) => {
  const chartRef = useRef();

  useEffect(() => {
    const containerWidth = chartRef.current.getBoundingClientRect().width; // Get container width dynamically
    const width = containerWidth * 0.8; // 80% of container width
    const height = 275;
    const marginTop = 30;
    const marginRight = 50;
    const marginBottom = 30;
    const marginLeft = 50;
    const transitionDuration = 1000; // Animation duration for smoother transitions

    // Clear any existing charts in the div
    d3.select(chartRef.current).selectAll('*').remove();

    // Parse the date into a Date object and extract avg_temperature
    const data = predictions.map((d) => ({
      date: new Date(d.datetime),  // Parsing ISO string into Date object
      avg_temperature: d.weather_data.avg_temperature
    }));

    // Set up scales for x (date/time) and y (temperature values)
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))  // Use extent to cover full date range
      .range([marginLeft, width - marginRight]);

    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.avg_temperature) - 5, d3.max(data, d => d.avg_temperature) + 5])
      .range([height - marginBottom, marginTop]);

    // Create the SVG container with Tailwind width class (w-4/5)
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;');

    // Format the x-axis to display "dd/mm, HH" format
    const dateFormat = d3.timeFormat("%d/%m, %H hrs");

    // Add x-axis
    svg.append('g')
      .attr('transform', `translate(0,${height - marginBottom-25})`)
      .call(d3.axisBottom(x).tickFormat(dateFormat))
      .selectAll('text')  // Select all the x-axis text labels
      .attr('fill', 'white')  // Make the x-axis text white
      .attr('transform', 'rotate(-45)')  // Rotate labels for better readability
      .style('text-anchor', 'end');  // Align text to the end

    // Add y-axis
    svg.append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .selectAll('text')
      .attr('fill', 'white');

    // Add y-axis label (Temperature in °C)
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -(height / 2))
      .attr('y', marginLeft - 35)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text('Temperature (in °C)');

    // Define area for above a baseline (using a simple threshold or average temperature)
    const avgTemperature = d3.mean(data, d => d.avg_temperature);

    // Create the area for temperatures above the average with transitions
    svg.append('path')
      .datum(data)
      .attr('fill', 'lightblue')
      .attr('d', d3.area()
        .x(d => x(d.date))
        .y0(d => y(avgTemperature))  // Use average temperature as the baseline
        .y1(d => y(Math.max(d.avg_temperature, avgTemperature)))  // Area for values above the baseline
      )
      .transition()
      .duration(transitionDuration)
      .ease(d3.easeLinear); // Smooth transition

    // Create the area for temperatures below the average with transitions
    svg.append('path')
      .datum(data)
      .attr('fill', 'orange')
      .attr('d', d3.area()
        .x(d => x(d.date))
        .y0(d => y(avgTemperature))  // Use average temperature as the baseline
        .y1(d => y(Math.min(d.avg_temperature, avgTemperature)))  // Area for values below the baseline
      )
      .transition()
      .duration(transitionDuration)
      .ease(d3.easeLinear); // Smooth transition

    // Draw the line for avg_temperature with transition
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(d => x(d.date))
        .y(d => y(d.avg_temperature))
      )
      .transition()
      .duration(transitionDuration)
      .ease(d3.easeLinear); // Smooth transition for the line

    // Optionally, label the points with temperature values
    data.forEach(d => {
      svg.append('text')
        .attr('x', x(d.date))
        .attr('y', y(d.avg_temperature) - 5)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .text(d.avg_temperature.toFixed(1))  // Display temperature to one decimal
        .transition()
        .duration(transitionDuration)
        .ease(d3.easeLinear);  // Transition for labels as well
    });

    // Add Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - marginRight - 200},${marginTop})`); // Positioning the legend in the top right

    // Legend for the blue area (above average)
    legend.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', 'lightblue');
    
    legend.append('text')
      .attr('x', 20)
      .attr('y', 10)
      .attr('fill', 'white')
      .text('Above Average Temperature');

    // Legend for the orange area (below average)
    legend.append('rect')
      .attr('x', 0)
      .attr('y', 20)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', 'orange');
    
    legend.append('text')
      .attr('x', 20)
      .attr('y', 30)
      .attr('fill', 'white')
      .text('Below Average Temperature');

    // Legend for the black line (actual temperature)
    legend.append('rect')
      .attr('x', 0)
      .attr('y', 40)
      .attr('width', 10)
      .attr('height', 2)
      .attr('fill', 'white');
    
    legend.append('text')
      .attr('x', 20)
      .attr('y', 45)
      .attr('fill', 'white')
      .text('Average Temperature Line');

  }, [predictions]);

  return <div ref={chartRef} className="w-full flex justify-center"></div>; // Tailwind class for centering
};

export default DifferenceLineChart;
