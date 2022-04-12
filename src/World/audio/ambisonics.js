// * Examples

// ! import

const order = 3;
// ! define audioContext

// Encoder
const encoder = new ambisonics.monoEncoder(audioContext, order);
// TODO encoder.azim = // Value in degrees
// TODO encoder.elev = // Value in degrees
// TODO encoder.updateGains();

// Rotator
const rotator = new ambisonics.sceneRotator(audioContext, order);
// TODO rotator.yaw = yaw_value_in_degrees;
// TODO rotator.pitch = pitch_value_in_degrees;
// TODO rotator.roll = roll_value_in_degrees;
// TODO rotator.updateRotMtx();

// Binaural decoder
const binDecoder = new ambisonics.binDecoder(audioContext, order);

// Example
soundBufferPlayer.connect(encoder.in);
encoder.out.connect(rotator.in);
rotator.out.connect(binDecoder.in);
binDecoder.connect(audioContext.destination);
