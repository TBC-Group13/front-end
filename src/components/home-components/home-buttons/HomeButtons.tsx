import { Button } from '@/components/ui/button';
import { FC } from 'react';

interface HomeButtonsProps {
  setActiveTab: React.Dispatch<React.SetStateAction<'personal' | 'general'>>;
  activeTab: 'personal' | 'general';
}

const HomeButtons: FC<HomeButtonsProps> = ({ setActiveTab, activeTab }) => {
  function activeGlobal() {
    setActiveTab('general');
  }

  function activePersonal() {
    setActiveTab('personal');
  }

  return (
    <div className="mb-5 grid grid-cols-2 gap-3 2xl:mx-auto 2xl:w-2/4">
      <Button
        onClick={activeGlobal}
        variant={activeTab === 'general' ? 'default' : 'secondary'}
      >
        General
      </Button>
      <Button
        onClick={activePersonal}
        variant={activeTab === 'personal' ? 'default' : 'secondary'}
      >
        Personal
      </Button>
    </div>
  );
};

export default HomeButtons;
