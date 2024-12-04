type PlaceBoxProps = {
  place: number;
  color: 'customGray' | 'customOrange' | 'customDarkGray';
};

export const PlaceBox: React.FC<PlaceBoxProps> = ({ place, color }) => {
  const colorClasses = {
    customGray: 'bg-[#B2B2B2]',
    customOrange: 'bg-[#FFAA00]',
    customDarkGray: 'bg-[#7B7C58]',
  };

  return (
    <div
      className={`mt-2 h-4 w-4 origin-center rotate-45 transform rounded-sm text-xs text-white lg:h-6 lg:w-6 ${
        colorClasses[color] || ''
      }`}
    >
      <span className="flex h-full w-full -rotate-45 items-center justify-center">
        {place}
      </span>
    </div>
  );
};
