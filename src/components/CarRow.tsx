// CarRow component
interface CarRowProps {
  name: string;
  color: string;
  onEdit: () => void;
  onDelete: () => void;
}

const CarRow = () => {
  return <div>CarRow Component</div>;
};

export default CarRow;