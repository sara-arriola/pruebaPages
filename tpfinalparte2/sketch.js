// SECCION DECLARACION DE VARIABLE
// ************************************
// VARIABLES DE OBJETOS 
let gumball;
let miJuego;
let sonidosGame;
let miPantalla;
// VARIABLES ENTERAS  
let nivel = 1;
let vidas = 3;
// ************************************

class Pantallas {
  constructor(imgPaths) {
    this.images = [];
    for (let i = 0; i < imgPaths.length; i++) {
      this.images.push(loadImage(imgPaths[i]));
    }
    this.currentImageIndex = 0;
  }

  mostrar(index) {
    this.currentImageIndex = index;
    background(this.images[this.currentImageIndex]);
  }
  
  vercreditos() {   
    miJuego.set_pantallaInicioActiva(true);     
    this.mostrar(1);
    miJuego.botonJugar()  
  }

  jugarDenuevo() {    
    miJuego.set_pantallaInicioActiva(false);
    vidas=3;  
    nivel =1;  
  }
}

class Configuracion {
  constructor(enemigos,colorrnd,cantkeys) {
    this.ochoTotales =enemigos;
    this.c_random = colorrnd ; 
    this.cantTotalKeys = cantkeys ; 
  }
}

function preload(){
    let imagenesLista = ["Instrucciones.jpg", "Creditos.jpg","ganaste.jpg", "perdiste.jpg"];    
    miPantalla = new Pantallas(imagenesLista);     
}

function setup (){                     
          Juego.creaCanvasRecMode();
          configuracion = new Configuracion(7,color(random(255),random(255),random(255)) ,3);         
          miJuego = new Juego(configuracion);
          miJuego.verPantallaInstrucciones();  
}

function draw (){  
          miJuego.starGame();
  }

class Juego{
            constructor(config) {   
              this.ochoTotales = config.ochoTotales;  
              //this.c_random = config.c_random;  
              this.cantTotalKeys = config.cantTotalKeys;  
              this.config = config;    
              this.buttons =  [];      
              this.ocho = [];
              this.key= [];
              this.pantallaInicioActiva = true ;
              gumball = new Gumball();              
              sonidosGame = new SonidosJuego(); 
              this.instanciaObjetoKey();
              this.instanciaObjOcho();
              // crea objetos de los enemigos que se desplazan.              
              this.buttons.push( new Button(320,450,166,28, 'rgb(0,255,0)','rgb(255,0,0)','JUGAR'));
              // position (x,y) / size (w,h) / primary color / color when hovered / text for button / function that will be called / when button is clicked
              this.buttons.push(new Button(120,450,166,28,'rgb(0,255,0)','rgb(255,0,0)','CREDITOS'));
          }              
          ret_pantallaInicioActiva(){
                return this.pantallaInicioActiva
          }
          set_pantallaInicioActiva(valor){
            this.pantallaInicioActiva = valor;
            if (!valor) {
              this.instanciaObjetoKey();
            }
          }  
          static creaCanvasRecMode(){
                createCanvas (640, 480);
                rectMode(CENTER);
          }
          
          botonJugar(){
            this.buttons[0].displayText ='JUGAR';
            //this.buttons[0].reactionFunction = jugarDenuevo;
            this.buttons[0].display();  
          }

          verPantallaInstrucciones(){                
                miPantalla.mostrar(0);
                this.botonJugar();
                // boton   JUGAR
          } 

          instanciaObjOcho(){
            for (let i = 0; i < this.ochoTotales; i++){    
              this.ocho[i] = new Ocho();
            }
          }  

          recrearLlaves(){  //cambia d epos las llaves
                for (let i = 0; i < this.cantTotalKeys; i++){    
                  this.key[i] = new Keys();
                }
          }

          headerInformativoSuperior(){
                // Dibuja un rectángulo
                fill(0,0,0);
                rect(50, 0, 1200, 50); // negro 
                fill(this.config.c_random);
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

          runGame(){
                background (this.config.c_random);  
                this.headerInformativoSuperior();  
                gumball.move();
                gumball.display();
                gumball.checkOnscreen(this.config);
                for (let i = 0; i < this.ochoTotales; i++){
                  this.ocho[i].move();
                  this.ocho[i].display();
                  this.ocho[i].checkCollision();
                }
                for (let i = 0; i < this.cantTotalKeys; i++){
                  this.key[i].display();
                  this.key[i].checkIfCapturado();
                }
          }

          starGame(){
              if (!miJuego.ret_pantallaInicioActiva() ){
                if (nivel == 4){                      
                      miPantalla.mostrar(2); // ganaste
                      this.buttons[0].displayText ='VOLVER'
                      this.buttons[0].display();
                      this.buttons[1].display();
                }else {
                      if (vidas != 0) {
                        this.runGame();
                      } else {                        
                        miPantalla.mostrar(3); // perdiste 
                        this.buttons[0].displayText ='VOLVER'
                        this.buttons[0].display();
                        this.buttons[1].display();
                      } 
                }
              }  
          }
        
        instanciaObjetoKey(){
            for (let i = 0; i < this.cantTotalKeys; i++){    
              this.key[i] = new Keys();
            }
        }
}


// ***************************************
//                                        CLASE  SONIDOSJUEGO  
// ***************************************
// GESTIONA TODOS LOS SONIDOS QUE GENERA  EL JUEGO  
// ***************************************
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
// ********************************
//                                        CLASE  OCHO OBJETOS 
// ********************************
// QUE SE DESPLAZAN DE DERECHA A IZQUIERDA Y QUE NO DEBE CHOCAR EL JUGADOR
// ********************************
  class Ocho {
    constructor(){
          this.x = random(width);
          this.y = random(20,height-40);
          this.w = 60;
          this.h = 20;
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
          //if (vidas == 0){ miJuego.instanciaObjetoKey(); }
        }
    } 
}
// ********************************
//                                        CLASE  BUTTON 
// ********************************
// QUE SE DESPLAZAN DE DERECHA A IZQUIERDA Y QUE NO DEBE CHOCAR EL JUGADOR
// ********************************
class Button {
  
  // defining the constructor, which will accept a number of arguments
  constructor(x,y,w,h,col,hover_col,displayText) {
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
    //this.reactionFunction = reactionFunction;
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
  }
  display(){
     image(this.imagenes[this.imgSeleccionada],this.x,this.y,this.w,this.w)
  }
  move(){
    if (keyIsPressed){
      if (keyCode === UP_ARROW) {
       this.y-=2;
       this.imgSeleccionada = 0;
      }
       if (keyCode === DOWN_ARROW) {
       this.y+=2;
       this.imgSeleccionada = 1;
      }
        if (keyCode === RIGHT_ARROW) {
          this.x+=2;
          this.imgSeleccionada = 2;
      }
       if (keyCode === LEFT_ARROW) {
       this.x-=2;
       this.imgSeleccionada = 3;
      }
    }
  }
  checkOnscreen(config){    
    if ( this.y <0 && this.x > 260  && this.x < 300 ) { 
            print("Nivel: ",nivel);            
            nivel++;          
            sonidosGame.ejecutarSonido(3);            
            config.c_random= color(200+random(55),200+random(55),200+random(100));
            this.y = height - this.h;
            miJuego.recrearLlaves();
      }
    
    else{
          if (this.y < 0){
            print("Not Exit!")
            sonidosGame.ejecutarSonido(2);
            gumball.y = height - gumball.h/2;
            
          }
      }  
  }
}
// ***************************************
//                                        CLASE  KEYS  
// ***************************************
// SE GENERAN EN POSICIONES ALEATORIAS Y CADA OBJETO INSTANCIADO ES ELIMINADO EN EL JUEGO POR EL JUGADOR  
// ***************************************
class Keys {
      constructor(){      
          this.llaveImg = loadImage ("llave.png");
          this.x = random(width);;
          this.y = random(20,height-40);
          this.w = 60;
          this.h = 20;
          this.capturado = false;
        }
      display(){
          if (this.capturado ==false) { // impide que el objeto capturado sea dibujado          
            image(this.llaveImg,this.x,this.y,this.w,this.w)
          }
        }
        
        
      checkIfCapturado(){
          
          if (dist(this.x,this.y,gumball.x,gumball.y)<30 &&  !this.capturado){
            print("colision")    
            sonidosGame.ejecutarSonido(1);
            this.capturado = true; // marca que este objeto fue capturado
          }
        } 
}
function mousePressed() {   

    if ((mouseX > 237 && mouseX < 403  && mouseY > 437 && mouseY < 562)){            
       miPantalla.jugarDenuevo();
    }
    if ((mouseX > 37 && mouseX < 203  && mouseY > 437 && mouseY < 562)){            
      miPantalla.vercreditos();
   }
}