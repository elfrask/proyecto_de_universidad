let remote = require("@electron/remote")



class App extends React.Component {


    render() {


        return(
            <div className="marco">
                {/* <a href="#" onClick={() => reload()}>reload</a>
                <br /><br /> */}
                <div className="medio fill">

                    <div className="login">
                        <input type="text" id="id" placeholder="ID Nombre unico (sin espacio)" className="input" style={{
                            width:"100%"
                        }}/>
                        <br />
                        <br />
                        <input type="text" id="title" placeholder="Nombre o titulo del curso" className="input"
                        style={{
                            width:"100%"
                        }}
                        
                        />
                        <br /><br />
                        
                        <Button
                            x="100%"
                            click={() => {
                                let id = go("id").value;
                                let title = go("title").value;


                                try {

                                    let result = MyServer.add_curso(id, title);


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
                                        case 10:
                                            msg(`este ID '${id}' de curso ya esta siendo ocupado por otro curso`, "Cédula no valida");
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
                            Crear curso/grupo/sección
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