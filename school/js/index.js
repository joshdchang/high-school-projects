function update() {
  var now = new Date().getTime();
  var ranges = [
    {
      start: "May 22, 2019 7:50:00 EDT", 
      start0: "May 22, 2019 8:33:00 EDT", 
      end: "May 22, 2019 14:20:00 EDT", 
      end9: "May 22, 2019 13:35:00 EDT"
    },
    {
      start: "May 23, 2019 7:50:00 EDT", 
      start0: "May 23, 2019 8:33:00 EDT", 
      end: "May 23, 2019 15:20:00 EDT", 
      end9: "May 23, 2019 14:35:00 EDT"
    },
    {
      start: "May 29, 2019 7:50:00 EDT", 
      start0: "May 29, 2019 8:33:00 EDT", 
      end: "May 29, 2019 15:20:00 EDT", 
      end9: "May 29, 2019 14:35:00 EDT"
    },
    {
      start: "May 30, 2019 7:50:00 EDT", 
      start0: "May 30, 2019 8:33:00 EDT", 
      end: "May 30, 2019 15:20:00 EDT", 
      end9: "May 30, 2019 14:35:00 EDT"
    },
    {
      start: "May 31, 2019 7:50:00 EDT", 
      start0: "May 31, 2019 8:33:00 EDT", 
      end: "May 31, 2019 15:20:00 EDT", 
      end9: "May 31, 2019 14:35:00 EDT"
    },
    {
      start: "June 3, 2019 7:50:00 EDT", 
      start0: "June 3, 2019 8:33:00 EDT", 
      end: "June 3, 2019 15:20:00 EDT", 
      end9: "June 3, 2019 14:35:00 EDT"
    },
    {
      start: "June 4, 2019 7:50:00 EDT", 
      start0: "June 4, 2019 8:33:00 EDT", 
      end: "June 4, 2019 15:20:00 EDT", 
      end9: "June 4, 2019 14:35:00 EDT"
    },
    {
      start: "June 5, 2019 7:50:00 EDT", 
      start0: "June 5, 2019 8:33:00 EDT", 
      end: "June 5, 2019 15:20:00 EDT", 
      end9: "June 5, 2019 14:35:00 EDT"
    },
    {
      start: "June 6, 2019 7:50:00 EDT", 
      start0: "June 6, 2019 8:33:00 EDT", 
      end: "June 6, 2019 15:20:00 EDT", 
      end9: "June 6, 2019 14:35:00 EDT"
    },
    {
      start: "June 7, 2019 7:50:00 EDT", 
      start0: "June 7, 2019 8:33:00 EDT", 
      end: "June 7, 2019 15:20:00 EDT", 
      end9: "June 7, 2019 14:35:00 EDT"
    },
    {
      start: "June 10, 2019 7:50:00 EDT", 
      start0: "June 10, 2019 8:33:00 EDT", 
      end: "June 10, 2019 15:20:00 EDT", 
      end9: "June 10, 2019 14:35:00 EDT"
    },
    {
      start: "June 11, 2019 7:50:00 EDT", 
      start0: "June 11, 2019 8:33:00 EDT", 
      end: "June 11, 2019 15:20:00 EDT", 
      end9: "June 11, 2019 14:35:00 EDT"
    },
    {
      start: "June 12, 2019 7:50:00 EDT", 
      start0: "June 12, 2019 8:33:00 EDT", 
      end: "June 12, 2019 15:20:00 EDT", 
      end9: "June 12, 2019 14:35:00 EDT"
    },
    {
      start: "June 13, 2019 7:50:00 EDT", 
      start0: "June 13, 2019 8:33:00 EDT", 
      end: "June 13, 2019 15:20:00 EDT", 
      end9: "June 13, 2019 14:35:00 EDT"
    },
    {
      start: "June 14, 2019 7:50:00 EDT", 
      start0: "June 14, 2019 8:33:00 EDT", 
      end: "June 14, 2019 15:20:00 EDT", 
      end9: "June 14, 2019 14:35:00 EDT"
    }
  ];
  
  var days = 0;
  var startTimes = [];
  var endTimes = [];
  var status = [];
  var len = 0;
  
  if($('.p0-check').text() == 'check_box'){
    for(var i = 0; i < ranges.length; i++){
      startTimes[i] = new Date(ranges[i].start).getTime();
    }
  } else {
    for(var i = 0; i < ranges.length; i++){
      startTimes[i] = new Date(ranges[i].start0).getTime();
    }
  }
  if($('.p9-check').text() == 'check_box'){
    for(var i = 0; i < ranges.length; i++){
      endTimes[i] = new Date(ranges[i].end).getTime();
    }
  } else {
    for(var i = 0; i < ranges.length; i++){
      endTimes[i] = new Date(ranges[i].end9).getTime();
    }
  }
  
  for(var i = 0; i < startTimes.length; i++){
    if(now >= endTimes[i]){
      status[i] = 'over';
    } else if(now >= startTimes[i]){
      status[i] = 'happening';
      len = len + (endTimes[i] - now);
    } else {
      status[i] = 'future';
      days++;
    }
  }
  
  var hours = Math.floor((len % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((len % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((len % (1000 * 60)) / 1000);

  document.getElementById("demo").innerHTML = "<span class='days num'>" + days + "</span><span class='in'>:</span><span class='hours num'>" + hours + "</span><span class='in'>:</span><span class='minutes num'>" + minutes + "</span><span class='in'>:</span><span class='seconds num'>" + seconds + "</span>";

  if(status[14] == 'over'){
    $('h1').text('Time for Finals!');
  } else {
    $('h1').text('Left of school before finals!');
  }
}
update();
var x = setInterval(update, 1000);
function p0check() {
  if($('.p0-check').text() == 'check_box'){
    $('.p0-check').text('check_box_outline_blank');
  } else {
    $('.p0-check').text('check_box');
  }
  update();
}
function p9check() {
  if($('.p9-check').text() == 'check_box'){
    $('.p9-check').text('check_box_outline_blank');
  } else {
    $('.p9-check').text('check_box');
  }
  update();
}
