import { Button } from '@/components/ui/button';
import { FC } from 'react';

interface HomeButtonsProps {
    setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
    isButtonActive: boolean;
  }

const HomeButtons: FC<HomeButtonsProps> = ({ setIsButtonActive, isButtonActive }) => {

  function activeGeneral() {
    setIsButtonActive(true);
  }

  function activePersonal() {
    setIsButtonActive(false);
  }
  return (
    <div className="mb-5 grid grid-cols-2 gap-3 2xl:mx-auto 2xl:w-2/4">
      <Button
        onClick={activeGeneral}
        variant={isButtonActive ? 'default' : 'secondary'}
      >
        General
      </Button>
      <Button
        onClick={activePersonal}
        variant={isButtonActive ? 'secondary' : 'default'}
      >
        Personal
      </Button>
    </div>
  );
};

export default HomeButtons;
