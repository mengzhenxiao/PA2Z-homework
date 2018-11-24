//https://us-central1-otaku-nako.cloudfunctions.net/otaku_nako
//https://www.npmjs.com/package/youtube-search

require('es6-promise').polyfill();
require('isomorphic-fetch');

let search = require('youtube-search');

let opts = {
  maxResults: 2,
  key: 'AIzaSyAGxF7PsOOa8ka1bvbveMvXEHx9OC42dXQ'
};


const functions = require('firebase-functions');
const {
  dialogflow,
  BasicCard,
  Button,
  Image,
  SimpleResponse
} = require('actions-on-google');

const app = dialogflow();

let reply;
let animeStr;
let youtubeSearch;
fetch('https://firebasestorage.googleapis.com/v0/b/otaku-nako.appspot.com/o/anilist.json?alt=media&token=534bc47c-b771-43b3-9fe6-dc75c0456862')
  .then(response => response.json())
  .then(data => {
    animeStr = data;
    console.log(animeStr);
  })
  .catch(error => console.error(error));

app.intent('Default Welcome Intent', conv => {
  // conv.ask("em...I'm watching anime now. (* ￣︿￣) What's up?");
  conv.ask(new SimpleResponse({
  speech: "<speak><prosody pitch='2st'>em...I'm watching anime now. <break time='0.5s'/> What's up?</prosody></speak>",
  text: "em...I'm watching anime now. (* ￣︿￣) What's up?",
}));
});

app.intent('About Nako', (conv, params) => {
  // conv.ask("Can't believe you don't know Nako? Σ( ° △ °|||)︴ Well, everyone says I'm an OTAKU, but don't like it. I am just a magical girl who likes anime, manga, and games.ヾ(´∀`o)");
  // conv.ask("If you are boring, maybe I can recommend some great anime, manga and games to you. ( σ'ω')σ");
  conv.ask(new SimpleResponse({
  speech: "<speak><prosody pitch='2st'>Can't believe you don't know Nako! <break time='0.5s'/> Well, everyone says I'm an OTAKU, but don't like it. I am just a magical girl who likes anime, manga, and games.</prosody></speak>",
  text: "Can't believe you don't know Nako! Σ( ° △ °|||)︴ Well, everyone says I'm an OTAKU, but don't like it. I am just a magical girl who likes anime, manga, and games.ヾ(´∀`o)",
}));
conv.ask(new SimpleResponse({
speech: "<speak><prosody pitch='2st'>If you are boring, maybe I can recommend some great anime, manga and games to you.</prosody></speak>",
text: "If you are boring, maybe I can recommend some great anime, manga and games to you. ( σ'ω')σ",
}));
});


app.intent('recommend anime', (conv, params) => {
  // conv.ask("em... Maybe you can tell me some keywords. (￣_,￣ ) Such as Action, School, Romance, Comedy...");
  conv.ask(new SimpleResponse({
  speech: "<speak><prosody pitch='2st'>em... Maybe you can tell me some keywords. Such as Action, School, Romance, Comedy...</prosody></speak>",
  text: "em... Maybe you can tell me some keywords. (￣_,￣ ) Such as action, school, romance, comedy...",
  }));
});

app.intent('keywords', (conv) => {
  conv.ask(`<speak><prosody pitch='2st'>Cool! So you like some ${conv.query} anime, right? I think you might love...</prosody></speak>`);
  let i;
  for (i = 0; i <= 30; i++) {
    let genreStr = animeStr[i].genre;
    let keywordStr = genreStr.split(/(\W+)/);
    reply = keywordStr[0];
    console.log(keywordStr);
    for (let j = 0; j < keywordStr.length; j++) {
      if (conv.query === keywordStr[j]) {
        reply = animeStr[i].name;
        conv.data.reply = reply;
        i = 100;
      }
    }
  }
  conv.ask(`<speak><prosody pitch='2st'>${reply}. </prosody></speak>`);
  search(reply, opts, function(err, results) {
    if (err) return console.log(err);
    if (results) {
      console.log(results[0].link);
      console.log(results);
      youtubeUrl = results[0].link;
      conv.data.youtubeUrl=youtubeUrl;
      console.log(youtubeUrl);
    }
  });

});


app.intent('youtube', (conv) => {
  // conv.ask(`Here's a Youtube link for it.`);

  if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
    conv.ask('Sorry, try this on a screen device or select the ' +
      'phone surface in the simulator.');
    return;
  }

  conv.ask(`<speak><prosody pitch='2st'>Here's a Youtube link for it.</prosody></speak>`);
  // Create a basic card
  conv.ask(new BasicCard({
    text: `Take a look!`, // Note the two spaces before '\n' required for
    // a line break to be rendered in the card.
    // subtitle: conv.data.reply,
    title: conv.data.reply,
    buttons: new Button({
      title: 'Go to Youtube',
      url: `${youtubeUrl}`,
    }),
    // image: new Image({
    //   url: 'https://example.com/image.png',
    //   alt: 'Image alternate text',
    // }),
    display: 'CROPPED',
  }));





});



exports.otaku_nako = functions.https.onRequest(app);






//emm... Maybe you can tell me some keywords. (￣_,￣ ) Such as Action, Adventure, School, Drama, Romancer...
//Cool! So you like some $keywords anime, right? I think you might
//conv.close("If you are boring, maybe I can recommend some great anime, manga and games to you. ( σ'ω')σ");
