//modal.style.display = "block";
var modals = document.querySelectorAll('info');
var close = document.getElementsByClassName("info");


export function setupControls(character, mixer){ 
    if (mixer._actions === 0) {
        console.error("Mixer or its actions are not initialized yet.");
        return;  
    }
    
    let fwd,bkd,dwn,interact= false, movKey=false; 
    let p = 0;
    let scene = 0;
    let max = 46.8;
    let min = -43.1;
    let modal = false;

    function updateScene(curScene) {
        scene = curScene;
        if (scene === 0){
            interact = false
        }
    }
        
    window.addEventListener( 'keydown', function ( e ) {

        for (var i = 0; i<close.length; i++) {
            if (close[i].style.display == "block") {
                modal = true
                break
            } else {
                modal = false
            }
        };

        if (!interact) {
            
            if (scene == 1 || scene == 2 || scene == 3 || scene == 5) {
                switch ( e.code ) {
                    case 'KeyD': 
                    case 'ArrowRight':
                        fwd = true; break;
                    case 'KeyA': 
                    case 'ArrowLeft':
                        bkd = true; break;
                    case 'Space': interact = !interact; break; 
                }
            }
                
            else {
                switch ( e.code ) {
                    case 'KeyD': 
                    case 'ArrowRight':
                        fwd = true; break;
                    case 'KeyA': 
                    case 'ArrowLeft':
                        bkd = true; break;
                    case 'Space': interact = false; break;
                }
            }
        } else if (modal == true) {
            switch ( e.code ) {
            }

        } else {
            switch ( e.code ) {
                case 'Space': interact = false; break;
            }
        }  
    } );

    window.addEventListener( 'keyup', function ( e ) {
        dwn=false;
        movKey=false;
        p=0;
        mixer._actions[0].enabled=true;
        mixer._actions[1].enabled=false;
        switch ( e.code ) {
            case 'KeyD': 
            case 'ArrowRight':
                fwd = false; break;
            case 'KeyA': 
            case 'ArrowLeft':
                bkd = false; break;
        }
    });

    function updateKey(position){

        if (position <=  min) {
            if ( fwd ) {
                dwn=true; 
                character.rotation.y = Math.PI/2; 
                p=1;
                movKey=true
            } if ( bkd ) {
                dwn=true; 
                //character.rotation.y = Math.PI;
                p=0; 
                movKey=false;
            }       
        } else if (position >=  max) {
            if ( fwd ) {
                dwn=true; 
                character.rotation.y = Math.PI/2; 
                p=0;
                movKey=false;
            } if ( bkd ) {
                dwn=true; 
                //character.rotation.y = Math.PI;
                p=-1; 
                movKey=true;
            }    
        } else {
            if ( fwd ) {
                        dwn=true; 
                        character.rotation.y = Math.PI/2; 
                        p=1;
                        movKey=true
            } if ( bkd ) {
                        dwn=true; 
                        //character.rotation.y = Math.PI;
                        p=-1; 
                        movKey=true;
            }      
        }

        if (movKey){
            mixer._actions[0].enabled=false;
            mixer._actions[1].enabled=true;
        }

        if (interact){
                mixer._actions[0].enabled=true;
                mixer._actions[1].enabled=false;
                p = 0
        }
    }

return {
    updateScene,
    updateKey,
    varP: () => p,
    interact: () => interact
};
}