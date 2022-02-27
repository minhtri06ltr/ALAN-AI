import React, { useState, useEffect, createRef } from "react";
import moment from "moment";

const NewsCard = ({ article, i, activeArticle }) => {
  const [elRefs, setElRefs] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 20);
  useEffect(() => {
    setElRefs((refs) =>
      Array(20)
        .fill()
        .map((_, j) => refs[j] || createRef())
    );
  }, []);
  useEffect(() => {
    if (i === activeArticle - 1 && elRefs[activeArticle - 1]) {
      scrollToRef(elRefs[activeArticle - 1]);
    }
  }, [i, activeArticle, elRefs]);
  return (
    <div
      ref={elRefs[i]}
      className="flex flex-col  rounded bg-slate-100 shadow-2xl relative"
    >
      <img
        src={
          article.urlToImage ||
          "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG5ld3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
        }
        alt="article"
        className="shrink-0 object-cover object-center absolute rounded h-[325px] w-[calc(100%-1rem)] top-[-0.5rem] left-[0.5rem]"
      />
      <div className="  gap-y-5 flex flex-1 justify-between flex-col m-4 pt-[calc(300px+0.5rem)]  overflow-hidden">
        <div className="  flex  items-start justify-between">
          <div className="w-1/2">
            <span className=" block text-slate-500 ">
              {moment(article.publishedAt).format("MMMM Do, YYYY")}
            </span>
            <span className="block text-slate-500">
              {moment(article.publishedAt).format("hh:mm:ss a")}
            </span>
          </div>

          <span className="text-slate-500 w-1/2 text-right truncate">
            {article.author}
          </span>
        </div>
        <h2 className="   font-bold text-3xl break-words">{article.title}</h2>
        <p className="    text-slate-500 break-words ">{article.description}</p>

        <span className=" block  text-slate-500  text-center mb-4 font-bold text-2xl">
          {i + 1}
        </span>

        <button className="left-1/2 translate-x-[-50%] translate-y-1/2 shadow-2xl bottom-0 absolute rounded-full py-4 min-w-[50%] text-white font-bold bg-green-500 hover:bg-green-700">
          <a href={article.url} target="_blank">
            Read More
          </a>
        </button>
      </div>
      {activeArticle - 1 === i && (
        <div className="h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full  w-full "></div>
      )}
    </div>
  );
};

export default NewsCard;
