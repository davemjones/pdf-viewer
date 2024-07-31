import React from 'react';
import PDFViewer from './PDFViewer';

function Page() {
    return (
        <div>
            <h1>PDFViewer</h1>
            <PDFViewer url="./sample1.pdf" />
        </div>

    )
}

export default Page;