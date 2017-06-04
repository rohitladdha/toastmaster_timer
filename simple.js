var min = 0
var sec = 0
var counter_var = 0
var is_paused = false
var green_min = 0
var green_sec = 0
var yellow_min = 0
var yellow_sec = 0
var red_min = 0
var red_sec = 0

function load_settings(){
  green_min = parseInt(document.getElementById("green_time_min").value) || 0
  green_sec = parseInt(document.getElementById("green_time_sec").value) || 0

  yellow_min = parseInt(document.getElementById("yellow_time_min").value) || 0
  yellow_sec = parseInt(document.getElementById("yellow_time_sec").value) || 0

  red_min = parseInt(document.getElementById("red_time_min").value) || 0
  red_sec = parseInt(document.getElementById("red_time_sec").value) || 0
}

function counter() {
  sec += 1
  if(sec == 60) {
    sec = 0;
    min += 1;
  }

  if(sec == green_sec && min == green_min){
    document.getElementById("leftcolumn").style.backgroundColor = "forestgreen";
  }
  else if(sec == yellow_sec && min == yellow_min){
    document.getElementById("leftcolumn").style.backgroundColor = "yellow";
  }
  else if(sec == red_sec && min == red_min){
    document.getElementById("leftcolumn").style.backgroundColor = "red";
  }

  text = "";
  if(min < 10) text = "0";
  text += min.toString() + ":";

  if(sec < 10) text += "0"
  text += sec.toString();
  document.getElementById("timer").innerText = text;
}

function change_play_pause_image(reset_pause=false){
  var loc = window.location.pathname;
  var dir = loc.substring(0, loc.lastIndexOf('/'));

  var ele = document.getElementById('playPause');
  var existing_file = ele.src.substring(ele.src.lastIndexOf('/') + 1);

  if(reset_pause || existing_file == 'pause.png' ){
    ele.src = dir + '/images/play.png';
    clearInterval(counter_var);
  }
  else {
    load_settings();
    ele.src = dir + '/images/pause.png';
    counter_var = setInterval(counter, 1000);
  }
}

function reset_counter(){
  var ele = document.getElementById("reset");
  change_play_pause_image(reset_pause=true)
  document.getElementById("timer").innerText = "00:00";
  document.getElementById("leftcolumn").style.backgroundColor = "black";
  min = 0;
  sec = 0;
}

document.onkeypress = function(e){
  if(e.keyCode == 32){
    change_play_pause_image()
  }
}
