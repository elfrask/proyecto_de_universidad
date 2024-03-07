let remote = require("@electron/remote")



class App extends React.Component {


    render() {


        return(
            <div className="marco form-box">
                {/* <a href="#" onClick={() => reload()}>reload</a>
                <br /><br /> */}
                <div className="medio fill">

                    <div className="login">
                        <input type="text" id="user" placeholder="Nuevo usuario" className="input" style={{
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


                                try {

                                    let result = MyServer.add_account(user, pass);


                                    switch (result.error) {
                                        case 1:
                                            msg("cuenta de usuario invalida", "usuario invalido");
                                            break;
                                        case 2:
                                            msg("La contraseña de la cuenta de usuario es incorrecta", "contraseña invalida");
                                            break;
                                        case 3:
                                            msg(`No se ah podido conectar al servidor, asegúrese de estar conectado a internet o que el host de destino este activo`, "error de conexión");
                                            break;
                                        case 11:
                                            msg(`este usuario '${id}' ya existe`, "Error de usuario");
                                            break;
                                        case 0:
                                            subapi.done(window);
                                            close()
                                            break;
                                        default:
                                            

                                            break;
                                    }
                                    
                                } catch (error) {
                                    msg(`No se ah podido conectar al servidor asegúrese de estar conectado a internet o que el host de destino este activo`, "error de conexión inesperada");
                                    
                                }
                            }}
                        >
                            Crear cuenta
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