import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect, useState } from "react";
import NewsCard from "./components/NewsCard";
import Introduce from "./components/Introduce";
import wordsToNumbers from "words-to-numbers";

const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsarticles, setNewsArticles] = useState([]);
  useEffect(() => {
    alanBtn({
      key: "3f7ec9809829e93effd463fa58261e592e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          //reset current reading article
          console.log("reset");
          setActiveArticle(0);
        } else if (command === "hightlight") {
          setActiveArticle((preArticle) => preArticle + 1);
        } else if (command === "reset") {
          setActiveArticle(0);
        } else if (command === "open") {
          // prevent can not find article with word
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          console.log(parsedNumber);
          const article = articles[parsedNumber - 1];
          if (parsedNumber > 20) {
            alanBtn().playText("Please check the number of article again ");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText(`Openning the articles `);
          }
        }
      },
    });
  }, []);

  console.log(activeArticle);
  return (
    <>
      {newsarticles.length ? (
        <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
          <h1 className="text-shadow text-center font-family  font-bold text-[#fcedd8] text-8xl py-12">
            Alan AI
          </h1>
          <div className="grid gap-x-5 gap-y-20 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  items-stretch  p-6 pb-[6rem]  ">
            {newsarticles.map((article, index) => (
              <NewsCard
                key={index}
                i={index}
                article={article}
                activeArticle={activeArticle}
              />
            ))}
          </div>
        </div>
      ) : (
        <Introduce />
      )}
    </>
  );
};

export default App;
