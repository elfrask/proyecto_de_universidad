
function gen_date(caption, id) {
    return {id: id, caption: caption}
}


let test_alumno = {
    name_student: "Pablo Gomez", 
    curso: "grado1", 
    ci:30999999, 
    year_income:2016,
    email:"pablo@example.com"
}
let test_dates = {
    dates:[
        gen_date("Nombre y Apellido del alumno", "name_student"),
        gen_date("Cédula de identidad", "ci"),
        gen_date("Sección o grupo", "curso"),
        gen_date("Año de ingreso", "year_income"),
        gen_date("Correo electrónico asociado", "email"),
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

        gen_date("Primer Nivel", "level1"),
        gen_date("Segundo Nivel", "level2"),
        gen_date("Tercer Nivel", "level3"),

        gen_date("Primer grado", "grado1"),
        gen_date("Segundo grado", "grado2"),
        gen_date("Tercer grado", "grado3"),
        gen_date("Cuarto grado", "grado4"),
        gen_date("Quinto grado", "grado5"),
        gen_date("Sexto grado", "grado6"),



        gen_date("Primer Año (A)", "Year1A"),
        gen_date("Primer Año (B)", "Year1B"),

        gen_date("Segundo Año (A)", "Year2A"),
        gen_date("Segundo Año (B)", "Year2B"),

        gen_date("Tercer Año (A)", "Year3A"),
        gen_date("Tercer Año (B)", "Year3B"),

        gen_date("Cuarto Año (A)", "Year4A"),
        gen_date("Cuarto Año (B)", "Year4B"),

        gen_date("Quinto Año (A)", "Year5A"),
        gen_date("Quinto Año (B)", "Year5B"),

        


    ],
    states:{
        curso: [
            gen_date("Primer Nivel", "level1"),
            gen_date("Segundo Nivel", "level2"),
            gen_date("Tercer Nivel", "level3"),
    
            gen_date("Primer grado", "grado1"),
            gen_date("Segundo grado", "grado2"),
            gen_date("Tercer grado", "grado3"),
            gen_date("Cuarto grado", "grado4"),
            gen_date("Quinto grado", "grado5"),
            gen_date("Sexto grado", "grado6"),
    
    
    
            gen_date("Primer Año (A)", "Year1A"),
            gen_date("Primer Año (B)", "Year1B"),
    
            gen_date("Segundo Año (A)", "Year2A"),
            gen_date("Segundo Año (B)", "Year2B"),
    
            gen_date("Tercer Año (A)", "Year3A"),
            gen_date("Tercer Año (B)", "Year3B"),
    
            gen_date("Cuarto Año (A)", "Year4A"),
            gen_date("Cuarto Año (B)", "Year4B"),
    
            gen_date("Quinto Año (A)", "Year5A"),
            gen_date("Quinto Año (B)", "Year5B"),
    
            
    
    
        ]
    }
}
