// API для управления двигателем
import { BASE_URL } from './config';

export const startEngine = async (id: number) => {
  const response = await fetch(`${BASE_URL}/engine?id=${id}&status=started`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error(`Failed to start engine for car ${id}`);
  }
  return response.json();
};

export const stopEngine = async (id: number) => {
  const response = await fetch(`${BASE_URL}/engine?id=${id}&status=stopped`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error(`Failed to stop engine for car ${id}`);
  }
  return response.json();
};

export const driveEngine = async (id: number) => {
  const response = await fetch(`${BASE_URL}/engine?id=${id}&status=drive`, {
    method: 'PATCH',
  });
  if (response.status === 500) {
    return { success: false };
  }
  return response.json();
};