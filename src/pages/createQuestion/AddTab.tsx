import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Tag {
  id: number;
  name: string;
}

interface AddTabProps {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

export const AddTab: React.FC<AddTabProps> = ({ tags, setTags }) => {
  const [availableTabs, setAvailableTabs] = useState<Tag[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const accessToken = localStorage.getItem('accessToken');
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${baseURL}/tags/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const tagsData: Tag[] = response.data;
        setAvailableTabs(tagsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tags:', error);
        setLoading(false);
      }
    };

    fetchTags();
  }, [accessToken, baseURL]);

  const handleAddNewTag = async () => {
    const trimmedQuery = searchQuery.trim();
    if (
      trimmedQuery &&
      !availableTabs.some((tab) => tab.name === trimmedQuery)
    ) {
      try {
        const response = await axios.post(
          `${baseURL}/tags/`,
          { name: trimmedQuery },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const newTag: Tag = response.data;
        setAvailableTabs([...availableTabs, newTag]);
        setTags([...tags, newTag]);
        setSearchQuery('');
      } catch (error) {
        console.error('Error creating new tag:', error);
      }
    }
  };

  const handleTabClick = (tab: Tag) => {
    if (!tags.some((selectedTab) => selectedTab.id === tab.id)) {
      setTags([...tags, tab]);
    }
    setSearchQuery('');
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
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchQuery.trim() !== '') {
              handleAddNewTag();
            }
          }}
        />
      </div>

      {loading ? (
        <span>Loading tags...</span>
      ) : searchQuery.trim() === '' ? (
        <span></span>
      ) : filteredTabs.length === 0 ? (
        <span>No matching tags</span>
      ) : (
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
      )}
    </div>
  );
};
