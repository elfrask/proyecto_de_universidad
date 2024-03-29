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




let DATAS = MyServer.get_cursos().data;


console.log(DATAS);


class App extends React.Component {

    state = {
        curso: "none"
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
                                cursos: [
                                    ...DATAS.cursos
                                ]
                            }

                            console.log(data_req.cursos);

                            
                            try {
                                MyServer.edit_cursos(data_req.cursos);
                                msg("los cambios han sido realizados exitosamente", "Guardado")
                                
                            } catch (error) {
                                msg("Hubo un error al guardar los datos del estudiante, verifique que este conectado a la red o que el servidor este funcionando", "Error")
                                
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
                            openWin("/add_curso.html", {
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
                            agregar curso
                        </ControlButton>
                        <ControlButton img="/img/gui/delete.svg" className="delete" click={() => {
                            if (this.state.curso === "none") {
                                msg("Debe de seleccionar un curso primero", "Curso no seleccionado");
                                return false
                            }
                            let result = remote.dialog.showMessageBoxSync(null, {
                                title:"Eliminar",
                                message:"¿Seguro que quieres eliminar a este curso?",
                                buttons: [
                                    "No, Cancelar",
                                    "Si, Eliminar", 
                                ]
                            });

                            console.log(result);

                            if (result) {
                                console.log("eliminado")
                                let data_req = {
                                    cursos: [
                                        ...DATAS.cursos
                                    ]
                                };

                                MyServer.edit_curso(data_req.cursos);
                                MyServer.delete_curso(this.state.curso);
                                reload();


                                // MyServer.delete_student(subapi.id)
                                // subapi.parent.location.reload();
                                // close()
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
                            title="Materias"
                        >

                            {/* CAMPO A RENDERIZAR */}
                            <FieldTable 
                                title="Curso:"
                                field={
                                    <select
                                        defaultValue={this.state.curso}
                                        type_value="number"
                                        onChange={(e) => {
                                            let target = e.target;
                                            let value = (target.value);

                                            console.log("change: ", value)
                                            this.setState({
                                                curso: "none"
                                            }, () => {
                                                this.setState({
                                                    curso: value
                                                })
                                            })
                                        }}
                                    >
                                        <option value="none">
                                            No seleccionado...
                                        </option>
                                        {
                                            DATAS.cursos.map((x, i)=>{

                                                return(
                                                    <option value={x.id}>
                                                        ({i}) {x.caption}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                }
                            />

                            {/* NOTAS DEL LAPSO  */}

                            {
                                DATAS.cursos.map((curso, index)=>{
                                    console.log("hiii", this.state, curso)
                                    return(
                                        <div
                                            style={{
                                                display:(
                                                    (this.state.curso === curso.id)?"block":"none"
                                                )
                                            }}
                                        >
                                            <FieldTable 
                                                title={"Mover hacia:"}
                                                field={
                                                    [
                                                        <input 
                                                            defaultValue={"Arriba"}
                                                            type="button"
                                                            onClick={() => {
                                                                let from = index, to = index -1;

                                                                let from_data = DATAS.cursos[from]
                                                                let to_data = DATAS.cursos[to]

                                                                if (to_data !== undefined) {
                                                                    DATAS.cursos[from] = to_data;
                                                                    DATAS.cursos[to] = from_data;
                                                                    let cur = this.state.curso;
                                                                    this.setState({
                                                                        curso: "none"
                                                                    }, () => {

                                                                        this.setState({
                                                                            curso: cur
                                                                        })
                                                                    });

                                                                }
                                                            }}
                                                        
                                                        />,
                                                        <input 
                                                            defaultValue={"Abajo"}
                                                            type="button"
                                                            onClick={() => {
                                                                let from = index, to = index + 1;

                                                                let from_data = DATAS.cursos[from]
                                                                let to_data = DATAS.cursos[to]

                                                                if (to_data !== undefined) {
                                                                    DATAS.cursos[from] = to_data;
                                                                    DATAS.cursos[to] = from_data;
                                                                    let cur = this.state.curso;
                                                                    this.setState({
                                                                        curso: "none"
                                                                    }, () => {

                                                                        this.setState({
                                                                            curso: cur
    
                                                                        })
                                                                    });

                                                                }
                                                            }}
                                                        
                                                        />,

                                                    ]
                                                }
                                            />

                                            {
                                                curso.materias.map((x, i)=>{

                                                    return(
                                                        <FieldTable 
                                                            title={"Materia: " + (i + 1)}
                                                            field={
                                                                <input 
                                                                    defaultValue={x}
                                                                    name="student"
                                                                    idpx={"curso_" +curso.id + "_" + x}
                                                                    key={"curso_" +curso.id + "_" + x}
                                                                    // type_value="number"
                                                                    type="text"
                                                                    placeholder="Nombre de la materia"

                                                                    onChange={(e) => {
                                                                        let value = e.target.value;
                                                                        curso.materias[i] = value;
                                                                    }}
                                                                
                                                                />
                                                            }
                                                        />
                                                    )

                                                })
                                            }

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