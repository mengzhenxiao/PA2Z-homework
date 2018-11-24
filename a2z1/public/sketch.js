$(document).ready(function() {

	$('#example').on('click', function() {
    console.log("hi");
		$('#inputField').attr('placeholder',"They can help you.\nShe doesn’t drink coffee.\nWe unexpectedly found a cat in the box.\nFind a source text and manually perform one of the mashup techniques below.\nHello! This is me again trying to make a workflow vidoe.");
	});

	$('#submit').on('click', function() {
		console.log("ha");
		$('#mwOrder').html("<span style='color: #ff0000;'>They</span> <span style='color: #333399;'>can</span> <span style='color: #008000;'>help</span> <span style='color: #0000ff;'>you.</span><br><span style='color: #ff0000;'>She</span> <span style='color: #ff00ff;'>doesn’t</span> <span style='color: #008000;'>drink</span> <span style='color: #0000ff;'>coffee</span>.<br><span style='color: #ff0000;'>We</span> <span style='color: #33cccc;'>unexpectedly</span> <span style='color: #33cccc;'>in the box</span> <span style='color: #008000;'>found</span> <span style='color: #0000ff;'>a cat</span>.<br><span style='color: #008000;'>Find</span> <span style='color: #0000ff;'>a source text</span> and <span style='color: #33cccc;'>manually from the mashup techniques below</span> <span style='color: #008000;'>perform</span> <span style='color: #0000ff;'>one</span>.<br>Hello! <span style='color: #ff0000;'>This</span> <span style='color: #008000;'>is</span> again <span style='color: #0000ff;'>me</span> <span style='color: #008000;'>trying to make</span> <span style='color: #0000ff;'>a workflow vidoe</sapn>.");
	});

	});
