import gsap from 'gsap'

export function camAnimate() {
  function toScene(camera, target, x, y, z) {
    return new Promise((resolve) => {
      gsap.to(camera.position, {
        x: target.x + x,
        y: target.y + y,
        z: target.z + z,
        duration: 2,
        ease: "power2.inOut",
        onComplete: resolve
      });
    });
  }

  function toModel(camera, character) {
    return new Promise((resolve) => { 
      gsap.to(camera.position, {
        x: character.position.x,
        y: character.position.y + 3,
        z: character.position.z + 6,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: resolve
      });
    });
  }

  function matchCut(camera, ground, character) {
    return new Promise((resolve) => {
      character.position.set(-43, 0, 10)
      gsap.to(camera.position, {
        x: ground.position.x,
        y: ground.position.y+30,
        z: ground.position.z+60,
        duration: 4,
        ease: "sine.out",
        onUpdate: () => {
          camera.lookAt(ground.position)
        },
        onComplete: () =>  {
          const startQuat = camera.quaternion.clone();
          gsap.to(camera.position, {
            x: character.position.x,
            y: character.position.y+3,
            z: character.position.z+6,
            duration: 4,
            ease: "sine.in",
            onUpdate: () => {
              camera.setRotationFromQuaternion(startQuat);
            },
            onComplete: () => {
              resolve();
            }
          })
        }
      });
    });
  };

  return { toScene, toModel, matchCut}; 
}

