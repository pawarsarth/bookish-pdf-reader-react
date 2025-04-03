
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookContent from './BookContent';

const BookReader: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [displayMode, setDisplayMode] = useState<'single' | 'double'>('double');
  
  const bookContent = [
    "Chapter 1\n\nIt was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    "We had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way – in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.",
    "There was a king with a large jaw and a queen with a plain face, on the throne of England; there were a king with a large jaw and a queen with a fair face, on the throne of France. In both countries it was clearer than crystal to the lords of the State preserves of loaves and fishes, that things in general were settled for ever.",
    "It was the year of Our Lord one thousand seven hundred and seventy-five. Spiritual revelations were conceded to England at that favoured period, as at this. Mrs. Southcott had recently attained her five-and-twentieth blessed birthday, of whom a prophetic private in the Life Guards had heralded the sublime appearance by announcing that arrangements were made for the swallowing up of London and Westminster.",
    "Even the Cock-lane ghost had been laid only a round dozen of years, after rapping out its messages, as the spirits of this very year last past (supernaturally deficient in originality) rapped out theirs. Mere messages in the earthly order of events had lately come to the English Crown and People, from a congress of British subjects in America.",
    "Chapter 2\n\nIt was the Dover road that lay, on a Friday night late in November, before the first of the persons with whom this history has business. The Dover road lay, as to him, beyond the Dover mail, as it lumbered up Shooter's Hill. He walked up hill in the mire by the side of the mail, as the rest of the passengers did; not because they had the least relish for walking exercise, under the circumstances, but because the hill, and the harness, and the mud, and the mail, were all so heavy.",
    "That time was the exact time when we were perhaps too ready to say that there was a wide palpable distance between the peoples of the earth—a distance that prohibited not trade, of course, nor industry, nor such matters that were connected with the purse, but prohibited affection, and trust, and chivalry, and love and whatever might be by nature attached to such concepts—all of the more intimate exchanges of human discourse.",
    "We were not technically at war, you understand. And yet the unavoidable feelings of hate and mistrust between the nations involved meant that innocent travelers might be started upon, or even detained, especially if they seemed in any way suspicious to the ordinary eye.",
    "This traveler seemed not suspicion but terrible. Terrible in his beauty, his poise, his impossible blue eyes. The sort of blue that is sometimes seen in flowers but seldom on earth otherwise and certainly not in the eyes of men.",
  ];
  
  const totalPages = bookContent.length;
  
  const nextPage = () => {
    if (displayMode === 'single') {
      if (currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      if (currentPage + 1 < totalPages - 1) {
        setCurrentPage(currentPage + 2);
      }
    }
  };
  
  const previousPage = () => {
    if (displayMode === 'single') {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    } else {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 2);
      }
    }
  };
  
  const toggleDisplayMode = () => {
    setDisplayMode(prevMode => prevMode === 'single' ? 'double' : 'single');
    setCurrentPage(currentPage - (currentPage % 2)); // Ensure even page number for double mode
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Book className="h-8 w-8 text-primary" />
          A Tale of Two Cities
        </h1>
        <p className="text-muted-foreground">by Charles Dickens</p>
      </div>
      
      <div className="w-full max-w-5xl mx-auto mb-6 flex justify-between items-center px-4">
        <Button variant="outline" onClick={() => setCurrentPage(0)}>
          First Page
        </Button>
        
        <Button variant="outline" onClick={toggleDisplayMode}>
          {displayMode === 'single' ? 'Double Pages' : 'Single Page'}
        </Button>
      </div>
      
      <div className="book-container mb-6">
        <BookContent 
          currentPage={currentPage} 
          content={bookContent} 
          displayMode={displayMode} 
          onNextPage={nextPage} 
        />
      </div>
      
      <div className="flex justify-between items-center w-full max-w-5xl mx-auto px-4">
        <Button 
          variant="outline" 
          onClick={previousPage} 
          disabled={displayMode === 'single' ? currentPage <= 0 : currentPage <= 1}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <span className="text-sm">
          Page {currentPage + 1}{displayMode === 'double' && currentPage > 0 ? `-${currentPage + 2}` : ''} of {totalPages}
        </span>
        
        <Button 
          variant="outline" 
          onClick={nextPage} 
          disabled={displayMode === 'single' ? currentPage >= totalPages - 1 : currentPage >= totalPages - 2}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BookReader;
