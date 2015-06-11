var animelistData = [];
var toEdit = null;

$(document).ready(function() {
    populateTable();
    $('#animelist table tbody').on('click', 'td a.linkshowanime', showAnimeInfo);
    $('#btnAddAnime').on('click', addAnime);
    $('#animelist table tbody').on('click', 'td a.linkdeleteanime', deleteAnime);
    $('#btnEditAnime').on('click', editAnime);
});

function populateTable() {
    var tableContent = "";
    $.getJSON("/anime/animelist", function(data) {
        animelistData = data;
        $.each(data, function() {
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowanime" rel="' + this.title + '">' + this.title + '</a></td>';
            tableContent += '<td>' + this.score + '</td>';
            tableContent += '<td>' + this.rating + '</td>';
            tableContent += '<td>' + this.rank + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteanime" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        $('#animelist table tbody').html(tableContent);
    });
}

function showAnimeInfo(event) {
    event.preventDefault();
    var thisAnimeTitle = $(this).attr('rel');
    var arrPos = animelistData.map(function(arrItem) {
        return arrItem.title;
    }).indexOf(thisAnimeTitle);

    var thisAnimeObject = animelistData[arrPos];
    toEdit = thisAnimeObject;

    animeInfoBox(thisAnimeObject);
    $('#editAnime fieldset input#inputAnimeTitle').val(thisAnimeObject.title);
    $('#editAnime fieldset input#inputAnimeScore').val(thisAnimeObject.score);
    $('#editAnime fieldset input#inputAnimeRating').val(thisAnimeObject.rating);
    $('#editAnime fieldset input#inputAnimeRank').val(thisAnimeObject.rank);
    $('#editAnime fieldset #AnimeMalLink').html('<a href="'+link+'">'+'MAL GOOGLE LINK'+'</a>');
}

function animeInfoBox(animeObject) {
    $('#AnimeInfoTitle').text(animeObject.title);
    $('#AnimeInfoScore').text(animeObject.score);
    $('#AnimeInfoRating').text(animeObject.rating);
    $('#AnimeInfoRank').text(animeObject.rank);
    var link = "https://www.google.com/?#q=mal+"+animeObject.title;
    $('#AnimeMalLink').html('<a href="'+link+'">'+'MAL GOOGLE LINK'+'</a>');
}

// Add Anime
function addAnime(event) {
    event.preventDefault();
    var errorCount = 0;
    $('#addAnime input').each(function(index, val) {
        if($(this).val() === '') {
            errorCount++;
        }
    });
    if(errorCount === 0) {
        var newAnime = {
            'title': $('#addAnime fieldset input#inputAnimeTitle').val(),
            'score': $('#addAnime fieldset input#inputAnimeScore').val(),
            'rating': $('#addAnime fieldset input#inputAnimeRating').val(),
            'rank': $('#addAnime fieldset input#inputAnimeRank').val()
        }
        $.ajax({
            type: 'POST',
            data: newAnime,
            url: '/anime/addanime',
            dataType: 'JSON'
        }).done(function(response) {
            if (response.msg === '') {
                $('#addAnime fieldset input').val('');
                populateTable();
            }
            else {
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        alert('Please fill in all fields');
        return false;
    }
}

// Delete Anime
function deleteAnime(event) {
    event.preventDefault();
    // var conf = confirm('Fo reals?');
    var conf = true;
    if(conf) {
        $.ajax({
            type: 'DELETE',
            url: '/anime/deleteanime/' + $(this).attr('rel')
        }).done(function(response) {
            if(response.msg !== '') {
                alert('Error: ' + response.msg);
            }
            populateTable();
        });
    }
    else {
        return false;
    }

}

// Edit ANime
function editAnime(event) {
    event.preventDefault();
    // var conf = confirm('Sure?');
    var conf = true;
    if(conf) {
        var editedAnime = {
            'oldTitle': toEdit.title,
            'title': $('#editAnime fieldset input#inputAnimeTitle').val(),
            'score': $('#editAnime fieldset input#inputAnimeScore').val(),
            'rating': $('#editAnime fieldset input#inputAnimeRating').val(),
            'rank': $('#editAnime fieldset input#inputAnimeRank').val()
        }
        $.ajax({
            type: 'POST',
            data: editedAnime,
            url: '/anime/editanime',
            dataType: 'JSON'
        }).done(function(response) {
            if (response.msg === '') {
                $('#editAnime fieldset input').val('');
                populateTable();
                animeInfoBox(editedAnime);
                toEdit = null;
            }
            else {
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        return false;
    }
}











