interface ContentProps {
  username: string;
  score: number;
}

export const Content: React.FC<ContentProps> = ({ username, score }) => {
  return (
    <div className="flex flex-col items-center text-xs text-white lg:text-xl">
      <h1>{username}</h1>
      <h2>{score}</h2>
      <h2 className="text-customGray">@{username}</h2>
    </div>
  );
};
