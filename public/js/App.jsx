let remote = require("@electron/remote")

function gen_date(caption, id) {
    return {id: id, caption: caption}
}

let test_alumno = {name_student: "Pablo Gomez", year_old: 228391, curso: "informática"}
let test_dates = {
    dates:[
        gen_date("Nombre del alumno", "name_student"),
        gen_date("edad del alumno", "year_old"),
        gen_date("Sección o grupo", "curso"),
        gen_date("Sección o grupo", "curso"),
        gen_date("Sección o grupo", "curso"),
        gen_date("Sección o grupo", "curso"),
        gen_date("Sección o grupo", "curso"),
        gen_date("Sección o grupo", "curso"),
        gen_date("Sección o grupo", "curso"),
        gen_date("Sección o grupo", "curso"),
        gen_date("Sección o grupo", "curso"),
        gen_date("Sección o grupo", "curso"),
        gen_date("Sección o grupo", "curso"),
        gen_date("Sección o grupo", "curso"),
        gen_date("Sección o grupo", "curso"),
    ],
    items:[
        test_alumno,
        test_alumno,
        test_alumno,
        test_alumno,
        test_alumno,
        test_alumno,
        test_alumno,
        test_alumno,
        test_alumno,
        test_alumno,
        test_alumno,
        test_alumno,
        test_alumno,
        test_alumno,
        test_alumno,
        test_alumno,
        test_alumno,
        test_alumno,
        test_alumno,
    ]
}


class App extends React.Component {


    render() {


        return(
            <div className="marco">
                <div className="header">

                </div>
                <div className="body">
                    <Table 
                        id="principal"
                    dates = {test_dates.dates}

                    items = {test_dates.items}

                    />
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