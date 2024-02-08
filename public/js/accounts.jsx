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



function preventDefaultClose() {
    let result = remote.dialog.showMessageBoxSync({
        title: "Alerta de perdida de datos",
        message: "Los datos no se han guardado, ¿deseas salir?",
        buttons: ["Salir", "No Salir"]
    })

    console.log(result)

    return result
}




let DATAS = MyServer.get_accounts().data;


console.log(DATAS);

let permisos = ["Ninguno", "Solo lectura", "Lectura y escritura"];

class App extends React.Component {

    state = {
        user: "none"
    }


    render() {


        return (
            <div className="marco">
                <div className="header one-top">
                    <div className="top1">
                        <ControlButton img="/img/gui/close.svg" click={() => {
                            close()
                        }}>
                            Cerrar
                        </ControlButton>
                        <ControlButton img="/img/gui/save.svg" click={() => {
                            
                            // console.log(data)


                            let data_req = {
                                accounts: [
                                    ...DATAS
                                ]
                            }

                            console.log(data_req);

                            
                            try {
                                MyServer.edit_accounts(data_req.accounts);
                                msg("los cambios han sido realizados exitosamente", "Guardado")
                                
                            } catch (error) {
                                msg("Hubo un error al guardar los datos de los usuarios, verifique que este conectado a la red o que el servidor este funcionando", "Error")
                                
                            }
                        }}>
                            Guardar
                        </ControlButton>
                        <ControlButton img="/img/gui/reload.svg" click={() => {
                            reload()
                        }}>
                            recargar
                        </ControlButton>
                        <ControlButton img="/img/gui/add.svg" click={() => {
                            openWin("/add_account.html", {
                                width:"400",
                                height:"300",
                                resizable:"no",
                                menubar:"no"
                            }, {
                                done: (win) => {

                                    
                                    win.close();
                                    reload();
                                }
                            })
                        }}>
                            Agregar Usuario
                        </ControlButton>
                        <ControlButton img="/img/gui/delete.svg" click={() => {
                            if (this.state.user === "none") {
                                msg("Debe de seleccionar un curso primero", "Curso no seleccionado");
                                return false
                            }
                            let result = remote.dialog.showMessageBoxSync(null, {
                                title:"Eliminar",
                                message:"¿Seguro que quieres eliminar a este usuario?",
                                buttons: [
                                    "No, Cancelar",
                                    "Si, Eliminar", 
                                ]
                            });

                            console.log(result);

                            if (result) {
                                console.log("eliminado")
                                let data_req = {
                                    accounts: [
                                        ...DATAS
                                    ]
                                };

                                MyServer.edit_accounts(data_req.accounts);
                                MyServer.delete_account(this.state.user);
                                reload();


                                
                            }
                        }}>
                            Eliminar curso
                        </ControlButton>


                    </div>


                </div>
                <div className="body one-top">

                    <div className="responsive-tables" style={{
                        paddingTop: "20px",
                        paddingBottom: "20px",
                    }}>

                        
                        {/* NOTAS DEL ESTUDIANTE Y RASGO ACADÉMICO */}

                        <FormularioTablas
                            title="Cuentas"
                        >

                            {/* CAMPO A RENDERIZAR */}
                            <FieldTable 
                                title="Cuenta:"
                                field={
                                    <select
                                        defaultValue={this.state.curso}
                                        // type_value="number"
                                        onChange={(e) => {
                                            let target = e.target;
                                            let value = (target.value);

                                            console.log("change: ", value)
                                            this.setState({
                                                user: "none"
                                            }, () => {
                                                this.setState({
                                                    user: value
                                                })
                                            })
                                        }}
                                    >
                                        <option value="none">
                                            No seleccionado...
                                        </option>
                                        {
                                            DATAS.map((x, i)=>{

                                                return(
                                                    <option value={x.user}>
                                                        {x.user}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                }
                            />

                            {/* NOTAS DEL LAPSO  */}

                            {
                                DATAS.map((user, index)=>{
                                    console.log("hiii", this.state, user)
                                    return(
                                        <div
                                            style={{
                                                display:(
                                                    (this.state.user === user.user)?"block":"none"
                                                )
                                            }}
                                        >
                                            
                                            <FieldTable 
                                                title={"Contraseña:"}
                                                field={
                                                    <input 
                                                        defaultValue={user.pass}
                                                        type="password"
                                                        placeholder="Contraseña"
                                                        onChange={(e) => {
                                                            let value = e.target.value;
                                                            user.pass = value;
                                                        }}
                                                    
                                                    />
                                                }
                                            />
                                            <FieldTable 
                                                title={"Notas, puede:"}
                                                field={
                                                    
                                                    <select
                                                        defaultValue={user.permisos.notes}
                                                        onChange={(e) => {
                                                            let value = e.target.value;
                                                            user.permisos.notes = Number(value)
                                                        }}
                                                    >
                                                        {
                                                            permisos.map((y, ii)=>{
        
                                                                return(
                                                                    <option value={ii}>
                                                                        {y}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    
                                                }
                                            />
                                            <FieldTable 
                                                title={"Cuotas, puede:"}
                                                field={
                                                    
                                                    <select
                                                        defaultValue={user.permisos.dues}
                                                        onChange={(e) => {
                                                            let value = e.target.value;
                                                            user.permisos.dues = Number(value)
                                                        }}
                                                    >
                                                        {
                                                            permisos.map((y, ii)=>{
        
                                                                return(
                                                                    <option value={ii}>
                                                                        {y}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    
                                                }
                                            />
                                            <FieldTable 
                                                title={"puede configurar:"}
                                                field={
                                                    
                                                    <select
                                                        defaultValue={user.permisos.dues}
                                                        onChange={(e) => {
                                                            let value = e.target.value;
                                                            user.permisos.dues = Number(value)
                                                        }}
                                                    >
                                                        {
                                                            ["No", "Si"].map((y, ii)=>{
        
                                                                return(
                                                                    <option value={ii}>
                                                                        {y}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    
                                                }
                                            />
                                            


                                        </div>
                                    )
                                })
                            }

                            

                        </FormularioTablas>

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