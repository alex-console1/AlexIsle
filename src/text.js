const content = document.getElementsByClassName("content");
const instruct = document.getElementsByClassName("instruct");
var modals = document.querySelectorAll('.info');
var tran = false;

// Functions defining when content can be visible
export function contents(scene, action, finish) {
    for (let i = 0; i < content.length; i++) {
        if (action) {
            for (let j = 0; j < modals.length; j++) {
                if (modals[j].style.display !== "none") {
                    content[j+1].classList.remove("sVisible");
                    content[j+1].classList.remove("qVisible"); 
                    content[j+1].classList.add("hidden");
                    tran = true;
                    // Function is returned if any modal is open
                    return;
                }
            }

            if (scene != 0 && scene === i) {
                // makes content visible at different speeds based on if modal was recently opened or not
                if (!tran) {
                    content[i].classList.remove("hidden");
                    content[i].classList.add("sVisible");
                } else {
                    content[i].classList.remove("hidden");
                    content[i].classList.add("qVisible");
                }
            } 

        } else if ( scene === 0) {
            if (finish) {
                content[scene].classList.remove("hidden");
                content[scene].classList.add("qVisible");  
            }

        } else {
            content[i].classList.remove("sVisible");
            content[i].classList.remove("qVisible"); 
            content[i].classList.add("hidden");
            tran = false;
        }
    }      
};   

// Functions defining when instructions can be visible
export function instructions(scene, action, finish) {
    for (let i = 0; i < instruct.length; i++) {
        if (!action && finish && scene == i) {
            instruct[i].classList.remove("hidden");
            instruct[i].classList.add("qVisible"); 
        } else {
            instruct[i].classList.remove("qVisible")
            instruct[i].classList.add("hidden");
        }
    }      
};