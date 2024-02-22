let {Schema, model, connect: dbconn} = require("mongoose");
require("dotenv").config();


dbconn(process.env.DBURI);

let ci = {
    unique: true,
    type: Number,
    required: true,
}

let Student = new Schema({
    ci,
    ci_parent:{
        type: Number
    },
    name_student: String,
    curso: String,
    email: String,
    direction: String,
    name_parent: String,
    tlf: String,
    year_income: Number,
    gender: Number

});

// el periodo representa el año escolar expresado como el año que dura mas tiempo en el periodo entre septiembre a agosto

let NOTAS = [Number, Number, Number, Number, Number, Number, Number, Number, Number, Number];

let Notes = new Schema({
    ci,
    lapse0: NOTAS,
    lapse1: NOTAS,
    lapse2: NOTAS,
    period: Number,
})

let Dues_Student = new Schema({
    ci,
    // dues es la deudas de los pagos de los periodos que duran 1 año equivalente a 12 meses
    dues: [Number, Number, Number, Number, Number, Number, Number, Number, Number, Number, Number, Number],
    dues_state: [Number, Number, Number, Number, Number, Number, Number, Number, Number, Number, Number, Number],
    period: Number,
})

let Cursos = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    caption: String,
    materias:[
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,
    ],
    index: Number
})


let Modelos = {
    Student: model("student", Student),
    Notes: model("notes", Notes),
    Dues_Student: model("dues_student", Dues_Student),
    Cursos: model("curso", Cursos),
}


function insertion() {
    let datas = require("./datas.json");

    datas.forEach(x=> {
        console.log("insertion: ", x);
        let periodo = 2024;

        let alumno = new Modelos.Student({
            ci: x.ci,
            ci_parent: x.ci_parent,
            email: x.email,
            gender: x.gender,
            curso: x.curso,
            tlf: x.tlf,
            direction: x.direction,
            name_parent: x.name_parent,
            name_student: x.name_student,
            year_income: x.year_income,
        });

        let notas = new Modelos.Notes({
            ci: x.ci,
            lapse0: x.notas,
            lapse1: x.notas,
            lapse2: x.notas,
            period: periodo
        });

        let dues = new Modelos.Dues_Student({
            ci: x.ci,
            period: periodo,
            dues: x.pays
        });

        alumno.save();
        notas.save();
        dues.save();

    })
}

// insertion();

module.exports = Modelos