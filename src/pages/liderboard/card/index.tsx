import { Card } from '@/components/ui/card';
import { Content } from './Content';
import { LiderAvatar } from './LiderAvatar';
import { PlaceBox } from './PlaceBox';
import { User } from '@/api/requests/users';

interface LiderBoardCardProps {
  user: User;
  place: number;
}

export const LiderBoardCard: React.FC<LiderBoardCardProps> = ({
  user,
  place,
}) => {
  const borderColor =
    place === 1
      ? 'customOrange'
      : place === 2
        ? 'customGray'
        : 'customDarkGray';

  return (
    <Card
      className={`relative flex p-2 ${place === 1 ? 'min-h-28 lg:min-h-44' : 'min-h-20'} w-24 flex-col items-center ${
        place === 1
          ? 'rounded-b-none rounded-tl-3xl rounded-tr-3xl'
          : place === 2
            ? 'self-end rounded-b-none rounded-bl-2xl rounded-tl-2xl rounded-tr-none'
            : 'self-end rounded-b-none rounded-l-none rounded-br-2xl rounded-tr-2xl'
      } border-none bg-primary shadow-none md:w-36 lg:w-40`}
    >
      <div
        className={`rounded-[50px] border-2 ${place === 1 ? 'border-customOrange' : place === 2 ? 'border-customGray' : 'border-customDarkGray'}`}
      >
        <LiderAvatar
          borderColor={borderColor}
          profilePhoto={user.profile_photo}
        />
      </div>
      <PlaceBox place={place} color={borderColor} />
      <Content username={user.username} score={user.reputation_score} />
    </Card>
  );
};
