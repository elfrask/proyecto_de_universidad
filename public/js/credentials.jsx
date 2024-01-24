let remote = require("@electron/remote")



class App extends React.Component {


    render() {


        return(
            <div className="marco">
                {/* <a href="#" onClick={() => reload()}>reload</a>
                <br /><br /> */}
                <div className="medio fill">

                    <div className="login">
                        <input type="text" id="user" placeholder="Usuario" className="input" style={{
                            width:"100%"
                        }}/>
                        <br />
                        <br />
                        <input type="password" id="pass" placeholder="Contraseña" className="input"
                        style={{
                            width:"100%"
                        }}
                        
                        />
                        <br /><br />
                        
                        <Button
                            x="100%"
                            click={() => {
                                let user = go("user").value;
                                let pass = go("pass").value;
                                let temp = server(subapi.host, user, pass);

                                temp.on.error = (e, status) => {
                                    //msg("error: " + e)
                                    switch (status) {
                                        case 1:
                                            msg("El usuario ingresado no existe", "usuario invalido");
                                            break;
                                        case 2:
                                            msg("La contraseña es incorrecta", "contraseña invalida");
                                            break;
                                        case 3:
                                            msg(`No se ah podido conectar al servidor: '${subapi.host}' asegúrese de estar conectado a internet o que el host de destino este activo`, "error de conexión");
                                            break
                                        default:

                                            break;
                                    }
                                }

                                temp.on.connected = () => {

                                    subapi.done(subapi.host, user, pass);
                                    setTimeout(() => {close()}, 500)
                                }

                                temp.connectSync();
                            }}
                        >
                            Iniciar session
                        </Button>
                    </div>
                </div>

                
            </div>
        )
    }
};



ReactDOM.render(
    <App />, 
    document.body, 
    () => {
        onRender()
        console.log("app is started")
        
    }
)