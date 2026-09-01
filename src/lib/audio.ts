/**
 * Web Audio API Synthesizer for Zen Ambient Soundscapes
 * Provides zero-external-dependency ambient audio loops:
 * - Rain (Filtered Pink Noise)
 * - Temple Bell / Singing Bowl (Harmonic Sine Wave decay)
 * - Bamboo Water (Shishi-odoshi periodic click + water splash)
 * - Zen Wind (Low pass filtered white noise sweep)
 */

class ZenAudioEngine {
  private ctx: AudioContext | null = null;
  private activeNodes: { stop: () => void }[] = [];
  private currentTrack: string | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTrack(trackId: 'rain' | 'bamboo' | 'wind' | 'bell' | 'none') {
    this.stopAll();
    if (trackId === 'none') {
      this.currentTrack = null;
      return;
    }

    this.initCtx();
    if (!this.ctx) return;

    this.currentTrack = trackId;

    if (trackId === 'rain') {
      this.startRain();
    } else if (trackId === 'wind') {
      this.startWind();
    } else if (trackId === 'bamboo') {
      this.startBambooWater();
    } else if (trackId === 'bell') {
      this.playTempleBell();
    }
  }

  public stopAll() {
    this.activeNodes.forEach((node) => {
      try {
        node.stop();
      } catch {
        // ignore
      }
    });
    this.activeNodes = [];
    this.currentTrack = null;
  }

  public getActiveTrack() {
    return this.currentTrack;
  }

  // Pink Noise Rain Soundscape
  private startRain() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.04; // Soft volume
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000;

    const gainNode = this.ctx.createGain();
    gainNode.gain.value = 0.3;

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    whiteNoise.start();
    this.activeNodes.push({
      stop: () => {
        whiteNoise.stop();
        whiteNoise.disconnect();
      },
    });
  }

  // Zen Wind Sweeps
  private startWind() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 300;
    filter.Q.value = 3;

    // LFO to sweep frequency gently
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.15; // 0.15 Hz sweep
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 150;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const masterGain = this.ctx.createGain();
    masterGain.gain.value = 0.25;

    noiseSource.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(this.ctx.destination);

    noiseSource.start();
    lfo.start();

    this.activeNodes.push({
      stop: () => {
        noiseSource.stop();
        lfo.stop();
        noiseSource.disconnect();
      },
    });
  }

  // Japanese Shishi-odoshi Bamboo Water drop
  private startBambooWater() {
    if (!this.ctx) return;
    
    // Play a gentle rain background + periodic bamboo clack
    this.startRain();

    const interval = setInterval(() => {
      this.playBambooClack();
    }, 7000);

    this.activeNodes.push({
      stop: () => {
        clearInterval(interval);
      },
    });
  }

  private playBambooClack() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  // Japanese Temple Bell / Singing Bowl Chime
  public playTempleBell() {
    this.initCtx();
    if (!this.ctx) return;

    const fundamental = 216; // Deep soothing frequency (Hz)
    const harmonics = [1, 2.76, 5.4, 8.93];
    const gains = [0.5, 0.25, 0.1, 0.05];

    harmonics.forEach((h, index) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(fundamental * h, this.ctx.currentTime);

      const decayTime = 4.5;
      gain.gain.setValueAtTime(gains[index], this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + decayTime);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + decayTime);
    });
  }
}

export const zenAudio = new ZenAudioEngine();
