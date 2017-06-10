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

  
  document.getElementById("timer").innerText = displayable_time(min, sec);
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

function displayable_time(min, sec) {
  text = "";
  if(min < 10) text = "0";
  text += min.toString() + ":";

  if(sec < 10) text += "0"
  text += sec.toString();
  return text
}


function reset_counter(){
  var rows = document.getElementsByClassName("radio_class");
  for(var i = 0; i < rows.length; i++){
    if(rows[i].checked) {
      document.getElementsByClassName("candidate_time")[i].value = displayable_time(min, sec)
      rows[i].checked = false;
      if(i<rows.length-1) rows[i+1].checked = true;
      break;
    }
  }

  var ele = document.getElementById("reset");
  change_play_pause_image(reset_pause=true)
  document.getElementById("timer").innerText = "00:00";
  document.getElementById("leftcolumn").style.backgroundColor = "black";
  min = 0;
  sec = 0;
}

function add_candidate(){
  var table = document.getElementById("candidates")
  total_rows = table.rows.length
  var row = table.insertRow(total_rows)
  row.id = "c" + total_rows.toString()
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  var cell3 = row.insertCell(3);
  cell0.innerHTML = "<input type='radio' class='radio_class'></input> "
  cell1.innerHTML = total_rows
  cell2.innerHTML = "<input type='text' class='candidate_name'></input> "
  cell3.innerHTML = "<input type='text' class='candidate_time'></input> "

}

var key_press_ids = ['leftcolumn', 'timer', 'playPause', 'reset', 'colour_coding']
for(var i = 0; i < key_press_ids.length; i++) {
  $("#"+key_press_ids[i]).ready(function(){
    $("#"+key_press_ids[i]).keypress(function(e) {
      if(e.which == 32) {
          change_play_pause_image()
      }
    });
  })
}

// var key_press_ids = ['leftcolumn', 'timer', 'playPause', 'reset', 'colour_coding']
// for(var i = 0; i < key_press_ids.length; i++) {
//   var ele = document.getElementById(key_press_ids[i])
//   ele.onkeypress = function(e){
//     if(e.keyCode == 32){
//       change_play_pause_image()
//     }
//   }
// }
// function key_handler(e){
//   if(e.keyCode == 32){
//     change_play_pause_image()
//   }
// }
// document.getElementById('leftcolumn').onkeypress = key_handler

// document.onkeypress = function(e){
//   if(e.keyCode == 32){
//     change_play_pause_image()
//   }
// }
