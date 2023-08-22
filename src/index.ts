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


// MAIN MENU
playButton.addEventListener('click', function() {
  mainMenuContainer.style.display = 'none';
  playContainer.style.display = 'flex';
});
scoreButton.addEventListener('click', function() {
  mainMenuContainer.style.display = 'none';
  scoreContainer.style.display = 'flex';
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

const wordDisplay = document.getElementById('word-display') as HTMLElement;
const guessesDisplay = document.getElementById('guesses-display') as HTMLElement;
const remainingLives = document.getElementById('remaining-lives') as HTMLElement;
const guessForm = document.getElementById('guess-form') as HTMLFormElement;
const guessInput = document.getElementById('guess-input') as HTMLInputElement;

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

const ahorcado = new Ahorcado('palabra', 6);

function dibujarGuiones(palabra: string, letrasAdivinadas: string[]): string {
  return palabra
    .split('')
    .map((letra) => (letrasAdivinadas.includes(letra) ? letra : '-'))
    .join(' ');
}

const guionesDibujados = dibujarGuiones('palabra', []);
wordDisplay.textContent = guionesDibujados;

function updateUI() {
  if (ahorcado.returnLetrasErroneas().length == 0) {
    guessesDisplay.textContent = '-';
  }
  guessesDisplay.textContent = ahorcado.returnLetrasErroneas().join(', ');
  remainingLives.textContent = ahorcado.returnVidasRestantes().toString();
}

// Función para procesar la adivinanza
function processGuess() {
  const letraElegida = guessInput.value.toLowerCase();
  guessInput.value = '';

  const resultado = ahorcado.arriesgarLetra(letraElegida);

  if (typeof resultado === 'boolean') {
    if (resultado) {
      // La letra es correcta
      const guionesDibujados = dibujarGuiones('palabra', ahorcado.returnLetrasCorrectas());
      wordDisplay.textContent = guionesDibujados;
    } else {
      // La letra es incorrecta
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
  } else {
    // Resultado es una cadena (mensaje de error o pérdida)
    if (resultado == "PERDISTE") {
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
    } else {
      const guionesDibujados = dibujarGuiones('palabra', ahorcado.returnLetrasCorrectas());
      wordDisplay.textContent = guionesDibujados;
      Swal.fire({
        title: resultado,
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true,
      })
    }
  }

  updateUI();

  // Verificar si se ha ganado o perdido el juego
  if (resultado === 'GANASTE' || resultado === 'PERDISTE') {
    Swal.fire({
      title: resultado,
      timer: 5000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  } else {
    // Esperar 1 segundo antes del siguiente intento
    setTimeout(() => {
      // Lógica de juego para el siguiente intento
    }, 1000);
  }
}

// Evento de envío del formulario
guessForm.addEventListener('submit', (e) => {
  e.preventDefault();
  processGuess();
});

// Inicializar interfaz
updateUI();