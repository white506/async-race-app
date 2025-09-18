// API для работы с победителями
import { BASE_URL } from './config';

export const getWinners = async (page: number, limit: number, sort: string, order: string) => {
  const response = await fetch(
    `${BASE_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch winners');
  }
  return response.json();
};

export const createWinner = async (winner: { id: number; wins: number; time: number }) => {
  const response = await fetch(`${BASE_URL}/winners`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(winner),
  });
  if (!response.ok) {
    throw new Error('Failed to create winner');
  }
  return response.json();
};

export const updateWinner = async (id: number, winner: { wins: number; time: number }) => {
  const response = await fetch(`${BASE_URL}/winners/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(winner),
  });
  if (!response.ok) {
    throw new Error('Failed to update winner');
  }
  return response.json();
};

export const deleteWinner = async (id: number) => {
  const response = await fetch(`${BASE_URL}/winners/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete winner');
  }
};