const mainButton = document.getElementById('mainButton')
const secButton = document.getElementById('secButton')
const clock = document.getElementById('clock')
const background = document.getElementById('background')

const studyingEndSound = document.getElementById('studyingEndSound')
const breakEndSound = document.getElementById('breakEndSound')

const Time = {
	study: 1500,
	break: 300,
}
setClockText(Time.study)

const stateValues = [
	'study-start',
	'study',
	'study-pause',
	'break-start',
	'break',
	'break-pause',
]
let state = 0
let time
let intervalId
let theme = 'light'

mainButton.addEventListener('mouseup', () => {
	switch (state) {
		case 0: // study-start
			state = 1
			setElementText(mainButton, `Pause studying`)
			setClockText(Time.study)
			time = Time.study
			countDown()
			break
		case 1: // study
			state = 2
			setElementText(mainButton, `Continue studying`)
			stopTimer()
			break
		case 2: // study-pause
			state = 1
			setElementText(mainButton, `Pause studying`)
			countDown()
			break
		case 3: // break-start
			state = 4
			setElementText(mainButton, `Pause the break`)
			setClockText(Time.break)
			time = Time.break
			countDown()
			break
		case 4: // break
			state = 5
			setElementText(mainButton, `Continue the break`)
			stopTimer()
			break
		case 5: // break-pause
			state = 4
			setElementText(mainButton, `Pause the break`)
			countDown()
			break
	}
})

secButton.addEventListener('mouseup', () => {
	stopTimer()
	setUpClock()
})

function countDown() {
	intervalId = setInterval(() => {
		time--
		setClockText(time)
		if (time < 0) {
			time = 0
			setClockText(time)
			clearInterval(intervalId)
			setUpClock()
		}
	}, 1000)
}

function setUpClock() {
	resetAudio()
	if (state < 3) {
		state = 3
		time = Time.break
		setClockText(time)
		setElementText(mainButton, `Start the break`)
		setElementText(secButton, `Skip the break`)
		studyingEndSound.play()
		theme = 'dark'
	} else {
		state = 0
		time = Time.study
		setClockText(time)
		setElementText(mainButton, `Start studying`)
		setElementText(secButton, `Skip studying`)
		breakEndSound.play()
		theme = 'light'
	}
	changeTheme()
}

function stopTimer() {
	clearInterval(intervalId)
}

function setClockText(time) {
	let min = Math.floor(time / 60)
	let sec = time % 60
	let minStr = min < 10 ? `0${min}` : `${min}`
	let secStr = sec < 10 ? `0${sec}` : `${sec}`
	let clockText = `${minStr}:${secStr}`
	clock.textContent = clockText
}

function setElementText(element, textContent) {
	element.textContent = textContent
}

function resetAudio() {
	studyingEndSound.pause()
	breakEndSound.pause()
	studyingEndSound.currentTime = 0
	breakEndSound.currentTime = 0
}

function changeTheme() {
	if (theme == 'light') {
		clock.classList.remove('clock-light')
		clock.classList.add('clock-dark')
		background.classList.remove('bg-dark')
		background.classList.add('bg-light')
		mainButton.classList.remove('btn-light')
		mainButton.classList.add('btn-dark')
		secButton.classList.remove('btn-dark')
		secButton.classList.add('btn-light')
	} else if (theme == 'dark') {
		clock.classList.remove('clock-dark')
		clock.classList.add('clock-light')
		background.classList.remove('bg-light')
		background.classList.add('bg-dark')
		mainButton.classList.remove('btn-dark')
		mainButton.classList.add('btn-light')
		secButton.classList.remove('btn-light')
		secButton.classList.add('btn-dark')
	}
}
