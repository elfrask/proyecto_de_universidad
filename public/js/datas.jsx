
let configSession = {host:"", user:"", pass:""};

try {
    let preConfigSession = JSON.parse(sessionStorage.getItem("db"))
    if (preConfigSession !== null) configSession = preConfigSession
} catch (error) {
    console.log("not found configs session")
}

let MyServer = server(configSession.host, configSession.user, configSession.pass)

MyServer.connectSync();

function gen_date(caption, id) {
    return {id: id, caption: caption}
}


function parseForm(named, attrib_id) {
    let student_data = document.getElementsByName(named);

    let out = [];

    for (let i = 0; i < student_data.length; i++) {
        const element = student_data[i];
        out.push(element)
    };

    let data = {}

    out.forEach(x=> {
        let a = (x.attributes[attrib_id]||{}).value
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
    });

    return data
}


let test_alumno = {
    name_student: "Pablo Gomez", 
    curso: "grado1", 
    ci:30999999, 
    year_income:2016,
    email:"pablo@example.com"
}

let GRUPOS = []

let MyAccount = {
    user:"",
    permisos:{
        students: 0,
        dues: 0,
        notes: 0,
        configs: 0,
    },
    root: false
}

try {
    
    GRUPOS = MyServer.get_cursos().data.cursos.map(x=> {
        return gen_date(x.caption, x.id)
    });
    MyAccount = MyServer.me_account().data;
} catch (error) {
    
}







let test_dates = {
    dates:[
        gen_date("Nombre y Apellido del alumno", "name_student"),
        gen_date("Cédula de identidad", "ci"),
        gen_date("Sección o grupo", "curso"),
        gen_date("Año de ingreso", "year_income"),
        gen_date("Correo electrónico asociado", "email"),
        gen_date("Numero Telefónico", "tlf"),
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
    ],
    groups:[
        gen_date("Todo", "all"),

        // gen_date("Primer Nivel", "level1"),
        // gen_date("Segundo Nivel", "level2"),
        // gen_date("Tercer Nivel", "level3"),

        // gen_date("Primer grado", "grado1"),
        // gen_date("Segundo grado", "grado2"),
        // gen_date("Tercer grado", "grado3"),
        // gen_date("Cuarto grado", "grado4"),
        // gen_date("Quinto grado", "grado5"),
        // gen_date("Sexto grado", "grado6"),



        // gen_date("Primer Año (A)", "año1A"),
        // gen_date("Primer Año (B)", "año1B"),

        // gen_date("Segundo Año (A)", "año2A"),
        // gen_date("Segundo Año (B)", "año2B"),

        // gen_date("Tercer Año (A)", "año3A"),
        // gen_date("Tercer Año (B)", "año3B"),

        // gen_date("Cuarto Año (A)", "año4A"),
        // gen_date("Cuarto Año (B)", "año4B"),

        // gen_date("Quinto Año (A)", "año5A"),
        // gen_date("Quinto Año (B)", "año5B"),

        ...GRUPOS


    ],
    states:{
        curso: [
            // gen_date("Primer Nivel", "level1"),
            // gen_date("Segundo Nivel", "level2"),
            // gen_date("Tercer Nivel", "level3"),
    
            // gen_date("Primer grado", "grado1"),
            // gen_date("Segundo grado", "grado2"),
            // gen_date("Tercer grado", "grado3"),
            // gen_date("Cuarto grado", "grado4"),
            // gen_date("Quinto grado", "grado5"),
            // gen_date("Sexto grado", "grado6"),
    
    
    
            // gen_date("Primer Año (A)", "año1A"),
            // gen_date("Primer Año (B)", "año1B"),
    
            // gen_date("Segundo Año (A)", "año2A"),
            // gen_date("Segundo Año (B)", "año2B"),
    
            // gen_date("Tercer Año (A)", "año3A"),
            // gen_date("Tercer Año (B)", "año3B"),
    
            // gen_date("Cuarto Año (A)", "año4A"),
            // gen_date("Cuarto Año (B)", "año4B"),
    
            // gen_date("Quinto Año (A)", "año5A"),
            // gen_date("Quinto Año (B)", "año5B"),
    
            
            ...GRUPOS
    
        ]
    }
}

test_dates.items = MyServer.get_list(0, 10000).data;
// let items = MyServer.get_list(0, 10);

// console.log(items)