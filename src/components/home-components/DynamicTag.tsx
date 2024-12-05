import { FC, PropsWithChildren } from 'react';

interface TagProps extends PropsWithChildren {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

const DynamicTag: FC<TagProps> = ({ children, isActive, onClick }) => {
    
  return (
    <span
      onClick={onClick}
      className={`${
        isActive ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-700'
      } cursor-pointer select-none rounded-lg px-4 text-center text-[14px] transition-colors duration-200`}
    >
      {children}
    </span>
  );
};

export default DynamicTag;
