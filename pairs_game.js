  //összekeveri a kép srcket az arrayben
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  
  for(var i = 1;i<37;i++){
    jQuery('#kep'+i).css('opacity', '0');
  }
   
  //var imgSources = ["cica1.png", "cica1.png", "cica1.png", "cica1.png",] tesztelésre

 var imgSources = ["cica1.png", "cica1.png", "cica2.jpg", "cica2.jpg", "cica3.jpg", "cica3.jpg", "cica4.jpg", "cica4.jpg", "kutya5.jpg", "kutya5.jpg", "kutya6.jpg", "kutya6.jpg", "kutya7.jpg", "kutya7.jpg", "kutya8.jpg", "kutya8.jpg", "nyuszi9.jpg", "nyuszi9.jpg", "nyuszi10.jpeg", "nyuszi10.jpeg", "nyuszi11.jpg", "nyuszi11.jpg", "nyuszi12.jpg", "nyuszi12.jpg", "papagaj13.jpg", "papagaj13.jpg", "papagaj14.jpg", "papagaj14.jpg", "horcsog15.jpg", "horcsog15.jpg", "horcsog16.jpg", "horcsog16.jpg", "lo17.jpg", "lo17.jpg", "lo18.jpg", "lo18.jpg"]
 var kepek_szama = imgSources.length;
  shuffle(imgSources);

  function assign(array){

    var id_counter=1;

    do{

        $('#kep' + id_counter).attr("src", "img/" + array[0]); //kioszt egy-egy képet a megkevert arrayből
        array.splice(array[0], 1); //kiveszi a már kiosztott kép srct azt arrayből
        id_counter++;
        
    } while(array.length > 0); //addig folytatja amíg nem 0 az array hossza
}


assign(imgSources);

var displayed_counter = 0;
var clicked_objects = [""]; //eltárolja a clickelt elementeket
var pontok = 0;
var matchnumbers = 0;

function checkForMatch(object_clicked){
  clicked_objects.push($(object_clicked)); //hozzáadja az arrayhez

  if( jQuery(clicked_objects[ (clicked_objects.length) - 1]).attr("src") == jQuery(clicked_objects[ (clicked_objects.length) - 2]).attr("src")  && displayed_counter == 2){ //megnézi hogy az utolsó és az utolsó előtti elem matchel-e
    console.log("Match!");
    matchnumbers++;
    pontok += 50;
    $('#scoreid').text(pontok);
    

    jQuery(clicked_objects[ (clicked_objects.length) - 1]).css("filter", "saturate("+0+")"); // szürkít
    jQuery(clicked_objects[ (clicked_objects.length) - 1]).css("pointer-events", "none"); // nem lehet kattintani

    
    jQuery(clicked_objects[ (clicked_objects.length) - 2]).css("filter", "saturate("+0+")"); // szürkít
    jQuery(clicked_objects[ (clicked_objects.length) - 2]).css("pointer-events", "none"); // nem lehet kattintani  
    displayed_counter = 0;
    console.log(displayed_counter + " #1");    
  
  }
  
  if(jQuery(clicked_objects[ (clicked_objects.length) - 1]).attr("src") != jQuery(clicked_objects[ (clicked_objects.length) - 2]).attr("src")  && displayed_counter == 2){
    
    $(clicked_objects[ (clicked_objects.length) - 1]).delay(500).animate({opacity: 0}, 500, function(){
      displayed_counter--;
      console.log(displayed_counter +" #2");
      $(clicked_objects[ (clicked_objects.length) - 1]).css("pointer-events", "auto");
      console.log("újra kattintható");
      if(pontok > 0){
        pontok = pontok -5;
        $('#scoreid').text(pontok);
      }
      else{
        pontok = 0;
        $('#scoreid').text(pontok);
      }
    }); // eltűnik a kép 0.5 sec várakozás után 0.5 sec fade-del   
    
    
    $(clicked_objects[ (clicked_objects.length) - 2]).delay(500).animate({opacity: 0}, 500, function(){
      displayed_counter--;
      console.log(displayed_counter+" #3");
      $(clicked_objects[ (clicked_objects.length) - 2]).css("pointer-events", "auto"); //újra kattinthatóvá teszi a képet 
      console.log("újra kattintható");
    }); // eltűnik a kép 0.5 sec várakozás után 0.5 sec fade-del
    
  }
  
}

var elkezdve = false; //azt jelzi el van-e kezdve a játék
var start; 
var stop = null;

function megjelenes_eltunes(object){
  if(elkezdve == false){
    elkezdve = true; //akkor indítja el a timert ha rákattintok valamelyik képre
    start = new Date;
  }
  if(displayed_counter <= 1){

    $(object).css("pointer-events", "none"); //letiltja hogy ne lehessen kétszer ugyanarra kattintani a következő megjelenése előtt
    console.log("nem kattintható"); 
    displayed_counter++;
    console.log(displayed_counter);
    jQuery(object).css('opacity', '1'); // megjelenik a kép
    checkForMatch(object); 
  }  
    if(matchnumbers == kepek_szama / 2){ //ha a párok száma eléri a képek számának a felét (mert egy kép kétszer szerepel)
      console.log("megvan az összes match");
      stop = new Date; //akkor leállítja a számlálót
      alert("Congratulations! Your score is " + pontok); //befejezi a játékot

    }
}

$('#newgame').click(function() {
  location.reload();  //újraindítja az oldalt a gombra kattintva
});


setInterval(function() {
    if(stop == null){
      $('#timerid').text(Math.round((new Date - start) / 1000, 0) + " Seconds"); //az első kártyanyitástól írja ki az eltelt másodperceket  - másodpercenként frissít
    }
    else{
      $('#timerid').text(Math.round((stop - start) / 1000, 0) + " Seconds"); //első kártyanyitástól utolsó matching eltelt időt írja ki - másodpercenként frissít
    }
}, 1000);


$('#kep1').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep2').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep3').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep4').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep5').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep6').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep7').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep8').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep9').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep10').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep11').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep12').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep13').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep14').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep15').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep16').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep17').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep18').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep19').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep20').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep21').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep22').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep23').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep24').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep25').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep26').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep27').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep28').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep29').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep30').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep31').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep32').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep33').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep34').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep35').click(function() {       
  megjelenes_eltunes(this);
});

$('#kep36').click(function() {       
  megjelenes_eltunes(this);
});

// match method, 2 legyen egyszerre ne 3, 