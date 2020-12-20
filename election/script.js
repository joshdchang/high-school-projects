
var series = [];
var model = {};

var bidenChart = [];
var trumpChart = [];

function uncertainty(num) {
    if (num < 0.8) {
        return '<1 in 100';
    }
    if (num < 1.5) {
        return '1 in 100';
    }
    if (num < 2.5) {
        return '1 in 50';
    }
    if (num < 4) {
        return '1 in 30';
    }
    if (num < 6.5) {
        return '1 in 20';
    }
    if (num < 9) {
        return '1 in 12';
    }
    if (num < 11) {
        return '1 in 10';
    }
    if (num < 12) {
        return '1 in 9';
    }
    if (num < 13) {
        return '1 in 8';
    }
    if (num < 15) {
        return '1 in 7';
    }
    if (num < 18) {
        return '1 in 6';
    }
    if (num < 22) {
        return '1 in 5';
    }
    if (num < 28) {
        return '1 in 4';
    }
    if (num < 30) {
        return '2 in 7';
    }
    if (num < 36) {
        return '1 in 3';
    }
    if (num < 44) {
        return '2 in 5';
    }
    if (num < 45) {
        return '4 in 9';
    }
    if (num < 55) {
        return '1 in 2';
    }
    if (num < 56) {
        return '5 in 9';
    }
    if (num < 64) {
        return '3 in 5';
    }
    if (num < 70) {
        return '2 in 3';
    }
    if (num < 72) {
        return '5 in 7';
    }
    if (num < 78) {
        return '3 in 4';
    }
    if (num < 82) {
        return '4 in 5';
    }
    if (num < 85) {
        return '5 in 6';
    }
    if (num < 87) {
        return '6 in 7';
    }
    if (num < 88) {
        return '7 in 8';
    }
    if (num < 89) {
        return '8 in 9';
    }
    if (num < 91) {
        return '9 in 10';
    }
    if (num < 93.5) {
        return '11 in 12';
    }
    if (num < 96) {
        return '19 in 20';
    }
    if (num < 97.5) {
        return '29 in 30';
    }
    if (num < 98.5) {
        return '49 in 50';
    }
    if (num < 99.2) {
        return '99 in 100';
    }
    if (num <= 100) {
        return '>99 in 100';
    }
}

function colors(num) {
    if (num < 8) {
        return '#ef5350';
    }
    if (num < 15) {
        return '#ff7575';
    }
    if (num < 25) {
        return '#ffabab';
    }
    if (num < 38) {
        return '#ffcdd2';
    }
    if (num < 45) {
        return '#ffe6e9';
    }
    if (num < 55) {
        return 'white';
    }
    if (num < 62) {
        return '#e3f2fd';
    }
    if (num < 75) {
        return '#bbdefb';
    }
    if (num < 85) {
        return '#90caf9';
    }
    if (num < 92) {
        return '#64b5f6';
    }
    if (num < 100) {
        return '#42a5f5';
    }
    if (num === 100) {
        return '#2196f3';
    }
}

function ago(updated) {
    var now = new Date();
    var dif = Math.floor((now.getTime() - updated) / 1000 / 60);

    if (dif < 60) {
        if (dif === 1) {
            return '1 minute';
        }
        return dif + ' minutes';
    } else if (dif < 60 * 24) {
        if (Math.round(dif / 60) === 1) {
            return '1 hour';
        }
        return Math.round(dif / 60) + ' hours';
    } else {
        if (Math.round(dif / 60 / 24) === 1) {
            return '1 day';
        }
        return Math.round(dif / 60 / 24) + ' days';
    }
}

function renderPage() {
    $('#biden-bar').css('width', model.chance.biden + '%');
    $('#trump-bar').css('width', model.chance.trump + '%');

    $('#biden-chance').text(uncertainty(model.chance.biden));
    $('#trump-chance').text(uncertainty(model.chance.trump));

    $('#time').text('Last updated ' + ago(model.time) + ' ago.');

    $('html').click(function (e) {
        selectState(null);
    });

    $('#info').click(function (e) {
        e.stopPropagation();
    });

    for (let i = 0; i < Object.keys(model.states).length; i++) {
        state = Object.keys(model.states)[i];
        $('#' + state).css('fill', colors(model.states[state].biden));
        $('#' + state).click(function (e) {
            e.stopPropagation();
            selectState(i);
        });
    }
}

function renderGraph(stateId) {

    function setTooltip(tooltipDate, bidenChance, trumpChance) {
        $('#tooltip-date').text(tooltipDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ': ');
        $('#tooltip-biden').text(Math.round(bidenChance) + ' in 100');
        $('#tooltip-trump').text(Math.round(trumpChance) + ' in 100');
    }

    var bidenNow = model.chance.biden;
    var trumpNow = model.chance.trump;

    if (stateId === null) {
        for (let i = 0; i < series.length; i++) {
            bidenChart[i] = {
                t: series[i].time,
                y: series[i].values[0]
            }
            trumpChart[i] = {
                t: series[i].time,
                y: series[i].values[1]
            }
        }
    } else {
        for (let i = 0; i < series.length; i++) {
            bidenChart[i] = {
                t: series[i].time,
                y: series[i].values[stateId * 2 + 4]
            }
            trumpChart[i] = {
                t: series[i].time,
                y: series[i].values[stateId * 2 + 5]
            }
        }
        bidenNow = model.states[Object.keys(model.states)[stateId]].biden;
        trumpNow = model.states[Object.keys(model.states)[stateId]].trump;
    }

    setTooltip(new Date(model.time), bidenNow, trumpNow);

    var customTooltips = function (tooltip) {
        if (tooltip.body) {
            var bodyLines = tooltip.body.map(bodyItem => {
                return bodyItem.lines;
            });
            var biden = parseFloat(bodyLines[0][0].split(' ')[1]);
            var trump = parseFloat(bodyLines[1][0].split(' ')[1]);
            setTooltip(new Date(tooltip.title[0]), biden, trump);

            $('#mouse-line').css('left', tooltip.caretX + 'px');
        }
    };

    $('#mouse-line').css('left', 'calc(100% - 5px)');
    var canvas = $('#chart-canvas')[0];
    canvas.outerHTML = '<canvas id="chart-canvas"></canvas>';
    new Chart($('#chart-canvas'), {
        type: 'line',
        data: {
            datasets: [{
                label: 'Biden',
                backgroundColor: '#2196f3',
                borderColor: '#2196f3',
                data: bidenChart,
                type: 'line',
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 8
            }, {
                label: 'Trump',
                backgroundColor: '#ef5350',
                borderColor: '#ef5350',
                data: trumpChart,
                type: 'line',
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 8
            }],
        },
        options: {
            animation: {
                duration: 500
            },
            responsive: true,
            tooltips: {
                enabled: false,
                position: 'average',
                mode: 'index',
                intersect: false,
                custom: customTooltips
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    distribution: 'series',
                    offset: true,
                    ticks: {
                        major: {
                            enabled: true,
                            fontStyle: 'bold'
                        },
                        source: 'data',
                        autoSkip: true,
                        autoSkipPadding: 75,
                        maxRotation: 0,
                        sampleSize: 100,
                        fontFamily: 'Google Sans',
                        fontStyle: 'bold',
                        fontColor: '#9e9e9e',
                        callback: function (value) {
                            return value.split(' ')[0];
                        }
                    }
                }],
                yAxes: [{
                    gridLines: {
                        drawBorder: false
                    },
                    ticks: {
                        display: false,
                        min: 0,
                        max: 100
                    }
                }]
            }
        }
    });
}

function selectState(stateId) {
    $('path').removeClass('selected');

    if(stateId === null){
        $('#label-title').text('National');
        $('#label-desc').text('Click a state for more details.').css('color', 'rgb(129, 129, 129)');
    } else {
        state = Object.keys(model.states)[stateId];

        $('#' + state).addClass('selected');
        $('#label-title').text(model.states[state].name);
        if (model.states[state].biden > model.states[state].trump) {
            $('#label-desc').text('Biden wins around ' + uncertainty(model.states[state].biden)).css('color', '#2196f3');
        } else {
            $('#label-desc').text('Trump wins around ' + uncertainty(model.states[state].trump)).css('color', '#ef5350');
        }
    }
    renderGraph(stateId);
}

function getData() {
    $.get('output.json', data => {

        model = data;
        renderPage();

        $.get('timeseries.csv', csv => {
            var rows = csv.split('\n');
            for (let i = 1; i < rows.length; i++) {
                rows[i - 1] = rows[i].split(',');
                rows[i - 1] = {
                    time: new Date(rows[i - 1].shift() + ', 2020'),
                    values: rows[i - 1]
                }
                for (let j = 0; j < rows[i - 1].values.length; j++) {
                    rows[i - 1].values[j] = parseFloat(rows[i - 1].values[j]);
                }
            }
            rows.pop();
            series = rows;
            renderGraph(null);
        });
    });
}

$(document).ready(getData);