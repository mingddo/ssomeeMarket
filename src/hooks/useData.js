import { useSelector } from 'react-redux';

export default function useData() {
  const data = useSelector((state) => state.data);
  return data;
}
