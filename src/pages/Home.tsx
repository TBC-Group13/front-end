import React, { useState } from 'react';
import HomeTitle from '@/components/home-components/home-title/HomeTitle';
import HomeButtons from '@/components/home-components/home-buttons/HomeButtons';
import HomeSearch from '@/components/home-components/home-search/HomeSearch';
import HomeTags from '@/components/home-components/home-tags/HomeTags';
import HomeQuestions from '@/components/home-components/home-questions/HomeQuestions';

const Home: React.FC = () => {
  const [isButtonActive, setIsButtonActive] = useState(true);

  return (
    <section className="2xl:px-20">
      <div>
        <HomeTitle />
        <HomeButtons setIsButtonActive={setIsButtonActive} isButtonActive={isButtonActive}/>
        <HomeSearch />
        <HomeTags/>
      </div>
      <HomeQuestions isButtonActive={isButtonActive}/>
    </section>
  );
};

export default Home;
