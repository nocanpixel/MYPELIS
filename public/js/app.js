

$(document).on('click', '#nombre_pelicula', function() {
    const id_pelicula = $(this).attr('data-id');

    const condition = $(this).attr('data-state');

    $.ajax({
        url: `/pelicula/${id_pelicula}/${condition}`,
        method: 'PUT'
    })
    .then(works)
    .catch(worksError);
});


/*
FORMULARIO DE PETICIONES (PELICULAS) -
*/



$('#formu').on('submit', (e) => {
    e.preventDefault();
  
    const text = document.querySelector('#peticionPeli').value;
    const email = document.querySelector('#peticionPeli2').value;
    const captcha = document.querySelector('#g-recaptcha-response').value;

    fetch('/email', {
      method: 'POST',
      headers: {
        'Accept': 'applicacion/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({text:text, email:email, captcha:captcha})
    })
    .then((res) => res.json())
    .then(() => {
      window.location.href = "/";
    })
  });

  /*
  hOLA
  */