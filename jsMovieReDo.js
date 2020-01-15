var $Title = $('#Title');
var $Genre = $('#Genre');
var $Director = $('#Director');
var $moviesList = $('#movies');
var movieTemplate = $('#movie-template').html();
// "<li>" +
// "<p><strong>Title:</strong> {{Title}}</p>" + 
// "<p><strong>Genre:</strong> {{Genre}}</p>" + 
// "<p><strong>Director:</strong> {{Director}}</p>" +
// "<button data-id='{{MovieId}}' class='remove'>Delete</button>" +
// "</li>";
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
            Director: $Director.val()
        };
        $.ajax({
            type: 'POST',
            url: 'https://localhost:44352/Api/Movie',
            data: movie,
            success: function(newMovie){
                addMovie(movie);
            },
            error: function(){
                alert('error saving movie');
            }
        })
    });
    $moviesList.delegate('.remove', 'click', function(){
        var $li = $(this).closest('li');
        var self = this;

        $.ajax({
            type: 'DELETE',
            url: 'https://localhost:44352/Api/Movie/' + $(this).attr('data-id'),
            success: function(){
                $li.fadeOut(300, function(){
                    $(this).remove();
                });
            }
        });

    });
    $moviesList.delegate('.editMovie', 'click', function(){
        var $li = $(this).closest('li');
        $li.find('input.title').val( $li.find('span.title').html());
        $li.find('input.genre').val( $li.find('span.genre').html());
        $li.find('input.director').val( $li.find('span.director').html());
        $li.addClass('edit');

    });
    $moviesList.delegate('.cancelEdit', 'click', function(){
        $(this).closest('li').removeClass('edit');

    });
    $moviesList.delegate('.saveEdit', 'click', function(){
        var $li = $(this).closest('li');
        var movie = {
            Title: $li.find('input.title').val(),
            Genre: $li.find('input.genre').val(),
            Director: $li.find('input.director').val()
        };
        
        // var url = "https://localhost:44352/api/Movie/" + $li.attr('data-id')
        // console.log(url);

        $.ajax({
            type: 'PUT',
            url: 'https://localhost:44352/Api/Movie/' + $li.attr('data-Id'),
            data: movie,
            success: function(newMovie){
                $li.find('span.title').html(movie.Title);
                $li.find('span.genre').html(movie.Genre);
                $li.find('span.director').html(movie.Director);
                $li.removeClass('edit');
            },
            error: function(){
                alert('error updating movie');
            }
        })
    })
});