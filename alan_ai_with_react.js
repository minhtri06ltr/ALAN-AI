//
intent('Can you hear me',
      reply('Yes I Can here you'));
intent('What is this app',
      reply('This is my project Alan AI with ReactJs'));
intent('Who make this app',
      reply('My name is Lý Minh Trí and I am the front end developer, nice to meet you'));
intent('How can i use this app',
      reply('tell Alan what kind of article you want to do read and Alan will help you find those article'));
intent('Thanks',
      reply('You are welcome'));



const API_KEY = '153342fdb6c3412da172ecb57429d80f';
let savedArticles =[]; // save article to read
//get api data                // variable
intent('(Give | find | show) me the news from $(source* (.+))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
    if(p.source.value){
        // add '-' into ' ' to call api
        NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join('-')}`
    }
    //call api
    api.request(NEWS_API_URL,(error,response,body)=>{
        const {articles} = JSON.parse(body);
        // error or empty response
        if(!articles.length){
            p.play('Sorry,I can not find any articles please try searching for news from a differnt sources ')
            return;
        }
        savedArticles = articles;
        p.play({command:"newHeadlines",articles});
        p.play(`Here are the (lastest|recent) ${p.source.value}.`);
         p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    })
})

//news by term

intent('what\'s  (up | going on) with $(term* (.+))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;
    
    if(p.term.value) {
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}`
    }
    
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching for something else.');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newHeadlines', articles });
        p.play(`Here are the (latest|recent) articles on ${p.term.value}.`);
        
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    });
})


// News by Categories
const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}`;

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=us`;
    
    if(p.C.value) {
        NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
    }
    
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching for a different category.');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newHeadlines', articles });
        
        if(p.C.value) {
            p.play(`Here are the (latest|recent) articles on ${p.C.value}.`);        
        } else {
            p.play(`Here are the (latest|recent) news`);   
        }
        
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
      
    });
});


intent('(Give | find | show) me the lastest news', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=us`;
    //call api
    api.request(NEWS_API_URL,(error,response,body)=>{
        const {articles} = JSON.parse(body);
        savedArticles = articles;
        p.play({command:"newHeadlines",articles});
        p.play(`Here are the lastest news.`);
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    })
})

const confirmation = context(()=>{
    intent('yes', async (p)=>{
        for(let i=0 ;i<savedArticles.length;i++){
            p.play({command:'hightlight',article:savedArticles[i]});//hightlight when read
            p.play(`${savedArticles[i].title}`)
            intent('(stop|stop reading)',(p)=>{
                    p.play('Yes sir!');
                return;
})
        }
        
    })
      intent('no',(p)=>{
          p.play('sure,As your wish');
      })
})

const read = context((p)=>{
     
        for(let i=0 ;i<savedArticles.length;i++){
            p.play({command:'hightlight',article:savedArticles[i]});//hightlight when read
            p.play(`${savedArticles[i].title}`)
        
        }
        
     
     
})



intent('Read the headlines', (p)=>{
        p.play('yes sir');
        p.then(read)
        
    });
