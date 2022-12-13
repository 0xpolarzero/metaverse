import './styles/main.css';

import { World } from './World/World';

async function main() {
  const container = document.querySelector('#container');
  const world = new World(container);

  await world.initStructure();
  world.initSystem();
  document.addEventListener('click', world.initAudio, { once: true });

  world.start();
}

main().catch((err) => {
  console.error(err);
});
