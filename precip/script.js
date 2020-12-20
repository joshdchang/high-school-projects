var currentLocation = 0;

function updatePrecipDesc(val) {
    if (!timeline[val + startVal]) {
        $('#precip-rate').text('Dry');
        $('#precip-rate').css('background', '#eeeeee');
        $('#precip-rate').css('color', '#757575');
    } else if (timeline[val + startVal] < 3) {
        $('#precip-rate').text('Light');
        $('#precip-rate').css('background', '#e8f5e9');
        $('#precip-rate').css('color', '#43a047');
    } else if (timeline[val + startVal] < 6) {
        $('#precip-rate').text('Moderate');
        $('#precip-rate').css('background', '#e8f5e9');
        $('#precip-rate').css('color', '#43a047');
    } else if (timeline[val + startVal] < 9) {
        $('#precip-rate').text('Heavy');
        $('#precip-rate').css('background', '#ffecb3');
        $('#precip-rate').css('color', '#ef6c00');
    } else {
        $('#precip-rate').text('Very Heavy');
        $('#precip-rate').css('background', '#ffe6e8');
        $('#precip-rate').css('color', '#e53935');
    }
}
function updateTime(val) {
    var currentTime = new Date(startTime.getTime() + val * 60000);
    $('#precip-time').text(currentTime.toLocaleTimeString('en-us', {
        hour: 'numeric',
        minute: '2-digit'
    }));
}

function loadPrecip() {

    startVal = Math.round((now.getTime() - timestamp.getTime()) / 60000) + 3;

    $('#slider-colors').html('');
    var sum = 0;
    for (let i = 0; i < timeline.length; i++) {
        if (!timeline[i]) {
            timeline[i] = 0;
        }
    }
    for (let i = startVal; i < startVal + 61; i++) {
        var rgb = '';
        if (!timeline[i]) {
            rgb = '255, 255, 255';
        } else if (timeline[i] < 6) {
            rgb = (255 - timeline[i] * 23) + ',' + (255 - timeline[i] * 10) + ',' + (255 - timeline[i] * 23);
        } else if (timeline[i] < 9) {
            rgb = (255 - (timeline[i] - 5) * 23) + ',' + (255 - (timeline[i] - 5) * 50) + ',' + (255 - timeline[i] * 23);
        } else {
            rgb = timeline[i] * 18 + ',' + 0 + ',' + 0;
        }
        $('#slider-colors').append("<div class='slider-color' style='background:rgb(" + rgb + ")'></div>");
        sum += timeline[i];
    }
    if (!sum) {
        $('#slider-colors').html('<span id="no-precip">No precip expected in the next hour.</span>');
    }

    var val = + $('#precip-range').val();
    updatePrecipDesc(val);
    updateTime(val);
}
loadPrecip();

var currentSheet = 'https://spreadsheets.google.com/feeds/cells/1sigs4Bt9YS0GC5PQ1kK1KbzPKb9SC1uOFCYdoUvu6CA/1/public/values?alt=json';
setInterval(() => {
    $.get(currentSheet, data => {
        now = new Date();
        startTime = now;
        doPrecipData(data);
        loadPrecip();
    });
}, 30000);

function precipBack() {
    var val = + $('#precip-range').val();
    val = (val > 5) ? (val - 5) : 0;
    $('#precip-range').val(val);
    updatePrecipDesc(val);
    updateTime(val);
}
function precipForward() {
    var val = + $('#precip-range').val();
    val = (val < 55) ? (val + 5) : 60;
    $('#precip-range').val(val);
    updatePrecipDesc(val);
    updateTime(val);
}
$(document).on('input', '#precip-range', function () {
    var val = + $(this).val();
    updatePrecipDesc(val);
    updateTime(val);
});

function switchLocation(id) {
    $('.location-option-selected').removeClass('location-option-selected');
    $('#location-' + id).addClass('location-option-selected');
    if(id === 0){
        currentSheet = 'https://spreadsheets.google.com/feeds/cells/1sigs4Bt9YS0GC5PQ1kK1KbzPKb9SC1uOFCYdoUvu6CA/1/public/values?alt=json';
    } else if(id === 1){
        currentSheet = 'https://spreadsheets.google.com/feeds/cells/16ddqdW3r1cPdINWUiodGo1Z6L4ZPAozjJ0f9NUxf29o/1/public/values?alt=json';
    }
    if(id !== currentLocation){
        $.get(currentSheet, data => {
            now = new Date();
            startTime = now;
            doPrecipData(data);
            loadPrecip();
        });
    }
    currentLocation = id;
}

function toggleDetails(){
    if($('#details').css('display') === 'none'){
        $('#details').css('display', 'block');
        $('#more-details').text('Hide');
    } else {
        $('#details').css('display', 'none');
        $('#more-details').text('More details...');
    }
}