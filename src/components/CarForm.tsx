import React from 'react';
import useRaceStore from '../store/raceStore';

// CarForm component
interface CarFormProps {
  onSubmit: (car: { name: string; color: string }) => void;
  initialData?: { name: string; color: string };
}

const CarForm: React.FC<CarFormProps> = ({ onSubmit, initialData }) => {
  const { formState, setFormState } = useRaceStore();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const car = { name: formState.name, color: formState.color };
    onSubmit(car);
    setFormState({ name: '', color: '' }); // Reset form state
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formState.name}
        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
        placeholder="Car Name"
      />
      <input
        type="color"
        value={formState.color}
        onChange={(e) => setFormState({ ...formState, color: e.target.value })}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CarForm;