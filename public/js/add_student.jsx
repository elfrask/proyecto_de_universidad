let remote = require("@electron/remote")



class App extends React.Component {


    render() {


        return(
            <div className="marco form-box">
                {/* <a href="#" onClick={() => reload()}>reload</a>
                <br /><br /> */}
                <div className="medio fill">

                    <div className="login">
                        <input type="text" id="ci" placeholder="Cedula del estudiante" className="input" style={{
                            width:"100%"
                        }}/>
                        <br />
                        <br />
                        
                        
                        <Button
                            x="100%"
                            click={() => {
                                let ci = go("ci").value;


                                try {

                                    let result = MyServer.add_student(ci);


                                    switch (result.error) {
                                        case 1:
                                            msg("El usuario ingresado no existe", "usuario invalido");
                                            break;
                                        case 2:
                                            msg("La contraseña es incorrecta", "contraseña invalida");
                                            break;
                                        case 3:
                                            msg(`No se ah podido conectar al servidor, asegúrese de estar conectado a internet o que el host de destino este activo`, "error de conexión");
                                            break;
                                        case 10:
                                            msg(`La cédula ingresada ya existe en la matricula`, "Cédula no valida");
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

                            }}
                        >
                            Crear nuevo estudiante
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