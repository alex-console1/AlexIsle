import './style.css';

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import Models from './Models.js';

import {setupControls} from './characterControl.js'

import {camAnimate} from './cameraAnimate.js'

import {contents} from './text.js'

import {instructions} from './text.js'

import "/src/style.css";

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x8ef1ff );

const loading = document.getElementById("load")
const deviceError = document.querySelector(".error-wrapper")

const models = new Models(scene);

var curScene = 0

function updatePos(position) {
  if (position < -40 && position > -45) {
    curScene = 0; 
  } else if (position < -25 && position > -28.5) {
    curScene = 1; 
  } else if (position < -2 && position > -5.8) {
    curScene = 2; 
  } else if (position < 17 && position > 10) {
    curScene = 3; 
  } else if (position < 36 && position > 26) {
    curScene = 4;
  } else if (position < 47 && position > 44) {
    curScene = 5;
  } else {
    curScene = 6; 
  }
  return curScene
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  await models.loadPrimaryModels(); 
  await sleep(2000);
  if (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    deviceError.classList.remove("hidden")
  }
  else {
    loading.classList.add("hidden")
  }
})();

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 1000 );
//const controls = new OrbitControls(camera, renderer.domElement);
camera.position.y = 0;
camera.position.x = 0;
camera.position.z = 100;

renderer.setPixelRatio( window.devicePixelRatio),
renderer.setSize( window.innerWidth, window.innerHeight)


let charControls;
let tram;

const radius = 10.5
let circleAngle = 0.002;
let elipseAngle = 0.002;
const majorAxis = 80;
const minorAxis = 12;

let finish = true
let transition = true

function animate() {
    const character = models.character;
    const ground = models.ground;
    const exclam = models.exclam;
    const tram = models.tram;
    const bird = models.bird;
    const lightTarget = models.sunTarget
    const sceneOne = models.sceneOne;
    const sceneTwo = models.sceneTwo;
    const sceneThree = { position: {x: 20, y: 0, z: -1}};
    const sceneFour = models.sceneFour;
    const mixer = models.mixer;
    const progress = document.getElementById("progress")
    const icon = document.getElementById("icon") 
  
    let sceneList = [sceneOne, sceneTwo, sceneThree, sceneFour];

    let scenePos = [[0, 1, 12], [5, 6, 10], [-5, 4, 10]];

    if (character && mixer && !charControls) {
      charControls = setupControls(character, mixer);
    }

    if (charControls) {
      const curScene = updatePos(character.position.x);
      charControls.updateScene(curScene)
      const action = charControls.interact();
      const speed = charControls.varP();
      contents(curScene, action, finish);
      instructions(curScene, action, finish);

      const value = (character.position.x + 43.1) / .899;

      progress.style.width = value + "%";
      icon.style.left = value-0.34 + "%";

      if (transition) {
        charControls.updateKey(character.position.x);
        character.position.x += speed*0.04;

        lightTarget.target = camera;
      }

      if (exclam) {
        if (curScene == 1 || curScene == 2 || curScene == 3 || curScene == 5) {
          exclam.visible = true;
        } else {
          exclam.visible = false;
        }
      }
  
      if (!action && transition == true) {
        camera.position.set(character.position.x, character.position.y + 3, character.position.z + 6)
        camera.lookAt(character.position)
      }

      else if (!action && finish) {
        finish = false
        camAnimate().toModel(camera, character).then(() => {finish = true, transition = true})
      }

      else if (action && finish) {
        if (curScene === 1 || curScene === 2 || curScene === 3) {
          finish = false
          transition = false
          camAnimate().toScene(camera, sceneList[curScene-1].position, scenePos[curScene-1][0], scenePos[curScene-1][1], scenePos[curScene-1][2]).then(() => {finish = true})
        }

        else if (curScene === 5) {
          finish = false
          transition = false
          camAnimate().matchCut(camera, ground, character).then(() => {finish = true; transition = true;})
        }
      };
    } 
    
    requestAnimationFrame(animate);

    circleAngle += 0.002
    if (tram) {
      tram.position.x = 26.3 + radius * Math.cos(circleAngle);
      tram.position.z = -4.4 + radius * Math.sin(circleAngle);
      tram.rotation.y = -circleAngle
    }

    elipseAngle += 0.0016
    if (bird) {
      bird.position.x = majorAxis * Math.cos(elipseAngle);
      bird.position.z = -3.5 + minorAxis * Math.sin(elipseAngle);      
      bird.rotation.y = -elipseAngle

    }

    models.updateAnimations();
    renderer.render(scene, camera);
}

animate();
