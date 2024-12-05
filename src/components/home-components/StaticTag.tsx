import { FC, PropsWithChildren } from 'react';

const StaticTag: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <span
      className={`bg-blue-100 text-blue-700 select-none cursor-pointer rounded-lg px-4 text-center text-[14px] transition-colors duration-200`}
    >
      {children}
    </span>
  );
};

export default StaticTag;
