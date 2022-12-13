const setSize = (container, camera, renderer) => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
  constructor(container, camera, renderer) {
    // Set initial size on load
    setSize(container, camera, renderer);

    window.addEventListener('resize', () => {
      // Set the size again if a resize occurs
      setSize(container, camera, renderer);
      // Perform any custom actions
      this.onResize();
    });
  }
}

export { Resizer };
