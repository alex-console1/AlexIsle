const content = document.getElementsByClassName("content");
const instruct = document.getElementsByClassName("instruct");
var modals = document.querySelectorAll('.info');
var tran = false;

export function contents(scene, action, finish) {
    for (let i = 0; i < content.length; i++) {
        if (action) {
            for (let i = 0; i < modals.length; i++) {
                if (modals[i].style.display !== "none") {
                    content[i+1].classList.remove("sVisible");
                    content[i+1].classList.remove("qVisible"); 
                    content[i+1].classList.add("hidden");
                    tran = true
                }
            }   

            if (scene != 0 && scene === i) {
                if (!tran) {
                    content[i].classList.remove("hidden");
                    content[i].classList.add("sVisible");
                } else {
                    content[i].classList.remove("hidden");
                    content[i].classList.add("qVisible");
                    tran = false
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
        }
    }      
};   

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