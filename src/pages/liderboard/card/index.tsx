import { Card } from '@/components/ui/card';
import { Content } from './Content';
import { LiderAvatar } from './LiderAvatar';
import { PlaceBox } from './PlaceBox';

export const LiderBoardCard = () => {
  return (
    <div className="flex w-full justify-center">
      <Card className="relative flex min-h-20 w-24 flex-col items-center self-end rounded-b-none rounded-bl-2xl rounded-tl-2xl rounded-tr-none border-none bg-primary shadow-none md:w-36 lg:w-40">
        <div className="rounded-[50px] border-2 border-customOrange">
          <LiderAvatar borderColor="customGray" />
        </div>
        <PlaceBox place={2} color="customGray" />
        <Content />
      </Card>

      <Card className="relative flex min-h-28 w-24 flex-col items-center rounded-b-none rounded-tl-3xl rounded-tr-3xl border-none bg-primary shadow-none md:w-36 lg:min-h-40 lg:w-40 lg:rounded-tl-[50px] lg:rounded-tr-[50px]">
        <div>
          <LiderAvatar borderColor="customOrange" />
        </div>
        <PlaceBox place={1} color="customOrange" />
        <Content />
      </Card>

      <Card className="relative flex min-h-20 w-24 flex-col items-center justify-center self-end rounded-b-none rounded-l-none rounded-br-2xl rounded-tr-2xl border-none bg-primary shadow-none md:w-36 lg:w-40">
        <LiderAvatar borderColor="customDarkGray" />
        <PlaceBox place={3} color="customDarkGray" />
        <Content />
      </Card>
    </div>
  );
};
