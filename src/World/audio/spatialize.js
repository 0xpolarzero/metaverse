// Change the sound position based on the camera position + direction and the object position
function spatializeSound(emitter, camera) {
  // x y being inverted, x = vertical rotation and y = horizontal rotation
  //   emitter.rotator.yaw += 10;
  //   emitter.rotator.pitch += 0.1;
  emitter.rotator.roll = (camera.rotation.y * 180) / Math.PI;
  emitter.rotator.updateRotMtx();
}

export { spatializeSound };

// * Boule1.position = 10, -3.5, 0

// * Camera initial.position = 10, -3.7, 10
// * Camera initial.rotation = 0, 0, 0
