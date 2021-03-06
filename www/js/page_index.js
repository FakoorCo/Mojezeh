/*
Spritz Speed Reader by Charlotte Dann
local storage implementation by Keith Wyland
*/


var $wpm = $('#spritz_wpm');
var interval = 60000/$wpm.val();  
var paused = false;
var $space = $('#spritz_word');
var i = 0;
var night = false;
var zoom = 1;
var autosave = false;
var $words = $('#spritz_words');
var local_spritz = {};

function words_load() {
  if (!localStorage.jqspritz) {
    words_set();
    word_show(0);
    word_update();
    spritz_pause(true);
  } else {
    local_spritz = JSON.parse(localStorage['jqspritz']);
    $words.val(local_spritz.words);
    i = local_spritz.word;
    if (local_spritz.night) {
      night = true
      $('html').addClass('night');
    };
    if (local_spritz.autosave) {
      autosave = true;
      $('html').addClass('autosave');
      $('#autosave_checkbox').prop('checked', true);
    };
    $wpm.val(local_spritz.wpm); 
    interval = 60000/local_spritz.wpm;
    spritz_zoom(0);
    words_set();
    word_show(i);
    word_update();
    spritz_pause(true);
    spritz_alert('loaded');
  }  
}
function words_save() {
  local_spritz = {
    word: i,
    words: $words.val(),
    wpm: $wpm.val(),
    night: night,
    autosave: autosave,
    zoom: zoom
  };
  localStorage['jqspritz'] = JSON.stringify(local_spritz);
  if (!autosave) {
    spritz_alert('saved');
  } else {
    button_flash('save', 500);
  }
}


/* TEXT PARSING */
function words_set() {
  words = $words.val().trim()
  .replace(/([-—])(\w)/g, '$1 $2')
  .replace(/[\r\n]/g, ' {linebreak} ')
  .replace(/[ \t]{2,}/g, ' ')
  .split(' ');
  for (var j = 1; j < words.length; j++) {
    words[j] = words[j].replace(/{linebreak}/g, '   ');
  }
}
/* ON EACH WORD */
function word_show(i) {
  $('#spritz_progress').width(100*i/words.length+'%');
  var word = words[i];
  var stop = Math.round((word.length+1)*0.4)-1;
  $space.html('<div>'+word.slice(0,stop)+'</div><div>'+word[stop]+'</div><div>'+word.slice(stop+1)+'</div>');
}
function word_next() {
  i++;
  word_show(i);
}
function word_prev() {
  i--;
  word_show(i);
}

/* ITERATION FUNCTION */
function word_update() {
  spritz = setInterval(function() {
    word_next();
    if (i+1 == words.length) {
      setTimeout(function() {
        $space.html('');
        spritz_pause(true);
        i = 0;
        word_show(0);
      }, interval);
      clearInterval(spritz);
    };
  }, interval);
} 

/* PAUSING FUNCTIONS */
function spritz_pause(ns) {
    if (!paused) {
    clearInterval(spritz);
    paused = true;
    $('html').addClass('paused');
    if (autosave && !ns) {
      words_save();
    };
  }
}
function spritz_play() {
  word_update();
  paused = false;
  $('html').removeClass('paused');
}
function spritz_flip() {
  if (paused) {
    spritz_play();
  } else {
    spritz_pause();
  };
}

/* SPEED FUNCTIONS */
function spritz_speed() {
  interval = 60000/$('#spritz_wpm').val();
  if (!paused) {
    clearInterval(spritz);
    word_update();
  };
  $('#spritz_save').removeClass('saved loaded');
}
function spritz_faster() {
  $('#spritz_wpm').val(parseInt($('#spritz_wpm').val())+50);
  spritz_speed();
}
function spritz_slower() {
  if ($('#spritz_wpm').val() >= 100) {
    $('#spritz_wpm').val(parseInt($('#spritz_wpm').val())-50);
  }
  spritz_speed();
}

/* JOG FUNCTIONS */
function spritz_back() {
  spritz_pause();
  if (i >= 1) {
    word_prev();
  };
}
function spritz_forward() {
  spritz_pause();
  if (i < words.length) {
    word_next();
  };
}

/* WORDS FUNCTIONS */
function spritz_zoom(c) {
  zoom = zoom+c
  $('#spritz').css('font-size', zoom+'em');
}
function spritz_refresh() {
  clearInterval(spritz);
  words_set(); 
  i = 0;
  spritz_pause();
  word_show(0);
};
function spritz_select() {
  $words.select();
};
function spritz_expand() {
  $('html').toggleClass('fullscreen');
}

/* AUTOSAVE FUNCTION */
function spritz_autosave() {
  $('html').toggleClass('autosave');
  autosave = !autosave;
  if (autosave) {
    $('#autosave_checkbox').prop('checked', true);
  } else {
    $('#autosave_checkbox').prop('checked', false);
  }
};

/* ALERT FUNCTION */
function spritz_alert(type) {
  var msg = '';
  switch (type) {
    case 'loaded':
      msg = 'Data loaded from local storage';
      break;
    case 'saved':
      msg = 'Words, Position and Settings have been saved in local storage for the next time you visit';
      break;
  }
  $('#alert').text(msg).fadeIn().delay(2000).fadeOut();
}



/* CONTROLS */
$('#spritz_wpm').on('input', function() {
  spritz_speed();
});
$('.controls').on('click', 'a, label', function() {
  switch (this.id) {
    case 'spritz_slower':
      spritz_slower(); break;
    case 'spritz_faster':
      spritz_faster(); break;
    case 'spritz_save':
      words_save(); break;
    case 'spritz_pause':
      spritz_flip(); break;
    case 'spritz_smaller':
      spritz_zoom(-0.1); break;
    case 'spritz_bigger':
      spritz_zoom(0.1); break;
    case 'spritz_autosave':
      spritz_autosave(); break;
    case 'spritz_refresh':
      spritz_refresh(); break;
    case 'spritz_select':
      spritz_select(); break;
    case 'spritz_expand':
      spritz_expand(); break;
  };
  return false;
});
$('.controls').on('mousedown', 'a', function() {
  switch (this.id) {
    case 'spritz_back':
      spritz_jog_back = setInterval(function() {
        spritz_back();
      }, 100);
      break;
    case 'spritz_forward':
      spritz_jog_forward = setInterval(function() {
        spritz_forward();
      }, 100);
      break;
  };
});
$('.controls').on('mouseup', 'a', function() {
  switch (this.id) {
    case 'spritz_back':
      clearInterval(spritz_jog_back); break;
    case 'spritz_forward':
      clearInterval(spritz_jog_forward); break;
  };
});

/* KEY EVENTS */
function button_flash(btn, time) {
  var $btn = $('.controls a.'+btn);
  $btn.addClass('active');
  if (typeof(time) === 'undefined') time = 100;
  setTimeout(function() {
    $btn.removeClass('active');
  }, time);
}
$(document).on('keyup', function(e) {
  if (e.target.tagName.toLowerCase() != 'body') {
    return;
  };
  switch (e.keyCode) {
    case 32:
      spritz_flip(); button_flash('pause'); break;
    case 37:
      spritz_back(); button_flash('back'); break;
    case 38:
      spritz_faster(); button_flash('faster'); break;
    case 39:
      spritz_forward(); button_flash('forward'); break;
    case 40:
      spritz_slower(); button_flash('slower'); break;
  };
});
$(document).on('keydown', function(e) {
  if (e.target.tagName.toLowerCase() != 'body') {
    return;
  };
  switch (e.keyCode) {
    case 37:
      spritz_back(); button_flash('back'); break;
    case 39:
      spritz_forward(); button_flash('forward'); break;
  };
});



/* INITIATE */
words_load();

/* LIGHT/DARK THEME */
$('.light').on('click', function() {
  $('html').toggleClass('night');
  night = !night;
  return false;
});

$('a.toggle').on('click', function() {
  $(this).siblings('.togglable').slideToggle();
  return false;
});





$(document).ready(function () {

    //$("p:first").addClass("hello");
    //$('element').attr('id', 'value');
    $("p:first").attr('id', "hello");
    document.getElementById('hello').style.direction = 'rtl';
    //$(".main").append("< div class="btnss" ><button class="button" id="underline" onclick=changeFont('1') ><i class="material- icons">format_clear</i></button>");
    //var bbbttnnn = document.createElement("div");
    //txt3.innerHTML = "< div class="btnss" ><button class="button" id="underline" onclick=changeFont('1') ><i class="material- icons">format_clear</i></button>";      

    var btn1 = "<button class='button' id='underline' onclick=changeFont('1') ><i class='material-icons'>format_clear</i></button>";
    var btn2 = "<button class='button' id='underline' onclick=changeFont('IranNastaliq') ><p style='font-family:IranNastaliq;'>ن</p></button>";
    var btn3 = "<button class='button' id='underline' onclick=changeFont('BKoodakBold') ><p style='font-family:BKoodakBold;'>ب</p></button>";
    var btn4 = "<button class='button' id='underline' onclick=changeFont('Samim') ><p style='font-family:Samim;'>س</p></button>";
    var btn5 = "<button class='button' id='underline' onclick=changeFont('BYekan') ><p style='font-family:BYekan;'>ی</p></button><br />";
    //
    var btn6 = "<button class='button' id='underline' onclick=changeFont('bold') ><i class='material-icons'>format_bold</i></button>";
    var btn7 = "<button class='button' id='underline' onclick=changeFont('italic') ><i class='material-icons'>format_italic</i></button>";
    var btn8 = "<button class='button' id='underline' onclick=changeFont('underline') ><i class='material-icons'>format_underlined</i></button>";

    var btnColors = "<button class='button' onclick=changeColor('#354a56') ><font color='#354a56'><i class='material-icons'>brush</i></font></button ><button class='button' onclick=changeColor('#e91e63') ><font color='#e91e63'><i class='material-icons'>brush</i></font></button><button class='button' onclick=changeColor('#00bcd4') > <font color='#00bcd4'><i class='material-icons'>brush</i></font></button><button class='button' onclick=changeColor('#009688') > <font color='#009688'><i class='material-icons'>brush</i></font></button><button class='button' onclick=changeColor('#ffeb3b') > <font color='#ffeb3b'><i class='material-icons'>brush</i></font></button><button class='button' onclick=changeColor('#ff9800') > <font color='#ff9800'><i class='material-icons'>brush</i></font></button><button class='button' onclick=changeColor('#ff5722') > <font color='#ff5722'><i class='material-icons'>brush</i></font></button><button class='button' onclick=changeColor('#795548') > <font color='#795548'><i class='material-icons'>brush</i></font></button><button class='button' id='red' onclick=changeColor('red') > <font color='red'><i class='material-icons'>brush</i></font></button><button class='button' id='green' onclick=changeColor('green') > <font color='green'><i class='material-icons'>brush</i></font></button><button class='button' id='blue' onclick=changeColor('blue') > <font color='blue'><i class='material-icons'>brush</i></font></button>";


    var show = btn1 + btn2 + btn3 + btn4 + btn5 + btn6 + btn7 + btn8 + btnColors;

    $('.main').append(show);


});


function changeColor(color) {
    document.getElementById('hello').style.color = color;
}

function changeFont(font) {

    if (font === '1') {
        document.getElementById('hello').style.fontStyle = 'unset';
        document.getElementById('hello').style.fontWeight = 'unset';
        document.getElementById('hello').style.textDecoration = 'unset';
        document.getElementById('hello').style.fontFamily = 'BNazanin';
        document.getElementById('hello').style.color = 'rgb(51, 72, 84)'; 
    }
    else {
        document.getElementById('hello').style.fontStyle = font;
        document.getElementById('hello').style.fontWeight = font;
        document.getElementById('hello').style.textDecoration = font;
        document.getElementById('hello').style.fontFamily = font;

    }

}
