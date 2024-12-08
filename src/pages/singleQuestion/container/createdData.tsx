import { CreatedDataProps } from '../interfaces';

export const CreatedData: React.FC<CreatedDataProps> = ({ data }) => {
  const dateString = data.created_at;
  const date = new Date(dateString);

  const dateResult = date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  return (
    <span className="text-customGray">
      {data.author} asked for {dateResult}
    </span>
  );
};
