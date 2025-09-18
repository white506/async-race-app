// CarRow component
interface CarRowProps {
  name: string;
  color: string;
  onEdit: () => void;
  onDelete: () => void;
}

const CarRow: React.FC<CarRowProps> = ({ name, color, onEdit, onDelete }) => {
  return <div>CarRow Component</div>;
};

export default CarRow;