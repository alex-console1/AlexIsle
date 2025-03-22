var btn = document.querySelectorAll("button");
var modals = document.querySelectorAll('.info');
var close = document.querySelectorAll(".button-close");
var btnToggle = document.querySelector('.button-toggle');
var closeToggle = document.querySelector('.cross')
var middle = document.querySelector('.middle');
var cancel = document.querySelector('.close');
var menu = document.querySelector('.menu');

if (modals.length != 0) {
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', function(e) {
            e.preventDefault();
            this.blur();
            var modal = document.querySelector(e.target.getAttribute("href"));
            if (modal) {
                modal.style.display = "block";
            }
        });
    }
    
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            modals[i].style.display = "none";
        }
    }
}

btnToggle.addEventListener('click', function(event) {
        this.blur();
        menu.classList.toggle('active');
        closeToggle.classList.toggle('active');
        btnToggle.classList.toggle('active');
})