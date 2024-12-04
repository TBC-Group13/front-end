import { LiderBoardCard } from './card';
import { ContainerLiderBoard } from './container';
import { DetailList } from './detailsList';
import { LiderBoardTitle } from './title';

const Liderboard = () => {
  return (
    <ContainerLiderBoard>
      <LiderBoardTitle />
      <LiderBoardCard />
      <DetailList />
    </ContainerLiderBoard>
  );
};

export default Liderboard;
