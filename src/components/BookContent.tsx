
import React from 'react';

interface BookContentProps {
  currentPage: number;
  content: string[];
  isAnimating?: boolean;
  direction?: 'next' | 'prev' | 'none';
  onNextPage: () => void;
}

const BookContent: React.FC<BookContentProps> = ({ 
  currentPage, 
  content, 
  isAnimating = false,
  direction = 'none',
  onNextPage 
}) => {
  return (
    <div className="book">
      <div className="flex justify-center">
        <div 
          className={`relative page shadow-lg rounded-lg ${isAnimating ? 'turn-animation' : ''}`}
          style={{ 
            transformOrigin: direction === 'next' ? 'left center' : 'right center',
            zIndex: isAnimating ? 2 : 1
          }}
        >
          <div className="page-content">
            <div className="whitespace-pre-line">{content[currentPage]}</div>
            <div className="page-corner" onClick={onNextPage}></div>
            <div className="page-number">{currentPage + 1}</div>
          </div>
        </div>
        {isAnimating && (
          <div 
            className="absolute page shadow-lg rounded-lg"
            style={{ 
              zIndex: 1
            }}
          >
            <div className="page-content">
              <div className="whitespace-pre-line">
                {direction === 'next' && currentPage < content.length - 1 ? 
                  content[currentPage + 1] : 
                  direction === 'prev' && currentPage > 0 ? 
                    content[currentPage - 1] : ''
                }
              </div>
              <div className="page-number">
                {direction === 'next' && currentPage < content.length - 1 ? 
                  currentPage + 2 : 
                  direction === 'prev' && currentPage > 0 ? 
                    currentPage : ''
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookContent;
