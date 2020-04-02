const works = (pelicula) => {
    const id_pelicula = pelicula.id_pelicula; 
    console.log('working');
};
const worksError = () => {
    console.log('Error');
};


$(document).on('click', '.verP', function() {
    const id_pelicula = $(this).attr('data-id');

    const condition = $(this).attr('data-state');

    $.ajax({
        url: `/${id_pelicula}/${condition}`,
        method: 'PUT'
    })
    .then(works)
    .catch(worksError);
});