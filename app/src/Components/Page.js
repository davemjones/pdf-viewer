import React from "react";
import PDFViewer from "./PDFViewer";
import Controls from './Controls'
import "./page.css";

function Page() {
  return (
    <>
      <h1>PDFViewer</h1>
      <Controls />
      <div className="viewer-constraint">
        <PDFViewer url="./sample1.pdf" />
      </div>
    </>
  );
}

export default Page;
