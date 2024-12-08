import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { fetchTags } from '@/api/requests/getTags';
import { createTag } from '@/api/requests/createTag';
import { Button } from '@/components/ui/button';

export interface Tag {
  id: number;
  name: string;
}

interface AddTabProps {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

export const AddTag: React.FC<AddTabProps> = ({ tags, setTags }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: availableTabs = [], isLoading } = useQuery(['tags'], () =>
    fetchTags(
      import.meta.env.VITE_BASE_URL,
      localStorage.getItem('accessToken') || ''
    )
  );

  const handleTabClick = (tag: Tag) => {
    if (!tags.some((selectedTab) => selectedTab.id === tag.id)) {
      setTags([...tags, tag]);
    }
    setSearchQuery('');
  };

  const mutation = useMutation(createTag, {
    onSuccess: (newTag) => {
      setTags((prevTags) => [...prevTags, newTag]);
    },
    onError: (error) => {
      console.error('Error creating tag:', error);
    },
  });

  const handleAddNewTag = async () => {
    const trimmedQuery = searchQuery.trim();
    if (
      trimmedQuery &&
      !availableTabs.some((tab) => tab.name === trimmedQuery)
    ) {
      mutation.mutate(trimmedQuery);
      setSearchQuery('');
    }
  };

  const handleRemoveTag = (tagId: number) => {
    setTags(tags.filter((selectedTab) => selectedTab.id !== tagId));
  };

  const filteredTabs = availableTabs.filter(
    (tab) =>
      tab.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !tags.some((selectedTab) => selectedTab.id === tab.id)
  );

  return (
    <div>
      <div className="mb-[20px] flex min-h-[50px] flex-wrap items-center rounded-[5px] border-2 p-[10px]">
        {tags?.map((tab) => (
          <span
            className="m-[5px] inline-flex items-center rounded-[10px] bg-customGray p-[5px]"
            key={tab.id}
          >
            {tab.name}
            <span
              className="ml-[5px] cursor-pointer text-[12px] font-bold text-red-600"
              onClick={() => handleRemoveTag(tab.id)}
            >
              ×
            </span>
          </span>
        ))}
        <input
          className="m-0 w-full flex-1 rounded-md border-none outline-none focus:border-0 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:outline-none"
          placeholder="Add or search tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={() => handleAddNewTag()}>create new tag</Button>
      </div>

      {isLoading ? (
        <span>Loading tags...</span>
      ) : searchQuery.trim() !== '' && filteredTabs.length > 0 ? (
        <div>
          {filteredTabs.map((tab) => (
            <button
              className="m-[5px] cursor-pointer rounded-[5px] border-2 p-[10px]"
              key={tab.id}
              onClick={() => handleTabClick(tab)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      ) : searchQuery.trim() !== '' && filteredTabs.length === 0 ? (
        <span>No matching tags</span>
      ) : null}
    </div>
  );
};
