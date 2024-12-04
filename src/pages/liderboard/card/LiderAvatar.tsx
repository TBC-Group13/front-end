import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface LiderAvatarProps {
  borderColor: 'customDarkGray' | 'customOrange' | 'customGray'; // Add other colors if necessary
}
export const LiderAvatar: React.FC<LiderAvatarProps> = ({ borderColor }) => {
  return (
    <Avatar
      className={`absolute left-1/2 top-[-30px] -translate-x-1/2 transform border-2 lg:top-[-70px] lg:h-20 lg:w-20 border-${borderColor}`}
    >
      <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
    </Avatar>
  );
};
