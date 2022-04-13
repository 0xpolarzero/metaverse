import * as ambisonics from 'ambisonics';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
const order = 3;

// Handle resume if suspension
context.onstatechange = function () {
  if (context.state === 'suspended') {
    context.resume();
  }
};

const urlAmbient = './assets/audio/ExtinctionAmb4ch.wav';

// Encoder
const encoder = new ambisonics.monoEncoder(context, order);
// TODO encoder.azim = // Value in degrees
// TODO encoder.elev = // Value in degrees
// TODO encoder.updateGains();

// Rotator
const rotator = new ambisonics.sceneRotator(context, order);
// TODO rotator.yaw = yaw_value_in_degrees;
// TODO rotator.pitch = pitch_value_in_degrees;
// TODO rotator.roll = roll_value_in_degrees;
// TODO rotator.updateRotMtx();

// Binaural decoder
const binDecoder = new ambisonics.binDecoder(context, order);

// Example
// soundBufferPlayer.connect(encoder.in);
// encoder.out.connect(rotator.in);
// rotator.out.connect(binDecoder.in);
// binDecoder.connect(context.destination);
