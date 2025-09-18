import React, { useState, useEffect } from 'react';
import { getWinners } from '../api/winners';

const WinnersTable = () => {
  const [winners, setWinners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState('wins');
  const [sortOrder, setSortOrder] = useState('ASC');

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const data = await getWinners(currentPage, 10, sortField, sortOrder);
        setWinners(data);
        setTotalPages(Math.ceil(data.length / 10));
      } catch (error) {
        console.error('Failed to fetch winners:', error);
      }
    };
    fetchWinners();
  }, [currentPage, sortField, sortOrder]);

  const handleSort = (field: string) => {
    setSortField(field);
    setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
  };

  return (
    <div>
      <h2>Winners</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('wins')}>Wins</th>
            <th onClick={() => handleSort('time')}>Best Time</th>
          </tr>
        </thead>
        <tbody>
          {winners.map((winner: any) => (
            <tr key={winner.id}>
              <td>{winner.wins}</td>
              <td>{winner.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default WinnersTable;