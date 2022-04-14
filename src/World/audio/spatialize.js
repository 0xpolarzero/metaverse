// Change the sound position based on the camera position + direction and the object position
function spatializeSound(emitter, camera) {
  emitter.rotator.yaw = (camera.rotation.y * 180) / Math.PI;
  emitter.rotator.pitch = (-camera.rotation.x * 180) / Math.PI;
  emitter.rotator.roll = (-camera.rotation.z * 180) / Math.PI;
  emitter.rotator.updateRotMtx();
}

export { spatializeSound };
