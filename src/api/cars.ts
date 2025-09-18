import { Car } from '../types/car';
import { fetchWrapper } from './http';

// CRUD operations for cars
export const getCars = async (): Promise<Car[]> => {
  return await fetchWrapper('/cars', {});
};

export const createCar = async (car: { name: string; color: string }) => {
  return await fetchWrapper('/cars', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
};

export const updateCar = async (id: number, car: { name: string; color: string }) => {
  return await fetchWrapper(`/cars/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
};

export const deleteCar = async (id: number) => {
  return await fetchWrapper(`/cars/${id}`, {
    method: 'DELETE',
  });
};