import React, { useState, useEffect } from "react";

const DotGrid = () => {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const container = document.querySelector(".red-container");
    if (!container) return;

    const handleResize = () => {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      const dotSize = 15; // Adjust size + gap
      const dotsPerRow = Math.floor(containerWidth / dotSize);
      const dotsPerCol = Math.floor(containerHeight / dotSize);
      const totalDots = dotsPerRow * dotsPerCol;

      const newDots = Array.from({ length: totalDots }, (_, i) => (
        <div key={i} className="dot"></div>
      ));

      setDots(newDots);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Initial call to set dots
    handleResize();

    return () => resizeObserver.disconnect();
  }, []);

  return <div className="dot-container">{dots}</div>;
};

export default DotGrid;