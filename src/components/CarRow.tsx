// CarRow component
import { startEngine, stopEngine } from '../api/engine';

interface CarRowProps {
  name: string;
  color: string;
  onEdit: () => void;
  onDelete: () => void;
}

const CarRow: React.FC<CarRowProps> = ({ name, color, onEdit, onDelete }) => {
  const handleStart = async () => {
    try {
      await startEngine(1); // Здесь нужно передать реальный ID машины
      console.log('Engine started');
    } catch (error) {
      console.error('Failed to start engine:', error);
    }
  };

  const handleStop = async () => {
    try {
      await stopEngine(1); // Здесь нужно передать реальный ID машины
      console.log('Engine stopped');
    } catch (error) {
      console.error('Failed to stop engine:', error);
    }
  };

  return (
    <div style={{ backgroundColor: color }}>
      <span>{name}</span>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default CarRow;