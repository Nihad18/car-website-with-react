import React from "react";
import Search from "../components/Home/Search";
import Posts from "../components/Home/Posts";
function Home() {
  return (
    <div className='bg-[#F3F7FC] dark:bg-[#1C1C1E] mx-auto sm:w-[540px] lg:w-[960px] xl:min-w-[1250px] '>
      <Search />
      <Posts />
    </div>
  );
}

export default Home;
