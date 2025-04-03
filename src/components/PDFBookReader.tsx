
import React, { useState } from 'react';
import { Upload, Bookmark, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PDFViewer from './PDFViewer';
import { useToast } from '@/components/ui/use-toast';

const PDFBookReader: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF document",
        });
        return;
      }
      
      // Create a URL for the file
      const fileUrl = URL.createObjectURL(file);
      setPdfUrl(fileUrl);
      setFileName(file.name);
      
      toast({
        title: "File uploaded",
        description: `${file.name} is ready to read`,
      });
    }
  };

  const handleSamplePDF = () => {
    // URL to a sample PDF
    const samplePdfUrl = 'https://www.africau.edu/images/default/sample.pdf';
    setPdfUrl(samplePdfUrl);
    setFileName('sample.pdf');
    toast({
      title: "Sample PDF loaded",
      description: "Now you can explore the book-like interface",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Book className="h-8 w-8 text-primary" />
          Bookish PDF Reader
        </h1>
        <p className="text-muted-foreground">View your PDFs with a beautiful book-like interface</p>
      </div>

      {!pdfUrl ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Upload your PDF</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-primary/40 rounded-lg bg-accent/30">
              <Upload className="h-12 w-12 text-primary mb-4" />
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Click to upload or drag and drop your PDF file here
              </p>
              <input
                type="file"
                id="pdf-upload"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="pdf-upload">
                <Button variant="default" className="cursor-pointer">
                  Select PDF File
                </Button>
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" onClick={handleSamplePDF}>
              <Book className="mr-2 h-4 w-4" />
              Load Sample PDF
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Bookmark className="h-5 w-5 mr-2 text-primary" />
              {fileName}
            </h2>
            <Button 
              variant="outline" 
              onClick={() => {
                setPdfUrl(null);
                setFileName('');
              }}
            >
              Upload Another PDF
            </Button>
          </div>
          <PDFViewer pdfUrl={pdfUrl} />
        </div>
      )}
    </div>
  );
};

export default PDFBookReader;
