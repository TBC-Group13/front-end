import { Card, CardContent } from '@/components/ui/card';

export const DetailList = () => {
  return (
    <div className="bg-customLightGray mt-6 rounded-xl p-1 md:w-[500px] md:justify-self-center lg:w-[800px] lg:justify-self-center">
      <Card className="mt-6 border-none shadow-none lg:w-[650px] lg:justify-self-center">
        <CardContent className="flex items-center justify-between self-center p-4">
          <div className="flex flex-col">
            <p>Name</p>
            <p>@username</p>
          </div>
          <span>Score</span>
        </CardContent>
      </Card>
      <Card className="mt-6 border-none shadow-none lg:w-[650px] lg:justify-self-center">
        <CardContent className="flex items-center justify-between self-center p-4">
          <div className="flex flex-col">
            <p>Name</p>
            <p>@username</p>
          </div>
          <span>Score</span>
        </CardContent>
      </Card>
    </div>
  );
};
