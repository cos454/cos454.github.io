var instructions = "These items deal with ways you've been coping with the stress in your life since you found out you were going to have to have this operation.  There are many ways to try to deal with problems.  These items ask what you've been doing to cope with this one.  Obviously, different people deal with things in different ways, but I'm interested in how you've tried to deal with it.  Each item says something about a particular way of coping.  I want to know to what extent you've been doing what the item says.  How much or how frequently.  Don't answer on the basis of whether it seems to be working or not—just whether or not you're doing it.  Use these response choices.  Try to rate each item separately in your mind from the others.  Make your answers as true FOR YOU as you can."

// survey questions/items are placed in this array
var item = [
"",
"I've been turning to work or other activities to take my mind off things.",
"I've been concentrating my efforts on doing something about the situation I'm in.",
"I've been saying to myself 'this isn't real'.",
"I've been using alcohol or other drugs to make myself feel better.",
"I've been getting emotional support from others.",
"I've been giving up trying to deal with it.",
"I've been taking action to try to make the situation better.",
"I've been refusing to believe that it has happened.",
"I've been saying things to let my unpleasant feelings escape.",
"I've been getting help and advice from other people.",
"I've been using alcohol or other drugs to help me get through it.",
"I've been trying to see it in a different light, to make it seem more positive.",
"I've been criticizing myself.",
"I've been trying to come up with a strategy about what to do.",
"I've been getting comfort and understanding from someone.",
"I've been giving up the attempt to cope.",
"I've been looking for something good in what is happening.",
"I've been making jokes about it.",
"I've been doing something to think about it less, such as going to movies, watching TV, reading, daydreaming, sleeping, or shopping.",
"I've been accepting the reality of the fact that it has happened.",
"I've been expressing my negative feelings.",
"I've been trying to find comfort in my religion or spiritual beliefs.",
"I've been trying to get advice or help from other people about what to do.",
"I've been learning to live with it.",
"I've been thinking hard about what steps to take.",
"I've been blaming myself for things that happened.",
"I've been praying or meditating.",
"I've been making fun of the situation."];


var responseScale = `
	<div class="btn-group-vertical" onclick="this.blur();">
	
		<button type="button" class="btn-response" id="choose1" value="1" name="radioGroup">
		I haven't been doing this at all
		</button>

		<button type="button" class="btn-response" id="choose2" value="2" name="radioGroup">
		I've been doing this a little bit
		</button>
		
		<button type="button" class="btn-response" id="choose3" value="3" name="radioGroup">
		I've been doing this a medium amount
		</button>
		
		<button type="button" class="btn-response" id="choose4" value="4" name="radioGroup">
		I've been doing this a lot
		</button>

	</div>`;

// Calculates the final score for the participant.
function compileResults(){
	// Computations

	self_distraction = results[0].item +  results[18].item
	active_coping = results[1].item +  results[6].item
	denial =  results[2].item +  results[7].item
	substance_use = results[3].item +  results[10].item
	use_of_emotional_support = results[4].item +  results[14].item
	use_of_instrumental_support = results[9].item +  results[22].item
	behavioral_disengagement = results[5].item +  results[15].item
	venting = results[8].item +  results[20].item
	positive_reframing = results[11].item +  results[16].item
	planning = results[13].item +  results[24].item
	humor = results[17].item +  results[27].item
	acceptance = results[19].item +  results[23].item
	religion = results[21].item +  results[26].item
	self_blame = results[12].item +  results[25].item

	//push to results array
	results.push({"self_distraction score": parseFloat(self_distraction)});
	console.log("self_distraction score = " + self_distraction);
	results.push({"active_coping score": parseFloat(active_coping)});
	console.log("active_coping score = " + active_coping);
	results.push({"denial score": parseFloat(denial)});
	console.log("denial score = " + denial);
	results.push({"substance_use score": parseFloat(substance_use)});
	console.log("substance_use score = " + substance_use);
	results.push({"use_of_emotional_support score": parseFloat(use_of_emotional_support)});
	console.log("use_of_emotional_support score = " + use_of_emotional_support);
	results.push({"use_of_instrumental_support score": parseFloat(use_of_instrumental_support)});
	console.log("use_of_instrumental_support score = " + use_of_instrumental_support);
	results.push({"behavioral_disengagement": parseFloat(behavioral_disengagement)});
	console.log("behavioral_disengagement score = " + behavioral_disengagement);
	results.push({"venting": parseFloat(venting)});
	console.log("venting score = " + venting);
	results.push({"positive_reframing": parseFloat(positive_reframing)});
	console.log("positive_reframing score = " + positive_reframing);
	results.push({"planning": parseFloat(planning)});
	console.log("planning score = " + planning);
	results.push({"humor": parseFloat(humor)});
	console.log("humor score = " + humor);
	results.push({"acceptance": parseFloat(acceptance)});
	console.log("acceptance score = " + acceptance);
	results.push({"religion": parseFloat(religion)});
	console.log("religion score = " + religion);
	results.push({"self_blame": parseFloat(self_blame)});
	console.log("self_blame score = " + self_blame);

	console.log(results);
	post();
};

//////////////////////////////////////////////////////////////////////
// DO NOT EDIT THE CODE BELOW UNLESS NECESSARY ///////////////////////

// Loads script from the given url.
function loadScript(url, callback) {
    // Adds the script tag to the head tag.
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then binds the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fires the loading.
    head.appendChild(script);
}

// Loads Bootstrap stylesheet.
function loadStyle() {
	var head = document.getElementsByTagName('head')[0];
    var link1 = document.createElement('link');
    link1.rel = "stylesheet";
    link1.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
    head.appendChild(link1);
}

// Sets up the document after the window has been loaded.
window.onload = function(e){
	const meta = document.createElement('meta'); 
	meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'); 
	meta.setAttribute('name', 'viewport'); 
	document.head.appendChild(meta);

    const metaTag = document.createElement('metaTag');
    metaTag.name = "viewport";
    metaTag.content = "width = device-width, initial-scale = 1.0";
    document.getElementsByTagName('head')[0].appendChild(metaTag);
	
	metaTag.name = "handheldfriendly";
	metaTag.content = "true";
	document.getElementsByTagName('head')[0].appendChild(metaTag);
	
	metaTag.name = "mobileoptimized";
	metaTag.content = "240";
	document.getElementsByTagName('head')[0].appendChild(metaTag);
    
    // Loads Bootstrap after jQuery has been loaded.
    let onjQLoad = function() {
      console.log("jQuery has been loaded.");
      loadStyle();  
      loadScript("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js", onBootstrapload);
      console.log("Bootstap has been loaded.");

    };

    // Loads FontAwesome after Bootstrap has been loaded.
    let onBootstrapload = function() {
      loadScript("https://use.fontawesome.com/releases/v5.0.8/js/all.js", renderArea);
      console.log("FontAwesome has been loaded.");
    };

    // Loads jQuery.
    loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", onjQLoad);
};

// Global variables
var results = []; // Array that will contain the results
var subtractor = 0; // Number of items skipped
var number = 1; // Index of current survey item
var itemArray = item.length; // Length of item array
var itemCount = item.length-1; // Number of items
var first = true; // Only true if current item is first item

// Helper Function: Given an item's score (itemScore) and the maximum possible value for the responses (maxValue), 
// returns the reverse scoring of the item.
function reverse (item, maxValue) {
	if (item == 0) 
		return 0.0;
	else {
		return (maxValue+1) - item
	}
}

// Renders the survey panel.
function renderArea() {
	// String representation of html code
	root_html =  
	"<div id='task' class='container-web bg-outer' style='padding: 10px;'>" +
		"<div class='progress mb-2'>" + 
			"<div class='progress-bar progress-bar-striped' id='progressbar' " + 
			" role='progressbar' aria-valuenow='0' aria-valuemin='0' "+ 
			"aria-valuemax=" + (itemCount) + " style='width: 0%'></div>" +
		"</div>" +
		"<div id='taskDetails'>" + 
			"<span id='instructions'>" + instructions + "</span><hr>" + 
			"<div id='currentItem'>" + 
				"<span id='stimuli' style='font-weight:bold;'> </span>" +
					"<div id='responseOptions'>" +
						"<div id='inside' class='bg-inner' style='padding: 15px;'></div>" + 
				"<div id='bottom' class='skip-bar' align='right'>" + 
					"<button type='button' class='skip-btn' value='0.00000001' name='radioGroup'> Skip </button>" +
				"</div>" + 
			"</div>" +
		"</div>" + 
	"</div>";
	
	$("#root").html(root_html);
	$("#inside").prepend(responseScale);

	// WEB CODE; DO NOT INCLUDE IN MOBILE----------------------------
	// Hover for buttons
	$("button").hover( 
		function() { // Adds hover class when mousein
		    $(this).addClass("btn-hover");
		}, 
		function() { // Removes hover class when mouseout
		    $( this ).removeClass("btn-hover");
		}
	);
	//--------------------------------------------------------------
	
	runTask();
};

// Repeatedly updates the survey panel after each item has been aswered.
function runTask() {
	
	// Adds a transition between survey items.
	document.activeElement.blur();

	if (first == false) {
		setTimeout(function(){
			document.activeElement.blur();

			$("#stimuli").html(item[number] + "<br /><br />");
			$("#currentItem").slideDown(450, "swing"); // Animation that slides down the new item and response options

			// Updates the progress bar.
			$("#progressbar").attr("aria-valuenow", number-1);
			let widthPercent = ((number-1) / (itemCount)) * 100;
			$("#progressbar").css("width", widthPercent+"%");

		}, 300);
	}
	else {	
		$("#stimuli").html(item[number] + "<br /><br />");
		document.activeElement.blur();

		// Updates the progress bar.
		let widthPercent = ((number-1) / (itemCount)) * 100;
		$("#progressbar").attr("style", "width: "+widthPercent+"%;");
	}

	setTimeout(function(){
		$("#responseOptions button").on("click", function () {

			first = false;

			let rating = this.value;
			
			if(rating < 0.5){
				subtractor++;
			}

			results.push({"item":parseInt(rating)});
			console.log("item" + " " + (number) + ", " + "rating = " + rating);
			
			$("#responseOptions button").off("click");
			number = ++number;

			if (number < itemArray) {
				$("#currentItem").slideUp(300, "swing"); // Animation that slides up the current item and response options
				runTask();
			}

			else {
				
				$("#progressbar").attr("aria-valuenow", number-1);
				$("#progressbar").css("width", "100%");
				$("#progressbar").addClass("progress-bar-animated");

				// Animation that slide up the current survey and slides down the processing results page.
				$("#taskDetails").slideUp("fast", "swing", function() {
						$("#taskDetails").html("<br><h4 class='text-center'>Getting your results...</h4><br>");
						$("#taskDetails").slideDown("fast", "swing")

				});

				compileResults();
			}
		});	
	}, 625);
};

// Gets a security token.
function getCSRFToken() {
	return document.getElementsByTagName("meta")["csrf-token"].content;
};

// Posts the results of the study
function post() {
 	
 	result_message = "Thank you for completing our survey." + "\n" + "self_distraction score" + self_distraction + "\n" + "active_coping score" + active_coping + "\n" + "denial score" + denial + "\n" + "substance_use score" + substance_use + "\n" + "use_of_emotional_support score" + use_of_emotional_support + "\n" + "use_of_instrumental_support score" + use_of_instrumental_support + "\n" + "behavioral_disengagement score" + behavioral_disengagement + "\n" + "venting score" + venting + "\n" + "positive_reframing score" + positive_reframing + "\n" + "planning score" + planning + "\n" + "humor score" + humor + "\n" + "acceptance score" + acceptance + "\n" + "religion score" + religion + "\n" + "self_blame score" + self_blame

	// String representation of html code
	root_html =  
	"<div id='task' class='container-web bg-outer' style='padding: 10px;'>" +
		"<div class='progress mb-2'>" + 
			"<span id='instructions'>" + result_message + "</span><hr>" + 
		"</div>" + 
	"</div>";
	
	$("#root").html(root_html);

	//--------------------------------------------------------------
	
	runTask();

	// let user_id = $("#user_id").html();
	// let study_id = $("#study_id").html();
    
 //    // WEB POST CODE  --------------------------------------------------
 //    let redirect = function(response) {window.location = response.redirect_url;};
	
	// $.post({
	// 	url: "/studies.json",
	// 	headers: {
	// 		'X-CSRF-Token': getCSRFToken(),
	// 	},
	// 	dataType: 'json',
	// 	data: {
	// 		study: {
	// 			user_id: user_id,
	// 			study_id: study_id,
	// 			custom_study_results: JSON.stringify(results),
	// 			score: score
	// 		}
	// 	},
	// 	success: redirect
	// });	

	// MOBILE POST CODE  --------------------------------------------------
	//let resultData = { custom_study_results: (results) , score:score } 
	//let str= JSON.stringify(resultData); setTimeout(function () { window.ReactNativeWebView.postMessage(str); },500);
};
//////////////////////////////////////////////////////////////////////////