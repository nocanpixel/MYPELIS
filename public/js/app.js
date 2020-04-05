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