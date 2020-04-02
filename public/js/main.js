// SLIDER SCRIPT **********************!!!

$('.carousel').carousel({
  pause: "false"
});


// SEARCHER BUTTON *******************!!!!
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//Close when click (x)
var close = document.getElementsByClassName("closeC")[0];

//Get the Logo element that close when open modal
var logo = document.getElementsByClassName("logo")[0];

//Get the icon element

var icon = document.getElementsByClassName("material-icons")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  logo.style.display = "none";
  icon.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

close.onclick = function() {
  logo.style.display = "block";
  icon.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.getElementById('textC').value = "";
    logo.style.display = "block";
    icon.style.display = "block";
  }
}

function clearText()  
{
    document.getElementById('textC').value = "";
    modal.style.display = "none";
    
} 

$(document).keyup(function(e) {
  if (e.key === "Escape") { // escape key maps to keycode `27`
     // <DO YOUR WORK HERE>
     modal.style.display = "none";
     document.getElementById('textC').value = "";
     logo.style.display = "block";
     icon.style.display = "block";
 }
});