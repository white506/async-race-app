// CarForm component
interface CarFormProps {
  onSubmit: (car: { name: string; color: string }) => void;
  initialData?: { name: string; color: string };
}

const CarForm = () => {
  return <div>CarForm Component</div>;
};

export default CarForm;