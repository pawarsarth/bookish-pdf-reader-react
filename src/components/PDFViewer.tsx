
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Loader2, ZoomIn, ZoomOut, Bookmark, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';

// Set up the pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(1);
  const [displayMode, setDisplayMode] = useState<'single' | 'double'>('double');
  const { toast } = useToast();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    toast({
      title: "PDF Loaded Successfully",
      description: `This document has ${numPages} pages`,
    });
  };

  const nextPage = () => {
    if (displayMode === 'single') {
      if (pageNumber < (numPages || 0)) {
        setPageNumber(pageNumber + 1);
      }
    } else {
      if (pageNumber + 1 < (numPages || 0)) {
        setPageNumber(pageNumber + 2);
      }
    }
  };

  const previousPage = () => {
    if (displayMode === 'single') {
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
      }
    } else {
      if (pageNumber > 2) {
        setPageNumber(pageNumber - 2);
      }
    }
  };

  const zoomIn = () => {
    if (scale < 2.0) {
      setScale(prevScale => prevScale + 0.1);
    }
  };

  const zoomOut = () => {
    if (scale > 0.5) {
      setScale(prevScale => prevScale - 0.1);
    }
  };

  const toggleDisplayMode = () => {
    setDisplayMode(prevMode => prevMode === 'single' ? 'double' : 'single');
    // Reset to first page when toggling display mode
    setPageNumber(1);
  };

  // Custom error handling for PDF loading
  const onDocumentLoadError = (error: Error) => {
    setLoading(false);
    toast({
      variant: "destructive",
      title: "Failed to load PDF",
      description: "Please check the URL or try again later.",
    });
    console.error("PDF load error:", error);
  };

  return (
    <div className="flex flex-col items-center w-full pb-8">
      <div className="w-full max-w-5xl mb-6 flex justify-between items-center px-4">
        <Button variant="outline" onClick={() => setPageNumber(1)}>
          <Home className="mr-2 h-4 w-4" />
          First Page
        </Button>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={zoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm w-16 text-center">{Math.round(scale * 100)}%</span>
          <Button variant="outline" size="icon" onClick={zoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
        
        <Button variant="outline" onClick={toggleDisplayMode}>
          {displayMode === 'single' ? 'Double Pages' : 'Single Page'}
        </Button>
      </div>

      <div className="book-container mb-6" style={{ height: `${650 * scale}px` }}>
        {loading ? (
          <div className="book-loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <div className="book">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="book-loading">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              }
            >
              <div className="flex">
                {displayMode === 'double' ? (
                  <>
                    <div className="relative left-page page shadow-lg rounded-l-lg">
                      <div className="page-content">
                        {pageNumber > 1 && (
                          <Page 
                            pageNumber={pageNumber - 1} 
                            scale={scale} 
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                          />
                        )}
                        <div className="page-number">{pageNumber > 1 ? pageNumber - 1 : ''}</div>
                      </div>
                    </div>
                    <div className="relative right-page page shadow-lg rounded-r-lg">
                      <div className="page-content">
                        <Page 
                          pageNumber={pageNumber} 
                          scale={scale} 
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                        <div className="page-corner" onClick={nextPage}></div>
                        <div className="page-number">{pageNumber}</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="relative page shadow-lg rounded-lg">
                    <div className="page-content">
                      <Page 
                        pageNumber={pageNumber} 
                        scale={scale} 
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                      <div className="page-corner" onClick={nextPage}></div>
                      <div className="page-number">{pageNumber}</div>
                    </div>
                  </div>
                )}
              </div>
            </Document>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center w-full max-w-5xl px-4">
        <Button 
          variant="outline" 
          onClick={previousPage} 
          disabled={displayMode === 'single' ? pageNumber <= 1 : pageNumber <= 2}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm whitespace-nowrap">
            Page {pageNumber}{displayMode === 'double' && pageNumber > 1 ? `-${pageNumber - 1}` : ''} of {numPages}
          </span>
          <div className="w-48 hidden sm:block">
            <Slider 
              value={[pageNumber]} 
              min={1} 
              max={numPages || 1} 
              step={1}
              onValueChange={(value) => setPageNumber(value[0])}
            />
          </div>
        </div>
        
        <Button 
          variant="outline" 
          onClick={nextPage} 
          disabled={displayMode === 'single' ? pageNumber >= (numPages || 0) : pageNumber >= (numPages || 0) - 1}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PDFViewer;
