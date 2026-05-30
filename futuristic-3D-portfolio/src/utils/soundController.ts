class CyberSoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientOscillator: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  
  // Procedural Music Properties
  private musicIntervalId: number | null = null;
  private activeOscillators: OscillatorNode[] = [];
  private activeGains: GainNode[] = [];
  private chordIndex = 0;

  // Atmospheric cinematic chord progressions (A minor pentatonic/diatonic modes)
  // Each note frequency represents standard tuning values.
  private chords = [
    // Am9 (A2, C3, E3, G3, B3)
    [110.00, 130.81, 164.81, 196.00, 246.94],
    // Fmaj9 (F2, C3, E3, A3, G3)
    [87.31, 130.81, 164.81, 220.00, 196.00],
    // Cmaj9 (C2, G2, D3, E3, B3)
    [65.41, 98.00, 146.83, 164.81, 246.94],
    // G6 (G2, B2, D3, E3, A3)
    [98.00, 123.47, 146.83, 164.81, 220.00]
  ];

  constructor() {
    // Lazy initialized on first user gesture
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbientHum();
      this.stopAmbientMusic();
    } else {
      this.initCtx();
      this.startAmbientHum();
      this.startAmbientMusic();
    }
    return this.isMuted;
  }

  public getMuteStatus(): boolean {
    return this.isMuted;
  }

  public playClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1600, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  public playGlitch() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(800, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  public playSuccess() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio

    notes.forEach((freq, index) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gain.gain.setValueAtTime(0, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.08, now + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.3);
    });
  }

  public startAmbientHum() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      if (this.ambientOscillator) {
        this.stopAmbientHum();
      }

      this.ambientOscillator = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();

      this.ambientOscillator.type = 'sine';
      // Low fundamental power-grid hum (55Hz, G1)
      this.ambientOscillator.frequency.setValueAtTime(55, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, this.ctx.currentTime);

      this.ambientGain.gain.setValueAtTime(0.012, this.ctx.currentTime);

      this.ambientOscillator.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOscillator.start();
    } catch (e) {
      console.warn("Could not start ambient hum: ", e);
    }
  }

  public stopAmbientHum() {
    try {
      if (this.ambientOscillator) {
        this.ambientOscillator.stop();
        this.ambientOscillator.disconnect();
        this.ambientOscillator = null;
      }
      if (this.ambientGain) {
        this.ambientGain.disconnect();
        this.ambientGain = null;
      }
    } catch (e) {
      console.warn("Could not stop ambient hum: ", e);
    }
  }

  // --- Procedural Synth Music Engine ---

  private playAmbientChord() {
    if (this.isMuted || !this.ctx) return;

    const now = this.ctx.currentTime;
    const chord = this.chords[this.chordIndex];
    this.chordIndex = (this.chordIndex + 1) % this.chords.length;

    // Fade out previous active notes if they are still playing
    this.fadeAndCleanActiveOscillators();

    const attackTime = 2.5;
    const duration = 5.8;
    const noteVolume = 0.008; // extremely soft, background pad level

    chord.forEach((freq) => {
      if (!this.ctx) return;

      // We create two oscillators per note with slight frequency detuning (stereo chorus feel)
      const detunes = [-1.5, 1.5];

      detunes.forEach((detuneVal) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Use soft sine waves for atmospheric pads
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime(detuneVal, now);

        // Sound envelope (fade-in, hold, fade-out)
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(noteVolume, now + attackTime);
        gain.gain.setValueAtTime(noteVolume, now + duration - 2.0);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration);

        this.activeOscillators.push(osc);
        this.activeGains.push(gain);
      });
    });
  }

  private fadeAndCleanActiveOscillators() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Rapidly fade out any currently playing synth nodes to prevent click artifacts
    this.activeGains.forEach((gain) => {
      try {
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      } catch (e) {
        // Safe catch
      }
    });

    const oldOscs = [...this.activeOscillators];
    setTimeout(() => {
      oldOscs.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {
          // Safe catch
        }
      });
    }, 500);

    this.activeOscillators = [];
    this.activeGains = [];
  }

  public startAmbientMusic() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    this.stopAmbientMusic();

    // Trigger first chord immediately
    this.playAmbientChord();

    // Loop chords every 6 seconds
    this.musicIntervalId = window.setInterval(() => {
      this.playAmbientChord();
    }, 6000);
  }

  public stopAmbientMusic() {
    if (this.musicIntervalId) {
      clearInterval(this.musicIntervalId);
      this.musicIntervalId = null;
    }
    this.fadeAndCleanActiveOscillators();
  }
}

export const soundCtrl = new CyberSoundController();
export default soundCtrl;
