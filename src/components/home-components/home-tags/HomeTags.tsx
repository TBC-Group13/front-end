import { useState, useEffect, FC } from 'react';
import DynamicTag from '../DynamicTag';
import { fetchTags } from '@/api/requests/getTags';

interface Tag {
  id: number;
  name: string;
  isActive: boolean;
}

const HomeTags: FC<{ setSelectedTags: (tags: string[]) => void }> = ({
  setSelectedTags,
}) => {
  const [tagsData, setTagsData] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem('accessToken') || '';
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchTagsData = async () => {
      try {
        const tags = await fetchTags(baseURL, accessToken);
        const tagsWithActiveState = tags.map((tag) => ({
          ...tag,
          isActive: false,
        }));
        setTagsData(tagsWithActiveState);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tags:', error);
        setLoading(false);
      }
    };

    fetchTagsData();
  }, [accessToken, baseURL]);

  const handleTagClick = (tagName: string) => {
    setTagsData((prevTagsData) =>
      prevTagsData.map((tag) => ({
        ...tag,
        isActive: tag.name === tagName ? !tag.isActive : tag.isActive,
      }))
    );

    const activeTags = tagsData
      .map((tag) =>
        tag.name === tagName ? { ...tag, isActive: !tag.isActive } : tag
      )
      .filter((tag) => tag.isActive)
      .map((tag) => tag.name);

    setSelectedTags(activeTags);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb-5 flex flex-wrap justify-center gap-3 2xl:mx-auto 2xl:w-2/4">
      {tagsData.map((item) => (
        <DynamicTag
          key={item.id}
          name={item.name}
          isActive={item.isActive}
          onClick={() => handleTagClick(item.name)}
        >
          {item.name}
        </DynamicTag>
      ))}
    </div>
  );
};

export default HomeTags;
