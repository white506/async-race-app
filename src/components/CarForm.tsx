// CarForm component
interface CarFormProps {
  onSubmit: (car: { name: string; color: string }) => void;
  initialData?: { name: string; color: string };
}

const CarForm: React.FC<CarFormProps> = ({ onSubmit, initialData }) => {
  return <div>CarForm Component</div>;
};

export default CarForm;