
let burgerMenu = document.querySelector(".burger_menu");
burgerMenu.addEventListener('click', function (e) {
	document.querySelector('.adaptive_menu2').classList.toggle('hidden');
	document.querySelector('.welcome_text').classList.toggle('hidden');
	burgerMenu.classList.toggle('open');
})















function setupSlider(name) {
	const progress = document.querySelector(name);
  
	progress.addEventListener('input', function() {
	  const value = this.value;
	  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
	})

	progress.dispatchEvent(new Event("input"))
}

setupSlider('.progress_timeline1');
setupSlider('.progress_timeline2');
setupSlider('.progress_volume');


function randomiseChild(selector) {
	var ul = document.querySelector(selector);
	
	for (var i = ul.children.length; i >= 0; i--) {
	    ul.appendChild(ul.children[Math.random() * i | 0]);
	}
}

randomiseChild('.first_column');
randomiseChild('.second_column');
randomiseChild('.third_column');

const buttons = document.querySelectorAll('.ripple');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {

    	// debugger;

        const xInside = e.pageX// - e.target.offsetLeft
        const yInside = e.pageY// - e.target.offsetTop

        const circle = document.createElement('span')
        
        circle.classList.add('circle')

        circle.style.top = yInside + 'px'
        circle.style.left = xInside + 'px'

        this.appendChild(circle)

        setTimeout(() => circle.remove(), 500)
    })
})

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};


let selectors = document.querySelectorAll('.age_selector')

selectors.forEach(ageSelector => {
	
	let value = ageSelector.querySelector('.age_value')
	let minus = ageSelector.querySelector('.age_minus')
	let plus = ageSelector.querySelector('.age_plus')

	minus.addEventListener('click', function (e) {
		value.value = (parseInt(value.value) - 1).clamp(0, 20)
	})

	plus.addEventListener('click', function (e) {
		value.value = (parseInt(value.value) + 1).clamp(0, 20)
	})
})


let buyButton = document.querySelector('.buy_ticket.ripple')

buyButton.addEventListener('click', function (e) {
    // debugger
	document.querySelector('.additional_layer').style.display = "flex";
})

let cancel_button = document.querySelector('.cancel_button')

cancel_button.addEventListener('click', function (e) {
    // debugger
	document.querySelector('.additional_layer').style.display = "none";
})




