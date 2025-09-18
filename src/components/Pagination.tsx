import React from 'react';
import useRaceStore from '../store/raceStore';

// Pagination component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const { paginationState, setPaginationState } = useRaceStore();

  const handlePrevious = () => {
    if (paginationState.currentPage > 1) {
      const newPage = paginationState.currentPage - 1;
      setPaginationState({ currentPage: newPage });
      onPageChange(newPage);
    }
  };

  const handleNext = () => {
    if (paginationState.currentPage < totalPages) {
      const newPage = paginationState.currentPage + 1;
      setPaginationState({ currentPage: newPage });
      onPageChange(newPage);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={paginationState.currentPage === 1}>
        Previous
      </button>
      <span>
        Page {paginationState.currentPage} of {totalPages}
      </span>
      <button onClick={handleNext} disabled={paginationState.currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;