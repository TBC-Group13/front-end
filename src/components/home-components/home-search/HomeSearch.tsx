import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';

const HomeSearch = () => {
  const [search, setSearch] = useState('');
  return (
    <div className="relative mx-auto mb-5 2xl:w-2/4">
      <CiSearch className="absolute left-2 top-2 text-2xl" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg bg-gray-100 px-10 py-2 focus:outline-none"
        placeholder="Search"
        type="text"
        name="search"
      />
    </div>
  );
};

export default HomeSearch;
