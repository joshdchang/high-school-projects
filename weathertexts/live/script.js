
//Blink live circle
setInterval(() => {
    if ($('#live-circle').css('background-color') == 'rgb(255, 255, 255)') {
        $('#live-circle').css('background-color', '#ffcdd2');
    } else {
        $('#live-circle').css('background-color', 'rgb(255, 255, 255)');
    }
}, 500);

var currentHours = 8;
var currentDays = 8;

//Update all the weather values on the page
function updateConditions() {

    //Current coditions card
    $('#current-temp').text(weather.current.temp.now + '°');
    $('#current-conditions').text(weather.current.desc);
    weather.current.icon = weather.current.icon || 'snow';
    $('#current-img').attr('src', './icons/' + weather.current.icon + '.png');

    if (weather.current.temp.high) {
        $('#current-high').text(weather.current.temp.high + '°');
    } else {
        $('#current-high').text('--');
    }
    if (weather.current.temp.low) {
        $('#current-low').text(weather.current.temp.low + '°');
    } else {
        $('#current-low').text('--');
    }

    $('#wind-direction').text(weather.current.wind.direction);
    $('#wind-speed').text(weather.current.wind.speed);

    $('#humidity-value').text(weather.current.humidity + '%');

    //Hourly forecast card
    if (!$('#hourly-hours').html()) {
        for (let i = 0; i < 16; i++) {
            $('#hourly-hours').append(`
            <div class='hourly-row' id='hourly-row--` + i + `'>
                <img src='./icons/` + weather.hourly[i].icon + `.png' class='hourly-img'>
                <span class='hourly-time'>` + weather.hourly[i].hour + `</span>
                <span class='hourly-temp weather-val'>` + weather.hourly[i].temp + `°</span>
                <span class='hourly-precip weather-val'>
                    <img class='svg-drop' src='./assets/drop.svg'>
                    <span class='hourly-precip-percent'>` + weather.hourly[i].precip + `%</span>
                </span>
                <div class='hour-collapse-container'>
                    <div onclick='expandHour(` + i + `)' id='hour-collapse-button--` + i + `' class='hour-collapse material-icons'>
                        <span class='hour-collapse-arrow' id='hour-collapse-arrow--` + i + `'>expand_more</span>
                    </div>
                </div>
                <div class='hour-details' id='hour-details--` + i + `'>
                    <div class='hour-desc'>` + weather.hourly[i].desc + `</div>
                    <div class='hour-values'>
                        <div class='hour-wind'>Wind:  <span class='hour-wind-value'>` + weather.hourly[i].wind.direction + ` ` + weather.hourly[i].wind.speed + ` mph</span></div>
                        <div class='hour-humidity'>Humidity: <span class='hour-humidity-value'>` + weather.hourly[i].humidity + `%</span></div>
                    </div>
                </div>
            </div>`);
            if (i > 7) {
                $('#hourly-row--' + i).addClass('more-hour');
            }
        }
    } else {
        for (let i = 0; i < 16; i++) {
            $('#hourly-row--' + i + ' .hourly-img').attr('src', './icons/' + weather.hourly[i].icon + '.png');
            $('#hourly-row--' + i + ' .hourly-time').text(weather.hourly[i].hour);
            $('#hourly-row--' + i + ' .hourly-temp').text(weather.hourly[i].temp + '°');
            $('#hourly-row--' + i + ' .hourly-precip-percent').html(weather.hourly[i].precip + '%');
            $('#hourly-row--' + i + ' .hour-desc').text(weather.hourly[i].desc);
            $('#hourly-row--' + i + ' .hour-wind-value').text(weather.hourly[i].wind.direction + ' ' + weather.hourly[i].wind.speed + ' mph');
            $('#hourly-row--' + i + ' .hour-humidity-value').text(weather.hourly[i].humidity + '%');
        }
    }
}
updateConditions();

//Get latest conditions from spreadsheet and update every 15 seconds
setInterval(() => {
    $.get('https://spreadsheets.google.com/feeds/cells/1RhqbZ8lENE6uS2c03ieS6YaQJkTPFRLIP319B0mQO6s/1/public/values/R1C1?alt=json', data => {
        doData(data);
        updateConditions();
    });
}, 15000);

//Add more hours/days

var openHours = 0;
var openHoursMore = 0;
var openDays = 0;
var openDaysMore = 0;

var hourOpenHeight = 93;
var hourOpenMargin = 15;
var hourOpenSize = hourOpenMargin + hourOpenHeight;
var hourClosedSize = 41;

function moreHours() {
    currentHours = 16;
    openHours += openHoursMore;
    $('.more-hour').css('display', 'block');
    $('#hourly-container').css('height', (currentHours * hourClosedSize + openHours * hourOpenSize + 40) + 'px');
    $('#hourly-more').text('Show less').attr('onclick', 'lessHours()');
}
function lessHours() {
    $('.more-hour').css('display', 'none');
    currentHours = 8;
    openHours -= openHoursMore;
    $('#hourly-container').css('height', (currentHours * hourClosedSize + openHours * hourOpenSize + 40) + 'px');
    $('#hourly-more').text('Show more').attr('onclick', 'moreHours()');
}

//Expand and collapse cards
function expandPrecip() {
    $('#precip-container').css('height', '110px').css('margin-top', '22px').css('opacity', '1');
    $('#precip-button').attr('onclick', 'collapsePrecip()').text('expand_less');
}
function collapsePrecip() {
    $('#precip-container').css('height', '0px').css('margin-top', '0px').css('opacity', '0');
    $('#precip-button').attr('onclick', 'expandPrecip()').text('expand_more');
}

function expandHourly() {
    $('#hourly-container').css('height', (currentHours * hourClosedSize + openHours * hourOpenSize + 40) + 'px').css('margin-top', '22px').css('opacity', '1').css('border-width', '1px');
    $('#hourly-button').attr('onclick', 'collapseHourly()').text('expand_less');
}
function collapseHourly() {
    $('#hourly-container').css('height', '0px').css('margin-top', '0px').css('opacity', '0').css('border-width', '0px');
    $('#hourly-button').attr('onclick', 'expandHourly()').text('expand_more');
}
function expandHour(hour) {
    openHours++;
    if (hour > 7) {
        openHoursMore++;
    }
    $('#hourly-container').css('height', (currentHours * hourClosedSize + openHours * hourOpenSize + 40) + 'px');
    $('#hour-details--' + hour).css('height', hourOpenHeight + 'px').css('margin-top', hourOpenMargin + 'px').css('opacity', '1');
    $('#hour-collapse-button--' + hour).attr('onclick', 'collapseHour(' + hour + ')');
    $('#hour-collapse-arrow--' + hour).text('expand_less');
}
function collapseHour(hour) {
    openHours--;
    if (hour > 7) {
        openHoursMore--;
    }
    $('#hourly-container').css('height', (currentHours * hourClosedSize + openHours * hourOpenSize + 40) + 'px');
    $('#hour-details--' + hour).css('height', '0px').css('margin-top', '0px').css('opacity', '0');
    $('#hour-collapse-button--' + hour).attr('onclick', 'expandHour(' + hour + ')');
    $('#hour-collapse-arrow--' + hour).text('expand_more');
}

function expandDaily() {
    $('#daily-container').css('height', (currentDays * 40 + 40) + 'px').css('margin-top', '22px').css('opacity', '1').css('border-width', '1px');
    $('#daily-button').attr('onclick', 'collapseDaily()').text('expand_less');
}
function collapseDaily() {
    $('#daily-container').css('height', '0px').css('margin-top', '0px').css('opacity', '0').css('border-width', '0px');
    $('#daily-button').attr('onclick', 'expandDaily()').text('expand_more');
}

//Load 60 minute precip data

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
setInterval(() => {
    $.get('https://spreadsheets.google.com/feeds/cells/1sigs4Bt9YS0GC5PQ1kK1KbzPKb9SC1uOFCYdoUvu6CA/1/public/values?alt=json', data => {
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