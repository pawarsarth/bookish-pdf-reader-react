
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Button } from './ui/button';
import BookContent from './BookContent';
import ThemeToggle from './ThemeToggle';
import { toast } from '@/hooks/use-toast';

const BookReader: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [content, setContent] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev' | 'none'>('none');
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Default is dark theme (blue-black)

  useEffect(() => {
    // Sample book content - you can replace this with your own content
    const sampleContent = [
      `# BYTESTREAM

Computer Science and Engineering

Welcome to the digital edition of BYTESTREAM, the official journal of the Computer Science Department at Mandsaur University.

This edition explores the cutting-edge developments in computer science and engineering, featuring research articles, student projects, and faculty insights.`,
      
      `## Introduction to the Edition

In this digital age, the field of computer science continues to evolve at an unprecedented pace. From artificial intelligence to quantum computing, innovations emerge daily that reshape our technological landscape.

The BYTESTREAM journal aims to capture these developments and provide a platform for students and faculty to showcase their research and ideas.`,
      
      `## Featured Article: Machine Learning Applications

Machine Learning has transformed how we approach complex problems. This article explores recent applications in:

1. Healthcare diagnostics
2. Financial forecasting
3. Environmental monitoring
4. Educational technology

Each area demonstrates the versatility and power of algorithmic learning.`,
      
      `## Student Innovations

This section highlights extraordinary projects developed by our students:

- Smart Campus Initiative: IoT-based campus management system
- AlgoViz: Algorithm visualization platform for educational purposes
- EcoTrack: Environmental monitoring application using distributed sensors
- SecurityPlus: Advanced encryption techniques for mobile applications`,
      
      `## Faculty Research Spotlight

Our distinguished faculty members are leading research in:

- Quantum Computing
- Cybersecurity
- Data Science
- Human-Computer Interaction

Their work continues to push the boundaries of what's possible in computer science.`,
      
      `## Upcoming Events

- Annual Hackathon: May 15-17, 2025
- Tech Conference: June 10, 2025
- Summer Code Camp: July 5-20, 2025

Join us for these exciting opportunities to learn, collaborate, and innovate!`,
      
      `## Career Resources

The department offers various resources to help students prepare for their careers:

- Resume workshops
- Technical interview preparation
- Industry mentorship program
- Internship opportunities

Visit the department website for more information.`,
      
      `## Contact Information

Department of Computer Science
Mandsaur University
Email: cs@mandsauruniversity.edu
Phone: +91-123-456-7890
Website: www.mandsauruniversity.edu/cs

Thank you for reading BYTESTREAM!`
    ];
    
    setContent(sampleContent);
  }, []);

  // Apply theme class to document body
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const handlePreviousPage = () => {
    if (currentPage > 0 && !isAnimating) {
      setDirection('prev');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsAnimating(false);
      }, 600); // Half the animation duration
    }
  };

  const handleNextPage = () => {
    if (currentPage < content.length - 1 && !isAnimating) {
      setDirection('next');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsAnimating(false);
      }, 600); // Half the animation duration
    }
  };

  const handleDownload = () => {
    // Create a text blob from the content
    const blob = new Blob([content.join('\n\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'BYTESTREAM_Journal.txt';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: "Your journal is being downloaded.",
    });
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    toast({
      title: `Theme Changed`,
      description: `Switched to ${!isDarkTheme ? 'dark' : 'light'} theme.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-background text-foreground">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <img 
            src="/lovable-uploads/7563b92e-f269-47d5-811f-abeb6ed420a1.png" 
            alt="BYTESTREAM Logo" 
            className="h-16 md:h-24" 
          />
        </div>
        <p className="text-muted-foreground">Computer Science and Engineering Journal</p>
      </div>

      <div className="flex justify-end mb-4">
        <ThemeToggle isDark={isDarkTheme} onToggle={toggleTheme} />
      </div>

      <div className="book-container mb-6">
        <BookContent 
          currentPage={currentPage} 
          content={content} 
          isAnimating={isAnimating}
          direction={direction}
          onNextPage={handleNextPage}
        />
      </div>

      <div className="flex justify-between items-center max-w-2xl mx-auto mt-8">
        <Button 
          variant="outline" 
          onClick={handlePreviousPage} 
          disabled={currentPage <= 0 || isAnimating}
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <div className="text-sm">
          Page {currentPage + 1} of {content.length}
        </div>
        
        <Button 
          variant="outline" 
          onClick={handleNextPage} 
          disabled={currentPage >= content.length - 1 || isAnimating}
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex justify-center mt-6">
        <Button 
          onClick={handleDownload}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Journal
        </Button>
      </div>
    </div>
  );
};

export default BookReader;
