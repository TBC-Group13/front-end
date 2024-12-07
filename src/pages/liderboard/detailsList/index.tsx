import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useUsers } from '@/api/hooks/useUsers';

export const DetailList: React.FC = () => {
  const { data } = useUsers();

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-4 rounded-xl bg-customLightGray py-10 md:w-[500px] md:justify-self-center lg:w-[800px] lg:justify-self-center">
      {data?.users.map((user) => (
        <Card
          key={user.user_id}
          className="border-none shadow-none lg:w-[650px] lg:justify-self-center"
        >
          <CardContent className="flex items-center justify-between self-center p-4">
            <div className="flex flex-col">
              <p>{user.username}</p>
              <p>@{user.username}</p>
            </div>
            <span>{user.reputation_score}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
