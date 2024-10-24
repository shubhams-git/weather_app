import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DifferenceLineChart = ({ predictions }) => {
  const chartRef = useRef();

  useEffect(() => {
    const containerWidth = chartRef.current.getBoundingClientRect().width; // Get container width dynamically
    const width = containerWidth * 0.99;
    const height = 275;
    const marginTop = 30;
    const marginRight = 50;
    const marginBottom = 30;
    const marginLeft = 50;
    const transitionDuration = 5000; // 3-second animation

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

    // Create the SVG container
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;');

    // Define a clip path to animate the line along the x-axis
    svg.append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", 0)  // Initially set width to 0 for the transition
      .attr("height", height)
      .transition()
      .duration(transitionDuration)
      .attr("width", width);  // Transition to full width over 3 seconds

    // Add x-axis
    const dateFormat = d3.timeFormat("%d/%m, %H hrs");
    svg.append('g')
      .attr('transform', `translate(0,${height - marginBottom-25})`)
      .call(d3.axisBottom(x).tickFormat(dateFormat))
      .selectAll('text')
      .attr('fill', 'white')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    svg.selectAll('.domain, .tick line')
      .attr('stroke', 'white');

    // Add y-axis
    svg.append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .selectAll('text')
      .attr('fill', 'white');

    svg.selectAll('.domain, .tick line')
      .attr('stroke', 'white');
    
    // Add y-axis label (Temperature in °C)
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -(height / 2))
      .attr('y', marginLeft - 35)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text('Temperature (in °C)');

    // Define the average temperature line
    const avgTemperature = d3.mean(data, d => d.avg_temperature);

    // Create the area for temperatures above the average with transitions
    svg.append('path')
      .datum(data)
      .attr('fill', 'lightblue')
      .attr('clip-path', 'url(#clip)')
      .attr('d', d3.area()
        .x(d => x(d.date))
        .y0(d => y(avgTemperature))
        .y1(d => y(Math.max(d.avg_temperature, avgTemperature)))
      );

    // Create the area for temperatures below the average with transitions
    svg.append('path')
      .datum(data)
      .attr('fill', 'orange')
      .attr('clip-path', 'url(#clip)')
      .attr('d', d3.area()
        .x(d => x(d.date))
        .y0(d => y(avgTemperature))
        .y1(d => y(Math.min(d.avg_temperature, avgTemperature)))
      );

    // Draw the line for avg_temperature with transition
    const linePath = svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.5)
      .attr('clip-path', 'url(#clip)')
      .attr('d', d3.line()
        .x(d => x(d.date))
        .y(d => y(d.avg_temperature))
      )
      .transition()
      .duration(transitionDuration)
      .ease(d3.easeLinear);

    // Wait for the transition to complete before adding text labels
    linePath.on('end', () => {
      data.forEach(d => {
        svg.append('text')
          .attr('x', x(d.date))
          .attr('y', y(d.avg_temperature) - 5)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text(d.avg_temperature.toFixed(1));  // Display temperature to one decimal
      });
    });

    // Add Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - marginRight - 200},${marginTop})`);

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

  return <div ref={chartRef} className="w-full lg:w-2/3 flex justify-center"></div>;
};

export default DifferenceLineChart;
