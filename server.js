let express = require("express")
let server = express();
let api = require("./api.js")
    



module.exports = {
    run:(PORT, win) => {
        server.use("/", express.static("./public"));

        server.listen(PORT, () => {
            console.log("server open in the port: " +  PORT);
            require("@electron/remote/main").initialize()
            win.loadURL(`http://localhost:${PORT}/init.html`);

        })
    },
    server_Api: (PORT) => {
        let server_api = express();

        server_api.use("/api", api.api);

        server_api.listen(PORT, () => {
            console.log("server api data open in the port: " +  PORT);
            

        })
    }
}