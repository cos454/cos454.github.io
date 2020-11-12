// Global variables
var results = []; // This keeps track of the responses throughout the survey.
var maxPageVisits = 16; //Number of questions displayed; this is used to update the progress bar.
var currentItem = 0; // Used for pages with response buttons.
var welcomeMsg = "Netflix and You: Hi! In this study, we are interested in examining how individuals engage with digital media and online streaming services. This study will ask you several questions about how you like to watch movies/shows and how watching those movies/shows makes you feel." 
var shows = [];

// Page with checkboxes and text inputs:
function page1() {
	document.activeElement.blur();

	let instructions = "What are your favorite movie/show genres? Please select all that apply."  

	let task =
		`<div class="row p-1">
			<div class="custom-control custom-checkbox">
				<input type="checkbox" class="custom-control-input" name="checks" value="Comedy" id="check1">
				<label class="custom-control-label"" for="check1">Comedy</label>
			</div>
		</div>

		<div class="row p-1">
			<div class="custom-control custom-checkbox">
				<input type="checkbox" class="custom-control-input" name="checks" value="Romance" id="check2" name=>
				<label class="custom-control-label" for="check2">Romance</label>
			</div>
		</div>

		<div class="row p-1">
			<div class="custom-control custom-checkbox">
				<input type="checkbox" class="custom-control-input" name="checks" value="Drama" id="check3">
				<label class="custom-control-label" for="check3">Drama</label>
			</div>
		</div>

		<div class="row p-1">
			<div class="custom-control custom-checkbox">
				<input type="checkbox" class="custom-control-input" name="checks" value="Suspense" id="check4">
				<label class="custom-control-label" for="check4">Suspense</label>
			</div>
		</div>

		<div class="row p-1">
			<div class="custom-control custom-checkbox">
				<input type="checkbox" class="custom-control-input" name="checks" value="Horror/Thriller" id="check5">
				<label class="custom-control-label" for="check5">Horror/Thriller</label>
			</div>
		</div>

		<div class="row p-1">
			<div class="custom-control custom-checkbox">
				<input type="checkbox" class="custom-control-input" name="checks" value="Action" id="check6">
				<label class="custom-control-label" for="check6">Action</label>
			</div>
		</div>

		<div class="row p-1">
			<div class="custom-control custom-checkbox">
				<input type="checkbox" class="custom-control-input" name="checks" value="Adventure" id="check7">
				<label class="custom-control-label" for="check7">Adventure</label>
			</div>
		</div>

		<div class="row p-1">
			<div class="col-12 p-0">
				<div class="custom-control custom-checkbox">
					<input type="checkbox" class="custom-control-input" name="checks" value="Other" id="checkOther">
					<label class="custom-control-label" for="checkOther"> Other, please specify:</label>
				</div>
			</div>
			<div class="col-12 col-md-6 col-lg-4  p-1 pl-4">
				<input type="text" class="form-control text-left" maxlength="20" id="textOther" disabled>
			</div>
		</div>`;
	// Updates the page to have the new content for this page.
	$("#instructions").html(instructions);
	$("#stimuli").html("");
	$("#inside").html(task);

	
	bindInputs(); // Binds the input with id "other" so that pressing "enter" causes it to to lose focus.
	updateBottomBar(false, true) // Updates the bottom bar so that it has a next button but no skip button.
	stylePage(); // Styles the page. Do not remove this line of code!

	$("#taskDetails").animate({opacity: "1"}, "fast"); // Resets the opacity after everything on the page has been set up.

	// If the other checkbox is checked, then its associated text input is activated; otherwise, it's deactivated...
	$("#checkOther").on('change', function(){
		if ($(this).prop("checked")) {
			$("#textOther").removeAttr("disabled");
		}
		else {
			$("#textOther").val("");
			$("#textOther").attr("disabled", "true");
		}
	});

	// Whenever the "next" button is pressed... 
	$("#next").on("click", function () {
		// If the other checkbox is checked, makes sure that its associated text input has been filled out.
		if ( $("#checkOther").is(":checked") && $("#textOther").val() == "") {
			error("Hmm, it looks like you forgot to enter text for the \"Other\" checkbox.")
			return;
		}
		else {
			// For each of the checkboxes, if the checkbox is checked, then pushes its values to the results array.
			// Otherwise, pushes an empty string to the results array.
			$('input[name="checks"]').each(function(i, v) {
				var current = ($(v).is(":checked"))? $(v).val() : "";
				results.push({"checkboxes2": current});
			});

			// Pushes the text from the textfield underneath the other checkbox
			results.push( {"other_text": $("#textOther").val()} );

			console.log(results);

			$("#next").off("click");
			$("#taskDetails").animate({opacity: "0"}, "fast"); // Reduces the opacity before going to next page

			setTimeout(function(){
				updateProgress(0); //Updates the progress bar before going to the next page...
				page2();
			},350);
		}
	}); 
};



// Page with simple radio buttons:
function page2() {
	document.activeElement.blur();

	let instructions = "Do you use Netflix, Hulu or any other online streaming service to watch movies/shows?"     
	// Clears out the container with id inside so that we can gradually append the checkboxes.
	$("#inside").html("");
	
	// This is the array of checkbox items. 
	let radioButtons = ["Yes",
						"No"];

	// Appends each checkbox item in the array above to the container with id #inside.
	for (i = 0; i < radioButtons.length; i++) {
		let radioAdd =
		"<div class='row p-1'>" +
			"<div class='custom-control custom-radio'>" +
				"<input type='radio' class='custom-control-input' " +
				"name='radios' value='" + radioButtons[i] + "' id='radio" + i + "'>" +
				"<label class='custom-control-label' for='radio" + i + "'>" + radioButtons[i] + "</label>" +
			"</div>" +
		"</div>";

		$("#inside").append(radioAdd);
	}

	$("#instructions").html(instructions);
	$("#stimuli").html("");
	
	updateBottomBar(false, true) // Updates the bottom bar so that it has a next button but no skip button.
	stylePage(); // Styles the page. Do not remove this line of code!

	$("#taskDetails").animate({opacity: "1"}, "fast"); // Resets the opacity after everything on the page has been set up.

	let yes = false;
	let no = false;
	// When the next button is clicked...
	$("#next").on("click", function () {
		// If an item is checked, pushes its value into the results array.
		// Otherwise, pushes an empty string into the array.
		$('input[name="radios"]').each(function(i, v) {
			let current = ($(v).is(":checked"))? $(v).val() : "";
			if (current == 'Yes') {
				yes = true;
			} else if (current == 'No') {
				no = true;
			}
			results.push({"radiobuttons": current});
		});

		console.log(results[results.length-1]);

		if (yes) {
			$("#next").off("click");
			$("#taskDetails").animate({opacity: "0"}, "fast"); // Reduces the opacity before going to next page
			setTimeout(function(){
				updateProgress(0); // Updates the progress bar before going to the next page.
				page3();
			},350);
		} else if (no) {
			$("#next").off("click");
			$("#taskDetails").animate({opacity: "0"}, "fast"); // Reduces the opacity before going to next page
			setTimeout(function(){
				updateProgress(0); // Updates the progress bar before going to the next page.
				results.push("placeholder 2");
				updateProgress(0);
				results.push("placeholder 3");
				updateProgress(0);
				results.push("placeholder 4");
				updateProgress(0);
				results.push("placeholder 5");
				page6();
			},350);
		} else {
			error("Please select either yes or no.")
			setTimeout(function(){
				page2();
			},350);
		}



	});
};


// Page number inputs that allows participants to leave blank responses:
function page3(){
	document.activeElement.blur();

	let instructions = "Approximately how many hours do you spend a day performing the following activities?" 

	let task =
		`<div class="row align-items-center">
			<div class="col-lg-2 col-sm-4 col-6 p-2">
				<label class="sr-only">Number Input 1</label>
				<input type="number" min="0" max="10" class="form-control text-center" 
				id="num1" placeholder="# hours" value=0>
			</div>
			<div class="col-lg-10 col-sm-8 col-6 p-2">
				Watching movies on online streaming services (like Netflix and Hulu).

			</div>
		</div>

		<div class="row align-items-center">
			<div class="col-lg-2 col-sm-4 col-6 p-2">
				<label class="sr-only">Number Input 2</label>
				<input type="number" min="0" max="10" class="form-control text-center" 
				id="num2" placeholder="# hours" value=0>
			</div>
			<div class="col-lg-10 col-sm-8 col-6 p-2">
				Watching shows on online streaming services.

			</div>
		</div>

		<div class="row align-items-center">
			<div class="col-lg-2 col-sm-4 col-6 p-2">
				<label class="sr-only">Number Input 3</label>
				<input type="number" min="0" max="10" class="form-control text-center" 
				id="num3" placeholder="# hours" value=0>
			</div>
			<div class="col-lg-10 col-sm-8 col-6 p-2">
				Watching movies and/or shows on cable television (or any service that is not an online streaming service).

			</div>
		</div>`;

	// Updates the page to have the new content for this page.
	$("#instructions").html(instructions);
	$("#stimuli").html("");
	$("#inside").html(task);

	bindInputs(); // Binds inputs so that pressing "enter" causes the currently active input to lose focus.
	updateBottomBar(false, true) // Updates the bottom bar so that it has a next button but no skip button.
	stylePage(); // Styles the page. Do not remove this line of code!

	$("#taskDetails").animate({opacity: "1"}, "fast"); // Resets the opacity after everything on the page has been set up.

	// When the next button is pushed...
	$("#next").on("click", function () {
		let num1 = $("#num1").val();
		let num2 = $("#num2").val();
		let num3 = $("#num3").val();

		// Checks that all responses are numbers
		if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
			error("Make sure that you are only entering positive numbers!");
			return false;
		}
		// Checks that all the numbers are positive
		else if (parseFloat(num1) < 0 || parseFloat(num2) < 0 || parseFloat(num3) < 0) {
			error("Make sure that you are only entering positive numbers!");
			return false;
		}
		else {

			// If this question was skipped...
			if (num1 == "") {
				num1 = -1; // Set the value of num1 to be -1.
			}

			// If this question was skipped...
			if (num2 == "") {
				num2 = -1; //Set the value of num2 to be -1.
			}

			// If this question was skipped...
			if (num3 == "") {
				num3 = -1; //Set the value of num3 to be -1.
			}

			results.push( 
					{"num1": parseFloat(num1)},
					{"num2": parseFloat(num2)},
					{"num3": parseFloat(num3)});
			
			console.log(results);

			$("#next").off("click"); 
			$("#taskDetails").animate({opacity: "0"}, "fast"); // Reduces the opacity before going to next page
					
			setTimeout(function(){
				updateProgress(0); // Updates the progress bar before going to the next page.
				page4();
			},350);		
		} 
	});
};


// Page with text inputs that allow participants to enter lines of text:
function page4(){
	document.activeElement.blur();

	let instructions = "Please list five (or fewer) shows that you are currently watching with an online streaming service:" 

	let task =
		`<div class="row p-2">
			<label for="text1">Show 1</label>
			<input type="text" class="form-control" id="text1" 
			maxlength="25" placeholder="Enter show here...">
		 </div>

		<div class="row p-2">
			<label for="text2">Show 2</label>
			 <input type="text" class="form-control" id="text2" 
			 maxlength="25" placeholder="Enter show here...">
		</div>

		<div class="row p-2">
			<label for="text2">Show 3</label>
			 <input type="text" class="form-control" id="text3" 
			 maxlength="25" placeholder="Enter show here...">
		</div>

		<div class="row p-2">
			<label for="text2">Show 4</label>
			 <input type="text" class="form-control" id="text4" 
			 maxlength="25" placeholder="Enter show here...">
		</div>

		<div class="row p-2">
			<label for="text2">Show 5</label>
			 <input type="text" class="form-control" id="text5" 
			 maxlength="25" placeholder="Enter show here...">
		</div>

		`;

	// Updates the page to have the new content for this page.
	$("#instructions").html(instructions);
	$("#stimuli").html("");
	$("#inside").html(task);

	bindInputs(); // Binds inputs so that pressing "enter" causes the currently active input to lose focus.
	updateBottomBar(false, true) // Updates the bottom bar so that it has a next button but no skip button.
	stylePage(); // Styles the page. Do not remove this line of code!

	$("#taskDetails").animate({opacity: "1"}, "fast"); // Resets the opacity after everything on the page has been set up.

	// When the next button is pushed...
	$("#next").on("click", function () {
		// Pushes the text inputs' values into the results array.
		let text1 = $("#text1").val();
		let text2 = $("#text2").val();
		let text3 = $("#text3").val();
		let text4 = $("#text4").val();
		let text5 = $("#text5").val();


		if (text1.length != 0) {
			shows.push(text1)
		}
		if (text2.length != 0) {
			shows.push(text2)
		}
		if (text3.length != 0) {
			shows.push(text3)
		}
		if (text4.length != 0) {
			shows.push(text4)
		}
		if (text5.length != 0) {
			shows.push(text5)
		}


		console.log(text1);
		console.log(text2);

		results.push( 
			{"text": text1},
			{"text": text2});
				
		console.log(results);
		

		$("#taskDetails").animate({opacity: "0"}, "fast"); // Reduces the opacity before going to next page
		$("#next").off("click"); 
		
		if(text1.length == 0) {
			error("Please specify at least one show.")
			setTimeout(function(){
					page4();
				},350);
			} else {

		setTimeout(function(){
			updateProgress(0); // Updates the progress bar before going to the next page.
			page5();
		},350);
		}
	});
}


// Page with dropdown items:
function page5(){
	document.activeElement.blur();

	// Clears out the content of this div and repopulate below with new material.
	$("#inside").html("");
	
	let instructions = "Please select the total number of hours that you have spent this past week watching the shows listed in the previous question:"

	// let dropdowns = ["Dropdown 1",
	// 			"Dropdown 2",
	// 			"Dropdown 3"];

	let dropdowns = shows;

	// Appends a dropdown for each interaction partner that was checked in the previous page...
	for (let i = 0; i < dropdowns.length; i++) {
		if (dropdowns[i] !== "") {
			let rowAdd = 
			"<div class='row'>" +
				"<div class='col p-2'>" +
					"<label for='" + i + "' class='mr-2'>" + dropdowns[i] + ":</label>" +
			 
					"<select id='" + i + "' name='dropdowns' class='custom-select col-12 col-md-4'>" +
						"<option value=-1 selected>Choose...</option>" +
						"<option value=0> 1 or fewer </option>" +
						"<option value=1> About 2 </option>" +
						"<option value=2> About 3 </option>" +
						"<option value=3> About 4 </option>" +
						"<option value=4> 5 or more</option>" +
					"</select>" +
				"</div>" +
			"</div>";
			$("#inside").append(rowAdd);
		}
	}

	$("#instructions").html(instructions);
	$("#stimuli").html("");
	
	updateBottomBar(false, true) // Updates the bottom bar so that it has a skip button but no next button.
	stylePage(); // Styles the page. Do not remove this line of code!

	$("#taskDetails").animate({opacity: "1"}, "fast"); // Resets the opacity after everything on the page has been set up.
	
	let throw_error = false;
  
	// Whenever the "next" button is pressed...
	$("#next").on("click", function () {
		// Pushes all of the dropdown values to the results array.
		$('select[name="dropdowns"]').each(function(i, v) {
			let current = $(v).val();
			if (current == -1) {
				throw_error = true;
			}
			results.push({ "dropdown" : parseInt(current) }); 
		});

		console.log(results);

		$("#next").off("click");
		$("#taskDetails").animate({opacity: "0"}, "fast"); // Reduces the opacity before going to next page

		if (throw_error) {
			setTimeout(function(){
				error("Please select an option for each of the shows you watch.")
				updateProgress(0); //Updates the progress bar before going to the next page...
				page5();
			},350);
		} else {

		setTimeout(function(){
			updateProgress(0); //Updates the progress bar before going to the next page...
			page6();
		},350);
	}
	}); 
};


// Page with basic response buttons:
function page6() {
	document.activeElement.blur();
	let items = ["Watching movies/shows improves the quality of my life.",
				"I often watch movies/shows to escape from reality.",
				"I feel like others don't understand my taste in movies/shows.",
				"I think that most shows/movies don't have enough diverse representation.",
				"It is difficult for me to find movies/shows with characters that I can identify with."];

	let instructions = "Please use the response scale below to indicate how much you agree or disagree with the following statement:" 

	let task =`
	<div class="btn-group-vertical" onclick="this.blur();">
	
	<button type="button" class="btn-response" id="choose1" value="1">
	Strongly agree
	</button>

	<button type="button" class="btn-response" id="choose2" value="2">
	Agree
	</button>
		
	<button type="button" class="btn-response" id="choose3" value="3">
	Slightly agree
	</button>
		
	<button type="button" class="btn-response" id="choose4" value="4">
	Slightly disagree
	</button>
		
	<button type="button" class="btn-response" id="choose5" value="5">
	Disagree
	</button>
  
  	<button type="button" class="btn-response" id="choose6" value="6">
	Strongly disagree
	</button>

	</div>`;

	$("#instructions").html(instructions);
	$("#stimuli").html(items[currentItem]); // Adds the current item to the page.

	// If this is the first question, inserts the response scale and adds the skip button to the page.
	if (currentItem == 0) {
		$("#inside").html(task);
		  
		updateBottomBar(true, false) // Updates the bottom bar so that it has a skip button but no next button.
		stylePage(); // Styles the page. Do not remove this line of code!

		$("#taskDetails").animate({opacity: "1"}, "fast"); // Resets the opacity after everything on the page has been set up.
	}

	$("#currentItem").animate({opacity: "1"}, "fast"); // Resets the opacity after everything on the page has been set up.
  
	
	// Whenever a response button is clicked OR the "skip" button is pressed...
	$("#taskDetails button").on("click", function () {

		// Records value and push to results array.
		let rating = this.value;
		results.push({"buttons": parseInt(rating)});

		$("#taskDetails button").off("click");
		currentItem++;

		// If there are items remaining for this page...
		if (currentItem < items.length) {
			
			$("#currentItem").animate({opacity: "0"}, "fast"); // Reduces the opacity before going to next page
			setTimeout(function(){
				updateProgress(0); // Updates the progress bar before going to the next item.
				page6(); // Loops back to this page...
			},350);
		}
		// Otherwise...
		else {
			$("#taskDetails").animate({opacity: "0"}, "fast"); // Reduces the opacity before going to next page.
			console.log(results);
			currentItem = 0; // Sets currentItem to 0 in case we need to use it on another page.
			setTimeout(function(){
				updateProgress(0); // Updates the progress bar before going to the next page.
				page7();
			}, 350);
		}
	}); 
};



// Page with a slider input:
function page7(){
	document.activeElement.blur();

	let instructions = "Please use the slider below to indicate how you feel after performing the following activity:"  


	let items = ["Watching a movie/show alone.",
				"Watching a movie/show with friends.",
				"Watching a movie/show with family members.",
				"Starting a series that you anticipate liking.",
				"Finishing a series that you really enjoyed."];

	let item = items[currentItem];

	let task =`
	<div class="text-center">
		<label for="sliderContainer"> Content </label>
		<div id="sliderContainer" class="mx-auto">
		</div>
		<label for="sliderContainer"> Unsatisfied </label>
	</div>`;

	// Updates the page to have the new content for this page.
	$("#instructions").html(instructions);
	$("#stimuli").html(item);
	$("#inside").html(task);

	updateBottomBar (true, true); // Updates the bottom bar of the page so that it has a skip button and a next button.
	stylePage(); // Styles the page. Do not remove this line of code!

	// Creates a slider inside of the container with the id sliderContainer. The slider has a minimum value of 0, a max value of
	// 100, and a starting value of 50.
	createSlider("#sliderContainer", 0, 100, 50)

	$("#taskDetails").animate({opacity: "1"}, "fast"); // Resets the opacity after everything on the page has been set up.
	$("#sliderContainer").animate({opacity: "1"}, "fast"); // Resets the opacity after everything on the page has been set up.
	$("#currentItem").animate({opacity: "1"}, "fast");

	// When the skip button is clicked...
	$("#skip").on("click", function () {
		// Pushes a -1 to the results array for this question.
		let rating = -1;

		results.push({"slider": parseFloat(rating)});
		console.log(results);

		$("#bottomBar button").off("click");

		if (currentItem < items.length) {
			currentItem++;
			$("#currentItem").animate({opacity: "0"}, "fast"); // Reduces the opacity before going to next page
			setTimeout(function(){
				updateProgress(0); // Updates the progress bar before going to the next item.
				page7(); // Loops back to this page...
			},350);
		} else {

			updateProgress(0); // Updates the progress bar before going to the next page.
			endSurvey();
		}
	});

	// When the next button is clicked...
	$("#next").on("click", function () {
		// Pushes the value of the slider inside of sliderContainer.
		let rating = $("#sliderContainer").slider("option", "value");

		results.push({"slider": parseInt(rating)});
		console.log(results);

		$("#bottomBar button").off("click");

		if (currentItem < items.length) {
			currentItem++;
			$("#currentItem").animate({opacity: "0"}, "fast"); // Reduces the opacity before going to next page
			setTimeout(function(){
				updateProgress(0); // Updates the progress bar before going to the next item.
				page7(); // Loops back to this page...
			},350);
		} else {

			updateProgress(0); // Updates the progress bar before going to the next page.
			endSurvey();
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
	

	// WEB POST CODE  --------------------------------------------------
	let redirect = function(response) {window.location = response.redirect_url;};
	
	$.post({
		url: "/studies.json",
		headers: {
			'X-CSRF-Token': getCSRFToken(),
		},
		dataType: 'json',
		data: {
			study: {
				user_id: user_id,
				study_id: study_id,
				custom_study_results: JSON.stringify(results),
				//score: score
			}
		},
		success: redirect
	});

	// MOBILE POST CODE  --------------------------------------------------
	// let resultData = { custom_study_results: (results) } 
	// let str = JSON.stringify(resultData); setTimeout(function () { window.ReactNativeWebView.postMessage(str); },500);
};
