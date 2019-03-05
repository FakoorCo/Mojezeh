function changeColor(color) {
  //if (document.getElementById("red").checked || document.getElementById("green").checked || document.getElementById("blue").checked)
    document.getElementById('hello').style.color = color;
    //document.getElementsByClassName('hello')
  }


function changeFont(font) {

    if (font === '1') {
        //document.getElementById('hello').classList.add('defff');
        //document.getElementsByTagName('p')
        document.getElementById('hello').style.fontStyle = 'unset';
        document.getElementById('hello').style.fontWeight = 'unset';
        document.getElementById('hello').style.textDecoration = 'unset';
        document.getElementById('hello').style.fontFamily = 'BNazanin';
    }
    else {
  //if (document.getElementById("italic").checked)
  document.getElementById('hello').style.fontStyle=font;
  //else if (document.getElementById("bold").checked)
  document.getElementById('hello').style.fontWeight = font;
  //else if (document.getElementById("underline").checked)
  document.getElementById('hello').style.textDecoration = font;

  //////
  document.getElementById('hello').style.fontFamily = font;

    }
  
}

function rotate() {
    //if (document.getElementById("red").checked || document.getElementById("green").checked || document.getElementById("blue").checked)
    document.getElementById('hello').classList.add('rotate');
}
