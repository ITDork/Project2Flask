
// Set filteredAddresses to addressData initially
var filteredTordata = dataSet;

var searchResultCount = 10; // initially show 20 search results per page
var currentPage = 1;


// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $userInput = document.querySelector("#userinput");
var $searchBtn = document.querySelector("#search");
var $searchTypeDropDwn = document.querySelector("#dropdownMenu1");
var $selection = document.querySelector("#selection");
var selectType = "mm/dd/yyyy" //initial default is date

// get list of valid inputs
var validDates = dataSet.map(x=>x.Date);
var validCounties = dataSet.map(x=>x.County)
var validStates = dataSet.map(x=>x.State)
var validFujita = dataSet.map(x=>x.Fujita)
var validFatalities = dataSet.map(x=>x.Fatalities)

//get pagination buttons
var lastPage = Math.ceil(filteredTordata.length / searchResultCount);
var $pagenext = d3.select("#next");
var $page1 = d3.select("#page1");
var $page2 = d3.select("#page2");
var $page3 = d3.select("#page3");
var $page4 = d3.select("#page4");
var $page5 = d3.select("#page5");
var $pageprev = d3.select("#prev");
var $pagecurrent = d3.select("#pagec");
var $pageoverflow = d3.select("#pageoverflow");


// reset filtered count results and re-display results
function setSearchResultCount(count){
  var previouspagecount = searchResultCount;
  var oldpages = Math.ceil(filteredTordata.length/searchResultCount) 
  var newpages = Math.ceil(filteredTordata.length/count) 
  if (count>searchResultCount){
    $pagecurrent.attr("class","hidden");
    // there are more results per page, check if need to hide page buttons
    if (newpages<5) {
      $page5.attr("class","hidden");
    }
    if (newpages<4){
      $page4.attr("class","hidden");
    }
    if (newpages<3){
      $page3.attr("class","hidden");
    }
    if (newpages<2){
      $page2.attr("class","hidden");
    }
  } 
  else {
    // need to unhide page buttons
    if (oldpages<5 && newpages >= 5) {
      $page5.attr("class","enable")
    }
    if (oldpages<4 && newpages >= 4){
      $page4.attr("class","enabled")
    }
    if (oldpages<3 && newpages >= 3){
      $page3.attr("class","enabled")
    }
    if (oldpages<2 && newpages >= 2){
      $page2.attr("class","enabled")
    }
    
  }
  // reset back to page 1
  currentPage = 1;
  $page1.attr("class","active");
  searchResultCount = count;
  lastPage = newpages;
  renderTable();
}

// Add an event listener to the searchButton, searchType call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Pagination Next page selection
$pagenext.on("click",function(){

  // if already on the last page return, and disable button
  if (currentPage == lastPage){
    $pagenext.attr("class","disabled");
    return;
  }

  // Reset table content and highlighted pagination buttons to the new page
  currentPage = currentPage +1;
  $active = d3.select(".active");
  $active.attr("class","inactive");
  $pagecurrent.attr("class","hidden");

  switch(currentPage) {
    case(1):
      $page1.attr("class","active");  
    break;
    case(2):
      $page2.attr("class","active");
    break;
    case(3):
      $page3.attr("class","active");
    break;
    case(4):
      $page4.attr("class","active");
    break;
    case(5):
      $page5.attr("class","active");
    break;
    default:
      console.log("setting page larger than 5");
      $pagecurrent.attr("class","active");
      $pageoverflow.text(currentPage);      
  }

  console.log("current page", currentPage);
  console.log("last page ",lastPage);
  if (currentPage == lastPage){
    console.log("disable next page");
    $pagenext.attr("class","disabled");  
  } else {
    console.log("re-enable next page");
    $pagenext.attr("class","enabled");  
  }

  //re-enable previous page
  $pageprev.attr("class","enabled");

  renderTable();
  console.log("current page ", currentPage, " last page ", lastPage);


});

// Pagination page 1 selection
$page1.on("click",function(){
  currentPage = 1;
  $active = d3.select(".active");
  $active.attr("class","inactive");
  $page1.attr("class","active");
  $pageprev.attr("class","disabled");
  $pagecurrent.attr("class","hidden");
  $pageoverflow.text("");

  renderTable();
  console.log("current page ", currentPage, " last page ", lastPage);
});

// Pagination page 2 selection
$page2.on("click",function(){
  currentPage = 2;
  $active = d3.select(".active");
  $active.attr("class","inactive");
  $page2.attr("class","active");
  $pageprev.attr("class","enabled");
  $pagecurrent.attr("class","hidden");
  $pageoverflow.text("");

  renderTable();
  console.log("current page ", currentPage, " last page ", lastPage);

});

// Pagination page 3 selection
$page3.on("click",function(){
  currentPage = 3;
  $active = d3.select(".active");
  $active.attr("class","inactive");
  $page3.attr("class","active");
  $pageprev.attr("class","enabled");
  $pagecurrent.attr("class","hidden");
  $pageoverflow.text("");

  renderTable();
  console.log("current page ", currentPage, " last page ", lastPage);

});

// Pagination page 4 selection
$page4.on("click",function(){
  currentPage = 4;
  $active = d3.select(".active");
  $active.attr("class","inactive");
  $page4.attr("class","active");
  $pageprev.attr("class","enabled");
  $pagecurrent.attr("class","hidden");
  $pageoverflow.text("");

  renderTable();
  console.log("current page ", currentPage, " last page ", lastPage);

});

// Pagination page 5 selection
$page5.on("click",function(){
  currentPage = 5;
  $active = d3.select(".active");
  $active.attr("class","inactive");
  $page5.attr("class","active");
  $pageprev.attr("class","enabled");
  $pagecurrent.attr("class","hidden");
  $pageoverflow.text("");

  renderTable();
  console.log("current page ", currentPage, " last page ", lastPage);

});

// Pagination Previous page selection
$pageprev.on("click",function(){

  if (currentPage==1){
    return;
  }
  currentPage = currentPage -1;
  $active = d3.select(".active");
  $active.attr("class","inactive");
  $pageoverflow.text("");
  $pagecurrent.attr("class","hidden");

  switch(currentPage) {
    case(1):
      $page1.attr("class","active");  
      $pageprev.attr("class","disabled")
    break;
    case(2):
      $page2.attr("class","active");
    break;
    case(3):
      $page3.attr("class","active");
    break;
    case(4):
      $page4.attr("class","active");
    break;
    case(5):
      $page5.attr("class","active");
    break;
    default:
      $pagecurrent.attr("class","active");
      $pageoverflow.text(currentPage);
  }


  renderTable();
  console.log("current page ", currentPage, " last page ", lastPage);

});


// Handle Search criteria selection via drop down
d3.selectAll(".dropdown-item").on("click", function handleSearchTypeSelect() {
    var mylinkAnchor = d3.select(this);
    // reset the filtered data to original set (to re-apply filtering)
    var filteredTordata = dataSet;
    console.log("set the selection");
    //set the selection type
    selectType = mylinkAnchor.attr("id");
    if (selectType == "mm/dd/yyyy"){
      $selection.text = "Date";
    } else if (selectType == "Enter Fatalities"){
      $selection.text ="Fatalities";
    } else if (selectType == "Enter State") {
      $selection.text = "State";
    } else if (selectType == "Enter Fujita"){
      $selection.text = "Fujita";
    } else if (selectType == "Enter County"){
      $selection.text = "County";
    }

    console.log("mylinkAnchorAttribute: " + selectType);
    var inputtext = d3.select($userInput)

    console.log("set the placeholder");
    inputtext.attr("placeholder",selectType)
    inputtext.value='';
    
});


// renderTable renders the filteredTorData to the tbody
function renderTable() {
  $tbody.innerHTML = "";

  // set values to match pagination selection
  var start_i = (currentPage-1) * searchResultCount;
  if (currentPage * searchResultCount < filteredTordata.length)
  {
    var stop_i = currentPage * searchResultCount;
  }
  else
  {
    var stop_i = filteredTordata.length;
  }
  console.log("start at ", start_i);
  console.log("stop at ", stop_i); 
  console.log("last page for current search ",lastPage);

  // filter the data to match the search criteria
  for (var i = start_i; i < stop_i; i++) {
      console.log('i:', i);
      var tordata = filteredTordata[i];
      var fields = Object.keys(tordata);
      // re-establish index to start from 0 for insertRow
      var insert_i = i-((currentPage-1)*searchResultCount);
      // Create a new row in the tbody, set the index to be i + startingIndex
      var $row = $tbody.insertRow(insert_i);
      for (var j = 0; j < fields.length; j++) {
        // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
        var field = fields[j];
        var $cell = $row.insertCell(j);
        $cell.innerText = tordata[field];
      }
    }
}

// Utility function to validate user input
function validate(inputText)
{
  if (selectType == "mm/dd/yyyy"){
    var dateformat = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
    // var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    // Match the date format through regular expression
    if (inputText.value.match(dateformat)){
      console.log("valid date "+inputText.value);
      var parsedate = inputText.value.split('/');
      var mm  = parseInt(parsedate[0]);
      var dd = parseInt(parsedate[1]);
      var yyyy = parseInt(parsedate[2]);
      
      // Create list of days of a month
      var DaysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
      if (mm==1 || mm>2){
        if (dd>DaysInMonth[mm-1]){
         alert('Invalid date: day exceed days of the month!');
         return false;}}
      if (mm==2){
        // Check for leap year
        var leapyear = false;
        if ( (!(yyyy % 4) && yyyy % 100) || !(yyyy % 400)) {
          leapyear = true;}
        if ((leapyear==false) && (dd>=29)){
          alert('Invalid: days exceed month!');
          return false;}
        if ((leapyear==true) && (dd>29)){
          alert('Invalid date for leap year!');
          return false;}}}
    else{
      alert("Invalid date format!");
      return false;}}
  else { // select type is a name (county, state, fatalities or fujita)
    var inputValue = inputText.value.trim();
    if (selectType == "Enter State") {
      return(validStates.find(function(element){return element===inputValue;}))  } 
    if (selectType == "Enter County") {
      return(validCounties.find(function(element){return element===inputValue;})) }
    else if (selectType == "Enter Fatalities"){
      return(validFatalities.find(function(element){return element===inputValue;})) } 
    else if (selectType == "Enter Fujita"){
      return(validFujita.find(function(element){return element===inputValue;})) } 
  }
  inputText.value = mm+"/"+dd+"/"+yyyy;
  return true;
}


// Define search button clieck event to trigger filtered search and display
function handleSearchButtonClick() {
    isvalid = validate($userInput);
    console.log(isvalid);
   
    if (isvalid){  
      console.log("user input is valid")
      // Set filteredTordata to an array of all matching selected criteria
      filteredTordata = dataSet.filter(function(tordata) {
        if (selectType == "mm/dd/yyyy"){
          var filterName = $userInput.value;
          var nameValue = tordata.Date;
          console.log(filterName);
          console.log(nameValue);
        }
        else {
          var filterName = $userInput.value.trim();
         

          if (selectType == "Enter Fatalities"){
            var nameValue = tordata.Fatalities;
          }
          else if (selectType == "Enter State"){
            var nameValue = tordata.State;
          }
          else if (selectType == "Enter County"){
            var nameValue = tordata.County;
          }
          else if (selectType == "Enter Fujita") {
            var nameValue = tordata.Fujita;
          }
        }
      // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
      return nameValue == filterName;
      });
  
      // Ensure filtered search is not empty, otherwise do nothing.
      if (filteredTordata.length == 0) {
        alert("No results match the criteria provided");
        $userInput.focus(); 
        return;
      }

      //update last page
      lastPage = Math.ceil(filteredTordata.length / searchResultCount);  

      // reset first page is default displayed
      currentPage = 1; 
      renderTable();
  
      $userInput.value='';
      $userInput.style.color="black";

      // pagination feedback
      console.log("feedback pagination");
      console.log("current ",currentPage);
      console.log("last ",lastPage);
        
      $active = d3.select(".active");
      $active.attr("class","inactive");
      $page1.attr("class","active");  
      $pageprev.attr("class","disabled"); // always display page 1 deacivate previous button
         
      switch(lastPage) {
          case(1):
            $pagenext.attr("class","disabled");
            $page2.attr("class","hidden");
            $page3.attr("class","hidden");
            $page4.attr("class","hidden");
            $page5.attr("class","hidden");
          break;
          case(2):
            
            $page2.attr("class","enabled");
            $page3.attr("class","hidden");
            $page4.attr("class","hidden");
            $page5.attr("class","hidden");
          break;
          case(3):
            
            $page2.attr("class","enabled");
            $page3.attr("class","enabled");
            $page4.attr("class","hidden");
            $page5.attr("class","hidden");
          break;
          case(4):
            
            $page2.attr("class","enabled");
            $page3.attr("class","enabled");
            $page4.attr("class","enabled");
            $page5.attr("class","hidden");
          break;
          case(5):
          default:
            
            $page2.attr("class","enabled");
            $page3.attr("class","enabled");
            $page4.attr("class","enabled");
            $page5.attr("class","enabled");
      } 
    }
    else {
      $userInput.style.color="red";
      console.log("user input not valid");
    }
  
  $userInput.focus(); 
  
} 


// Render the table for the first time on page load
renderTable();
