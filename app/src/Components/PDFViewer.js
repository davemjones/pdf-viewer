import React, { useEffect, useRef, useState } from "react";
import { throttle } from "lodash";
import * as pdfjs from "pdfjs-dist/webpack.mjs";

const PDFViewer = ({ url }) => {
  const canvasRef = useRef(null);
  const renderTask = useRef(null);

  const renderCanvas = async (url) => {
    if (renderTask.current) {
      renderTask.current.cancel();
      renderTask.current = null;
    }
    console.log(renderTask.current);
    try {
      const loadingTask = pdfjs.getDocument(url);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      renderTask.current = page.render(renderContext);
    } catch (error) {
      console.error("Error loading PDF");
    } finally {
      renderTask.current = null;
    }
  };

  const throttleRenderCanvas = throttle(renderCanvas, 500);
  useEffect(() => {
    console.log("effect called");
    throttleRenderCanvas(url);
  }, [throttleRenderCanvas, url]);

  return <canvas ref={canvasRef}></canvas>;
};

export default PDFViewer;
