import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface LiderAvatarProps {
  borderColor: 'customDarkGray' | 'customOrange' | 'customGray';
  profilePhoto?: string;
}

export const LiderAvatar: React.FC<LiderAvatarProps> = ({
  borderColor,
  profilePhoto,
}) => {
  const defaultAvatar = 'https://github.com/shadcn.png';
  const avatarSrc = profilePhoto || defaultAvatar;

  return (
    <Avatar
      className={`absolute left-1/2 top-[-30px] -translate-x-1/2 transform border-2 md:top-[-50px] md:h-16 md:w-16 lg:top-[-70px] lg:h-20 lg:w-20 border-${borderColor}`}
    >
      <AvatarImage src={avatarSrc} alt="Avatar" />
    </Avatar>
  );
};
