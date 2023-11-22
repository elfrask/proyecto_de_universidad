//let electron = require("electron");
let {BrowserWindow, app} = require("electron")
//let {BrowserWindow, app} = electron;
let express = require("express")
let server = express();

global.nombre = "carlos"

let text= "hi"

global.getvar = (v) => this[v];
global.getwin = () => win;


let win

app.addListener("ready", () => {
    win = new BrowserWindow({

        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false,
                      
        },
        width: 800,
        height: 800,
        minWidth: 1000
    });

    server.use("/", express.static("./public"));
    let PORT = 6686;
    server.listen(PORT, () => {
        win.loadURL(`http://localhost:${PORT}/init.html`);
        console.log("server open in the port: " +  PORT);
        require("@electron/remote/main").initialize()

    })



    
})

app.on('browser-window-created', (_, window) => {
    require("@electron/remote/main").enable(window.webContents)
})

app.addListener("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})