const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
	const win = new BrowserWindow({
		width: 600,
		height: 400,
		frame: true,
		resizable: false,
		icon: path.join(__dirname, 'favicon.ico'),
	})

	win.loadFile('./src/index.html')
}

app.whenReady().then(() => createWindow())
