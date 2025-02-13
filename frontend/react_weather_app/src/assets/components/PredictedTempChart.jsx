import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const PredictedTempChart = ({ predictions }) => {
  const chartRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 275 });

  // Function to update the chart size on window resize
  const updateDimensions = () => {
    if (chartRef.current) {
      const width = chartRef.current.clientWidth || 800; // Fall back to default if no clientWidth
      const height = Math.min(275, width / 3); // Keep height proportional to the width
      setDimensions({ width, height });
    }
  };

  useEffect(() => {
    // Call updateDimensions on mount and when window resizes
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions); // Clean up event listener
  }, []);

  useEffect(() => {
    // Clear any existing charts in the div
    d3.select(chartRef.current).selectAll('*').remove();

    const { width, height } = dimensions; // Use dynamic width and height
    const marginTop = 30;
    const marginRight = 50;
    const marginBottom = 30;
    const marginLeft = 50;
    const transitionDuration = 3000; // 3-second animation

    // Parse the date into a Date object in the data mapping
    const data = predictions.map((d) => ({
      date: new Date(d.datetime),  // Parsing ISO string into Date object
      t_max: d.t_max_prediction,
      t_min: d.t_min_prediction
    }));

    // Set up scales for x (time scale) and y (temperature values)
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))  // x-axis range from the earliest to the latest date
      .range([marginLeft, width - marginRight]);

    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.t_min) - 5, d3.max(data, d => d.t_max) + 5])
      .range([height - marginBottom, marginTop]);

    // Set up color scale for curves (one for t_max and one for t_min)
    const color = d3.scaleOrdinal()
      .domain(['t_max', 't_min'])
      .range(['#ff6347', '#1e90ff']); // Colors for max and min lines

    // Create the SVG container
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', ' max-width: 100%; height: auto; font: 10px sans-serif;');

    // Add a background color to the chart
    svg.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'none');

    // Format the x-axis to display only the "dd/mm" part of the date
    const dateFormat = d3.timeFormat("%d/%m");

    // Add x-axis with white color
    svg.append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickFormat(d => dateFormat(d)))
      .selectAll('text') // Select all the x-axis text labels
      .attr('fill', 'white'); // Make the x-axis text white

    svg.selectAll('.domain, .tick line') // Select axis lines
      .attr('stroke', 'white'); // Make axis lines white

    // Add y-axis with white color
    svg.append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .selectAll('text') // Select all the y-axis text labels
      .attr('fill', 'white'); // Make the y-axis text white

    svg.selectAll('.domain, .tick line') // Select axis lines
      .attr('stroke', 'white'); // Make axis lines white

    // Define a clip path to animate the line along the x-axis
    svg.append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", 0)  // Initially set width to 0 for the transition
      .attr("height", height)
      .transition()
      .duration(transitionDuration)
      .attr("width", width);  // Transition to full width over 3 seconds

    // Draw the line for t_max_prediction
    const maxLine = svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color('t_max'))
      .attr('stroke-width', 1.5)
      .attr('clip-path', 'url(#clip)')
      .attr('d', d3.line()
        .x(d => x(d.date))
        .y(d => y(d.t_max))
      );

    // Draw the line for t_min_prediction
    const minLine = svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color('t_min'))
      .attr('stroke-width', 1.5)
      .attr('clip-path', 'url(#clip)')
      .attr('d', d3.line()
        .x(d => x(d.date))
        .y(d => y(d.t_min))
      );

    // Add y-axis label (Temperature in °C)
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -(height / 2))
      .attr('y', marginLeft - 35)  // Adjust to position next to the y-axis
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')  // Color for the text
      .text('Temperature (in °C)');

    // Add a legend for Min Temp and Max Temp
    const legend = svg.append('g')
      .attr('transform', `translate(${width - marginRight - 180}, ${marginTop-30})`);  // Position the legend

    // Legend for Max Temp
    legend.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', color('t_max'));

    legend.append('text')
      .attr('x', 20)
      .attr('y', 10)
      .attr('fill', 'white')
      .text('Predicted Max. Temperature');

    // Legend for Min Temp
    legend.append('rect')
      .attr('x', 0)
      .attr('y', 20)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', color('t_min'));

    legend.append('text')
      .attr('x', 20)
      .attr('y', 30)
      .attr('fill', 'white')
      .text('Predicted Min. Temperature');

    // Wait for the transition to complete before adding text labels
    maxLine.transition()
    .duration(transitionDuration)
    .on('end', () => {
      data.forEach((d, i) => {
        if (i % 2 === 1) { // Only label every alternate point
          svg.append('text')
            .attr('x', x(d.date))
            .attr('y', y(d.t_max) - 5)
            .attr('fill', color('t_max'))
            .attr('text-anchor', 'middle')
            .text(d.t_max);
        }
      });
    });

    minLine.transition()
    .duration(transitionDuration)
    .on('end', () => {
      data.forEach((d, i) => {
        if (i % 2 === 1) { // Only label every alternate point
          svg.append('text')
            .attr('x', x(d.date))
            .attr('y', y(d.t_min) + 15)
            .attr('fill', color('t_min'))
            .attr('text-anchor', 'middle')
            .text(d.t_min);
        }
      });
    });


  }, [predictions, dimensions]);

  return <div ref={chartRef} className='w-full lg:w-2/3 inline-flex items-end'></div>;
};

export default PredictedTempChart;
