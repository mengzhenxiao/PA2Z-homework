let videoData;

$(document).ready(function() {

  $("#submitbutton").click(function() {
    $.ajax({
      url: "/videoinfos",
      dataType: 'json',
      success: function(data) {
        console.log(data);
        videoData = data;
      },
      error: function() {
        alert("error");
      }
    });
    // makenew();
  });

  // function makenew() {
  //   // Get the HTML elements we need
  //   let order = $('#order');
  //   let length = $('#length');


  //   // Create a generator with parameters
  //   let markov = new MarkovGeneratorWord(Number(order.val()), Number(length.val()));

  //   // Split it up into line breaks
  //   let lines = videoData.titles;
  //   console.log(lines);

  //   // Feed in the lines
  //   for (let i = 0; i < lines.length; i++) {
  //     // Trim out any extra white space
  //     markov.feed(lines[i].trim());
  //   }

  //   // Show the resulting output
  //   console.log(markov.generate());
  //   // par.class('markov');
  //   // par.parent('results');

  // }









});
