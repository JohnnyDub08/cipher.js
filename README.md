🔐 cipher.js

Lightweight ASCII Evolution Engine — 2.8kb gzipped
Zero dependencies · Cyberpunk Modes · 18 Charsets · 7 Animation Styles



Transform text into living ASCII art – degrade, encrypt, and reveal with style.

✨ Features

    🎭 3 Cyberpunk Modes – Laughing Man (Ghost in the Shell), Agent Smith (Matrix), Black ICE (Neuromancer)

    📦 18 Built‑in Charsets – Latin, symbols, technical, math, Greek, Cyrillic, katakana, Arabic, Devanagari, emoji, geometric, box drawing, blocks, Braille, runic, Egyptian, music, arrows

    🌀 7 Animation Styles – left‑to‑right, right‑to‑left, waterfall, vortex, brownian, wave, pingpong

    🧬 Degradation – characters evolve through families (lines → curves → circles)

    🖼️ Wall Patterns – cover text with iconic ASCII murals, then reveal

    ⏱️ Full Animation Control – easing, loop, delay, speed, direction, callbacks

    🔁 Sequence & Parallel – chain or run multiple animations together

    ⏸️ Pause / Resume / Reverse – full control over running animations

Basic Usage
javascript

const el = document.getElementById('title');

// Encrypt instantly with a mode
Cipher.encrypt(el, { mode: 'agent-smith' });

// After 2 seconds, decrypt with a 3‑second animation
setTimeout(() => {
  Cipher.decrypt(el, null, 3000);
}, 2000);

Style Demo
javascript

Cipher.encryptWithStyle(el, {
  style: 'waterfall',
  mode: 'laughing-man',
  direction: 'down',
  duration: 4000,
  loop: true,
  easing: 'easeOut'
});

📖 API Overview
Function	Description
encrypt(element, options)	Instantly encrypts text using a charset or mode.
decrypt(element, targetText?, duration?, onComplete?)	Reveals original text with a smooth wave animation.
trigger(element, options?)	Burst‑step degradation then decrypt.
reset(element)	Resets element to its encrypted state.
encryptWithStyle(element, options)	Encrypts with a chosen animation style.
setMode(modeName, displayEl?, wallEl?)	Switches the active cyberpunk mode and updates wall pattern.
coverWithPattern(element, options)	Places an ASCII wall pattern over the element.
revealWithPattern(element, options)	Shows pattern then fades out.
startDegradation(element, interval?, intensity?)	Continuously mutates characters.
stopDegradation(element)	Stops degradation.
sequence(element, steps, onComplete?)	Runs animations in sequence.
parallel(element, animations, onComplete?)	Runs animations in parallel.
pause(animationInstance)	Pauses a running animation.
resume(animationInstance)	Resumes a paused animation.
reverse(animationInstance)	Reverses direction of a running animation.
Options Object (for encryptWithStyle and decrypt)
javascript

{
  mode: 'laughing-man',       // preset mode name
  charset: '...',             // custom character string (overrides mode)
  style: 'waterfall',         // animation style
  direction: 'normal',        // 'normal', 'reverse', 'alternate'
  duration: 2000,             // milliseconds
  delay: 0,                   // start delay
  loop: false,                // number of loops or true for infinite
  speed: 1.0,                 // playback speed multiplier
  easing: 'linear',           // 'linear', 'easeIn', 'easeOut', 'easeInOut'
  onBegin: () => {},          // called when animation starts
  onUpdate: (progress) => {}, // called each frame (progress 0..1)
  onComplete: () => {},       // called when animation ends
  onLoop: (count) => {}       // called after each loop
}

🎨 Built‑in Charsets
Key	Description
latin	A‑Z a‑z 0‑9
symbols	!@#$%^&*()...
tech	→⇒←⇐↑⇑↓⇓↔↕§¶†‡
math	∑∏∂∇∞≈≠≤≥±÷×√…
greek	ΑΒΓΔ…αβγδ…
cyrillic	АБВГ…абвг…
katakana	アイウエオ…
arabic	ابتث…
devanagari	अआइ…
emoji	😀😁😂😎🤖👾…
geometric	▲△▼▽◆◇■□●○…
box	┌┐└┘├┤┬┴┼─│═║…
blocks	█▓▒░▁▂▃▄▅▆▇…
braille	⠁⠃⠇⠧⠿…
runic	ᚠᚢᚦᚨᚱ…
egyptian	𓀀𓀁𓀂𓀃…
music	♩♪♫♬♭♮♯…
arrows	←→↑↓↖↗↘↙…
laughing-man	☺☻♥♦♣♠•◘○◙…
agent-smith	01アイウエオ… + ASCII
black-ice	▒▓█▌▐▀▄┌┐└┘…
🖥️ Examples
Cover with a wall pattern, then decrypt
javascript

Cipher.coverWithPattern(el, {
  pattern: 'matrix-rain',
  duration: 2000,
  onReveal: () => Cipher.decrypt(el, 'ACCESS GRANTED', 2500)
});

Sequence: encrypt → degrade → decrypt
javascript

Cipher.sequence(el, [
  { action: 'encrypt', mode: 'black-ice' },
  { action: 'degrade', interval: 100, intensity: 0.2, duration: 3000 },
  { action: 'decrypt', duration: 2000 }
], () => console.log('All done!'));

Parallel: degrade + wall pattern simultaneously
javascript

Cipher.parallel(el, [
  { action: 'degrade', interval: 150, intensity: 0.1 },
  { action: 'cover', pattern: 'laughing-man', duration: 3000 }
], () => console.log('Both finished'));
