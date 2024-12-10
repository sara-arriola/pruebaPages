//HECHO POR: Sara eugenia Arriola Castillo (118963/4) y Alana Florencia Cañete (118985/1), Comisión 2 PMIW.
// Video Yt: https://youtu.be/bRcXeSa4_kY

let gumball;
let buttons = [];
let ocho  = [];
let key = [];
let ochoTotales = 7;
let c_random;
//let gumballImg; --> declarado en la clase Gumball
//let llaveImg; --> declarado en la clase Key
let nivel = 1;
let vidas = 3;
let cantTotalKeys = 3;
let pantallaGanaste;
let pantallaPerdiste;
let pantallaInstrucciones;
let pantallaCreditos;
let sonidosGame;
let pantallaInicioActiva = true ;

function preload(){
  pantallaInstrucciones = loadImage ("Instrucciones.jpg");
  pantallaCreditos = loadImage ("Creditos.jpg");
  pantallaGanaste = loadImage ("ganaste.jpg");
  pantallaPerdiste = loadImage ("perdiste.jpg");
  startSnd = loadSound ("game_start.mp3");
  llaveSnd = loadSound ("pickup_llave.mp3");
  loseSnd = loadSound ("perdiste.mp3");
  winSnd = loadSound ("ganaste.mp3");
  c_random = color(random(255),random(255),random(255));
  
}
function instanciaObjetoKey(){
  for (let i = 0; i < cantTotalKeys; i++){    
    key[i] = new Keys();
  }
}

function instanciaObjetoOcho(){
  for (let i = 0; i < ochoTotales; i++){    
    ocho[i] = new Ocho();
  }
}

function instanciaObjetoBotones(){  //función que genera los dos botones que se van a usar

  buttons.push(  
    new Button(
      320,450,            // position (x,y)
      166,28,           // size (w,h)
      'rgb(0,255,0)', // primary color
      'rgb(255,0,0)', // color when hovered
      'JUGAR',        // text for button
      jugarDenuevo      // function that will be called                      
    )                   // when button is clicked
  );

  buttons.push(
    new Button(
      120,450,            // position (x,y)
      166,28,           // size (w,h)
      'rgb(0,255,0)', // primary color
      'rgb(255,0,0)', // color when hovered
      'CREDITOS',        // text for button
      vercreditos      // function that will be called                      
    )                   // when button is clicked
  );
}


function setup (){
  createCanvas (640, 480);
  rectMode(CENTER);
  gumball = new Gumball();
  instanciaObjetoOcho();
  instanciaObjetoKey();
  instanciaObjetoBotones();
  sonidosGame = new SonidosJuego();
  verPantallaInstrucciones();
  noStroke();
}

function verPantallaInstrucciones(){
  background (pantallaInstrucciones);
  // boton   JUGAR
  buttons[0].displayText ='JUGAR';
  buttons[0].reactionFunction = jugarDenuevo;
  buttons[0].display();  
} 

function headerInformativoSuperior(){
  // Dibuja un rectángulo
  fill(0,0,0);
  rect(50, 0, 1200, 50); // negro 
  fill(c_random);    
  rect(300, 0,55, 50); // puerta de salida 
  // Escribe texto dentro del rectángulo
  fill(255,255,255);
  textSize(18);
  text('Nivel', 2, 15);    
  text(  nivel , 66, 15);  
  text('Vidas', 562, 15);    
  text(  vidas, 626 , 15);  
  fill(random(255),random(255),random(255));
  text('EXIT', 283, 15);    
} 

// regenera los objetos llaves para que desaparezcan las obtenidas por el jugador 

function recrearLlaves(){  //cambia d epos las llaves
  for (let i = 0; i < cantTotalKeys; i++){    
    key[i] = new Keys();
  }
}

function draw (){  
  if (!pantallaInicioActiva){
      if (nivel == 4){
            background (pantallaGanaste);  //cambiar por una funcion que haga la pantalla de ganaste.             
            buttons[0].displayText ='VOLVER'
            buttons[0].display();
            buttons[1].display();
      }else {
            if (vidas != 0) {
              runGame();
            } else {
              background (pantallaPerdiste);
              buttons[0].displayText ='VOLVER'
              buttons[0].display();
              buttons[1].display();
            } 
      }
    }  
  }
/*--------------------------------------------------------------------------------------------
parte del codigo que se ejcuta desde DRAW() 
--------------------------------------------------------------------------------------------*/
function runGame(){
  background (c_random);
  headerInformativoSuperior();
  gumball.move();
  gumball.display();
  gumball.checkOnscreen();
  for (let i = 0; i < ochoTotales; i++){
    ocho[i].move();
    ocho[i].display();
    ocho[i].checkCollision();
  }
  for (let i = 0; i < cantTotalKeys; i++){
    key[i].display();
    key[i].checkIfCapturado();
  }
}

// *******************************************************************************************************************
//                                        CLASE  SONIDOSJUEGO  
// *******************************************************************************************************************
// GESTIONA TODOS LOS SONIDOS QUE GENERA  EL JUEGO  
// *******************************************************************************************************************
  class SonidosJuego {
    constructor() {            
      this.sonidos = [];
      this.sonidos[0] = loadSound("game_start.mp3");
      this.sonidos[1] = loadSound("pickup_llave.mp3");
      this.sonidos[2] = loadSound("perdiste.mp3");
      this.sonidos[3] = loadSound("ganaste.mp3");      
    }
  
    ejecutarSonido(indice) {
      if (indice >= 0 && indice < this.sonidos.length) {
        this.sonidos[indice].play();
      } else {
        console.error("Índice de sonido inválido");
      }
    }
  }
// ********************************************************************************************
//                                        CLASE  OCHO OBJETOS 
// ********************************************************************************************
// QUE SE DESPLAZAN DE DERECHA A IZQUIERDA Y QUE NO DEBE CHOCAR EL JUGADOR
// ********************************************************************************************
  class Ocho {
    constructor(){
    //let semilla = hour() * 3600 + minute() * 60 + second();
    //randomSeed(semilla);
    this.x = random(width);;
    this.y = random(20,height-40);
    this.w = 60;
    this.h = 20;
    this.c =   color(100 +random(255),100 + random(155),100 + random(155)); 
    this.imagenes = [];
    this.imagenes[0] = loadImage ("azul-removebg-preview.png");
    this.imagenes[1] = loadImage ("negro-removebg-preview.png");
    this.imagenes[2] = loadImage ("rojo-removebg-preview.png");
    this.imagenes[3] = loadImage ("verde-removebg-preview.png");
    this.imagenes[4] = loadImage ("violeta-removebg-preview.png");    
    this.imgSeleccionada = floor(random(5));    

  }
  display(){
    image( this.imagenes[this.imgSeleccionada],this.x,this.y,this.w,this.w)
  }
  move(){
    this.x-=2;
    if (this.x<0){
      this.x = width;
    }
  }
  checkCollision(){
    if (dist(this.x,this.y,gumball.x,gumball.y)<20){
      print("colision")
      sonidosGame.ejecutarSonido(2);
      gumball.y = height - gumball.h/2;
      nivel = 1;
      vidas --;
      if (vidas == 0){ instanciaObjetoKey(); }
    }
  } 
}
// ********************************************************************************************
//                                        CLASE  BUTTON 
// ********************************************************************************************
// QUE SE DESPLAZAN DE DERECHA A IZQUIERDA Y QUE NO DEBE CHOCAR EL JUGADOR
// ********************************************************************************************
class Button {
  
  // defining the constructor, which will accept a number of arguments
  constructor(x,y,w,h,col,hover_col,displayText,reactionFunction) {
    // then assign those arguments to new variables that will be stored in
    // the class
    // these variables, beginning with 'this' are often referred to as 
    // 'properties'
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ajusteXtexto = 0; 
    this.ajusteYtexto = 0;
    this.col = color(col);
    this.hover_col = color(hover_col);
    this.currentlyHovering = false;
    this.displayText = displayText;
    this.reactionFunction = reactionFunction;
  }
  
  // display will draw anything visual to canvas
  display() {
    
    // check to see if current button is being hovered over
    if(this.isHoveredOver()) {
      fill(this.hover_col)
    } else {
      fill(this.col);
    }
    
    rect(this.x,this.y,this.w,this.h);

    fill('black');
    text(this.displayText, this.x - this.w / 4 - this.ajusteXtexto, this.y + this.h/4 + this.ajusteYtexto );
  }
  
  textoBoton(texto) {
    this.displayText = texto;
  }
  

  // check to see mouse is over the current button
  isHoveredOver() {
    return (mouseX > this.x && mouseX < this.x + this.w && 
       mouseY > this.y && mouseY < this.y + this.h);
  }
}

class Gumball {

  constructor(){
    this.imagenes = [];    
    this.imagenes[0] = loadImage("up.png");
    this.imagenes[1] = loadImage ("down.png");
    this.imagenes[2] = loadImage ("right.png");
    this.imagenes[3] = loadImage ("left.png");
    this.imgSeleccionada = 0;
    this.w = 40;
    this.h = 40;
    this.x = width/2;
    this.y = height - this.w;
    this.c = color(0,255,0);
  }
  display(){
     image(this.imagenes[this.imgSeleccionada],this.x,this.y,this.w,this.w)
  }
  move(){
    if (keyIsPressed){
      if (keyCode === UP_ARROW) {
       this.y-=3;
       this.imgSeleccionada = 0;
      }
       if (keyCode === DOWN_ARROW) {
       this.y+=3;
       this.imgSeleccionada = 1;
      }
        if (keyCode === RIGHT_ARROW) {
          this.x+=3;
          this.imgSeleccionada = 2;
      }
       if (keyCode === LEFT_ARROW) {
       this.x-=3;
       this.imgSeleccionada = 3;
      }
    }
  }
  checkOnscreen(){    
    if ( this.y <15 && this.x > 260  && this.x < 300 ) { 
            print("Nivel: ",nivel);            
            nivel++;
            //winSnd.play();            
            sonidosGame.ejecutarSonido(3);
            c_random= color(200+random(55),200+random(55),200+random(100));
            this.y = height - this.h;
            recrearLlaves();
      }
    
    else{
          if (this.y < 0){
            print("Not Exit!")
            loseSnd.play();
            sonidosGame.ejecutarSonido(2);
            gumball.y = height - gumball.h/2;
            
          }
      }  
  }
}
// *******************************************************************************************************************
//                                        CLASE  KEYS  
// *******************************************************************************************************************
// SE GENERAN EN POSICIONES ALEATORIAS Y CADA OBJETO INSTANCIADO ES ELIMINADO EN EL JUEGO POR EL JUGADOR  
// *******************************************************************************************************************
class Keys {
  constructor(){
  
  this.llaveImg = loadImage ("llave.png");
  this.x = random(width);;
  this.y = random(20,height-40);
  this.w = 60;
  this.h = 20;
  this.c =   color(100 +random(255),100 + random(155),100 + random(155)); 
  this.capturado = false;
}
display(){
  if (this.capturado ==false) { // impide que el objeto capturado sea dibujado
  
     image(this.llaveImg,this.x,this.y,this.w,this.w)
  }
}
checkIfCapturado(){
  if (dist(this.x,this.y,gumball.x,gumball.y)<30 && !this.capturado){
    print("colision")    
    sonidosGame.ejecutarSonido(1);
    this.capturado = true; // marca que este objeto fue capturado
  }
} 
}
function mouseMoved(){
  /*
  background (pantallaInstrucciones);
  buttons[0].display(); 
  fill(255,255,255);
  textSize(18);  
  text(' esta dentro  =', 222, 15); 
  text(  estaDentroDelRectangulo(420,400,166,28) , 322, 15);  
  text(' X   =', 122, 55);   
  text( mouseX, 170, 55); 
  text(' Y   =', 122, 85);   
  text( mouseY, 170, 85); 
  */
}

function mousePressed() {
  // if the button is being hovered over while being clicked
  //if(buttons[0].isHoveredOver()) { // no anda bien     
  //}
    if ((mouseX > 237 && mouseX < 403  && mouseY > 437 && mouseY < 562)){     
       buttons[0].reactionFunction();
    }
    if ((mouseX > 37 && mouseX < 203  && mouseY > 437 && mouseY < 562)){
      buttons[1].reactionFunction();
   }
}

function vercreditos() {    
  pantallaInicioActiva = true;
  background (pantallaCreditos);  
  buttons[0].displayText ='JUGAR';
  buttons[0].reactionFunction = jugarDenuevo;
  buttons[0].display();  
  
}
function jugarDenuevo() {    
  pantallaInicioActiva = false;
  vidas=3;  
  nivel =1;  
}