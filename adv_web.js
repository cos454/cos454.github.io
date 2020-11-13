// Global variables
var results = []; // This keeps track of the responses throughout the survey.
var maxPageVisits = 9; //Number of questions displayed; this is used to update the progress bar.
var currentItem = 0; // Used for pages with response buttons.
var welcomeMsg = "<h2>Blicketosity Study</h2>In this experiment, you will need to make some predictions about some objects and their properties. Some of the objects that you will encounter in this experiment are called blickets. All blickets possess a property called blicketosity. A device called blicketosity meter will activate if a certain level of blicketosity is surpassed, but the blicketosity meter is sometimes not reliable."; 
var shows = [];

var images = ["abc", "a", "b", "c", "ab", "ac", "bc", ""];

for(let i = images.length - 1; i > 0; i--){
  const j = Math.floor(Math.random() * i)
  const temp = images[i]
  images[i] = images[j]
  images[j] = temp
}

var training_x = [];
var training_y = [];

var sampled = {};

var n = 0;

while (n < 4) {
	let i = Math.floor(Math.random() * Math.floor(8));

	if (!(i in sampled)) {
		training_x.push(images[i]);
		training_y.push(Math.floor(Math.random() * Math.floor(2)));
		n = n + 1;
		sampled[i] = true;
	}
}



console.log(images);

console.log(training_x);
console.log(training_y);

var training_data = `
					<h2>Training Data</h2>
					<div class="row p-1">
						<img src="data/` + training_x[0] + training_y[0] + `.png" style="width:30%;padding: 25px;">
						<img src="data/` + training_x[1] + training_y[1] + `.png" style="width:30%;padding: 25px;">
					</div>
					<div class="row p-1">
						<img src="data/` + training_x[2] + training_y[2] + `.png" style="width:30%;padding: 25px;">
						<img src="data/` + training_x[3] + training_y[3] + `.png" style="width:30%;padding: 25px;">
					</div>
					`;

var collapse_data = `
					<br>
					<div id="expandButton" style="height: 50px;width: 150px;background-color: #C0C0C0;align: center;" onmouseover="showData()"><center>Show Previous Training Data</center></div>
					<div id="expandData" style="display:none;"">
						<div class="row p-1">
							<img src="data/` + training_x[0] + training_y[0] + `.png" style="width:30%;padding: 25px;">
							<img src="data/` + training_x[1] + training_y[1] + `.png" style="width:30%;padding: 25px;">
						</div>
						<div class="row p-1">
							<img src="data/` + training_x[2] + training_y[2] + `.png" style="width:30%;padding: 25px;">
							<img src="data/` + training_x[3] + training_y[3] + `.png" style="width:30%;padding: 25px;">
						</div>
					</div>
					<br>
					`;


// Page with checkboxes and text inputs:
function page1() {
	document.activeElement.blur();

	let instructions = "Please take a look at the training data below and write down a hypothesis about the relationship between these objects and the blicket detector."  

	let task =
		`<div class="row p-2">
			<label for="text1">Type your hypothesis here:</label>
			<input type="text" class="form-control" id="hypothesis" 
			maxlength="100" placeholder="I suspect that...">
		 </div>`;
	// Updates the page to have the new content for this page.
	$("#instructions").html(instructions);
	$("#stimuli").html(training_data);
	$("#inside").html(task);

	
	bindInputs(); // Binds the input with id "other" so that pressing "enter" causes it to to lose focus.
	updateBottomBar(false, true) // Updates the bottom bar so that it has a next button but no skip button.
	stylePage(); // Styles the page. Do not remove this line of code!

	$("#taskDetails").animate({opacity: "1"}, "fast"); // Resets the opacity after everything on the page has been set up.

	let text = $("#text1").val();

	// Whenever the "next" button is pressed... 
	$("#next").on("click", function () {
		// If the other checkbox is checked, makes sure that its associated text input has been filled out.
			// For each of the checkboxes, if the checkbox is checked, then pushes its values to the results array.
			// Otherwise, pushes an empty string to the results array.

			// Pushes the text from the textfield underneath the other checkbox
			results.push(text);

			$("#next").off("click");
			$("#taskDetails").animate({opacity: "0"}, "fast"); // Reduces the opacity before going to next page

			setTimeout(function(){
				updateProgress(0); //Updates the progress bar before going to the next page...
				page2();
			},350);
		
	}); 
};



// Page with basic response buttons:
function page2() {
	document.activeElement.blur();

	var example_data = `
					<h4>Predict whether the causes below will cause the Blicketosity meter to activate.</h4><br>
					<div class="row p-1">
						<img id="current_example" src="data/` + images[currentItem] + "0" + `.png" style="width:30%;padding: 25px;">
					</div>
					`;

	let instructions = collapse_data; 

	let task =`
	<div class="btn-group-vertical" onclick="this.blur();">
	
	<button type="button" class="btn-response" id="choose1" value="1" onmouseover="blicketOn('data/` + images[currentItem] + "1" + `.png')">
	Meter activated
	</button>
 
	<button type="button" class="btn-response" id="choose2" value="2" onmouseover="blicketOff('data/` + images[currentItem] + "2" + `.png')">
	Meter not activated
	</button>

	</div>`;


	$("#instructions").html(instructions);
	$("#stimuli").html(example_data); // Adds the current item to the page.

	$("#inside").html(task);
	// If this is the first question, inserts the response scale and adds the skip button to the page.
	if (currentItem == 0) {

		  
		updateBottomBar(true, false) // Updates the bottom bar so that it has a skip button but no next button.
		stylePage(); // Styles the page. Do not remove this line of code!

		$("#taskDetails").animate({opacity: "1"}, "fast"); // Resets the opacity after everything on the page has been set up.
	}

	$("#currentItem").animate({opacity: "1"}, "fast"); // Resets the opacity after everything on the page has been set up.
  
	
	// Whenever a response button is clicked OR the "skip" button is pressed...
	$("#taskDetails button").on("click", function () {

		// Records value and push to results array.
		let rating = this.value;
		results.push(parseInt(rating));

		$("#taskDetails button").off("click");
		currentItem++;

		// If there are items remaining for this page...
		if (currentItem < 8) {
			
			$("#currentItem").animate({opacity: "0"}, "fast"); // Reduces the opacity before going to next page
			setTimeout(function(){
				updateProgress(0); // Updates the progress bar before going to the next item.
				page2(); // Loops back to this page...
			},350);
		}
		// Otherwise...
		else {
			$("#taskDetails").animate({opacity: "0"}, "fast"); // Reduces the opacity before going to next page.
			console.log(results);
			currentItem = 0; // Sets currentItem to 0 in case we need to use it on another page.
			setTimeout(function(){
				updateProgress(0); // Updates the progress bar before going to the next page.
				endSurvey();
			}, 350);
		}
	}); 
};



//////////////////////////////////////////////


//////////////////////////////////////////////
// Helper Functions //////////////////////////

// Displays the error message msg in a responsive bootstrap modal.
function error (msg) {
	$("#errorModal").modal("show");
	$("#error").html(msg);  
}


// Creates a slider inside parentContainer. The slider has a minimum 
// value of minVal and a maximum value of maxVal. The starting value of
// the slider is startVal.
function createSlider(parentContainer, minVal, maxVal, startVal) {
	$(parentContainer).slider({
		orientation: "vertical",
		range: "min",
		min: minVal,
		max: maxVal,
		step: 1,
		value: startVal,
	});
}


// Binds the enter button so pressing the
// enter button causes the currently active
// element to lose the page's focus.
function bindInputs(){
	$("input").keyup(function(e){
		if(e.keyCode == 13) {
			document.activeElement.blur();
		}
	});
}


// If hasSkip is true, then a skip button is added to the container with the id bottomBar;
// otherwise, bottomBar will not have a skip button.
// If hasNext is true, then a next button is added to the container with the id bottomBar;
// otherwise, bottomeBar will not have a next button.
function updateBottomBar(hasSkip, hasNext) {
	let skipButton = "<button type='button' class='skip-btn' value='0' name='radioGroup' id='skip'> Skip </button>";
	let nextButton = "<button id='next' type='button' class='btn-next mt-2'>Next</button>";

	$("#bottomBar").html("")

	if (hasSkip)
		$("#bottomBar").append(skipButton);

	if (hasNext) 
		$("#bottomBar").append(nextButton);
}


// If the page has rows, adds a border to each row currently on the page
// and alternates the color of the rows. Otherwise, it styles the background
// itself.
function stylePage() {
	let rows = $(".row");
	let length = $(rows).length
	if (length > 1) {
		for (let i = 0; i<length; i++) {
			$(rows[i]).addClass("row-border");
			if ((i%2) == 0 || i == 0) $(rows[i]).addClass("row-primary")
			else $(rows[i]).addClass("row-secondary")
		}

		$("#inside").removeClass("bg-inner p-2");
	}
	else {
		$("#inside").addClass("bg-inner p-2");
	}

	// WEB CODE; DO NOT INCLUDE IN MOBILE----------------------------
    // Hover for buttons
    let buttons = $("button")
    let buttonCount = $(buttons).length
    if (buttonCount > 0) {
        $("button").hover( 
        function() { // Adds hover class when mousein
            $(this).addClass("btn-hover");
        }, 
        function() { // Removes hover class when mouseout
            $( this ).removeClass("btn-hover");
        }
    );

    }
    //-------------------------------------------------------------- 
}


// Increments the progress bar by a single page.
var prevQuestion = 1;
function updateProgress(numOfSkippedQuestions) {
	prevQuestion += numOfSkippedQuestions;

	$("#progressbar").attr("aria-valuenow", prevQuestion);
	
	if (prevQuestion <  maxPageVisits) {
		let widthPercent = (prevQuestion / maxPageVisits) * 100;
		$("#progressbar").css("width", ""+widthPercent+"%");
	}
	else {
		$("#progressbar").css("width", "100%");
		$("#progressbar").addClass("progress-bar-animated");
	}
	prevQuestion++;
}
//////////////////////////////////////////////


//////////////////////////////////////////////
// DO NOT EDIT THE CODE BELOW ////////////////

function showData() {
	document.getElementById("expandData").style.display = "block";
	document.getElementById("expandButton").style.backgroundColor = "#ADD8E6";
}

function blicketOn(image_src) {
	document.getElementById("current_example").src = image_src;
}

function blicketOff(image_src) {
	document.getElementById("current_example").src = image_src;
}



function loadScript(url, callback) {
	// Adding the script tag to the head as suggested before
	let head = document.getElementsByTagName('head')[0];
	let script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;

	// Then bind the event to the callback function.
	// There are several events for cross browser compatibility.
	script.onreadystatechange = callback;
	script.onload = callback;

	// Fire the loading
	head.appendChild(script);
}

function loadStyle(url) {
	let head = document.getElementsByTagName('head')[0];
	let link = document.createElement('link');
	link.rel = "stylesheet";
	link.href = url;
	head.appendChild(link);
}

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
	
	
	function loadjQ() {
		loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", loadjQUI);
		console.log("jQuery has loaded.")
	}

	function loadjQUI() {
		loadScript("https://code.jquery.com/ui/1.12.1/jquery-ui.js", loadTouchPunch);
		console.log("jQuery-UI has loaded.")
	}
	function loadTouchPunch() {
		loadScript("https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js", loadBootstrap);
		console.log("jQuery-UI Touch-Punch has loaded.")
	}
	function loadBootstrap(){
		loadScript("https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js", loadFontAwesome);
		console.log("Bootstrap has loaded.")
	}

	function loadFontAwesome() {
		loadScript("https://use.fontawesome.com/releases/v5.0.8/js/all.js", welcome);
		console.log("FontAwesome has loaded.");
	}

	loadStyle("https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");
	loadStyle("https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css");
	loadjQ();
};

// Renders the welcome page of the survey.
function welcome() {
   let root_html = 
	`<div class='modal' id='errorModal'>
		<div class='modal-dialog modal-dialog-scrollable'>
			<div class='modal-content'>
				<div class='modal-header'>
					<h3 class='modal-title'>Error</h3>
					<button type='button' class='close' data-dismiss='modal' style='outline: none!important'>&times;</button>
				</div>
				<div class='modal-body'>
					<p id='error' class='lead'></p>
				</div>
				<div class='modal-footer'>
						<button type='button' class='btn btn-danger mx-auto' data-dismiss='modal'>Dismiss This Message</button>
				</div>
			</div>
		</div>
	</div>
	<div id='task' class='container-web bg-outer p-2'>
		<div id='taskDetails'>
			<span id='instructions'></span>
			<div id="bottomBar" class="text-right">
				<button id="next" type="button" class="btn-next mt-2">Begin</button>
			</div>
		</div>
	</div>`;

	$("#root").html(root_html);
	$("#instructions").html(welcomeMsg);

	// WEB CODE; DO NOT INCLUDE IN MOBILE----------------------------
    // Hover for buttons
    let buttons = $("button")
    let buttonCount = $(buttons).length
    if (buttonCount > 0) {
        $("button").hover( 
        function() { // Adds hover class when mousein
            $(this).addClass("btn-hover");
        }, 
        function() { // Removes hover class when mouseout
            $( this ).removeClass("btn-hover");
        }
    );

    }
    //-------------------------------------------------------------- 

	// When the "Begin" button is pressed...
	setTimeout(function(){
		$("#next").on("click", function () {
			$("#next").off("click");
			$("#taskDetails").animate({opacity: "0"}, "fast"); // Reduces the opacity before going to next page

			setTimeout(function(){
				let progress = 
				`<div class='progress mb-2'>
					<div class='progress-bar progress-bar-striped' id='progressbar'
					role='progressbar' aria-valuenow='0' aria-valuemin='0'
					aria-valuemax=` + maxPageVisits + ` style='width: 0%'></div>
				</div>`

				let new_details = 
				`<span id='instructions'></span><hr>
				<div id='currentItem'>
					<p id='stimuli' style='font-weight:bold;'> </p>
					<div id='responseOptions'>
						<div id='inside' class='container'></div>
					</div>
					<div id="bottomBar" class="text-right">
						<button id="next" type="button" class="btn-next mt-2">Next</button>
					</div>
				</div>`

				$("#task").prepend(progress);
				$("#taskDetails").html(new_details);
				page1() // Goes to the first page.
			}, 350)
		})
	}, 100)

};

function getCSRFToken() {
 return document.getElementsByTagName("meta")["csrf-token"].content;
};

// Pushes the final results of the survey to the server.
function endSurvey(){
	
	$("#taskDetails").slideUp("fast", "swing", function() {
		$("#taskDetails").html("<br><h4 class='text-center'>Getting your results...</h4><br>");
		$("#taskDetails").slideDown("fast", "swing")
	});

	var user_id = $("#user_id").html();
	var study_id = $("#study_id").html();
	
	result_message = "Thank you for completing our survey!";

	// String representation of html code
	root_html =  
	"<div id='task' class='container-web bg-outer' style='padding: 10px;'> <br><br>" +
			"<span id='instructions'>" + result_message + "</span><hr>"  + 
	"</div>";
	
	$("#root").html(root_html);

	var data = JSON.stringify({
	  "x": "demo" + training_x[0] + ", " + training_x[1] + ", " + training_x[2] + ", " + training_x[3],
	  "y": training_y[0] + ", " + training_y[1] + ", " + training_y[2] + ", " + training_y[3],
	  "results": results[1] + ", " + results[2] + ", " + results[3] + ", " + results[4] + ", " + results[5] + ", " + results[6] + ", " + results[7] + ", " + results[8],
	  "reason": results[0]
	});

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = false;

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === 4) {
	    console.log(this.responseText);
	  }
	});

	xhr.open("POST", "https://cos454-e390.restdb.io/rest/results");
	xhr.setRequestHeader("content-type", "application/json");
	xhr.setRequestHeader("x-apikey", "5fadd27e863959728838532d");
	xhr.setRequestHeader("cache-control", "no-cache");

	xhr.send(data);

	//--------------------------------------------------------------

	// // WEB POST CODE  --------------------------------------------------
	// let redirect = function(response) {window.location = response.redirect_url;};
	
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
	// 			//score: score
	// 		}
	// 	},
	// 	success: redirect
	// });

	// MOBILE POST CODE  --------------------------------------------------
	// let resultData = { custom_study_results: (results) } 
	// let str = JSON.stringify(resultData); setTimeout(function () { window.ReactNativeWebView.postMessage(str); },500);
};
