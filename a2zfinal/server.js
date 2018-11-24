// let titlesString;
// let keywords;
let videoInfos = {};


let search = require('youtube-search');
let express = require('express');
let app = express();


app.listen(1006);
console.log('1006 is the magic port');
app.use(express.static('public'));

//get user input
app.get('/homepage', function(req, res) {
    let keywords = req.query.textfield
    //use youtube search npm
    let opts = {
      maxResults: 50,
      key: 'AIzaSyCVWqeg_7UIpJzMpEuua2powD647pL_4s8'
    };

    //search youtube videos by keywords, to get an array of video id and a string of video title
    search(keywords, opts, function(err, results) {
      let ids = [];
      let titles = [];
      if(err) return console.log(err);
      for (let i=0; i<results.length; i++){
        ids.push(results[i].id);
        titles.push(results[i].title);
      }
      let titlesString=titles.join("\n");
      // console.dir(ids);
      // console.dir(titlesString);
      videoInfos = {
        "ids":ids,
        "titles": titles
      };
      console.dir(videoInfos)
    });
});



//pass youtube id and title to client side
app.get('/videoinfos', getInfos);
function getInfos(req, res) {
  res.send(videoInfos);
}
