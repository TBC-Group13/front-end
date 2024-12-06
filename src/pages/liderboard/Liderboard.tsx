import React, { useEffect } from 'react';
import { useUsers } from '../../api/hooks/useUsers';
import { LiderBoardCard } from './card';
import { ContainerLiderBoard } from './container';
import { DetailList } from './detailsList';
import { LiderBoardTitle } from './title';

const Liderboard: React.FC = () => {
  const { data, error } = useUsers();

  useEffect(() => {
    if (data) {
      console.log('Fetched users data:', data);
    }
    if (error) {
      console.error('Error fetching users data:', error);
    }
  }, [data, error]);

  return (
    <ContainerLiderBoard>
      <LiderBoardTitle />
      <LiderBoardCard />
      <DetailList />
    </ContainerLiderBoard>
  );
};

export default Liderboard;
