import { CreatedDataProps } from '../interfaces';
import { format } from 'date-fns';

export const CreatedData: React.FC<CreatedDataProps> = ({ data }) => {
  const dateString = data.created_at;
  const date = new Date(dateString);

  const dateResult = format(date, 'EEEE, d MMMM yyyy');

  return (
    <span className="text-sm text-gray-500">
      {data.author} asked on {dateResult}
    </span>
  );
};
