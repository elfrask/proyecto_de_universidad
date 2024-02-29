// let remote = require("@electron/remote")

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


let DATAS = MyServer.get_student(subapi.id).data;
let CURSOS = MyServer.get_cursos().data;

let materias = [];

([...CURSOS.cursos]).forEach(x => {
    if (DATAS.student.curso === x.id) {
        materias = x.materias
    }
});

let configs = MyServer.configs().data;

console.log(DATAS, materias);


class App extends React.Component {

    state = {
        lapse: 0
    }


    render() {

        let StudentDisabled = MyAccount.permisos.students === 0;

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

                            out.forEach(x => {
                                let a = (x.attributes.idpx || {}).value
                                let value = x.value;
                                // console.log(x.attributes.type_value)
                                switch ((x.attributes.type_value || {}).value) {
                                    case "number":
                                        value = Number(value);
                                        break;

                                    case "string":
                                        value = value + "";
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
                                    ...range(0, 12).map(x => {

                                        return data["dues_" + x];
                                    })
                                ],
                                dues_state: [
                                    ...range(0, 12).map(x => {

                                        return data["dues_state_" + x];
                                    })
                                ],
                                notes: {
                                    lapse0: [
                                        ...range(0, 10).map(x => {

                                            return data["lapse_0_" + x];
                                        })
                                    ],
                                    lapse1: [
                                        ...range(0, 10).map(x => {

                                            return data["lapse_1_" + x];
                                        })
                                    ],
                                    lapse2: [
                                        ...range(0, 10).map(x => {

                                            return data["lapse_2_" + x];
                                        })
                                    ],

                                }
                            }

                            console.log(data_req);
                            // return


                            try {
                                MyServer.edit_student(subapi.id, data_req.student, data_req.notes, data_req.dues, data_req.dues_state);
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
                        {
                            eif(
                                MyAccount.permisos.students === 1,
                                <ControlButton img="/img/gui/delete.svg" click={() => {

                                    let result = remote.dialog.showMessageBoxSync(null, {
                                        title: "Eliminar",
                                        message: "¿Seguro que quieres eliminar a este estudiante?",
                                        buttons: [
                                            "No, Cancelar",
                                            "Si, Eliminar",
                                        ]
                                    });

                                    console.log(result);

                                    if (result) {
                                        MyServer.delete_student(subapi.id)
                                        subapi.parent.location.reload();
                                        close()
                                    }
                                }}>
                                    Eliminar estudiante
                                </ControlButton>,
                                []
                            )
                        }


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

                                        disabled={StudentDisabled}

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
                                        disabled={StudentDisabled}
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
                                        disabled={StudentDisabled}
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
                                        disabled={StudentDisabled}
                                    >
                                        {
                                            ["No definido", "Hombre", "Mujer"].map((x, i) => {

                                                return (
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
                                        defaultValue={DATAS.student.curso || "none"}
                                        name="student"
                                        idpx="curso"
                                        disabled={StudentDisabled}
                                    >
                                        <option value="none">
                                            No definido
                                        </option>
                                        {
                                            test_dates.groups.map((x, i) => {
                                                if (x.id === "all") {
                                                    return []
                                                }
                                                return (
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
                                        disabled={StudentDisabled}
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
                                        disabled={StudentDisabled}
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
                                        disabled={StudentDisabled}
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
                                        disabled={StudentDisabled}
                                    />
                                }
                            />

                        </FormularioTablas>


                        {/* PAGO DE CUOTAS  */}

                        {
                            eif(
                                [1, 2].includes(MyAccount.permisos.dues),
                                [

                                    <FormularioTablas
                                        title="Estado de cuotas"
                                    >

                                        {
                                            ["Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"]
                                                .map((x, i) => {
                                                    return (

                                                        <FieldTable
                                                            title={x}
                                                            field={
                                                                [

                                                                    <input
                                                                        defaultValue={DATAS.dues.dues[i]}
                                                                        name="student"
                                                                        idpx={"dues_" + i}
                                                                        type_value="number"
                                                                        type="number"
                                                                        disabled={
                                                                            MyAccount.permisos.dues !== 2
                                                                        }
                                                                        min={0}
                                                                        max={configs.dues_value}

                                                                    />,

                                                                    <select
                                                                        defaultValue={DATAS.dues.dues_state[i]}
                                                                        name="student"
                                                                        idpx={"dues_state_" + i}
                                                                        type_value="number"
                                                                        disabled={
                                                                            MyAccount.permisos.dues !== 2
                                                                        }
                                                                    >
                                                                        {
                                                                            ["No pagado", "Pagado"].map((y, ii) => {

                                                                                return (
                                                                                    <option className="optionbg" value={ii}>
                                                                                        {y}
                                                                                    </option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>,


                                                                ]

                                                            }
                                                        />
                                                    )
                                                })
                                        }

                                    </FormularioTablas>
                                ]
                            )
                        }

                        {/* NOTAS DEL ESTUDIANTE Y RASGO ACADÉMICO */}

                        {
                            eif(
                                [1, 2].includes(MyAccount.permisos.notes),
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
                                                    ["Primer Lapso", "Segundo Lapso", "Tercer Lapso"].map((x, i) => {

                                                        return (
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
                                        range(0, 3).map(lapse => {


                                            return (
                                                <div
                                                    style={{
                                                        display: (
                                                            (this.state.lapse === lapse) ? "block" : "none"
                                                        )
                                                    }}
                                                >

                                                    {
                                                        materias.map((obj, x) => {

                                                            return (
                                                                <FieldTable
                                                                    title={obj}
                                                                    field={
                                                                        <input
                                                                            defaultValue={DATAS.notes["lapse" + lapse][x]}
                                                                            name="student"
                                                                            idpx={"lapse_" + lapse + "_" + x}
                                                                            type_value="number"
                                                                            type="number"
                                                                            max={20}
                                                                            min={0}
                                                                            placeholder="Nota correspondiente"
                                                                            disabled={
                                                                                MyAccount.permisos.notes !== 2
                                                                            }
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
                                ,
                                []
                            )
                        }


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