//
intent('Can you hear me',
      reply('Yes I Can here you'));
intent('What is this app',
      reply('This is my project Alan AI with ReactJs'));
intent('Who make this app',
      reply('My name is Lý Minh Trí and I am the front end developer, nice to meet you'));
intent('How can i use this app', 'What does this app do?',
    'How does this work?',
    'What can I do here?',
      reply('tell Alan what kind of article you want to do read and Alan will help you find those article'));
intent('Thanks',
      reply('You are welcome'));

onUserEvent((p, e) => {
    if (e.event == 'micPermissionPrompt') {
        p.showPopup({
            html: '<div class="info-popup"> <div class="info-popup_header"></div><div class="info-popup_body"> <div>Click <b>Allow microphone</b> to talk to me</div>',
            style: ".info-popup{max-width:394px;height:280px;max-height:280px;background:#fff;-webkit-box-shadow:0 5px 14px rgba(0,0,0,.25);box-shadow:0 5px 14px rgba(0,0,0,.25);overflow:hidden;border-radius:10px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.top .info-popup{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse}.top .info-popup_body{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;padding-top:20px}.info-popup_header{height:191px;background-image:url(https://www.stevenvanbelleghem.com/wp-content/uploads/2020/12/19IcqVZ48A0tQba1-F_yIpg.jpeg);background-repeat:no-repeat;background-position:center center;background-size:100% 100%}.info-popup_body{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;font-weight:400;font-size:16px;line-height:28px;text-align:left;color:#000;padding:6px 70px 0;max-width:350px;height:70px}",
            overlay: true,
            buttonMarginInPopup: 10,
            force: false,
        });
        p.play('Hi, this is Alan, your voice assistant!');
        p.play('To find the news with voice, click Allow microphone and try say: find me the lastest news');
    }
});

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
           
            p.play(`${savedArticles[i].title}`);
         
        }
        
    })
      intent('no',(p)=>{
          p.play('sure,As your wish');
      })
})



intent('Read the headlines', (p)=>{
        p.play('yes sir');
    p.play({command:"reset"});
        for(let i=0 ;i<savedArticles.length;i++){
            p.play({command:'hightlight',article:savedArticles[i]});//hightlight when read
         
            p.play(`${savedArticles[i].title}`);
            
          
        }
  

        
    })
                                                                                            //can skip this word
intent('(Go to | open | show me | i want to read | more about | i want to know more about)  (the |) (article |) (number |) $(number* (.+))', (p) => {
    if(p.number.value){
          p.play({command:'open',articles:savedArticles,number:p.number.value});//hightlight when read
    }
    
})






intent('(Go back| show guide | show the guide | back | previous page | previous srceen )',(p)=>{
    p.play('yes sir');
    p.play({command:'newHeadlines',articles:[]});//reset articles state => back to introduce
    
})