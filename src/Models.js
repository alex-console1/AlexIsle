import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Models {
    constructor(scene){
        this.scene = scene;
        this.clock = new THREE.Clock();
        this.mixers = []; 
        this.loader = new GLTFLoader();
    }

    loadLandscape() {
        return new Promise((resolve, reject) => {
            this.loader.load( 'landscape.glb', function ( gltf ) {
                let model = gltf.scene;
                this.ground = model
                model.rotation.set(0, -Math.PI / 2, 0);
                model.position.set(0, -0.2, 0);
           
                this.scene.add( model );

                resolve(model);
        }.bind(this), undefined, function ( error ) {

            console.error( error ), reject(error);
            });
        });
    }

    loadTram() {
        return new Promise((resolve, reject) => {
            this.loader.load( 'tram.glb', function ( gltf ) {
                let tram = gltf.scene;
                tram.position.set(26.55, 0.5, -5);
                this.tram = tram
                //gltf.scene.scale.set(0.7, 0.7, 0.7);
                //gltf.scene.rotation.set(0, -Math.PI/2, 0);
                this.scene.add( tram );

                resolve(tram);
            }.bind(this), undefined, function ( error ) {

                console.error( error ), reject(error);
            });
        });
    }
    
    loadFox() {
        return new Promise((resolve, reject) => {
            this.loader.load( 'fox.glb', function ( gltf ) {
                let character = gltf.scene;

                character.position.set(-43, 0, 10);
                character.rotation.set(0, 1.5, 0);
                character.scale.set(0.3, 0.3, 0.3);
                    this.scene.add( character );
                
                const mixer = new THREE.AnimationMixer(character); 
                //const action = mixer.clipAction(gltf.animations[0]); 
                mixer.clipAction(THREE.AnimationUtils.subclip( gltf.animations[ 0 ], 'idle')).play();
                mixer.clipAction(THREE.AnimationUtils.subclip( gltf.animations[ 2 ], 'walk')).play();
                mixer._actions[0].enabled = true;
                mixer._actions[1].enabled = false;
                //action.play();
                
                this.character = character;
                this.mixer = mixer;

                this.mixers.push(mixer)
                
                resolve(character);
            }.bind(this), undefined, function ( error ) {

                console.error( error ), reject(error);
            });
        });
    }

    loadAtom() {
        return new Promise((resolve, reject) => {
            this.loader.load( 'atom.glb', function ( gltf ) {
            let sceneOne = gltf.scene;
            sceneOne.position.set(-26, 6, -2.5);
            sceneOne.rotation.set(0, 0.51*Math.PI, 0);
            sceneOne.scale.set(0.5, 0.5, 0.5);
                this.scene.add( sceneOne );
                this.sceneOne = sceneOne;

            const mixer = new THREE.AnimationMixer(sceneOne); 
            const action = mixer.clipAction(gltf.animations[0]); 
            action.play();

            this.mixers.push(mixer)

            resolve(sceneOne)

            }.bind(this), undefined, function ( error ) {

                console.error( error ), reject(error);
            });
        });
    }

    loadWindmill() {
        return new Promise((resolve, reject) => {
            const positions = [[-10, 4.54, -17], [1.5, 3.67, -18],[-2, 3.71, -12], [5, 2.02, -13]];

            positions.forEach((position, index)=> {
                this.loader.load( 'windmill__animated.glb', function ( gltf ) {
                    const [x, y, z] = position;

                    if (index === 2) {
                        this.sceneTwo = gltf.scene;
                    }

                    gltf.scene.position.set(x, y, z);
                    gltf.scene.rotation.set(0, -4.5, 0);
                    gltf.scene.scale.set(3, 3, 3);
                        this.scene.add( gltf.scene );

                    const mixer = new THREE.AnimationMixer(gltf.scene); 
                    const action = mixer.clipAction(gltf.animations[0]); 
                    action.startAt(this.clock.elapsedTime + Math.random());
                    action.play();

                    this.mixers.push(mixer)

                    resolve(gltf.scene)

                    }.bind(this), undefined, function ( error ) {

                        console.error( error ), reject(error);
                });
            });
        });
    }

    loadBird() {
        return new Promise((resolve, reject) => {
            this.loader.load( 'seagull.glb', function ( gltf ) {
            gltf.scene.position.set(0, 10, 0);
            //gltf.scene.set(0, 0.51*Math.PI, 0);
            //gltf.scene.scale.set(0.5, 0.5, 0.5);
                this.scene.add( gltf.scene );
                this.bird = gltf.scene

                const mixer = new THREE.AnimationMixer(gltf.scene); 
                const action = mixer.clipAction(gltf.animations[0]); 
                action.play();

                this.mixers.push(mixer)

                resolve(gltf.scene)

            }.bind(this), undefined, function ( error ) {

                console.error( error ), reject(error);
            });
        });
    }

    loadExclam() {
        return new Promise((resolve, reject) => {
            this.loader.load( 'exclamation.glb', function ( gltf ) {
                let exclam = gltf.scene
                exclam.position.set(2.5, 3.5, 3.5)
                exclam.rotateY(0.5*Math.PI)
                exclam.visible = false
                this.exclam = exclam
                this.character.add(exclam)
                
                resolve(exclam)
            }.bind(this), undefined, function ( error ) {
            
                console.error(error), reject(error);
            });
        });
    }


    loadAncillary() {
        return new Promise((resolve, reject) => {
            const seaGeometry = new THREE.CircleGeometry( 200 ); 
            
            const seaMaterial = new THREE.MeshPhysicalMaterial( { 
            color: 0x45b1e8, 
            reflectivity: 0, 
            transparent: true,
            opacity: 0.9,
            dispersion: 1,
            roughness: 0.8,
            fog: false
            } ); 
            
            const sea = new THREE.Mesh( seaGeometry, seaMaterial ); 
            sea.rotation.set(-Math.PI/ 2, 0, 0);
            sea.position.set(0, -0.5, 0)
            this.scene.add( sea );
            
            const skyColor = 0x8ef1ff;  
            const groundColor = 0xFFFFFF; 
            var intensity = 2;
            const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
            this.scene.add(light);
            
            const sunGeometry = new THREE.SphereGeometry( 10 );
            const sunMaterial = new THREE.MeshStandardMaterial( {color: 0xF7CD5D, emissive :0xFCE570, emissiveIntensity: 1.2, roughness:0.1, fog: false} );
            const sun = new THREE.Mesh( sunGeometry, sunMaterial );
            sun.position.set(0, 5, -200)
            this.scene.add( sun );
            
            const sunGlowMaterial = new THREE.MeshStandardMaterial({
            color: 0xFDAE83,
            transparent: true,
            opacity: 0.2,
            side: THREE.BackSide,
            emissive: 0xFCE570,
            emissiveIntensity: 2,
            roughness: 0.1,
            fog: false
            });
            
            const sunGlowGeometry = new THREE.SphereGeometry(15, 32, 32); 
            const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
            sunGlow.scale.setScalar(1.5); 
            
            sun.add(sunGlow);
            
            
            const color = 0xF7CD5D;
            var intensity = 8;
            const sunLight = new THREE.DirectionalLight(color, intensity);
            sunLight.position.set(0, 15, -200);
            sunLight.target.position.set(-43, 0, 10);
            
            sunLight.castShadow = true;
            
            this.scene.add(sunLight);
            this.sunTarget = sunLight
            this.scene.add(sunLight.target);
            
            this.scene.fog = new THREE.Fog(0xcccccc, 25 , 90);

            resolve();

        }).catch(error => {
            console.error(error), reject(error);
        });
    }
    
    async loadPrimaryModels() {
        await Promise.all([
        this.loadLandscape(),
        this.loadTram(),
        this.loadFox(),
        this.loadAtom(),
        this.loadWindmill(),
        this.loadBird(),
        this.loadAncillary()
        ])
        await this.loadExclam()
    }

    updateAnimations() {
        const delta = this.clock.getDelta();
        this.mixers.forEach((mixer) => mixer.update(delta));
    }
}

export default Models;