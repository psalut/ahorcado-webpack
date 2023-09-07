import "./styles/index.css";
import { Ahorcado } from './game';
import Swal from 'sweetalert2';

// Obtener elementos HTML
const mainMenuContainer = document.getElementById('mainMenuContainer') as HTMLElement;
const playContainer = document.getElementById('playContainer') as HTMLElement;
const playButton = document.getElementById('playButton') as HTMLElement;
const scoreContainer = document.getElementById('scoreContainer') as HTMLElement;
const scoreButton = document.getElementById('scoreButton') as HTMLElement;
const aboutUsContainer = document.getElementById('aboutUsContainer') as HTMLElement;
const aboutUsButton = document.getElementById('aboutUsButton') as HTMLElement;
const backButtons = document.querySelectorAll(".backButton");
const wordDisplay = document.getElementById('word-display') as HTMLElement;
const guessesDisplay = document.getElementById('guesses-display') as HTMLElement;
const remainingLives = document.getElementById('remaining-lives') as HTMLElement;
const scoreDisplay = document.getElementById('score-display') as HTMLElement;
const guessForm = document.getElementById('guess-form') as HTMLFormElement;
const guessInput = document.getElementById('guess-input') as HTMLInputElement;

var playerName:string;
const ahorcado = new Ahorcado(null);
var palabra = "";

// MAIN MENU
playButton.addEventListener('click', function() {
  mainMenuContainer.style.display = 'none';
  playContainer.style.display = 'flex';
  nameInput();

  dibujarHorca();
  palabra = ahorcado.getPalabra();
  console.log(palabra);

  const guionesDibujados = dibujarGuiones(palabra, []);
  wordDisplay.textContent = guionesDibujados;
});

scoreButton.addEventListener('click', function() {
  mainMenuContainer.style.display = 'none';
  scoreContainer.style.display = 'flex';
  let scores = ahorcado.getScores();

  const ul = document.getElementById("scoreList");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  
  scores.forEach(element => {
    const nuevoLi = document.createElement("li");
    nuevoLi.textContent = element.nombre + ' --------- ' + element.score;

    ul.appendChild(nuevoLi);
  });

  console.log(scores);
});
aboutUsButton.addEventListener('click', function() {
  mainMenuContainer.style.display = 'none';
  aboutUsContainer.style.display = 'flex';
});

backButtons.forEach((button) => {
  button.addEventListener("click", function() {
    playContainer.style.display = 'none';
    scoreContainer.style.display = 'none';
    aboutUsContainer.style.display = 'none';
    mainMenuContainer.style.display = 'flex';
  });
});





// Función para procesar la adivinanza
function processGuess() {
  const letraElegida = guessInput.value.toLowerCase();
  guessInput.value = '';

  const resultado = ahorcado.arriesgarLetra(letraElegida);

  // No ganó ni perdió
  if (typeof resultado === 'boolean') {
    if (resultado) {
      // La letra es correcta
      const guionesDibujados = dibujarGuiones(palabra, ahorcado.returnLetrasCorrectas());
      wordDisplay.textContent = guionesDibujados;
    } else {
      // La letra es incorrecta
      dibujarPartes();
    }
  } else {
    // Perdió
    if (resultado == "PERDISTE") {
      dibujarMuerto();

      Swal.fire({
        title: resultado,
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true,
        allowOutsideClick: false
      });
      console.log(resultado);

      ahorcado.setScore(playerName);

      // volver al menu inicial
      playContainer.style.display = 'none';
      mainMenuContainer.style.display = 'flex';

      limpiarHorca();
      ahorcado.restartGame();
      ahorcado.cleanScore();

    // Ganó
    } else {
      const guionesDibujados = dibujarGuiones(palabra, ahorcado.returnLetrasCorrectas());
      wordDisplay.textContent = guionesDibujados;
      
      Swal.fire({
        title: resultado,
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true,
        allowOutsideClick: false
      });

      if (resultado == "GANASTE") {
        limpiarHorca();
        ahorcado.restartGame();
        palabra = ahorcado.getPalabra();
      }
    }
  }

  updateUI();
}

// Evento de envío del formulario
guessForm.addEventListener('submit', (e) => {
  e.preventDefault();
  processGuess();
});

// Inicializar interfaz
updateUI();

function dibujarHorca() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'white';
  
  // HORCA
  ctx.beginPath();
  ctx.moveTo(275, 375);
  ctx.lineTo(25, 375);
  
  ctx.moveTo(50, 375);
  ctx.lineTo(50, 25);
  ctx.lineTo(75, 25);
  ctx.lineTo(75, 375);
  
  ctx.moveTo(50, 50);
  ctx.lineTo(25, 50);
  ctx.lineTo(25, 75);
  ctx.lineTo(50, 75);
  
  ctx.moveTo(75, 75);
  ctx.lineTo(250, 75);
  ctx.lineTo(250, 50);
  ctx.lineTo(75, 50);
  
  ctx.moveTo(105, 75);
  ctx.lineTo(75, 105);
  
  ctx.moveTo(75, 122);
  ctx.lineTo(122, 75);
  
  ctx.moveTo(200, 75);
  ctx.lineTo(200, 115);
  ctx.stroke();
}

function dibujarPartes() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.strokeStyle = 'white';

  switch (ahorcado.returnVidasRestantes()) {
    case 5:
      // CABEZA
      ctx.moveTo(220, 140);
      ctx.arc(200, 140, 20, 0, Math.PI * 2, true); // Círculo externo
      ctx.stroke();
    break;
    case 4:
      // TORSO
      ctx.moveTo(200, 160);
      ctx.lineTo(200, 240);
      ctx.stroke();
    break;
    case 3:
      // BRAZO DER
      ctx.moveTo(200, 170);
      ctx.lineTo(230, 220);
      ctx.stroke();
    break;
    case 2:
      // BRAZO IZQ
      ctx.moveTo(200, 170);
      ctx.lineTo(170, 220);
      ctx.stroke();
    break;
    case 1:
      // PIERNA IZQ
      ctx.moveTo(200, 240);
      ctx.lineTo(230, 280);
      ctx.stroke();
    break;
    default:
      break;
  }
}

function limpiarHorca() {
  setTimeout(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarHorca();
  }, 1000);
}

function dibujarMuerto() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.strokeStyle = 'white';

  // PIERNA DER
  ctx.moveTo(200, 240);
  ctx.lineTo(170, 280);
  ctx.stroke();

  // PERDISTE
  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.moveTo(160, 162);
  ctx.lineTo(240, 162);
  ctx.stroke();
}

function dibujarGuiones(palabra: string, letrasAdivinadas: string[]): string {
  return palabra
    .split('')
    .map((letra) => (letrasAdivinadas.includes(letra) ? letra : '-'))
    .join(' ');
}

function updateUI() {
  if (ahorcado.returnLetrasErroneas().length == 0) {
    guessesDisplay.textContent = '-';
  } else {
    guessesDisplay.textContent = ahorcado.returnLetrasErroneas().join(', ');
  }
  remainingLives.textContent = ahorcado.returnVidasRestantes().toString();
  scoreDisplay.textContent = ahorcado.returnScore().toString();
  const guionesDibujados = dibujarGuiones(palabra, ahorcado.returnLetrasCorrectas());
  wordDisplay.textContent = guionesDibujados;
}

function nameInput() {
  Swal.fire({
    title: 'Ingrese su nombre',
    html: `<input type="text" id="login" class="swal2-input">`,
    confirmButtonText: 'Ingresar',
    focusConfirm: false,
    allowOutsideClick: false,
    preConfirm: () => {
      const login = (Swal.getPopup().querySelector('#login') as HTMLInputElement).value
      if (!login) {
        Swal.showValidationMessage(`Por favor ingrese su nombre`)
      } else {
        playerName = login;
      }
    }
  });
}