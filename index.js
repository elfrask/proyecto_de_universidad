//let electron = require("electron");
let {BrowserWindow, app} = require("electron");
let server = require("./server.js");
require("dotenv").config();
//let {BrowserWindow, app} = electron;

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
            devTools: process.argv.includes("--dev") 
                      
        },
        width: 800,
        height: 800,
        minWidth: 1000,
        icon:"public/img/gui/cst.png",
        
    });

    win.menuBarVisible = false;
    

    server.run(process.env.PORT_APP, win);
    



    
})

app.on('browser-window-created', (_, window) => {
    require("@electron/remote/main").enable(window.webContents)
})

app.addListener("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})