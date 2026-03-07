/**
 * cipher.js v2.1.1
 * Lightweight DOM Char Glitch
 * Zero dependencies · ~3kb gzipped
 *
 * MIT License
 * Copyright (c) 2026
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Features:
 * - 3 Cyberpunk Modes (Laughing Man, Agent Smith, Black ICE)
 * - 18 Basic Charsets
 * - 7 Animation Styles (left-to-right, right-to-left, waterfall, vortex, brownian, wave, pingpong)
 * - Wall Patterns
 * - Degradation
 * - Sequence & Parallel
 * - Easing, Loop, Delay, Speed, Direction
 * - Pause / Resume / Reverse
**/

(function(global) {
    'use strict';

    // =============================================
    // CHARACTER FAMILIES FOR DEGRADATION
    // =============================================
    const families = {
        lines:   ['-', '=', '_', '~', '·', '•'],
        corners: ['+', '|', '/', '\\', 'X', '#'],
        curves:  ['(', ')', '[', ']', '{', '}', '<', '>'],
        dots:    ['.', ':', ';', ',', "'", '"', '`'],
        circles: ['o', 'O', '0', '@', '*', '◉', '◎'],
        blocks:  ['█', '▓', '▒', '░', '▄', '▀', '■', '□']
    };

    // =============================================
    // CHARSETS (18 BASIC + 3 SPECIAL MODES)
    // =============================================
    const CHARSETS = {
        latin:      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        symbols:    '!@#$%^&*()-_=+[]{}<>/\\|:;\'"`,.~?',
        tech:       '<>[]{}()/\\|=+-_*&^%$#@!~:;→⇒←⇐↑⇑↓⇓↔↕§¶†‡',
        math:       '∑∏∂∇∞≈≠≤≥±÷×√∫∮∴∵∀∃∅∈∉∩∪⊂⊃⊆⊇⊕⊗⊥∥',
        greek:      'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω',
        cyrillic:   'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЫЭЮЯабвгдежзийклмнопрстуфхцчшщыэюя',
        katakana:   'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
        arabic:     'ابتثجحخدذرزسشصضطظعغفقكلمنهوي',
        devanagari: 'अआइईउऊऋएऐओऔकखगघचछजझटठडढतथदधनपफबभमयरलवशषसह',
        emoji:      '😀😁😂😎🤖👾👁️⚡🔥💾📡💻🧠🌐🚀🔮',
        geometric:  '▲△▼▽◆◇■□●○◉◎◌⬟⬢⬡',
        box:        '┌┐└┘├┤┬┴┼─│═║╔╗╚╝╠╣╦╩╬',
        blocks:     '█▓▒░▁▂▃▄▅▆▇▉▊▋▌▍▎▏',
        braille:    '⠁⠃⠇⠧⠿⠂⠆⠒⠲⠄⠤⠔⠴',
        runic:      'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛋᛏᛒᛖᛗᛚᛜᛞᛟ',
        egyptian:   '𓀀𓀁𓀂𓀃𓁐𓂀𓂓𓃀𓃗𓃭𓆣𓆤',
        music:      '♩♪♫♬♭♮♯𝄞𝄢𝄐𝄑',
        arrows:     '←→↑↓↖↗↘↙⇐⇒⇑⇓⟵⟶⟷',
        // 3 Special Modes
        'laughing-man': '☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀',
        'agent-smith':  '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
        'black-ice':    '▒▓█▌▐▀▄┌┐└┘├┤┬┴┼═║╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬◤◥◢◣◿◺◹◸◴◵◶◷◰◱◲◳◬◭◮◪◫◨◩◧◟◞◝◜'
    };

    // =============================================
    // WALL PATTERNS
    // NOTE: These use Unicode block elements. Rendering
    // depends on the font — use a monospace font with
    // full block coverage (e.g. Courier New, Consolas).
    // =============================================
    const wallPatterns = {
        // FIX: rebalanced to be horizontally symmetric
        'laughing-man':
`    ▄▄▄▄▄
   █ ◙   ◙ █
   █   ◡   █
    ▀▄▄▄▄▄▀`,

        'agent-smith':
` 0 1 0 1 0 1 0
  1 0 1 0 1 0 1
  0 1 0 ア 0 1 0
  1 0 イ 0 ウ 0 1
  0 1 0 1 0 1 0`,

        // FIX: all lines now have consistent 1 leading space
        'black-ice':
`█▓▒░▓█▓▒░▓█▓▒░▓█
 █▓▒░▓█▓▒░▓█▓▒░▓█
 █▓▒░▓█▓▒░▓█▓▒░▓█
 █▓▒░▓█▓▒░▓█▓▒░▓█`,


    // =============================================
    // EASING FUNCTIONS
    // =============================================
    const easing = {
        linear:    t => t,
        easeIn:    t => t * t,
        easeOut:   t => t * (2 - t),
        easeInOut: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    };

    // =============================================
    // HELPERS
    // =============================================
    function getRandomChar(charset) {
        return charset[Math.floor(Math.random() * charset.length)];
    }

    function getCharsetForMode(mode) {
        return CHARSETS[mode] || CHARSETS['laughing-man'];
    }

    function isWhitespace(c) {
        // charCode <= 32 covers space (32), newline (10), tab (9), CR (13)
        // faster than 3 string comparisons in hot loops (waterfall, wave, etc.)
        return c.charCodeAt(0) <= 32;
    }

    // =============================================
    // ANIMATION REGISTRY — race condition prevention
    // Tracks the active Animation per element. Starting a new animation
    // auto-stops the previous one, preventing concurrent rAF loops
    // writing to innerText simultaneously (flicker + perf hit).
    // WeakMap: no memory leak — entry is GC'd with the element.
    // =============================================
    const animRegistry = new WeakMap();

    function registerAnim(element, anim) {
        const existing = animRegistry.get(element);
        if (existing) existing.stop();
        animRegistry.set(element, anim);
        return anim;
    }

    // PERF: prebuilt char→family Map for O(1) lookup in mutateChar.
    // Previously iterated all families on every character — this pays off
    // during degradation on long texts where mutateChar is called per-char per-tick.
    const charFamilyMap = new Map();
    for (const family of Object.values(families)) {
        for (const c of family) charFamilyMap.set(c, family);
    }

    function mutateChar(c, intensity) {
        if (Math.random() > intensity) return c;
        const family = charFamilyMap.get(c);
        if (!family) return c;
        const idx    = family.indexOf(c);
        const shift  = Math.floor((Math.random() - 0.5) * 3);
        return family[(idx + shift + family.length) % family.length];
    }

    // Build a fully-encrypted snapshot of a string using a charset
    function encryptedSnapshot(original, charset) {
        let out = '';
        for (let i = 0; i < original.length; i++) {
            out += isWhitespace(original[i]) ? original[i] : getRandomChar(charset);
        }
        return out;
    }

    // =============================================
    // ANIMATION BASE CLASS
    // =============================================
    class Animation {
        constructor(element, options = {}) {
            this.element = element;
            this.options = {
                mode:       'laughing-man',
                charset:    null,
                style:      'left-to-right',
                direction:  'normal',
                duration:   2000,
                delay:      0,
                loop:       false,
                speed:      1.0,
                easing:     'linear',
                onBegin:    null,
                onUpdate:   null,
                onComplete: null,
                onLoop:     null,
                ...options
            };
            this.state = {
                running:   false,
                paused:    false,
                progress:  0,
                loopCount: 0,
                startTime: 0,
                pauseTime: 0
            };
            this.frame   = null;
            this.timeout = null;
        }

        start() {
            if (this.state.running) return;
            this.state.running = true;
            if (this.options.delay > 0) {
                this.timeout = setTimeout(() => this._begin(), this.options.delay);
            } else {
                this._begin();
            }
        }

        _begin() {
            if (this.options.onBegin) this.options.onBegin();
            // BUG FIX: was calling this._tick() with no argument → now = undefined → NaN.
            // Must pass a timestamp so elapsed time is valid on the very first frame.
            const now = performance.now();
            this.state.startTime = now - (this.state.progress * this.options.duration);
            this._tick(now);
        }

        _tick(now) {
            if (!this.state.running || this.state.paused) return;

            const elapsed    = (now - this.state.startTime) * this.options.speed;
            let rawProgress  = Math.min(1, elapsed / this.options.duration);
            let progress     = (easing[this.options.easing] ?? easing.linear)(rawProgress);

            // Apply direction
            if (this.options.direction === 'reverse') {
                progress = 1 - progress;
            } else if (this.options.direction === 'alternate') {
                const isEven = Math.floor(this.state.loopCount) % 2 === 0;
                progress = isEven ? progress : 1 - progress;
            }

            this.state.progress = progress;
            if (this.options.onUpdate) this.options.onUpdate(progress);
            this.update(progress);

            if (rawProgress < 1) {
                this.frame = requestAnimationFrame((t) => this._tick(t));
            } else {
                if (this.options.loop) {
                    this.state.loopCount++;
                    if (this.options.onLoop) this.options.onLoop(this.state.loopCount);
                    if (this.options.loop === true || this.state.loopCount < this.options.loop) {
                        // BUG FIX: was calling performance.now() twice, creating a tiny drift.
                        const loopNow = performance.now();
                        this.state.startTime = loopNow;
                        this._tick(loopNow);
                        return;
                    }
                }
                this.complete();
            }
        }

        // Overridden by subclasses / inline usage
        update(progress) {}

        complete() {
            this.state.running = false;
            cancelAnimationFrame(this.frame);
            clearTimeout(this.timeout);
            if (this.options.onComplete) this.options.onComplete();
        }

        pause() {
            if (!this.state.running || this.state.paused) return;
            this.state.paused  = true;
            this.state.pauseTime = performance.now();
            cancelAnimationFrame(this.frame);
        }

        resume() {
            if (!this.state.running || !this.state.paused) return;
            this.state.paused = false;
            const pauseDuration = performance.now() - this.state.pauseTime;
            this.state.startTime += pauseDuration;
            this._tick(performance.now());
        }

        reverse() {
            this.options.direction =
                this.options.direction === 'reverse' ? 'normal' : 'reverse';
        }

        stop() {
            this.state.running = false;
            cancelAnimationFrame(this.frame);
            clearTimeout(this.timeout);
        }
    }

    // =============================================
    // ENCRYPT (instant, no animation)
    // =============================================
    function encrypt(element, options = {}) {
        const mode    = options.mode || 'laughing-man';
        const charset = options.charset || getCharsetForMode(mode);
        const original = element.innerText || element.textContent;
        element.setAttribute('data-cipher-original', original);
        element.setAttribute('data-cipher-mode', mode);
        // ARIA: hide encrypted content from screenreaders
        element.setAttribute('aria-hidden', 'true');
        element.innerText = encryptedSnapshot(original, charset);
    }

    // =============================================
    // DECRYPT (animated reveal)
    // Accepts either:
    //   decrypt(el, targetText, duration, onComplete)   ← positional
    //   decrypt(el, { targetText, duration, onComplete }) ← options object
    // =============================================
    function decrypt(element, targetText = null, duration = 2000, onComplete = null) {
        if (targetText !== null && typeof targetText === 'object') {
            const opts = targetText;
            targetText  = opts.targetText  || null;
            duration    = opts.duration    || 2000;
            onComplete  = opts.onComplete  || null;
        }

        const finalString = targetText
            || element.getAttribute('data-cipher-original')
            || element.innerText;
        const mode    = element.getAttribute('data-cipher-mode') || 'laughing-man';
        const length  = finalString.length;
        const charset = getCharsetForMode(mode);

        // BUG FIX: removed `seeds` array — it was allocated here but never used.

        const anim = new Animation(element, {
            mode,
            duration,
            onUpdate: (progress) => {
                let currentString = '';
                for (let i = 0; i < length; i++) {
                    if (isWhitespace(finalString[i])) {
                        currentString += finalString[i];
                        continue;
                    }
                    const charProgress = Math.max(0, Math.min(1,
                        (progress * 1.5) - ((i / length) * 0.5)
                    ));
                    currentString += charProgress >= 1
                        ? finalString[i]
                        : getRandomChar(charset);
                }
                element.innerText = currentString;
            },
            onComplete: () => {
                element.innerText = finalString;
                // ARIA: restore element to screenreaders once decrypted
                element.removeAttribute('aria-hidden');
                if (onComplete) onComplete();
            }
        });
        registerAnim(element, anim);
        anim.start();
        return anim;
    }

    // =============================================
    // TRIGGER (burst glitch → decrypt)
    // =============================================
    function trigger(element, options = {}) {
        const {
            burstSteps      = 6,
            burstDelay      = 80,
            decryptDuration = 2000,
            onComplete      = null
        } = options;
        const mode      = element.getAttribute('data-cipher-mode') || 'laughing-man';
        const finalText = element.getAttribute('data-cipher-original') || element.innerText;
        const charset   = getCharsetForMode(mode);
        let burstCount  = 0;

        const burstInterval = setInterval(() => {
            const original = element.getAttribute('data-cipher-original') || finalText;
            let burstText  = '';
            for (let i = 0; i < original.length; i++) {
                burstText += isWhitespace(original[i])
                    ? original[i]
                    : mutateChar(getRandomChar(charset), 0.8);
            }
            element.innerText = burstText;
            burstCount++;
            if (burstCount >= burstSteps) {
                clearInterval(burstInterval);
                decrypt(element, finalText, decryptDuration, onComplete);
            }
        }, burstDelay);
    }

    // =============================================
    // RESET
    // =============================================
    function reset(element) {
        const original = element.getAttribute('data-cipher-original');
        if (!original) return;
        const mode    = element.getAttribute('data-cipher-mode') || 'laughing-man';
        const charset = getCharsetForMode(mode);
        // ARIA: re-encrypt means content is unreadable again
        element.setAttribute('aria-hidden', 'true');
        element.innerText = encryptedSnapshot(original, charset);
    }

    // =============================================
    // ENCRYPT WITH STYLE — 7 styles
    // =============================================
    const styles = {

        'left-to-right': (element, original, mode, direction, duration, onComplete) => {
            const length  = original.length;
            const charset = getCharsetForMode(mode);
            const anim = new Animation(element, {
                mode, direction, duration,
                onUpdate: (progress) => {
                    const encryptedCount = Math.floor(progress * length);
                    let result = '';
                    for (let i = 0; i < length; i++) {
                        if (isWhitespace(original[i])) { result += original[i]; continue; }
                        result += i < encryptedCount ? getRandomChar(charset) : original[i];
                    }
                    element.innerText = result;
                },
                onComplete: () => {
                    element.innerText = encryptedSnapshot(original, charset);
                    if (onComplete) onComplete();
                }
            });
            anim.start();
            return anim;
        },

        'right-to-left': (element, original, mode, direction, duration, onComplete) => {
            const length  = original.length;
            const charset = getCharsetForMode(mode);
            const anim = new Animation(element, {
                mode, direction, duration,
                onUpdate: (progress) => {
                    const encryptedCount = Math.floor(progress * length);
                    let result = '';
                    for (let i = 0; i < length; i++) {
                        if (isWhitespace(original[i])) { result += original[i]; continue; }
                        result += i >= length - encryptedCount
                            ? getRandomChar(charset)
                            : original[i];
                    }
                    element.innerText = result;
                },
                onComplete: () => {
                    element.innerText = encryptedSnapshot(original, charset);
                    if (onComplete) onComplete();
                }
            });
            anim.start();
            return anim;
        },

        'waterfall': (element, original, mode, direction, duration, onComplete) => {
            const length  = original.length;
            const charset = getCharsetForMode(mode);
            const isDown  = direction !== 'up';
            const anim = new Animation(element, {
                mode, direction, duration,
                onUpdate: (progress) => {
                    let result = '';
                    for (let i = 0; i < length; i++) {
                        if (isWhitespace(original[i])) { result += original[i]; continue; }
                        const pos = isDown ? i / length : 1 - (i / length);
                        const threshold = progress * 1.2 - pos * 0.5;
                        result += threshold > 0.5 ? getRandomChar(charset) : original[i];
                    }
                    element.innerText = result;
                },
                onComplete: () => {
                    element.innerText = encryptedSnapshot(original, charset);
                    if (onComplete) onComplete();
                }
            });
            anim.start();
            return anim;
        },

        // NEW: encrypts outward from center
        'vortex': (element, original, mode, direction, duration, onComplete) => {
            const length  = original.length;
            const charset = getCharsetForMode(mode);
            const center  = length / 2;
            const anim = new Animation(element, {
                mode, direction, duration,
                onUpdate: (progress) => {
                    const radius = progress * (length / 2 + 1);
                    let result = '';
                    for (let i = 0; i < length; i++) {
                        if (isWhitespace(original[i])) { result += original[i]; continue; }
                        result += Math.abs(i - center) <= radius
                            ? getRandomChar(charset)
                            : original[i];
                    }
                    element.innerText = result;
                },
                onComplete: () => {
                    element.innerText = encryptedSnapshot(original, charset);
                    if (onComplete) onComplete();
                }
            });
            anim.start();
            return anim;
        },

        // NEW: random positions encrypt (Brownian / scatter)
        'brownian': (element, original, mode, direction, duration, onComplete) => {
            const length  = original.length;
            const charset = getCharsetForMode(mode);
            // Pre-shuffle index order so the same positions are revealed per frame
            const order = Array.from({ length }, (_, i) => i)
                .sort(() => Math.random() - 0.5);
            const encrypted = new Uint8Array(length); // 0 = plain, 1 = encrypted
            let lastCount = 0;

            const anim = new Animation(element, {
                mode, direction, duration,
                onUpdate: (progress) => {
                    const count = Math.floor(progress * length);
                    // Only mark newly-encrypted positions
                    for (let i = lastCount; i < count; i++) encrypted[order[i]] = 1;
                    lastCount = count;

                    let result = '';
                    for (let i = 0; i < length; i++) {
                        if (isWhitespace(original[i])) { result += original[i]; continue; }
                        result += encrypted[i] ? getRandomChar(charset) : original[i];
                    }
                    element.innerText = result;
                },
                onComplete: () => {
                    element.innerText = encryptedSnapshot(original, charset);
                    if (onComplete) onComplete();
                }
            });
            anim.start();
            return anim;
        },

        // NEW: sine-wave shaped encryption front sweeps through
        'wave': (element, original, mode, direction, duration, onComplete) => {
            const length  = original.length;
            const charset = getCharsetForMode(mode);
            const anim = new Animation(element, {
                mode, direction, duration,
                onUpdate: (progress) => {
                    let result = '';
                    for (let i = 0; i < length; i++) {
                        if (isWhitespace(original[i])) { result += original[i]; continue; }
                        const wave      = Math.sin((i / length) * Math.PI * 4 - progress * Math.PI * 6);
                        const threshold = progress * 2 - 1 + wave * 0.3;
                        result += threshold > 0 ? getRandomChar(charset) : original[i];
                    }
                    element.innerText = result;
                },
                onComplete: () => {
                    element.innerText = encryptedSnapshot(original, charset);
                    if (onComplete) onComplete();
                }
            });
            anim.start();
            return anim;
        },

        // NEW: cursor sweeps left→right→left→right, encrypting on contact
        'pingpong': (element, original, mode, direction, duration, onComplete) => {
            const length    = original.length;
            const charset   = getCharsetForMode(mode);
            const encrypted = new Uint8Array(length);
            const PASSES    = 3; // how many sweeps before fully encrypted

            const anim = new Animation(element, {
                mode, direction, duration,
                onUpdate: (progress) => {
                    const totalProgress = progress * PASSES;
                    const pass          = Math.floor(totalProgress);
                    const passProgress  = totalProgress - pass;
                    const forward       = pass % 2 === 0;
                    const cursor        = Math.floor(passProgress * length);

                    // Mark range covered by cursor on this pass
                    for (let i = 0; i <= cursor; i++) {
                        encrypted[forward ? i : length - 1 - i] = 1;
                    }

                    let result = '';
                    for (let i = 0; i < length; i++) {
                        if (isWhitespace(original[i])) { result += original[i]; continue; }
                        result += encrypted[i] ? getRandomChar(charset) : original[i];
                    }
                    element.innerText = result;
                },
                onComplete: () => {
                    element.innerText = encryptedSnapshot(original, charset);
                    if (onComplete) onComplete();
                }
            });
            anim.start();
            return anim;
        }
    };

    function encryptWithStyle(element, options = {}) {
        const {
            style     = 'left-to-right',
            mode      = 'laughing-man',
            direction = 'normal',
            duration  = 2000,
            onComplete = null
        } = options;
        const original = element.innerText || element.textContent;
        element.setAttribute('data-cipher-original', original);
        element.setAttribute('data-cipher-mode', mode);
        const styleFn = styles[style];
        if (!styleFn) throw new Error(`cipher.js: Unknown style '${style}'. Available: ${Object.keys(styles).join(', ')}`);
        const anim = styleFn(element, original, mode, direction, duration, onComplete);
        return registerAnim(element, anim);
    }

    // =============================================
    // MODES
    // =============================================
    function setMode(modeName, displayEl, wallEl) {
        if (!CHARSETS[modeName]) return;
        if (displayEl) displayEl.setAttribute('data-cipher-mode', modeName);
        if (wallEl && wallPatterns[modeName]) wallEl.textContent = wallPatterns[modeName];
    }

    function getWallPattern(modeName) {
        return wallPatterns[modeName] || wallPatterns['laughing-man'];
    }

    // =============================================
    // COVER / REVEAL WITH PATTERN
    // NOTE: The DOM wrap/unwrap here can break layouts
    // where the element is a flex/grid child. Consider
    // using a CSS overlay approach for production use.
    // =============================================
    function coverWithPattern(element, options = {}) {
        const { pattern = 'matrix-rain', duration = 2000, onReveal = null } = options;

        const overlay = document.createElement('div');
        overlay.className    = 'cipher-pattern-overlay';
        overlay.textContent  = wallPatterns[pattern] || wallPatterns['matrix-rain'];
        overlay.style.cssText = `
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: #0a0f0c;
            color: #7fffbf;
            font-family: 'Courier New', monospace;
            white-space: pre;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;

        const container = document.createElement('div');
        container.style.position     = 'relative';
        container.style.display      = 'inline-block';
        element.parentNode.insertBefore(container, element);
        container.appendChild(element);
        container.appendChild(overlay);

        setTimeout(() => {
            overlay.remove();
            container.parentNode.insertBefore(element, container);
            container.remove();
            if (onReveal) onReveal(element);
        }, duration);
    }

    function revealWithPattern(element, options = {}) {
        coverWithPattern(element, { ...options, onReveal: options.onComplete });
    }

    // =============================================
    // CHARSET MANAGEMENT
    // =============================================
    const customCharsets = {};

    function loadCharset(url) {
        return fetch(url)
            .then(res => res.text())
            .then(text => text.trim());
    }

    function addCharset(name, charset) {
        customCharsets[name] = charset;
    }

    function useCharset(element, charsetName) {
        const charset = customCharsets[charsetName] || CHARSETS[charsetName];
        if (!charset) return;
        const original = element.getAttribute('data-cipher-original') || element.innerText;
        element.innerText = encryptedSnapshot(original, charset);
    }

    // =============================================
    // DEGRADATION
    // Uses FinalizationRegistry so the interval is auto-cleared if the element
    // is garbage-collected without an explicit stopDegradation() call.
    // Still: always call stopDegradation() when removing elements manually —
    // GC timing is non-deterministic and the registry is a safety net, not a contract.
    // =============================================
    const degradationIntervals  = {};
    const degradationRegistry   = new FinalizationRegistry((id) => {
        if (degradationIntervals[id]) {
            clearInterval(degradationIntervals[id]);
            delete degradationIntervals[id];
        }
    });

    function startDegradation(element, interval = 150, intensity = 0.15) {
        if (!element._cipherId) element._cipherId = Math.random().toString(36).slice(2, 11);
        const id = element._cipherId;
        if (degradationIntervals[id]) clearInterval(degradationIntervals[id]);
        degradationIntervals[id] = setInterval(() => {
            const current = element.innerText;
            let degraded  = '';
            for (let i = 0; i < current.length; i++) {
                if (isWhitespace(current[i])) { degraded += current[i]; continue; }
                degraded += Math.random() < intensity
                    ? mutateChar(current[i], intensity)
                    : current[i];
            }
            element.innerText = degraded;
        }, interval);
        // Register element for GC-triggered cleanup
        degradationRegistry.register(element, id);
    }

    function stopDegradation(element) {
        if (element._cipherId && degradationIntervals[element._cipherId]) {
            clearInterval(degradationIntervals[element._cipherId]);
            delete degradationIntervals[element._cipherId];
        }
    }

    // =============================================
    // SEQUENCE
    // =============================================
    function sequence(element, steps, onComplete) {
        let currentStep = 0;
        function runStep() {
            if (currentStep >= steps.length) {
                if (onComplete) onComplete();
                return;
            }
            const step = steps[currentStep];
            const { action, ...options } = step;
            const next = () => { currentStep++; runStep(); };
            switch (action) {
                case 'encrypt':
                    encrypt(element, options);
                    next();
                    break;
                case 'decrypt':
                    decrypt(element, { ...options, onComplete: next });
                    break;
                case 'trigger':
                    trigger(element, { ...options, onComplete: next });
                    break;
                case 'cover':
                    coverWithPattern(element, { ...options, onReveal: next });
                    break;
                case 'degrade':
                    startDegradation(element, options.interval, options.intensity);
                    next();
                    break;
                default:
                    next();
            }
        }
        runStep();
    }

    // =============================================
    // PARALLEL
    // =============================================
    function parallel(element, animations, onComplete) {
        let completed = 0;
        animations.forEach((anim) => {
            const { action, ...options } = anim;
            const cb = () => {
                completed++;
                if (completed === animations.length && onComplete) onComplete();
            };
            switch (action) {
                case 'encrypt':
                    encrypt(element, options);
                    cb();
                    break;
                case 'decrypt':
                    decrypt(element, { ...options, onComplete: cb });
                    break;
                case 'trigger':
                    trigger(element, { ...options, onComplete: cb });
                    break;
                case 'cover':
                    coverWithPattern(element, { ...options, onReveal: cb });
                    break;
                case 'degrade':
                    startDegradation(element, options.interval, options.intensity);
                    cb();
                    break;
                default:
                    cb();
            }
        });
    }

    // =============================================
    // EXPORT
    // =============================================
    const Cipher = {
        version: '2.1.1',
        encrypt,
        decrypt,
        trigger,
        reset,
        encryptWithStyle,
        styles:   Object.keys(styles),
        setMode,
        getWallPattern,
        modes:    ['laughing-man', 'agent-smith', 'black-ice'],
        coverWithPattern,
        revealWithPattern,
        wallPatterns,
        loadCharset,
        addCharset,
        useCharset,
        charsets: CHARSETS,
        startDegradation,
        stopDegradation,
        sequence,
        parallel,
        // Animation instance control (pass the object returned by decrypt / encryptWithStyle)
        pause:   (anim) => anim?.pause?.(),
        resume:  (anim) => anim?.resume?.(),
        reverse: (anim) => anim?.reverse?.(),
        stop:    (anim) => anim?.stop?.(),
        // onUpdate is set via options on decrypt() / encryptWithStyle().
        // It receives progress (0..1) on every animation frame — use it for
        // audio-sync, visual triggers, or external progress tracking. Example:
        //   const anim = Cipher.decrypt(el, { duration: 2000, onUpdate: (p) => myMeter.set(p) });
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Cipher;
    } else {
        global.Cipher = Cipher;
    }

})(typeof window !== 'undefined' ? window : this);
