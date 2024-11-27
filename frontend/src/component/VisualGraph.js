import React, { useEffect } from "react";
import * as d3 from "d3";

const VisualGraph = ({ data }) => {
  useEffect(() => {
    const svg = d3.select("#graph")
      .attr("width", 800)
      .attr("height", 600);

    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).distance(100).id((d) => d.id))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(400, 300));

    const link = svg.append("g")
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .style("stroke", "#aaa");

    const node = svg.append("g")
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", "#69b3a2")
      .call(d3.drag()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);
    });
  }, [data]);

  return <svg id="graph"></svg>;
};

export default VisualGraph;
