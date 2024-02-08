

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
        gen_date("Administrar plantilla", "admin"),
        gen_date("Cursos y secciones", "cursos"),
    ]
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
            <div className="content" style={{paddingRight:"10px"}}>
                <section id="email">
                    <br />
                    <h2>
                        Sistema de reporte de cuotas
                    </h2>
                    <div className="conf-box">
                        <span>
                            Reportar cuotas automáticamente los Dias
                        </span>
                        <select defaultValue={this.state.day} type_value="number" className="select-gui" name="conf" idpx="day">
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
                        <input type="text"  placeholder="Correo o usuario" name="conf" idpx="email" defaultValue={this.state.email}/>
                    </div>
                    <div className="conf-box">
                        <span>
                            Token o clave de acceso
                        </span>
                        <input type="password"  placeholder="clave o token" name="conf" idpx="token_mail" defaultValue={this.state.token_mail}/>
                    </div>
                    <div className="conf-box">
                        <span>
                            Contraseña
                        </span>
                        <input type="password"  placeholder="contraseña" name="conf" idpx="pass_mail" defaultValue={this.state.pass_mail}/>
                    </div>
                    <div className="conf-box">
                        <span>
                            Nombre del servicio
                        </span>
                        <input type="text" name="conf"  placeholder="gmail | hotmail | yahoo" idpx="smtp" defaultValue={this.state.smtp}/>
                    </div>
                    <div className="conf-box">
                        <span>
                            Hacer reporte manualmente:
                        </span>
                        <input type="button"  value={"Hacer reporte"} onClick={() => {
                            let result = remote.dialog.showMessageBoxSync(null, {
                                title:"Hacer reporte",
                                message:"¿Seguro que quieres hacer el reporte de notas manualmente?",
                                buttons: [
                                    "No, Cancelar",
                                    "Si, Realizar reporte", 
                                ]
                            });

                            console.log(result);

                            if (result) {
                                MyServer.duesreport();
                            }
                        }}/>
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
                        <input type="text"  placeholder="Usuario" idp="user" defaultValue={"admin"}/>
                    </div> */}
                    <div className="conf-box">
                        <span>
                            Cambiar Contraseña
                        </span>
                        <input type="password"  placeholder="nueva contraseña" name="conf" idpx="pass" defaultValue={""}/>
                    </div>
                    <h4>
                        se esta trabajando por un sistema de usuarios con claves y accesos
                    </h4>
                </section>
                <section id="cursos">
                    <h2>
                        Cursos y secciones
                    </h2>
                    
                    <div className="conf-box">
                        <span>
                            Configurar materias:
                        </span>
                        <input type="button"  value={"Abrir"} onClick={() => {
                            openWin("/cursos.html", {

                            }, {
                                
                            })
                        }}/>
                    </div>
                </section>
                
            </div>
        )
    }
}


class App extends React.Component {

    state = {};



    render() {


        return(
            <div className="marco">
                <div className="header">
                    <div className="top1">
                        <ControlButton img="/img/gui/close.svg" click={() => {
                            close()
                        }}>
                            Cerrar
                        </ControlButton>
                        <ControlButton img="/img/gui/reload.svg" click={() => {
                            reload()
                        }}>
                            recargar
                        </ControlButton>
                        

                        <ControlButton img="/img/gui/save.svg" click={() => {
                            // let confs = document.getElementsByName("conf");

                            // let out = [];

                            // for (let i = 0; i < confs.length; i++) {
                            //     const element = confs[i];
                            //     out.push(element)
                            // };

                            // let data = {}

                            // out.forEach(x=> {
                            //     let a = (x.attributes.idpx||{}).value
                            //     data[a] = x.value; 
                            // })
                            
                            // console.log(data)

                            let data = parseForm("conf", "idpx");

                            console.log(data)

                            try {
                                MyServer.configs(data);
                                msg("los cambios han sido realizados exitosamente", "Guardado")
                                
                            } catch (error) {
                                msg("Hubo un error al guardar las configuraciones, verifique que este conectado a la red o que el servidor este funcionando", "Error")
                                
                            }

                        }}>
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