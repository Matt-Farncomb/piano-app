//TODO:
//Can currenlty make new songs that save and play on clicked
//Songs have names, but they are collected from a bad location
//Will igore that for now and concentrate on presentation
//Make all the forms an everything look good. 
//Also, have a stop button turn off ALL SOUND AS ANOTHER BUTTON EG MUTE


//IMPORTANT
//hard touch is ff
//soft touch is mf
//very soft is pp

//q = 81
let keyPressHard = false;
let pressure = "_mf";
let songArr = [];
let songDict = {};
let keysPlayed = [];
let newSongArr = [];
let count = 0;

function Song(name, notes, timings) {
  this.name = name;
  this.notes = notes;
  this.timings = timings;
}
	



let recording = false;

let keypresses = [65,66,67,68,69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 80];
let pianoKeys = {
	81: "C5",	
	87: "D5",
	69: "E5",
	82: "F5",
	84: "G5",
	89: "A5",
	85: "B5",
	73: "C5",
	79: "D5",
	80: "E5"

};

let keysPressed = [];

let pressed;

//check if shift is pressed, if pressed, add the ff to the filename
addEventListener("keydown", function(event) {
	if (event.keyCode == 16) {
		console.log("test");
		keyPressHard = true;
		pressure = "_ff";
	}
	if (event.keyCode == 32) {
		pressure = "_pp";
	}
});

addEventListener("keydown", function(event) {
	for (var i = 0; i < keypresses.length; i++) {
		if (event.keyCode == keypresses[i]) {
			pressed = event.keyCode;
			let keyId = pianoKeys[pressed];
			recordKeys(keyId);
			$("#" + pianoKeys[pressed]).addClass("active-white-key");
      		if (keysPressed.includes(pressed) === false) {
      
      			playSound("music/new_keys/" + pianoKeys[pressed] + pressure + ".mp3");
      			console.log(pianoKeys[pressed] + pressure);
      			keysPressed.push(pressed);

      		}
		}
	}    
  });

addEventListener("keyup", function(event) {	
		keysPressed.splice(keysPressed.indexOf(event.keyCode),1);
		$("#" + pianoKeys[event.keyCode]).removeClass("active-white-key");
		//set note to be true and be abled to be pressed again
			//delete pressed up key from array
});

  addEventListener("keyup", function(event) {
    if (event.keyCode == 16 || event.keyCode == 32) {
      	keyPressHard = false;
      	pressure = "_mf";
    }
  });


let recordArr = [];
let timeArr = [];
let totalArr = [];
var totalTime = 0;

function playSound(url) {
    var a = new Audio(url);
    a.play();
}

function recordKeys(keyId) {
	
  	if ( recording == true) {
  		//also record time between key presses
		recordArr.push(keyId + pressure);	
		//alert(recordArr);
		var time = new Date().getTime();
		timeArr.push(time);
		if (timeArr.length > 1) {
		  		totalTime = timeArr[1] - timeArr[0];
		  		//alert(totalTime);
		  		totalArr.push(totalTime);
		  		timeArr = [timeArr[0]];
		  	}

	}
}

// function beginRecord() {
$(document).ready(function () {
	$("#rec-button").click(function() {
		if (recording == true) {
			recording = false;
			$("#rec-button").html('REC');
			console.log(recording);
			// <i class="fa fa-stop" aria-hidden="true"></i>

		}
		else {
			recording = true;
			$("#rec-button").html('<i class="fa fa-stop" aria-hidden="true"></i>');
			console.log(recording);
		}
	});
});

$(document).ready(function () {

	$(".white-key").click(function() {
		let keyId = $(this).attr("id");
	  	playSound("music/new_keys/" + keyId + pressure + ".mp3");
	  	var time = new Date().getTime();
	  	timeArr.push(time);
	  	console.log(keyId);
	  	if (timeArr.length > 1) {
	  		totalTime = timeArr[1] - timeArr[0];
	  		//alert(totalTime);
	  		totalArr.push(totalTime);
	  		timeArr = [timeArr[0]];
	  	}
	  	
	  	//alert(timeArr);

	  	//alert(end);

	  	if ( $('input[name="recording"]').is(':checked') ) {
	  		//also record time between key presses
    		recordArr.push(keyId + pressure);	
    		//alert(recordArr);

    	}

	});

	//with some help from: https://stackoverflow.com/questions/5226285/settimeout-in-for-loop-does-not-print-consecutive-values

	function doScaledTimeout(i, sound) {
		sound = recordArr[i];
		var temp = totalArr[totalArr.length - i];
		// console.log(recordArr[i]);
		// console.log(temp);
		// console.log(totalArr);
		//setTimeout 'makes a mental note' with completing actions. It thinks in 'temp' milseconds, do the function as it is at that time it actually executes, whihc is prob at the end
	  	setTimeout(function() {
	  	//fix for strange bug where I would start at zero than start counting down with recordArr.length
	  	if (i > 0) {
			i = recordArr.length - i;
		}
		///
	    playSound("music/new_keys/" + recordArr[i] + ".mp3");
	    console.log(recordArr[i]);
	    // console.log(i);
	    // console.log(recordArr[i]);
	  }, temp);
	}






	//used for the new button created with save
	
	function doScaledTimeout4(i, sound, iter) {
		var newTemp = newSongArr[iter].timings;
		var temp4 = newSongArr[iter].timings[newSongArr[iter].timings.length - i];
		console.log(temp4);
		// console.log(newTemp);
		// console.log(recordArr[i]);
		// console.log(temp);
		// console.log(totalArr);
		//setTimeout 'makes a mental note' with completing actions. It thinks in 'temp' milseconds, do the function as it is at that time it actually executes, whihc is prob at the end
	  	setTimeout(function() {
	  	//fix for strange bug where I would start at zero than start counting down with recordArr.length
	  	if (i > 0) {
			i = newSongArr[iter].notes.length - i;
		}
		///
	    playSound("music/new_keys/" + sound[i] + ".mp3");
	    // console.log(recordArr[i]);
	    // console.log(i);
	    // console.log(recordArr[i]);
	  }, temp4);
	}




	/////////////////////////////////////////////////

	///////////////////////////////////////////////

	function doScaledTimeout2(i, sound) {
		
		let timeThing = 200;
		// console.log(recordArr[i]);
		// console.log(temp);
		// console.log(totalArr);
		//setTimeout 'makes a mental note' with completing actions. It thinks in 'temp' milseconds, do the function as it is at that time it actually executes, whihc is prob at the end
	  	var playMusic = setTimeout(function() {
	  	//fix for strange bug where I would start at zero than start counting down with recordArr.length
	  	
		///
		
		// if (sound == "+") {
		// 	timeThing += 200;
		// }

	    playSound("music/new_keys/" + sound + "5_ff" +".mp3");
	    keysPlayed.push(sound);
	    $("#" + sound + "5").addClass("active-white-key");
	    // console.log(i);
	    // console.log(recordArr[i]);
	  }, i * timeThing);

	  	$("#stop-song").click(function() {
		window.clearTimeout(playMusic);
		// songArr = [];
		// songDict = {};
		//alert("test");
		});

	}

	////////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////

	function doScaledTimeout3(i, sound) {
		
		
		// console.log(recordArr[i]);
		// console.log(temp);
		// console.log(totalArr);
		//setTimeout 'makes a mental note' with completing actions. It thinks in 'temp' milseconds, do the function as it is at that time it actually executes, whihc is prob at the end
	  setTimeout(function() {
	  	//fix for strange bug where I would start at zero than start counting down with recordArr.length
	  	
		///
	   
	    keysPlayed.push(sound);
	    if (keysPlayed.length > 0) {
	    	// let oldSound = keysPlayed[keysPlayed.length-1];
	    	// $("#" + oldSound + "5").removeClass("active-white-key");
	    	$("#" + sound + "5").removeClass("active-white-key");
	    	// alert(oldSound);
	    }
	    keysPlayed.push(sound);
	    // console.log(i);
	    // console.log(recordArr[i]);
	  }, i * 400);
	}












	//using this it has the doScaledTimeout have its own 'i because it checks the value of i at the time of execution and it hasn't changeds o each time the settimeout is called, it will have a unique unchanged i	
	$("#play").click(function() {
		for (var i = 0; i <= recordArr.length-1; i++) {
		  doScaledTimeout(i);
		}
	});

	// $("#save").click(function() {

	// 		tempName = new Song();
	// 		tempName.name = "tempName";
	// 		tempName.notes = tempArr;
	// 		tempName.timings = totalArr;

	// 		console.log(tempName);









	// 		// $("#song-list").append("<button>" + "SongA"+ "</button><br><br>");

	// 		//specialSongDict."SongA" = 
	// 		//makes an object of te name of the song
	// 			//notes: [array]
	// 			//timing:[delays between notes]


	// 		//one dict has song name paired with note
	// 		//second dict has song name paired with timing
	// 		//do scaled timout with temp being the timing and sound being the note
	// });


	$("#create-song-button").click(function() {
		tempArr = [];
		var newSong = $("#create-song").val();
		var newName = $("#song-name").val();
		for (let i = 0; i < newSong.length; i++) {
			tempArr.push(newSong[i]);
		}

		songDict[newName] = tempArr;
		
		songArr.push(songDict);
		
		$("#song-list").append("<li>" + newName + "</li><br>"
				 	   + newSong + "<br><br>")
		
	});

	$("#play-song").click(function() {
			var songToPlay = $("#song-to-play").val();
			// alert(songToPlay);
			$.each( songDict, function( key, value ) {
				if (key == songToPlay) {
					// alert( key + ": " + value );
					//playSound("music/new_keys/" + value + "5_ff" + ".mp3");
					for (var y = 0; y < value.length; y++) {
						doScaledTimeout2(y, value[y]);
						//if button is pressed, break
						doScaledTimeout3(y, value[y-1])
						console.log("#" + value + "5");
					}	
				}
			  
			});

	
	
		});

	//TODO: each save will make a new song with a different name

	$("#save").click(function() {

			var newSongName = $("#song-name").val();
			

			// can't use dynamcially creted variable in code
			//don't use the below
			// eval("var" + $("#song-name").val());
			// console.log(song);

			tempName = new Song();
			tempName.name = "tempName";
			tempName.notes = recordArr;
			tempName.timings = totalArr;


			newSongArr.push(tempName);

			console.log(newSongArr);

			count++;

			$("#song-list").append("<button class='playOtherSong" + count + "' id=" + tempName.name + ">" + newSongName + "</button><br><br>");

			recordArr = [];
			totalArr = [];
			timeArr = [];
		});



		$(document).on('click','.playOtherSong1', function() {
			// console.log("test");
			// alert("test");
			
			for (var i = 0; i <= newSongArr[0].notes.length-1; i++) {
		  		doScaledTimeout4(i, newSongArr[0].notes, 0);
		  		console.log(newSongArr[0]);
			}
		});


		$(document).on('click','.playOtherSong2', function() {
			// console.log("test");
			// alert("test");
			
			for (var i = 0; i <= newSongArr[1].notes.length-1; i++) {
		  		doScaledTimeout4(i, newSongArr[1].notes, 1);
		  		console.log(newSongArr[1]);
			}
		});



	$("#play-2").click(function() {
			var songToPlay = "SongA";
			// alert(songToPlay);
			$.each( specialSongDict, function( key, value ) {
				
					// alert( key + ": " + value );
					//playSound("music/new_keys/" + value + "5_ff" + ".mp3");
				for (var y = 0; y < value.length; y++) {

					// doScaledTimeout2(y, value[y]);
					// //if button is pressed, break
					// doScaledTimeout3(y, value[y-1])
					// console.log("#" + value + "5");
				}	
			
			  
			});

	
	
		});
	


	});

	

