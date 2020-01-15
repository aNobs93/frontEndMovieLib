var $Title = $('#Title');
var $Genre = $('#Genre');
var $Director = $('#Director');
var $ImageURL = $('#ImageURL');
var $moviesList = $('#movies');
var movieTemplate = $('#movie-template').html();
$(function(){

    function addMovie(movie){
        $moviesList.append(Mustache.render(movieTemplate, movie));
    }
$.ajax({
    type: 'Get',
    url: 'https://localhost:44352/Api/Movie',
    success: function(movies){
        console.log('success', movies);
           $.each(movies, function(i, movie) {
               addMovie(movie);
           });
        },
        error: function(){
            alert('error loading orders');
        }
    });
    $('#add-movie').on('click', function(){
        var movie = {
            Title: $Title.val(),
            Genre: $Genre.val(),
            Director: $Director.val(),
            ImageURL: $ImageURL.val()
        };
        $.ajax({
            type: 'POST',
            url: 'https://localhost:44352/Api/Movie',
            data: movie,
            success: function(newMovie){
                addMovie(movie);

            },
            success: function(){
                $('#Title').val('');
                $('#Genre').val('');
                $('#Director').val('');
                $('#ImageURL').val('');
                $('ul').empty()
            },
            error: function(){
                alert('error saving movie');
            }
        })
    });
    $moviesList.delegate('.remove', 'click', function(){
        var $h5 = $(this).closest('h5');
        var self = this;

        $.ajax({
            type: 'DELETE',
            url: 'https://localhost:44352/Api/Movie/' + $(this).attr('data-id'),
            success: function(){
                alert('success')
                $h5.fadeOut(300, function(){
                    $(this).remove();
                });
            }
        });

    });
    $moviesList.delegate('.editMovie', 'click', function(){
        var $h5 = $(this).closest('h5');
        $h5.find('input.title').val( $h5.find('span.title').html());
        $h5.find('input.genre').val( $h5.find('span.genre').html());
        $h5.find('input.director').val( $h5.find('span.director').html());
        $h5.addClass('edit');

    });
    $moviesList.delegate('.cancelEdit', 'click', function(){
        $(this).closest('h5').removeClass('edit');

    });
    $moviesList.delegate('.saveEdit', 'click', function(){
        var $h5 = $(this).closest('h5');
        var movie = {
            Title: $h5.find('input.title').val(),
            Genre: $h5.find('input.genre').val(),
            Director: $h5.find('input.director').val()
        };

        $.ajax({
            type: 'PUT',
            url: 'https://localhost:44352/Api/Movie/' + $h5.attr('data-Id'),
            data: movie,
            success: function(newMovie){
                $h5.find('span.title').html(movie.Title);
                $h5.find('span.genre').html(movie.Genre);
                $h5.find('span.director').html(movie.Director);
                $h5.removeClass('edit');
            },
            error: function(){
                alert('error updating movie');
            }
        })
    })

    $moviesList.delegate('.deleteImage', 'click', function(){
        var thisImage = $(this).closest('img');
        thisImage.remove();
    });
     var loadFile = function(event) {
     var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
    };
});