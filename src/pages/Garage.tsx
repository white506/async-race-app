import React, { useState, useEffect } from 'react';
import { getCars, createCar, updateCar, deleteCar } from '../api/cars';
import { startEngine, stopEngine, driveEngine } from '../api/engine';
import CarForm from '../components/CarForm';
import CarRow from '../components/CarRow';
import Pagination from '../components/Pagination';
import { Car } from '../types/car';

const Garage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [isRaceInProgress, setIsRaceInProgress] = useState(false);

  const fetchCars = async (page: number) => {
    try {
      const data = await getCars(); // Replace with paginated API call
      setCars(data);
      setTotalPages(Math.ceil(data.length / 7));
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  useEffect(() => {
    fetchCars(currentPage);
  }, [currentPage]);

  const handleCreate = async (car: { name: string; color: string }) => {
    try {
      await createCar(car);
      fetchCars(currentPage);
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };

  const handleUpdate = async (car: { name: string; color: string }) => {
    if (!editingCar) return;
    try {
      await updateCar(editingCar.id, car);
      setEditingCar(null);
      fetchCars(currentPage);
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCar(id);
      const updatedCars = cars.filter((car) => car.id !== id);
      setCars(updatedCars);

      // Если удалена последняя машина на странице, перейти на предыдущую страницу
      if (updatedCars.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchCars(currentPage);
      }
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleStartRace = async () => {
    setIsRaceInProgress(true);
    try {
      let raceWinner = null;
      for (const car of cars) {
        const driveResult = await driveEngine(car.id);
        if (driveResult.success && !raceWinner) {
          raceWinner = car.name;
        }
      }
      setWinner(raceWinner);
    } catch (error) {
      console.error('Error during race:', error);
    } finally {
      setIsRaceInProgress(false);
    }
  };

  const handleResetRace = async () => {
    try {
      for (const car of cars) {
        await stopEngine(car.id);
      }
    } catch (error) {
      console.error('Error resetting race:', error);
    }
  };

  return (
    <div>
      <h1>Garage</h1>
      {winner && <div className="winner-banner">Winner: {winner}</div>}
      <button onClick={handleStartRace} disabled={isRaceInProgress}>Start Race</button>
      <button onClick={handleResetRace} disabled={isRaceInProgress}>Reset Race</button>
      <CarForm onSubmit={editingCar ? handleUpdate : handleCreate} initialData={editingCar || undefined} />
      {cars.length === 0 ? (
        <p>No Cars Available</p> // Добавлено сообщение, если машин нет
      ) : (
        <div>
          {cars.slice((currentPage - 1) * 7, currentPage * 7).map((car) => (
            <CarRow
              key={car.id}
              name={car.name}
              color={car.color}
              onEdit={() => setEditingCar(car)}
              onDelete={() => handleDelete(car.id)}
            />
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Garage;