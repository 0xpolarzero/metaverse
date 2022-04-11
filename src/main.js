import './styles/main.css';

import { World } from './World/World';

async function main() {
  const container = document.querySelector('#container');
  const world = new World(container);

  world.initialInit();

  await world.asyncInit();

  world.start();
}

main().catch((err) => {
  console.error(err);
});
