import React, { useEffect, useRef } from "react";
import { throttle } from "lodash";
import * as pdfjs from "pdfjs-dist/webpack.mjs";
import "./pdf-viewer.css";

/**
 * This component wraps the PDFJS library in a react component. The PDFJS library
 * is VERY sensitive to rerendering.  The library must completely render the PDF internall
 * BEFORE attempting a re-render.  The useMemo, isLoading, and throttle features assist in
 * ensuring the all pdf rendering tasks have completed before re-rendering.
 * @param {string} url - path to pdf to render
 *
 * @returns {JSX.Element}
 */
const PDFViewer = ({ url }) => {
  const canvasRef = useRef(null);
  const renderTask = useRef(null);
  const isLoading = useRef(false);

  const renderCanvas = async (url) => {
    if (!isLoading.current) {
      isLoading.current = true;

      if (renderTask.current) {
        await renderTask.current.cancel();
        renderTask.current = null;
      }

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

        let renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        renderTask.current = page.render(renderContext);
        renderTask.current.promise.then(
          () => {
            isLoading.current = false;
          },
          (error) => {
            console.log("in rejected with error: " + error);
          }
        );
      } catch (error) {
        console.error("Error loading PDF: " + error);
      } finally {
        renderTask.current = null;
      }
    }
  };

  const throttleRenderCanvas = throttle(
    () => {
      renderCanvas(url);
    },
    500,
    { trailing: true }
  );

  useEffect(() => {
    throttleRenderCanvas(url);
  }, [url, throttleRenderCanvas]);

  return (
    <div className="pdf-viewer">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default React.memo(PDFViewer);
