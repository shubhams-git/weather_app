import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PredictedTempChart = ({ predictions }) => {
  const chartRef = useRef();

  useEffect(() => {
    // Clear any existing charts in the div
    d3.select(chartRef.current).selectAll('*').remove();

    // Set dimensions and margins for the chart
    const width = 800;
    const height = 275;
    const marginTop = 30;
    const marginRight = 50;
    const marginBottom = 30;
    const marginLeft = 50;

    // Parse the date into a Date object in the data mapping
    const data = predictions.map((d) => ({
      date: new Date(d.datetime),  // Parsing ISO string into Date object
      t_max: d.t_max_prediction,
      t_min: d.t_min_prediction
    }));

    // Set up scales for x (days) and y (temperature values)
    const x = d3.scaleBand()
      .domain(data.map(d => d.date))
      .range([marginLeft, width - marginRight])
      .padding(0.1);

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

    // Get unique dates (only the first occurrence of each day)
    const uniqueDates = data
      .filter((d, i, arr) => i === 0 || dateFormat(d.date) !== dateFormat(arr[i - 1].date))
      .map(d => d.date);

    // Add x-axis with white color and only display unique dates
    svg.append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickValues(uniqueDates).tickFormat(d => dateFormat(d)))
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

    // Draw the line for t_max_prediction
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color('t_max'))
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(d => x(d.date) + x.bandwidth() / 2)
        .y(d => y(d.t_max))
      );

    // Draw the line for t_min_prediction
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color('t_min'))
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(d => x(d.date) + x.bandwidth() / 2)
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
    .attr('transform', `translate(${width - marginRight - 180}, ${marginTop-15})`);  // Position the legend

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


    // Append labels for each point in t_max and t_min
    data.forEach(d => {
      svg.append('text')
        .attr('x', x(d.date) + x.bandwidth() / 2)
        .attr('y', y(d.t_max) - 5)
        .attr('fill', color('t_max'))
        .attr('text-anchor', 'middle')
        .text(d.t_max);

      svg.append('text')
        .attr('x', x(d.date) + x.bandwidth() / 2)
        .attr('y', y(d.t_min) + 15)
        .attr('fill', color('t_min'))
        .attr('text-anchor', 'middle')
        .text(d.t_min);
    });

  }, [predictions]);

  return <div ref={chartRef}></div>;
};

export default PredictedTempChart;
