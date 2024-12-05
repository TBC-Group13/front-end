import { useState } from 'react';
import DynamicTag from '../DynamicTag';

const HomeTags = () => {
  const [tagsData, setTagsData] = useState([
    { name: 'Frontend', isActive: false },
    { name: 'iOS', isActive: false },
    { name: 'SwiftUi', isActive: false },
    { name: 'Backend', isActive: false },
    { name: 'UIKit', isActive: false },
  ]);

  const handleTagClick = (tagName: string) => {
    setTagsData((prevTagsData) =>
      prevTagsData.map((tag) => ({
        ...tag,
        isActive: tag.name === tagName ? !tag.isActive : tag.isActive,
      }))
    );
  };
  return (
    <div className="mb-5 flex flex-wrap justify-center gap-3 2xl:mx-auto 2xl:w-2/4">
      {tagsData.map((item) => (
        <DynamicTag
          key={item.name}
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
