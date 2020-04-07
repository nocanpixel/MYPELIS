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
FORMULARIO DE PETICIONES (PELICULAS)
*/

$('form').on('submit', (e) => {
    e.preventDefault();
  
    const text = $('#peticionPeli').val();
    const email = $('#peticionPeli2').val();

    const data = {
        email,
        text
    }

    $.post("/email", data)
    .then(() => {
      window.location.href = "/";
    })
    .catch(() => {
      window.location.href = "/error";
    });
    
  });