var gameIndex = parseInt(location.search.split('=')[1]);
if(data.games[gameIndex].status != 'waiting'){
  if(data.games[gameIndex].battleMode == 'solo'){
    for(var i = 0; i < data.games[gameIndex].players.length; i++){
      if(data.games[gameIndex].players[i].played == true){
        $('body').append('<p>' + data.games[gameIndex].players[i].nickname + ': ' + data.games[gameIndex].players[i].points + '</p><br>');
      }
    }
  } else {
    for(var j = 0; j < Object.keys(data.games[gameIndex].teams).length; j++){
      $('body').append('<p>' + Object.keys(data.games[gameIndex])[j] + ': ' + data.games[gameIndex].teams[Object.keys(data.games[gameIndex])[j]] + '</p><br>');
    }
    $('body').append('<p>Players</p>');
    for(var k = 0; k < data.games[gameIndex].players.length; k++){
      if(data.games[gameIndex].players[k].played == true){
        $('body').append('<p>' + data.games[gameIndex].players[k].nickname + ': ' + data.games[gameIndex].players[k].points + '</p><br>');
      }
    }
  }
}