import React from 'react';
import { useUsers } from '../../api/hooks/useUsers';
import { LiderBoardCard } from './card';
import { ContainerLiderBoard } from './container';
import { DetailList } from './detailsList';
import { LiderBoardTitle } from './title';

const Liderboard: React.FC = () => {
  const { data } = useUsers();

  const topUsers = data?.users.slice(0, 3);

  return (
    <ContainerLiderBoard>
      <LiderBoardTitle />
      <div className="flex w-full justify-center">
        {topUsers && (
          <div className="flex flex-row items-end">
            {topUsers[1] && (
              <LiderBoardCard
                key={topUsers[1].user_id}
                user={topUsers[1]}
                place={2}
              />
            )}
            {topUsers[0] && (
              <LiderBoardCard
                key={topUsers[0].user_id}
                user={topUsers[0]}
                place={1}
              />
            )}
            {topUsers[2] && (
              <LiderBoardCard
                key={topUsers[2].user_id}
                user={topUsers[2]}
                place={3}
              />
            )}
          </div>
        )}
      </div>
      <DetailList />
    </ContainerLiderBoard>
  );
};

export default Liderboard;
