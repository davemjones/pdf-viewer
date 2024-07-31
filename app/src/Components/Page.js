import React from "react";
import PDFViewer from "./PDFViewer";
import Controls from './Controls'
import useResizeObserver from "./useResizeObserver";
import "./page.css";

function Page() {
  const [viewerRef, viewerSize] = useResizeObserver();
  
return (
    <>
      <h1>PDFViewer</h1>
      <Controls />
      <div className="viewer-container" ref={viewerRef}>
        <PDFViewer url="./sample1.pdf" size={viewerSize}/>
      </div>
    </>
  );
}

export default Page;
