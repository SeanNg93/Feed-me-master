import React, { useEffect, useRef, useState } from 'react';
import {
  select,
  selectAll,
  zoom as d3Zoom,
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  drag as d3Drag
} from 'd3';
import { GraphData, Node, Link } from '../types';

interface KnowledgeGraphProps {
  data: GraphData | null;
  onNodeClick: (node: Node) => void;
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ data, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Handle Resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Render Graph
  useEffect(() => {
    if (!data || !svgRef.current || dimensions.width === 0) return;

    // Clear previous
    select(svgRef.current).selectAll("*").remove();

    const width = dimensions.width;
    const height = dimensions.height;

    // Create a deep copy of data to avoid mutation issues with React strict mode
    const nodes: any[] = data.nodes.map(d => ({ ...d }));
    const links: any[] = data.links.map(d => ({ ...d }));

    const svg = select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    // Group for zoom interactions
    const g = svg.append("g");

    const zoomBehavior = d3Zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoomBehavior);

    // Simulation setup
    const simulation = forceSimulation(nodes)
      .force("link", forceLink(links).id((d: any) => d.id).distance(150))
      .force("charge", forceManyBody().strength(-400))
      .force("center", forceCenter(width / 2, height / 2))
      .force("collide", forceCollide().radius(40));

    // Links
    const link = g.append("g")
      .attr("stroke", "#4b5563")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5);

    // Node Group
    const nodeGroup = g.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("cursor", "pointer")
      .call(d3Drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      )
      .on("click", (event, d) => {
        onNodeClick(d as Node);
        // Highlight effect
        selectAll("circle").attr("stroke", "#fff").attr("stroke-width", 1.5);
        select(event.currentTarget).select("circle")
          .attr("stroke", "#6366f1")
          .attr("stroke-width", 3);
      });

    // Node Circles
    nodeGroup.append("circle")
      .attr("r", (d: any) => d.type === 'root' ? 25 : d.type === 'category' ? 18 : 12)
      .attr("fill", (d: any) => {
        if (d.type === 'root') return "#6366f1"; // Indigo
        if (d.type === 'category') return "#a855f7"; // Purple
        return "#18181b"; // Surface
      })
      .attr("stroke", (d: any) => d.type === 'concept' ? "#a855f7" : "#fff")
      .attr("stroke-width", (d: any) => d.type === 'concept' ? 2 : 1.5);

    // Labels
    nodeGroup.append("text")
      .text((d: any) => d.label)
      .attr("x", 0)
      .attr("y", (d: any) => d.type === 'root' ? 38 : d.type === 'category' ? 30 : 24)
      .attr("text-anchor", "middle")
      .attr("fill", "#e4e4e7")
      .attr("font-size", (d: any) => d.type === 'root' ? "14px" : "12px")
      .attr("font-weight", (d: any) => d.type === 'root' ? "bold" : "normal")
      .style("pointer-events", "none")
      .style("text-shadow", "0px 2px 4px rgba(0,0,0,0.8)");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodeGroup
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Cleanup
    return () => {
      simulation.stop();
    };

  }, [data, dimensions, onNodeClick]);

  if (!data) {
    return (
      <div className="w-full h-full flex items-center justify-center text-zinc-500 animate-pulse">
        <p>Waiting for knowledge initialization...</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black">
      <svg ref={svgRef} className="w-full h-full block"></svg>
    </div>
  );
};

export default KnowledgeGraph;