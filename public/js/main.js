// SLIDER SCRIPT **********************!!!

$('.carousel').carousel({
  pause: "false"
});


// SEARCHER BUTTON *******************!!!!
// Get the modal
var modal = document.getElementById("myModal");
var modalMailer = document.getElementById("modalMailer");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var btnMailer = document.getElementById("mailerButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//Close when click (x)
//var close = document.getElementsByClassName("closeC")[0];

//Get the Logo element that close when open modal
var logo = document.getElementsByClassName("logo")[0];

//Get the icon element

var icon = document.getElementsByClassName("search")[0];


var peliInput = document.getElementById('peticionPeli');
var peliInput1 = document.getElementById('peticionPeli2');


// When the user clicks the button, open the modal 
btnMailer.onclick = function() {
  modalMailer.style.display = "block";
  logo.style.display = "none";
  icon.style.display = "none";
}

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

/*close.onclick = function() {
  logo.style.display = "block";
  icon.style.display = "block";
  back.style.display = "block";
}*/


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal || event.target == modalMailer) {
    modal.style.display = "none";
    document.getElementById('textC').value = "";
    logo.style.display = "block";
    icon.style.display = "block";
    modalMailer.style.display = "none";
    peliInput.value = "";
    peliInput1.value = "";
  }
}

function clearText()  
{
    document.getElementById('textC').value = "";
    modal.style.display = "none";
    peliInput.value = "";
    peliInput1.value = "";
    
} 

$(document).keyup(function(e) {
  if (e.key === "Escape") { // escape key maps to keycode `27`
     // <DO YOUR WORK HERE>
     modal.style.display = "none";
     document.getElementById('textC').value = "";
     logo.style.display = "block";
     icon.style.display = "block";
     modalMailer.style.display = "none";
     peliInput.value = "";
     peliInput1.value = "";
 }
});




if($(window).width() <= 600){
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      clickable: true,
    },
  });

  } else if ($(window).width() <= 1300 && $(window).width() > 600) {
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 5,
      spaceBetween: 30,
      freeMode: true,
      pagination: {
        clickable: true,
      },
    });
    
  } else {

    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 9,
      spaceBetween: 30,
      freeMode: true,
      pagination: {
        clickable: true,
      },
    });
  }

