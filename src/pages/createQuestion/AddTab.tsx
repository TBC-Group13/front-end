import { useState } from 'react';

export const AddTab = () => {
  const availableTabs = [
    'React',
    'JavaScript',
    'Angular',
    'Python',
    'CSS',
    'Node.js',
  ];
  const [selectedTabs, setSelectedTabs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleTabClick = (tab: string) => {
    if (!selectedTabs.includes(tab)) {
      setSelectedTabs([...selectedTabs, tab]);
    }
    setSearchQuery('');
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTabs(selectedTabs.filter((selectedTab) => selectedTab !== tag));
  };

  const handleAddTagFromInput = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery && !selectedTabs.includes(trimmedQuery)) {
      setSelectedTabs([...selectedTabs, trimmedQuery]);
    }
    setSearchQuery('');
  };

  const filteredTabs = availableTabs.filter(
    (tab) =>
      tab.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedTabs.includes(tab)
  );

  return (
    <div>
      <div className="mb-[20px] flex min-h-[50px] flex-wrap items-center rounded-[5px] border-2 p-[10px]">
        {selectedTabs.map((tab, index) => (
          <span
            className="m-[5px] inline-flex items-center rounded-[10px] bg-customGray p-[5px]"
            key={index}
          >
            {tab}
            <span
              className="ml-[5px] cursor-pointer text-[12px] font-bold text-red-600"
              onClick={() => handleRemoveTag(tab)}
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
              handleAddTagFromInput();
            }
          }}
        />
      </div>

      {searchQuery && (
        <div>
          {filteredTabs.length > 0 ? (
            filteredTabs.map((tab) => (
              <button
                className="m-[5px] cursor-pointer rounded-[5px] border-2 p-[10px]"
                key={tab}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            ))
          ) : (
            <span>No matching tags</span>
          )}
        </div>
      )}
    </div>
  );
};
