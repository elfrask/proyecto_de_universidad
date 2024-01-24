let remote = require("@electron/remote")

let exitcode = 0;

window.addEventListener("beforeunload", (evento) => {
    //let res = preventDefaultClose();

    
    if (true) {
        evento.preventDefault();
        evento.returnValue = res; 
        
        return "";
    };

});

let data = {
    sections:[
        gen_date("Sistema de reporte de cuotas", "email"),
        gen_date("Administrar plantilla", "admin")
    ]
}


function preventDefaultClose() {
    let result = remote.dialog.showMessageBoxSync({
        title: "Alerta de perdida de datos",
        message: "Los datos no se han guardado, ¿deseas salir?",
        buttons: ["Salir", "No Salir"]
    })
    
    console.log(result)

    return result
}

class Conf extends React.Component {
    state = {
        loaded: false,
        email: "",
        token_mail: "",
        smtp:"",

    };

    componentDidMount() {
        let configs = MyServer.configs();
        // console.log(configs)
        this.setState({...configs.data});
    }
    render() {

        if (!this.state.loaded) {
            return []
        }

        return(
            <div className="content">
                <section id="email">
                    <h2>
                        Sistema de reporte de cuotas
                    </h2>
                    <div className="conf-box">
                        <span>
                            Reportar cuotas automáticamente los Dias
                        </span>
                        <select defaultValue={1} className="select-gui">
                            {
                                range(1, 29).map(x=> {
                                    return(
                                        <option value={x} className="select-gui-option">
                                            Dia {x} del mes
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="conf-box">
                        <span>
                            Correo Emisor
                        </span>
                        <input type="text"  placeholder="Correo o usuario" id="_email" defaultValue={this.state.email}/>
                    </div>
                    <div className="conf-box">
                        <span>
                            Token o clave de acceso
                        </span>
                        <input type="password"  placeholder="clave o token" id="_token_mail" defaultValue={this.state.token_mail}/>
                    </div>
                    <div className="conf-box">
                        <span>
                            Contraseña
                        </span>
                        <input type="password"  placeholder="contraseña" id="_pass_mail" defaultValue={this.state.pass_mail}/>
                    </div>
                    <div className="conf-box">
                        <span>
                            Nombre del servicio
                        </span>
                        <input type="text"  placeholder="gmail | hotmail | yahoo" id="_smtp" defaultValue={this.state.smtp}/>
                    </div>
                    
                    <br />
                    <br />
                </section>
                <hr />
                <section id="admin">
                    <h2>
                        Credenciales y acceso
                    </h2>
                    {/* <div className="conf-box">
                        <span>
                            Usuario de acceso
                        </span>
                        <input type="text"  placeholder="Usuario" id="_user" defaultValue={"admin"}/>
                    </div> */}
                    <div className="conf-box">
                        <span>
                            Cambiar Contraseña
                        </span>
                        <input type="password"  placeholder="nueva contraseña" id="_pass" defaultValue={""}/>
                    </div>
                    <h4>
                        se esta trabajando por un sistema de usuarios con claves y accesos
                    </h4>
                </section>
                
            </div>
        )
    }
}


class App extends React.Component {


    render() {


        return(
            <div className="marco">
                <div className="header">
                    <div className="top1">
                        <ControlButton img="/img/gui/add.svg" click={() => {
                            close()
                        }}>
                            Cerrar
                        </ControlButton>
                        <ControlButton img="/img/gui/reload.svg" click={() => {
                            reload()
                        }}>
                            recargar
                        </ControlButton>
                        

                        <ControlButton img="/img/gui/save.svg">
                            Guardar cambios
                        </ControlButton>
                        
                        
                    </div>
                    <div className="top2">
                        
                        <div style={{float:"left", width:"6px", height:"50px"}}></div>
                        <div className="search"  style={{width:"-webkit-fill-available"}}>
                            <input type="text" className="search-input" placeholder="Buscar..." />
                            <select defaultValue={0} className="search-select">
                                <option value={0} className="select-gui-option">
                                    Nombre
                                </option>
                                
                                
                                {
                                    [].map(x=> {

                                        return(
                                            <option value={x.id} className="select-gui-option">
                                                {x.caption}
                                            </option>
                                        )
                                    })
                                }
                            </select>

                        </div>
                    </div>
                                        
                    
                </div>
                <div className="body">
                    <div className="body-banner">
                        {
                            data.sections.map(x=> {
                                return(
                                    <div className="body-banner-button" onClick={() =>  {
                                        document.location.assign("#" + x.id);
                                    }}>
                                        {x.caption}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="body-content">
                        <Conf></Conf>
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