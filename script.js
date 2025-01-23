const redLights = [
  document.getElementById('red1'),
  document.getElementById('red2'),
  document.getElementById('red3')
];
const greenLight = document.getElementById('green');
const startButton = document.getElementById('startButton');
const goButton = document.getElementById('goButton'); // Pulsante "Parti!"
const result = document.getElementById('result');

let greenTime = null; // Variabile per salvare il momento in cui si accende il verde
let isGreen = false; // Stato per verificare se il verde è attivo

startButton.addEventListener('click', () => {
  // Reset iniziale
  result.textContent = ''; // Resetta il risultato
  greenTime = null; // Resetta il tempo del verde
  isGreen = false; // Resetta lo stato del verde
  greenLight.style.opacity = '0.5'; // Spegni il verde
  redLights.forEach(light => light.style.opacity = '0.5'); // Spegni tutte le luci rosse

  // Disabilita il pulsante Start durante l'animazione
  startButton.disabled = true;

  // Abilita il pulsante "Parti!" per permettere clic prima del verde
  goButton.disabled = false;

  // Accensione progressiva delle luci rosse con timer casuali
  let delay = 0;
  redLights.forEach((light, index) => {
    delay += Math.random() * 1000 + 500; // Timer casuale tra 0.5s e 1.5s
    setTimeout(() => {
      light.style.opacity = '1'; // Accendi la luce
    }, delay);
  });

  // Accendi il verde dopo un ulteriore timer casuale (1-3 secondi)
  const greenDelay = delay + Math.random() * 2000 + 1000; // Aggiungi 1-3 secondi
  setTimeout(() => {
    redLights.forEach(light => light.style.opacity = '0.5'); // Spegni le luci rosse
    greenLight.style.opacity = '1'; // Accendi il verde
    greenTime = Date.now(); // Registra il tempo di accensione del verde
    isGreen = true; // Imposta lo stato del verde a true
  }, greenDelay);
});

// Gestione del clic sul pulsante "Parti!"
goButton.addEventListener('click', () => {
  const clickTime = Date.now(); // Registra il momento del clic

  if (!isGreen) {
    // L'utente ha cliccato prima che il verde si accendesse
    result.textContent = 'Partenza anticipata!';
    goButton.disabled = true; // Disabilita il pulsante "Parti!" dopo il clic
    startButton.disabled = false; // Riabilita il pulsante Start per un nuovo tentativo
  } else {
    // L'utente ha cliccato dopo il verde: calcola il tempo di reazione
    const reactionTime = ((clickTime - greenTime) / 1000).toFixed(3); // Tempo in secondi con 3 decimali
    result.textContent = `Tempo di reazione: ${reactionTime} secondi`;
    goButton.disabled = true; // Disabilita il pulsante "Parti!" dopo il clic
    startButton.disabled = false; // Riabilita il pulsante Start per un nuovo tentativo
  }
});
