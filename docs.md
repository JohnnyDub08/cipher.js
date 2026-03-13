💠 cipher.js v2.2.0

Eine leichtgewichtige JavaScript-Library (~3.2kb gzipped) zur Simulation von digitalem Zerfall, ASCII-Animationen und Cyberpunk-Verschlüsselungseffekten. 
  Entwickelt für Websites, die eine Atmosphäre von "Hacking" oder "Neural Terminal" benötigen.
    
🚀 Kern-Features

    21+ Kuratierte Charsets: Von klassischen Matrix-Katakana über Braille bis hin zu "Black ICE" (Box Drawing).

    7 Animations-Styles: Waterfall, Vortex, Brownian Motion, Wave, Ping-Pong etc.

    Neural Infection Engine: Drei mathematische Ausbreitungsmodelle (Diffusion, Linear, Chaos), um Texte organisch zu "zerstören".

    Zero Dependencies: Reines Vanilla JS.

🛠 Integration

Binde die Library einfach in dein Projekt ein:
HTML

<script src="path/to/cipher.js"></script>

📖 API Referenz
1. Basisfunktionen
Cipher.encrypt(element, options)

Ersetzt den Text eines Elements sofort durch zufällige Zeichen des gewählten Charsets.

    Optionen: { mode: 'black-ice' }

Cipher.decrypt(element, targetText, duration, callback)

Der klassische "Hacker-Reveal"-Effekt.

    Parameter:

        targetText: Der finale Text (null = nimmt data-cipher-original).

        duration: Animationszeit in ms.

2. Fortgeschrittene Animationen
Cipher.encryptWithStyle(element, options)

Das Herzstück für komplexe UI-Animationen.
JavaScript

Cipher.encryptWithStyle(myElement, {
  style: 'vortex',      // 'waterfall', 'wave', 'brownian', etc.
  mode: 'agent-smith',  // Charset
  duration: 2000,
  speed: 1.5,           // Multiplikator für die Frequenz
  loop: false,
  onUpdate: (p) => console.log(`Fortschritt: ${p * 100}%`),
  onComplete: () => console.log('Terminal gesperrt.')
});

3. Neural Infection (v2.2.0)

Simuliert einen Virusangriff auf bestehende Texte, ohne das Layout zu sprengen.
JavaScript

Cipher.infect(el, {
  type: 'diffusion', // 'linear' (Top-Down), 'chaos' (Sinus-basiert)
  spread: 12,        // Wie viele Zeichen pro Frame mutieren
  mode: 'glitch'
});

🎨 Styles & Charsets
Style	Beschreibung
left-to-right	Klassischer Scan von links nach rechts.
vortex	Die Verschlüsselung startet in der Mitte und zieht nach außen.
waterfall	Zeichen "fallen" von oben nach unten in den neuen Status.
wave	Eine sinusförmige Welle bewegt sich durch den Text.
brownian	Zufällige Partikelbewegung (organisches Rauschen).
⚡ Quick-Start Tutorial: Der "Login-Reveal"

Um einen eindrucksvollen Login-Effekt zu erzeugen, kombiniere encrypt und decrypt:
JavaScript

const loginText = document.querySelector('#status');

// 1. Text sofort verschleiern
Cipher.encrypt(loginText, { mode: 'black-ice' });

// 2. Nach Verzögerung "entschlüsseln"
setTimeout(() => {
    Cipher.decrypt(loginText, "ACCESS GRANTED", 1500, () => {
        loginText.classList.add('glow-green');
    });
}, 1000);


    Customizing: Du kannst eigene Charsets via Cipher.charsets['mein-name'] = "12345ABCDE" hinzufügen.
