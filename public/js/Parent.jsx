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


let DATAS = MyServer.get_parent(subapi.id).data;



let configs = MyServer.configs().data;

console.log(DATAS);


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
                                parent: {
                                    name_parent: data.name_parent,
                                    email: data.email,
                                    direction: data.direction,
                                    tlf: data.tlf,
                                    // name_student: data.name_student,
                                    // gender: data.gender,
                                    // curso: data.curso,
                                    // year_income: data.year_income,

                                }
                            }

                            console.log(data_req);
                            // return


                            try {
                                MyServer.edit_parent(subapi.id, data_req.parent);
                                msg("los cambios han sido realizados exitosamente", "Guardado")

                            } catch (error) {
                                msg("Hubo un error al guardar los datos del representante, verifique que este conectado a la red o que el servidor este funcionando", "Error")

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
                                <ControlButton img="/img/gui/delete.svg" className="delete" click={() => {

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
                                        MyServer.delete_parent(subapi.id)
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
                                        defaultValue={DATAS.ci}
                                        type_value="number"
                                        disabled
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
                                        placeholder="Nombre y apellido del representante"
                                        defaultValue={DATAS.name_parent}
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
                                        defaultValue={DATAS.email}
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
                                        defaultValue={DATAS.tlf}
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
                                        defaultValue={DATAS.direction}
                                        disabled={StudentDisabled}
                                    />
                                }
                            />

                        </FormularioTablas>


                        <FormularioTablas
                            title="Estudiantes asociados"
                        >
                            {
                                DATAS.students.map((x, i)=> {
                                    return(
                                        <FieldTable
                                            title={x}
                                            field={
                                                <input
                                                    type="text"
                                                    defaultValue={MyServer.get_student(x).data.student.name_student}
                                                    type_value="number"
                                                    disabled
                                                />
                                            }
                                        />
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