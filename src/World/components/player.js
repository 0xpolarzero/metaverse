import { Vector3 } from 'three';
import { Capsule } from 'three/examples/jsm/math/Capsule';

// Game variables
const GRAVITY = 30;
const playerVelocity = new Vector3();
const playerDirection = new Vector3();

// Player capsule
const initialPosition = [0, 10];

const playerCollider = new Capsule(
  new Vector3(initialPosition[0], 0.35, initialPosition[1]), // Lower part of capsule
  new Vector3(initialPosition[0], 1, initialPosition[1]), // Higher part of capsule + camera
  0.35,
);

// Initial state of the player
let playerOnFloor = false;

// Initiating collision
function playerCollisions(worldOctree) {
  const result = worldOctree.capsuleIntersect(playerCollider);
  playerOnFloor = false;

  if (result) {
    playerOnFloor = result.normal.y > 0;
    if (!playerOnFloor) {
      playerVelocity.addScaledVector(
        result.normal,
        -result.normal.dot(playerVelocity),
      );
    }
    playerCollider.translate(result.normal.multiplyScalar(result.depth));
  }
}

// Update at each frame
function updatePlayer(deltaTime, worldOctree, camera) {
  let damping = Math.exp(-4 * deltaTime) - 1;

  if (!playerOnFloor) {
    playerVelocity.y -= GRAVITY * deltaTime;
    // small air resistance
    damping *= 0.1;
  }

  playerVelocity.addScaledVector(playerVelocity, damping);
  const deltaPosition = playerVelocity.clone().multiplyScalar(deltaTime);
  playerCollider.translate(deltaPosition);

  playerCollisions(worldOctree);

  camera.position.copy(playerCollider.end);
}

// Movement behavior
function getForwardVector(camera) {
  camera.getWorldDirection(playerDirection);
  playerDirection.y = 0;
  playerDirection.normalize();

  return playerDirection;
}

function getSideVector(camera) {
  camera.getWorldDirection(playerDirection);
  playerDirection.y = 0;
  playerDirection.normalize();
  playerDirection.cross(camera.up);

  return playerDirection;
}

// Player controls
function controls(deltaTime, keyStates, camera) {
  // Let the user walk / run, gives a bit of air control
  const speedDelta =
    deltaTime * (playerOnFloor ? (keyStates.ShiftLeft ? 25 : 15) : 2);

  if (keyStates.KeyW || keyStates.KeyZ || keyStates.ArrowUp) {
    playerVelocity.add(getForwardVector(camera).multiplyScalar(speedDelta));
  }

  if (keyStates.KeyS || keyStates.ArrowDown) {
    playerVelocity.add(getForwardVector(camera).multiplyScalar(-speedDelta));
  }

  if (keyStates.KeyA || keyStates.KeyQ || keyStates.ArrowLeft) {
    playerVelocity.add(getSideVector(camera).multiplyScalar(-speedDelta));
  }

  if (keyStates.KeyD || keyStates.ArrowRight) {
    playerVelocity.add(getSideVector(camera).multiplyScalar(speedDelta));
  }

  if (playerOnFloor) {
    if (keyStates.Space) {
      playerVelocity.y = 10;
    }
  }
}

// Prevent the player from escaping the structure
function teleportPlayerIfOob(camera) {
  if (camera.position.y <= -25) {
    playerCollider.start.set(0, 0.35, 0);
    playerCollider.end.set(0, 1, 0);
    playerCollider.radius = 0.35;
    camera.position.copy(playerCollider.end);
    camera.rotation.set(0, 0, 0);
  }
}

export { updatePlayer, controls, teleportPlayerIfOob };
