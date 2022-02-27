import React from "react";

const Introduce = () => {
  return (
    <div className="bg-gradient min-h-screen">
      <img
        className=" w-[10%] block  py-5 mx-auto rounded-full object-cover object-center "
        alt="Alan AI logo"
        src="https://alan.app/static/mobile_meduza.918bc547.png"
      />
      <div className="grid mt-[2rem] px-12  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2  gap-x-5 gap-y-32">
        <div className="bg-[#ac52c3] min-h-[400px]  flex flex-col justify-between relative p-8 rounded-xl box-shadow">
          {/* <img
            className="absolute min-h-[250px] w-[calc(100%-2rem)] top-[-4rem] right-[20%] shrink-0"
            src="https://www.seekpng.com/png/full/165-1657662_the-latest-latest.png"
            alt="the lastest news"
          /> */}
          <h2 className="text-center font text-xl mt-[2rem] text-white ">
            LASTEST NEWS
          </h2>
          <div>
            <span className="block text-center text-white">Try saying:</span>
            <span className="block text-center text-white italic">
              Give me the lastest news
            </span>
          </div>
        </div>
        <div className="bg-[#d760a2] min-h-[400px]  flex flex-col justify-between relative p-8 rounded-xl box-shadow">
          {/* <img
            className="absolute w-[60%] top-[-4rem] right-[20%]"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3eGPnTeINcVChNWzUeSfk61T6AeRgF5WwDTUOsW8z8jdeHzbeB6lCiVZJVnQc6Y5Wsp0&usqp=CAU"
            alt="the lastest news"
          /> */}
          <h2 className="text-center font text-xl mt-[2rem]  text-white ">
            NEWS BY CATEGORIES
          </h2>
          <div>
            <span className="font-bold block text-center text-white">
              Categories:
            </span>
            <span className=" text-center text-white block">
              Bussiness, Entertaintment, General, Health, Science, Technology,
              Sports
            </span>
          </div>
          <div>
            <span className="block text-center text-white">Try saying:</span>
            <span className="block text-center text-white italic">
              Give me the lastest Technology news
            </span>
          </div>
        </div>
        <div className="bg-[#846de2] min-h-[400px]  flex flex-col justify-between relative p-8 rounded-xl box-shadow">
          {/* <img
            className="absolute w-[60%] top-[-4rem] right-[20%]"
            src="https://www.seekpng.com/png/full/165-1657662_the-latest-latest.png"
            alt="the lastest news"
          /> */}
          <h2 className="text-center font text-xl mt-[2rem] text-white ">
            NEWS BY TERMS
          </h2>
          <div>
            <span className="font-bold block text-center text-white">
              Terms:
            </span>
            <span className=" text-center text-white block">
              Bitcoin, PlayStation 5, Smartphones, Donald Trump,..
            </span>
          </div>
          <div>
            <span className="block text-center text-white">Try saying:</span>
            <span className="block text-center text-white italic">
              What's up with PlayStation 5
            </span>
          </div>
        </div>
        <div className="bg-[#556ffa] min-h-[400px]  flex flex-col justify-between  relative p-8 rounded-xl box-shadow">
          {/* <img
            className="absolute w-[60%] top-[-4rem] right-[20%]"
            src="https://www.seekpng.com/png/full/165-1657662_the-latest-latest.png"
            alt="the lastest news"
          /> */}
          <h2 className="text-center font text-xl mt-[2rem] text-white ">
            NEWS BY SOURCES
          </h2>
          <div>
            <span className="font-bold block text-center text-white">
              Sources:
            </span>
            <span className=" text-center text-white block">
              CNN, BBC News, Wired, Time, ICN, ACB News, Buzzfeed,..
            </span>
          </div>
          <div>
            <span className="block text-center text-white">Try saying:</span>
            <span className="block text-center text-white italic">
              Give me the news from CNN
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
