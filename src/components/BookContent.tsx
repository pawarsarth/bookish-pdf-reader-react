
import React from 'react';

interface BookContentProps {
  currentPage: number;
  content: string[];
  displayMode: 'single' | 'double';
  onNextPage: () => void;
}

const BookContent: React.FC<BookContentProps> = ({ 
  currentPage, 
  content, 
  displayMode, 
  onNextPage 
}) => {
  return (
    <div className="book">
      <div className="flex">
        {displayMode === 'double' ? (
          <>
            <div className="relative left-page page shadow-lg rounded-l-lg">
              <div className="page-content">
                {currentPage > 0 && (
                  <div className="whitespace-pre-line">{content[currentPage - 1]}</div>
                )}
                <div className="page-number">{currentPage > 0 ? currentPage : ''}</div>
              </div>
            </div>
            <div className="relative right-page page shadow-lg rounded-r-lg">
              <div className="page-content">
                <div className="whitespace-pre-line">{content[currentPage]}</div>
                <div className="page-corner" onClick={onNextPage}></div>
                <div className="page-number">{currentPage + 1}</div>
              </div>
            </div>
          </>
        ) : (
          <div className="relative page shadow-lg rounded-lg">
            <div className="page-content">
              <div className="whitespace-pre-line">{content[currentPage]}</div>
              <div className="page-corner" onClick={onNextPage}></div>
              <div className="page-number">{currentPage + 1}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookContent;
