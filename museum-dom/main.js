
// VIDEO Slider



function slide(wrapper, items, prev, next) {
	let posX1 = 0,
		posX2 = 0,
		posInitial,
		posFinal,
		threshold = 100,
		slides = items.getElementsByClassName('video'),
		slidesLength = slides.length,
		slideSize = items.getElementsByClassName('video')[0].offsetWidth + 42,
		firstSlide = slides[0],
		lastSlide = slides[slidesLength - 1],
		cloneFirst = firstSlide.cloneNode(true),
		cloneLast = lastSlide.cloneNode(true),
		index = 0,
		allowShift = true;

	let circles = document.querySelectorAll('.circle');

	for (let circleIndex = 0; circleIndex <  circles.length; circleIndex ++ ){

		let circle = circles[circleIndex];

		circle.addEventListener('click', function() {
			let number = circleIndex - index;
			shiftSlide(1, number);
		});
	}

	let initialVideos = document.querySelectorAll('.videos .video');
	
	// Clone first and last slide
	items.appendChild(cloneFirst);
	items.appendChild(slides[1].cloneNode(true));
	items.appendChild(slides[2].cloneNode(true));
	items.insertBefore(cloneLast, firstSlide);
	
	// Mouse events
	items.onmousedown = dragStart;
	
	// Touch events
	items.addEventListener('touchstart', dragStart);
	items.addEventListener('touchend', dragEnd);
	items.addEventListener('touchmove', dragAction);
	
	// Click events
	prev.addEventListener('click', function () { shiftSlide(-1) });
	next.addEventListener('click', function () { shiftSlide(1) });
	
	// Transition events
	items.addEventListener('transitionend', checkIndex);
	
	function dragStart (e) {
	  e = e || window.event;
	  e.preventDefault();
	  posInitial = items.offsetLeft;
	  
	  if (e.type == 'touchstart') {
		posX1 = e.touches[0].clientX;
	  } else {
		posX1 = e.clientX;
		document.onmouseup = dragEnd;
		document.onmousemove = dragAction;
	  }
	}
  
	function dragAction (e) {
	  e = e || window.event;
	  
	  if (e.type == 'touchmove') {
		posX2 = posX1 - e.touches[0].clientX;
		posX1 = e.touches[0].clientX;
	  } else {
		posX2 = posX1 - e.clientX;
		posX1 = e.clientX;
	  }
	  items.style.left = (items.offsetLeft - posX2) + "px";
	}
	
	function dragEnd (e) {
	  posFinal = items.offsetLeft;
	  if (posFinal - posInitial < -threshold) {
		shiftSlide(1, 'drag');
	  } else if (posFinal - posInitial > threshold) {
		shiftSlide(-1, 'drag');
	  } else {
		items.style.left = (posInitial) + "px";
	  }
  
	  document.onmouseup = null;
	  document.onmousemove = null;
	}
	
	function shiftSlide(dir, number = 1, action = null) {
	  items.classList.add('shifting');
	  
	  if (allowShift) {
		if (!action) { posInitial = items.offsetLeft; }
  
		if (dir == 1) {
		  items.style.left = (posInitial - slideSize * number) + "px";
		  index += number;      
		} else if (dir == -1) {
		  items.style.left = (posInitial + slideSize * number) + "px";
		  index -= number;      
		}
	  };
	  
	  allowShift = false;

	  

	  for(let circle of circles){
		circle.classList.remove('circle_active');
	  }

	  let mySuperIndex = index % 5;

	  if (mySuperIndex == -1){
		mySuperIndex = 4;
	  }
	  
	  circles[mySuperIndex].classList.add('circle_active');
	  
	  let vidos = document.querySelector('.main_video video');
	  

	  vidos.src = initialVideos[mySuperIndex].src;
	  vidos.poster = initialVideos[mySuperIndex].poster;

	}
	  
	function checkIndex (){
	  items.classList.remove('shifting');
  
	  if (index == -1) {
		items.style.left = -(slidesLength * slideSize) + "px";
		index = slidesLength - 1;
	  }
  
	  if (index == slidesLength) {
		items.style.left = -(1 * slideSize) + "px";
		index = 0;
	  }
	  
	  allowShift = true;
	}
  }



let videoSlider = document.querySelector('.three_video');
	sliderItems = document.querySelector('.videos');
	toLeft = document.querySelector('.to_left_arrow');
	toRight = document.querySelector('.to_right_arrow');

slide(videoSlider, sliderItems, toLeft, toRight);



// Burger Menu


let burgerMenu = document.querySelector(".burger_menu");
burgerMenu.addEventListener('click', function (e) {
	document.querySelector('.adaptive_menu2').classList.toggle('hidden');
	document.querySelector('.welcome_text').classList.toggle('hidden');
	burgerMenu.classList.toggle('open');
})

//  Welcome Slider

let items = document.querySelectorAll('.mona-slider .picture');
let squares = document.querySelectorAll('.square');
let currentItem = 0;
let isEnable = true;


function changeCurrentItem (n) {
	currentItem = (n + items.length) % items.length; 
}

function activeSquare () {
	for (let square of squares) {
		square.classList.remove('square_active');
	}
	squares[currentItem].classList.add('square_active');
	let span = document.querySelector('.currentSlideNumber');
	span.innerHTML = "0" + (currentItem + 1);
}

function selectSquare (picture, activeSquare) {
	
}

function hideItem(direction) {
	isEnable = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnable = true;
	});
}

function nextItem(n) {
	hideItem('to_left');
	changeCurrentItem(n + 1);
	showItem('from_right');
	activeSquare();
}

function previousItem(n) {
	hideItem('to_right');
	changeCurrentItem(n - 1);
	showItem('from_left');
	activeSquare();
}


for (let i = 0; i < squares.length; i++) {
	let square = squares[i];
	square.addEventListener('click', function() {
		hideItem('to_right');
		currentItem = i;
		showItem('from_left');
		activeSquare();
	});
}


document.querySelector('.left_arrow').addEventListener('click', function() {
	if (isEnable) {
		previousItem(currentItem);
	}
});

document.querySelector('.right_arrow').addEventListener('click', function() {
	if (isEnable) {
		nextItem(currentItem);
	}
});


//swiper 


const isSwipe = (zone) => {
	let swipeArea = zone;
	let startX = 0;
	let startY = 0;
	let finishX = 0;
	let finishY = 0;
	let timeStart = 0;
	let timeDelay = 0;

	let allowedTime = 500;
	let distanceX = 300;
	let distanceY = 100;

	swipeArea.addEventListener('mousedown', function(e) {
		startX = e.pageX;
		startY = e.pageY;
		timeStart = new Date().getTime();
		e.preventDefault();
	}, false);
	
	swipeArea.addEventListener('mouseup', function(e) {
		finishX = e.pageX - startX;
		finishY = e.pageY - startY;
		timeDelay = new Date().getTime() - timeStart;
		if (timeDelay <= allowedTime) {
			if(Math.abs(finishX) >= distanceX && Math.abs(finishY) <= distanceY) {
				if (finishX > 0) {
					if (isEnable) {
						previousItem(currentItem);
					}
				} else {
					if (isEnable) {
						nextItem(currentItem);
					}
				}
			}
			 e.preventDefault();
		}
	}, false);

}

let zone = document.querySelector('.pictures_to_swipe');
isSwipe(zone);


// Before - after

const beforeAfter = document.querySelector('.before_after');
const before = beforeAfter.querySelector('.before');
const beforeImg = before.querySelector('img');
const comparisonSlider = beforeAfter.querySelector('.comparison_slider');
const body = document.body;

let isActive = false;

document.addEventListener('DOMContentLoaded', () => {
	let width = beforeAfter.offsetWidth;
	beforeImg.style.width = `${width}px`;
});

body.addEventListener('mousedown', () => {
	isActive = true;
});

body.addEventListener('mouseup', () => {
	isActive = false;
});

body.addEventListener('mouseleave', () => {
	isActive = false;
});

const beforeAfterSlider = (x) => {
	let shift = Math.max(0, Math.min(x, beforeAfter.offsetWidth-34));
	before.style.width = `${shift + 17}px`;
	comparisonSlider.style.left = `${shift}px`;
};

const pauseEvents = (e) => {
	e.stopPropagation();
	e.preventDefault();
	return false;
};


 body.addEventListener(`mousemove`, (e) => {
	 if (!isActive) {
		 return;
	 }

	 let x = e.pageX;

	 x -= beforeAfter.getBoundingClientRect().left;
	 beforeAfterSlider(x);
	 pauseEvents(e);
	
 });

 comparisonSlider.addEventListener('touchstart', () => {
	isActive = true;
});

body.addEventListener('touchend', () => {
	isActive = false;
});

body.addEventListener('touchcancel', () => {
	isActive = false;
});

body.addEventListener('touchmove', (e) => {
	if (!isActive) {
		return;
	}

	let x;
  
  let i;
  for (i = 0; i < e.changedTouches.length; i++) {
  	x = e.changedTouches[i].pageX; 
  }
  
  x -= slider.getBoundingClientRect().left;

  beforeAfterSlider(x);
  pauseEvents(e);
});


// Tickets


let basicNum = document.querySelector('.basic_num');
let seniorNum = document.querySelector('.senior_num');

function showTotalSum() {
	let ticketNumberBasic = document.querySelector('.age_selector .basic').value;
	let ticketNumberSenior = document.querySelector('.age_selector .senior').value;
	let ticketType = document.querySelector('.ticket_type .custom_radio:checked').value;
	let sumSpan = document.querySelector('.euro220 span');

	ticketNumberBasic = parseInt(ticketNumberBasic);
	ticketNumberSenior = parseInt(ticketNumberSenior);
	ticketType = parseInt(ticketType);

	totalSum = ticketNumberBasic * ticketType + ticketNumberSenior * (ticketType / 2);	
	sumSpan.innerHTML = totalSum;

	localStorage.setItem("ticketNumberBasic", ticketNumberBasic);
	localStorage.setItem("ticketNumberSenior", ticketNumberSenior);
	localStorage.setItem("ticketType", ticketType);

	basicNum.innerHTML = ticketNumberBasic;
	seniorNum.innerHTML = ticketNumberSenior;
}



let radios = document.querySelectorAll('.ticket_type .custom_radio');

for (let radio of radios){
	radio.addEventListener('change', showTotalSum);
}

document.querySelector('.age_selector .basic').value = localStorage.getItem("ticketNumberBasic") || 0;
document.querySelector('.age_selector .senior').value = localStorage.getItem("ticketNumberSenior") || 0;

let price = localStorage.getItem("ticketType") || 20;

let radio = document.querySelector(`.ticket_type .custom_radio[value="${price}"]`)
radio.checked = true;

showTotalSum();






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
	
	let ageValue = ageSelector.querySelector('.age_value')
	let minus = ageSelector.querySelector('.age_minus')
	let plus = ageSelector.querySelector('.age_plus')

	minus.addEventListener('click', function (e) {
		ageValue.value = (parseInt(ageValue.value) - 1).clamp(0, 20);

		if (ageValue.classList.contains("basic")) {
			document.querySelector('.ticket_amount .age_value.basic').value = ageValue.value;
		}
		else { 
			document.querySelector('.ticket_amount .age_value.senior').value = ageValue.value;
		}
		
		showTotalSum();
		recalculateSum();
	})

	plus.addEventListener('click', function (e) {
		ageValue.value = (parseInt(ageValue.value) + 1).clamp(0, 20);
		
		if (ageValue.classList.contains("basic")) {
			document.querySelector('.ticket_amount .age_value.basic').value = ageValue.value;
		}
		else { 
			document.querySelector('.ticket_amount .age_value.senior').value = ageValue.value;
		}

		showTotalSum();
		recalculateSum();
	})
})


let buyButton = document.querySelector('.buy_ticket.ripple')

buyButton.addEventListener('click', function (e) {
    // debugger
	document.querySelector('.additional_layer').style.display = "flex";

	let ticketType = document.querySelector('.ticket_type .custom_radio:checked').value;
	let opt = document.querySelector(`select option[value="${ticketType}"]`)
	opt.selected = true;

	document.querySelector('.entry_ticket_main .age_value.basic').value = document.querySelector('.ticket_amount .age_value.basic').value;
	document.querySelector('.entry_ticket_main .age_value.senior').value = document.querySelector('.ticket_amount .age_value.senior').value;
	

	onSelectChanged();
})

let cancel_button = document.querySelector('.cancel_button')

cancel_button.addEventListener('click', function (e) {
    // debugger
	document.querySelector('.additional_layer').style.display = "none";
})


// Form Validation

let regName = /^[A-Za-zА-Яа-яЁё]{3,15}$/;
let regTel = /^(\+7|7|8)?[\s\-]?\(?[0-9]{2,3}\)?[\s\-]?[0-9]{2,3}[\s\-]?[0-9]{2,3}[\s\-]?[0-9]{2,3}$/;
let regEmail = /^[^\s@]{2,15}@[^\s@]{4,}\.[^\s@]{2,}/;

let userName = document.querySelector('.user_name');
let inputEmail = document.querySelector('.email');
let inputTel = document.querySelector('.tel');
let dateInput = document.querySelector('.date');
let timeInput = document.querySelector('.time');
let selectTicketInput = document.querySelector('.ticketType');
let currentDate = new Date;
let dateOnTicket = document.querySelector('.pref_date');
let timeOnTicket = document.querySelector('.pref_time');
let typeOnTicket = document.querySelector('.pref_type');
let oneBasic = document.querySelector('.one_basic');
let oneSenior = document.querySelector('.one_senior');

let options = {
	month: 'long',
	day: 'numeric',
	weekday: 'long',
  };

dateInput.addEventListener('change', function(event) {
	if (Date.parse(dateInput.value) >= Date.parse(currentDate)) {
		dateInput.classList.remove('error_input');
		document.querySelector('.error_date').classList.remove('error_active');
		dateOnTicket.innerHTML = dateInput.value.toString("en-US", options);
	} else {
		dateInput.classList.add('error_input');
		document.querySelector('.error_date').classList.add('error_active');
	}
});

timeInput.addEventListener('change', function(event) {
	timeOnTicket.innerHTML = timeInput.value;
});

selectTicketInput.addEventListener('change', function(event) {
	onSelectChanged();
});



let sumOfBasic = document.querySelector('.sum_of_basic');
let sumOfSenior = document.querySelector('.sum_of_senior');
let totalSumOverlay = document.querySelector('.total_sum_overlay')

function recalculateSum () {
	sumOfBasic.innerHTML = parseInt(oneBasic.innerHTML) * parseInt(basicNum.innerHTML);
	sumOfSenior.innerHTML = parseInt(oneSenior.innerHTML) * parseInt(seniorNum.innerHTML);
	totalSumOverlay.innerHTML = parseInt(sumOfBasic.innerHTML) + parseInt(sumOfSenior.innerHTML);
};

function onSelectChanged() {
	if (selectTicketInput.value == '20') {
		typeOnTicket.innerHTML = "Permanent exhibition";
		oneBasic.innerHTML = 20;
		oneSenior.innerHTML = 10;
	} else if (selectTicketInput.value == '25') {
		typeOnTicket.innerHTML = "Temporary exhibition";
		oneBasic.innerHTML = 25;
		oneSenior.innerHTML = 12.5;
	} else {
		typeOnTicket.innerHTML = "Combined Admission";
		oneBasic.innerHTML = 40;
		oneSenior.innerHTML = 20;
	}
	recalculateSum();
}

recalculateSum();








userName.addEventListener('change', function (event) {
	if (!regName.test(userName.value)) {
		userName.classList.add('error_input');
		document.querySelector('.error_name').classList.add('error_active');
	} else {
		userName.classList.remove('error_input');
		document.querySelector('.error_name').classList.remove('error_active');
	}
});

inputEmail.addEventListener('change', function (event) {
	if (!regEmail.test(inputEmail.value)) {
		inputEmail.classList.add('error_input');
		document.querySelector('.error_email').classList.add('error_active');
	} else {
		inputEmail.classList.remove('error_input');
		document.querySelector('.error_email').classList.remove('error_active');
	}
});

inputTel.addEventListener('change', function (event) {
	if (!regTel.test(inputTel.value)) {
		inputTel.classList.add('error_input');
		document.querySelector('.error_tel').classList.add('error_active');
	} else {
		inputTel.classList.remove('error_input');
		document.querySelector('.error_tel').classList.remove('error_active');
	}
});

userName.addEventListener('change', function (event) {
	if (!regName.test(userName.value)) {
		userName.classList.add('error_input');
		document.querySelector('.error_name').classList.add('error_active');
	} else {
		userName.classList.remove('error_input');
		document.querySelector('.error_name').classList.remove('error_active');
	}
});




// Dark mode

document.querySelector('.dark_mode_container').addEventListener('click', function (){
	document.querySelector('body').classList.toggle('dark');
})


// MainVideo

let mainVideo = document.querySelector('.mainVideo');
let isPlaying = false;
let isMute = false;
let isFullscreen = false;
let sound = 100;

let progress = document.querySelector('.progress_timeline2');
let progressVolume = document.querySelector('.progress_volume');

let mousedown = false;

function progressChanged() {
	let time = progress.value / 100 * mainVideo.duration
	mainVideo.currentTime = time;
}

document.querySelector('.control_play').addEventListener('click', changeIsPlaying)
document.querySelector('.main_play_button').addEventListener('click', changeIsPlaying)
document.querySelector('.mainVideo').addEventListener('click', changeIsPlaying)

document.querySelector('.control_volume').addEventListener('click', changeIsMute)


mainVideo.addEventListener('timeupdate', function () {
	let percent = mainVideo.currentTime / mainVideo.duration * 100;
	progress.value = percent;
	progress.dispatchEvent(new Event("input"))
})


progress.addEventListener('mousedown', function () {
	mousedown = true;
	if (isPlaying){
		mainVideo.pause();
	}	
});
progress.addEventListener('mouseup', function () {
	mousedown = false;
	if (isPlaying){
		mainVideo.play();
	}
});
progress.addEventListener('mousemove', function (e) {
	if (mousedown){
		let percent = e.offsetX / progress.offsetWidth * 100;
		progress.value = percent;
		progressChanged()

		if (progress.value == 100 && isPlaying){
			changeIsPlaying();
			mousedown = false;
		}
	}	
});

progress.addEventListener('change', progressChanged)



function changeIsPlaying() {
	isPlaying = !isPlaying;

	if (isPlaying){
		mainVideo.play();
		document.querySelector('.control_play img').src = "assets/svg/pause.svg";
		document.querySelector('.main_play_button').classList.add('hidden');
		
	}
	else {
		mainVideo.pause();
		document.querySelector('.control_play img').src = "assets/svg/play.svg";
		document.querySelector('.main_play_button').classList.remove('hidden');
	}
}

function changeIsMute() {
	isMute = !isMute;

	if (isMute){
		document.querySelector('.control_volume img').src = "assets/svg/mute.svg";
		progressVolume.value = 0;
	}
	else {
		document.querySelector('.control_volume img').src = "assets/svg/volume.svg";
		progressVolume.value = sound;
	}

	mainVideo.muted = isMute;
	progressVolume.dispatchEvent(new Event("input"))
}



progressVolume.addEventListener('mousedown', function () {
	mousedown = true;
});
progressVolume.addEventListener('mouseup', function () {
	mousedown = false;
});
progressVolume.addEventListener('mousemove', function (e) {
	if (mousedown) {
		sound = e.offsetX / progressVolume.offsetWidth * 100;
		
		progressVolume.value = sound;
		progressVolume.dispatchEvent(new Event("input"))

		mainVideo.volume = (sound / 100).clamp(0, 1);

		if (mainVideo.volume == 0 && !isMute){
			changeIsMute();
		}
		
		if (mainVideo.volume > 0 && isMute){
			changeIsMute();
		}
	}	
});




function changeIsFullscreen() {
	isFullscreen = !isFullscreen;

	if (isFullscreen){
		document.querySelector('.main_video').requestFullscreen();
		document.querySelector('.main_video').classList.add('fullscreened');
		document.querySelector('.control_fullscreen img').src = "assets/svg/fullscreen_exit.svg";
	}
	else {
		document.exitFullscreen();
		document.querySelector('.main_video').classList.remove('fullscreened');
		document.querySelector('.control_fullscreen img').src = "assets/svg/fullscreen.svg";
	}
	
}


document.querySelector('.control_fullscreen').addEventListener('click', changeIsFullscreen)
