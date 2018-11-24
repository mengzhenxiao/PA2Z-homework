let poetryData;
let poetryString;
let randomNumber;
let inputText = '';
let lex;
// let newPoemWords =[];
// let newPoemString;
// let newPoemArray;


function preload() {
  poetryData = loadJSON('poetry.json');
}

function setup() {
  noCanvas();

  lex = new RiLexicon();

  input = select('#originalPoem');
  button = select('#example');
  button.mousePressed(giveRandomPoem);

  dropZone = select('#drop_zone');
  dropZone.dragOver(highlighted);
  dropZone.drop(gotFile, unHighlight);

  output = select('#output');
  submit = select("#submit");
  submit.mousePressed(newpoetry);
}


function giveRandomPoem() {
  input.html("");

  //pick a random piece of poetry
  randomNumber = floor(random(0, 100));
  poetryString = poetryData[randomNumber].lines;

  //show the original poetry in the input div
  for (let i = 0; i < poetryString.length; i++) {
    let words = poetryString[i].split(/(\W+)/);
    console.log(words);
    for (let j = 0; j < words.length; j++) {
      let span = createSpan(words[j]);

      span.parent(input);

      if (!/\W+/.test(words[j])) {
        span.mouseClicked(highlight);
      }
      // newPoemWords.push(span.html());
      // newPoemString = join(newPoemWords, '\n');
      // console.log(newPoemString);
      // // newPoemArray.push(newPoemString);
    }
    let div = createDiv(' ').size(10, 10);
    div.parent(input);
    // console.log(newPoemArray);
  }
}


function highlight() {
  var c = color("#e7ae4b");
  this.style('background-color', c);

  //rhyems function
  let rhymes = lex.rhymes(this.html());
  console.log(rhymes);
  if (rhymes.length != 0) {
    this.html(rhymes[0]);
  } else {
    this.html("anything");
  }
}

function newpoetry() {
  output.html("");
  let text = input.html();

  output.html(text);

  // //make the first letter uppercase
  // let regex = /^\w/g;
  // let replaced = text.replace(regex,uppercase);
  // function uppercase(){
  //
  // }
}


// Handle dropzone events
function highlighted() {
  dropZone.style('background', '#AAA');
}

function unHighlight() {
  dropZone.style('background', '');
}

function gotFile(file) {
  if (file.type === 'text') {
    // process(file.data);
    inputText += file.data + '\n\n';
    input.html(inputText);
  } else {
    // In case it's some weird other kind of file
    alert('this is not a text file.');
  }
}


//text to speech
// $(document).ready(function() {
//   const synth = window.speechSynthesis;
//
//
//   const speak = text => {
//     if (synth.speaking) {
//       console.error('speechSynthesis.speaking');
//       return;
//     }
//     let utterThis = new SpeechSynthesisUtterance(text);
//     synth.speak(utterThis);
//   };
//
//
//
//   $('#read').on('click', function() {
//     let span = select('span');
//     console.log(span);
//     speak(output.value());
//   });
//
// });
