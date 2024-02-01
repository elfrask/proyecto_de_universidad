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


class FormularioTablas extends React.Component {

    props = {
        children: [],
        title: ""
    }
    state = {

    };
    render() {

        return (
            <div className="form-table">
                <div className="_head">
                    {this.props.title}
                </div>
                <div className="_body">
                    {this.props.children}
                </div>
                <div className="_floor">

                </div>
            </div>
        )
    }
}

class FieldTable extends React.Component {
    props = {
        field: [],
        title: ""
    }

    render() {

        return(
            <div className="field">
                <div className="_title">
                    {this.props.title}
                </div>
                <div className="_field">
                    {this.props.field}
                </div>
            </div>
        )
    }
}


let DATAS = MyServer.get_student(subapi.id).data;


console.log(DATAS);


class App extends React.Component {

    state = {
        lapse: 0
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
                            let student_data = document.getElementsByName("student");

                            let out = [];

                            for (let i = 0; i < student_data.length; i++) {
                                const element = student_data[i];
                                out.push(element)
                            };

                            let data = {}

                            out.forEach(x=> {
                                let a = (x.attributes.idpx||{}).value
                                let value = x.value;
                                // console.log(x.attributes.type_value)
                                switch ((x.attributes.type_value||{}).value) {
                                    case "number":
                                        value = Number(value);
                                        break;
                                
                                    case "string":
                                        value = value+"";
                                        break;
                                
                                    default:
                                        value = value;
                                        break;
                                }
                                data[a] = value; 
                            })
                            
                            // console.log(data)


                            let data_req = {
                                student: {
                                    name_student: data.name_student,
                                    email: data.email,
                                    gender: data.gender,
                                    curso: data.curso,
                                    direction: data.direction,
                                    year_income: data.year_income,
                                    tlf: data.tlf,
                                    name_parent: data.name_parent

                                },
                                dues: [
                                    ...range(0, 12).map(x=>{

                                        return data["dues_" + x];
                                    })
                                ],
                                notes: {
                                    lapse0:[
                                        ...range(0, 10).map(x=>{

                                            return data["lapse_0_" + x];
                                        })
                                    ],
                                    lapse1:[
                                        ...range(0, 10).map(x=>{

                                            return data["lapse_1_" + x];
                                        })
                                    ],
                                    lapse2:[
                                        ...range(0, 10).map(x=>{

                                            return data["lapse_2_" + x];
                                        })
                                    ],
                                    
                                }
                            }

                            console.log(data_req);


                            try {
                                MyServer.edit_student(subapi.id, data_req.student, data_req.notes, data_req.dues);
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
                        <ControlButton img="/img/gui/delete.svg">
                            Eliminar estudiante
                        </ControlButton>


                    </div>


                </div>
                <div className="body one-top">

                    <div className="responsive-tables" style={{
                        paddingTop: "20px",
                        paddingBottom: "20px",
                    }}>

                        {/* INFORMACIÓN DEL ALUMNO */}

                        <FormularioTablas
                            title="Información del alumno"
                        >
                            <FieldTable 
                                title="Cedula"
                                field={
                                    <input 
                                        type="text" 
                                        // idpx="name_student" 
                                        // name="student" 
                                        placeholder="" 
                                        defaultValue={DATAS.student.ci}
                                        
                                        disabled
                                    />
                                }
                            />
                            <FieldTable 
                                title="Nombre y apellido"
                                field={
                                    <input 
                                        type="text" 
                                        idpx="name_student" 
                                        name="student" 
                                        placeholder="Nombre y apellido" 
                                        defaultValue={DATAS.student.name_student}
                                    />
                                }
                            />
                            <FieldTable 
                                title="Dirección"
                                field={
                                    <input 
                                        type="text" 
                                        idpx="direction" 
                                        name="student" 
                                        placeholder="Dirección" 
                                        defaultValue={DATAS.student.direction}
                                    />
                                }
                            />
                            <FieldTable 
                                title="Año de ingreso"
                                field={
                                    <input 
                                        type="number" 
                                        idpx="year_income" 
                                        name="student" 
                                        placeholder="Año de ingreso" 
                                        type_value="number"
                                        defaultValue={DATAS.student.year_income}
                                    />
                                }
                            />
                            <FieldTable 
                                title="Genero"
                                field={
                                    <select
                                        defaultValue={DATAS.student.gender}
                                        name="student"
                                        idpx="gender"
                                        type_value="number"
                                    >
                                        {
                                            ["No definido", "Hombre", "Mujer"].map((x, i)=>{

                                                return(
                                                    <option value={i}>
                                                        {x}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                }
                            />
                            <FieldTable 
                                title="Curso/Grupo/Sección"
                                field={
                                    <select
                                        defaultValue={DATAS.student.curso||"none"}
                                        name="student"
                                        idpx="curso"
                                    >
                                        <option value="none">
                                            No definido
                                        </option>
                                        {
                                            test_dates.groups.map((x, i)=>{
                                                if (x.id === "all") {
                                                    return []
                                                }
                                                return(
                                                    <option value={x.id}>
                                                        {x.caption}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                }
                            />
                            
                        </FormularioTablas>
                        

                        {/* INFORMACIÓN DEL REPRESENTANTE */}
                        
                        <FormularioTablas
                            title="Información del representante"
                        >
                            <FieldTable 
                                title="Cédula"
                                field={
                                    <input 
                                        type="text" 
                                        idpx="ci_parent" 
                                        name="student" 
                                        placeholder="Cédula del representante"
                                        defaultValue={DATAS.student.ci_parent}
                                        type_value="number"
                                    />
                                }
                            />
                            <FieldTable 
                                title="Nombre y apellido"
                                field={
                                    <input 
                                        type="text" 
                                        idpx="name_parent" 
                                        name="student" 
                                        placeholder="Nombre y apellido" 
                                        defaultValue={DATAS.student.name_parent}
                                    />
                                }
                            />
                            <FieldTable 
                                title="Correo electrónico"
                                field={
                                    <input 
                                        type="text" 
                                        idpx="email" 
                                        name="student" 
                                        placeholder="Correo electrónico" 
                                        defaultValue={DATAS.student.email}
                                    />
                                }
                            />
                            <FieldTable 
                                title="Numero de teléfono"
                                field={
                                    <input 
                                        type="text" 
                                        idpx="tlf" 
                                        name="student" 
                                        placeholder="Numero telefónico" 
                                        defaultValue={DATAS.student.tlf}
                                    />
                                }
                            />
                                
                        </FormularioTablas>

                        
                        {/* PAGO DE CUOTAS  */}


                        <FormularioTablas
                            title="Estado de cuotas"
                        >

                            {
                                ["Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"]
                                .map((x, i)=>{
                                    return(

                                        <FieldTable 
                                            title={x}
                                            field={
                                                // <select
                                                //     defaultValue={DATAS.dues.dues[i]}
                                                //     name="student"
                                                //     idpx={"dues_" + i}
                                                //     type_value="number"
                                                // >
                                                //     {
                                                //         ["No pagado", "Parcialmente pagado", "Pagado"].map((y, ii)=>{
    
                                                //             return(
                                                //                 <option value={ii}>
                                                //                     {y}
                                                //                 </option>
                                                //             )
                                                //         })
                                                //     }
                                                // </select>

                                                <input 
                                                    defaultValue={DATAS.dues.dues[i]}
                                                    name="student"
                                                    idpx={"dues_" + i}
                                                    type_value="number"
                                                    type="number"
                                                
                                                />
                                            }
                                        />
                                    )
                                })
                            }
                            
                        </FormularioTablas>
                       
                        
                        {/* NOTAS DEL ESTUDIANTE Y RASGO ACADÉMICO */}

                        <FormularioTablas
                            title="Notas"
                        >

                            {/* CAMPO A RENDERIZAR */}
                            <FieldTable 
                                title="Lapso:"
                                field={
                                    <select
                                        defaultValue={this.state.lapse}
                                        type_value="number"
                                        onChange={(e) => {
                                            let target = e.target;
                                            let value = Number(target.value);

                                            console.log("change: ", value)
                                            this.setState({
                                                lapse: value
                                            })
                                        }}
                                    >
                                        {
                                            ["Primer Lapso", "Segundo Lapso", "Tercer Lapso"].map((x, i)=>{

                                                return(
                                                    <option value={i}>
                                                        {x}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                }
                            />

                            {/* NOTAS DEL LAPSO  */}

                            {
                                range(0, 3).map(lapse=>{

                                    return(
                                        <div
                                            style={{
                                                display:(
                                                    (this.state.lapse === lapse)?"block":"none"
                                                )
                                            }}
                                        >

                                            {
                                                range(0, 10).map(x=>{

                                                    return(
                                                        <FieldTable 
                                                            title={"Materia: " + (x + 1)}
                                                            field={
                                                                <input 
                                                                    defaultValue={DATAS.notes["lapse" + lapse][x]}
                                                                    name="student"
                                                                    idpx={"lapse_" + lapse + "_" + x}
                                                                    type_value="number"
                                                                    type="number"
                                                                    placeholder="Nota correspondiente"
                                                                
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