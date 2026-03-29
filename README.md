shitty, buggy demo here: https://johnnydub08.github.io/cipher.js/ ..the library is stable thou. ;)

Just check it for yourself..it's written quite robust and behaves similar to anime.js

Can be a nice little special effect for encryption or matrix themed webdesigns for you or your customers. 

cipher.js

Animated ASCII cipher effects for the DOM
Zero dependencies · 21+ Charsets · 7 Animation Styles

Transform text into living ASCII art – degrade, encrypt, animate.

 Features

    3 Cyberpunk Modes – Laughing Man (Ghost in the Shell), Agent Smith (Matrix), Black ICE (Neuromancer)

    18 Built‑in Charsets – Latin, symbols, technical, math, Greek, Cyrillic, katakana, Arabic, Devanagari, emoji, geometric, box drawing, blocks, Braille, runic, Egyptian, music, arrows

    7 Animation Styles – left‑to‑right, right‑to‑left, waterfall, vortex, brownian, wave, pingpong

    Degradation / Neural Infection Engine (Diffusion, Linear, Chaos) – characters evolve through families (lines → curves → circles)

    Full Animation Control – easing, loop, delay, speed, direction, callbacks

    Sequence & Parallel – chain or run multiple animations together

    Pause / Resume / Reverse – full control over running animations


JavaScript-Library (~3.2kb gzipped) zur Simulation von digitalem Zerfall, ASCII-Animationen und Cyberpunk-Verschlüsselungseffekten. 

Kern-Features

21+ Charsets: Von klassischen Matrix-Katakana über Braille bis hin zu Box Drawing.

7 Animations-Styles: Waterfall, Vortex, Brownian Motion, Wave, Ping-Pong etc.

Neural Infection Engine: Drei mathematische Ausbreitungsmodelle (Diffusion, Linear, Chaos), um Texte organisch zu "zerstören".

Zero Dependencies.

🛠
Integration:

Binde die Library einfach in dein Projekt ein: HTML
<script src="path/to/cipher.js"></script>

'API' Referenz xD

Login-Effekt:

const loginText = document.querySelector('#status');
Cipher.encrypt(loginText, { mode: 'black-ice' }); // 1. Text sofort verschleiern 
setTimeout(() => { Cipher.decrypt(loginText, "ACCESS GRANTED", 1500, () => { loginText.classList.add('glow-green'); }); }, 1000); // 2. Nach Verzögerung "entschlüsseln" 

oder so:

Cipher.encryptWithStyle(myElement, 
                        { style: 'vortex', mode: 'agent-smith', duration: 2000, speed: 1.5, loop: false,     
                          onUpdate: (p) => console.log(Fortschritt: ${p * 100}%),     
                          onComplete: () => console.log('Terminal gesperrt.')         
                        });


"Virusangriff" auf bestehende Texte:

Cipher.infect(el, { type: 'diffusion', spread: 12, mode: 'glitch' }); 


Styles & Charsets:
Du kannst eigene Charsets via Cipher.charsets['mein-name'] = "12345ABCDE" hinzufügen.

style:
'left-to-right' Klassischer Scan von links nach rechts. 
'vortex' Die Verschlüsselung startet in der Mitte und zieht nach außen. 
'waterfall' Zeichen "fallen" von oben nach unten in den neuen Status. 
'wave' Eine sinusförmige Welle bewegt sich durch den Text. 
'brownian' Zufällige Partikelbewegung (organisches Rauschen).


