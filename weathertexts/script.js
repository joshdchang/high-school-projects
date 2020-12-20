let searchParams = new URLSearchParams(window.location.search);
let num = parseInt(searchParams.get('num'));

var images = [];
var body = '';

$.get('https://spreadsheets.google.com/feeds/cells/1LFTj3sd1Lp8wV1s09Z-hrjcvM5I5NERUOwtPwvOL-KU/1/public/full?alt=json', function(data){

    var collumns = 9;

    timestamp = new Date(data.feed.entry[((num + 1) * collumns)].content.$t);
    title = data.feed.entry[((num + 1) * collumns) + 6].content.$t;
    images = data.feed.entry[((num + 1) * collumns) + 7].content.$t.split(', ');
    body = data.feed.entry[((num + 1) * collumns) + 8].content.$t;

    $('#container').append(body);
    $('title').text(title);
    $('#timestamp').text(timestamp.toLocaleTimeString().split(':')[0] + ':' + timestamp.toLocaleTimeString().split(':')[1].split(':')[0] + ' ' + timestamp.toLocaleTimeString().split(' ')[1] + ', ' + timestamp.toDateString());

    for(var i = 0; i < images.length; i++){
        var id = images[i].split('=')[1];
        $.get({
            url: 'https://script.google.com/macros/s/AKfycbz8tm-DoFlJp_yw-Zv-watJJCFsRKRVCTl59Lc_61YAD3op2ZLl/exec?id=' + id,
            success: function(data){
                $('.' + i).attr('src', data);
            },
            async: false
        });
    }

    $('#loader').css('display', 'none');
});
