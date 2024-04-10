let express = require("express");
let app = express.Router();
// let mysql = require("mysql");
let datas = require("./datas.json");
let mail = require("nodemailer");
let bp = require("body-parser");
let cors = require("cors");
let db = require("./db.js");
let fs = require("fs");
let cron = require("node-cron");
let handlebars = require("handlebars");
let lodash = require("lodash");

app.use(bp.json());
app.use(cors())



require("dotenv").config();


// mysql.createConnection({
//     host:"localhost",
//     password:"carlos12",
//     user:"root"
// })


function load(obj, file_json) {
    function save_configs(data) {
        fs.writeFileSync(file_json, JSON.stringify(data||obj))
    }
    
    if (fs.existsSync(file_json)) {
        let temp = JSON.parse(
            fs.readFileSync(file_json, "utf-8")
        );

        Object.assign(obj, temp);
    } else {
        save_configs();
    }

    obj.save = (d) => save_configs(d);
    
    return obj;
}


const configs = {
    day: 1,
    loaded: true,
    email: "",
    token_mail: "",
    pass_mail: "",
    smtp:"",
    dues_value: 100,
    // smtp:"smtp.mail.yahoo.com:465",
}



const admin_user = {
    user:"admin",
    pass:"admin"
}

const ModelAccount = (user="", pass="") => ({
    user,
    pass,
    permisos:{
        students: 0,
        dues: 0,
        notes: 0,
        configs: 0,
    },
    root: false
})

const accounts = [];

if (!fs.existsSync("conf")) {
    fs.mkdirSync("conf")
}

load(accounts, "conf/accounts.json")
load(configs, "conf/configs_server.json");
load(admin_user, "conf/root.json")

admin_user.root = true;
admin_user.permisos = {
    students: 1,
    dues: 2,
    notes: 2,
    configs: 1,
}

// accounts.push(admin_user)




let sendmail = (subject, to, body) => {
    let mailservice = mail.createTransport({
        // host:configs.smtp.split(":")[0],
        service: configs.smtp,
        // port:parseInt(configs.smtp.split(":")[1]),
        // url:configs.smtp,
        auth:{
            user: configs.email,
            accessToken: configs.token_mail,
            pass: configs.pass_mail
            
        },
        
    });
    let email ={
        from:configs.email,
        to:to,
        subject:subject,
        text:body
    };
    mailservice.sendMail(email, (err, res) => {
        if (err) {
            console.log("efe")
            console.log(err)
        }
    })
}

let sendmailHTML = (subject, to, template, datas) => {
    let mailservice = mail.createTransport({
        // host:configs.smtp.split(":")[0],
        service: configs.smtp,
        // port:parseInt(configs.smtp.split(":")[1]),
        // url:configs.smtp,
        auth:{
            user: configs.email,
            accessToken: configs.token_mail,
            pass: configs.pass_mail
            
        },
        
    });
    mailservice.sendMail({
        from:configs.email,
        to:to,
        subject:subject,
        html: handlebars.compile(template+"")(datas) 
        
    }, (err, res) => {
        if (err) {
            console.log("efe")
            console.log(err)
        }
    })
}


async function authFunction(auth, callback, errorcall) {
    
    let user = {};
    [...accounts, admin_user].forEach(x=> {
        if (auth.user === x.user) user = x;
    });

    if (user.user) {

        if (user.pass === auth.pass) {
            return await callback(user)
        };

        return await errorcall(2)
        
    }
    return await errorcall(1)

}



async function dues_report() {
    
    let Students = await db.Student.find();

    Students.forEach( async (student)=>{
        
        let dues = await db.Dues_Student.findOne({ci: student.ci});

        let Parent = await db.Parent.findOne({ci: student.ci_parent});

        let deuda = dues.dues;
        let deuda_estado = dues.dues_state;

        let context = {
            name_student: student.name_student,
            ci: student.ci,
            periodo: "2023 - 2024"
        }

        let debe = false;

        for (let i = 0; i < deuda.length; i++) {
            const _deuda = deuda[i];
            const _estado = deuda_estado[i];
            
            let due = "", state = "";

            if (_estado === 1) {
                due = "0$";
                state = "Pagado";
            } else {
                due = (configs.dues_value - _deuda) + "$";
                state = "No pagado";
                debe = true;
            };

            context["dues" + i] = due;
            context["dues_state" + i] = state;
        }

        if (debe) {
            
            if (student.ci === 31496091) {
                sendmailHTML("Reporte de cuotas mensual", Parent.email, fs.readFileSync("template_dues.html", "utf-8"), context)
                console.log("debe:", student, context);

                
            }
            
        }
    })
    

}

// dues_report()

// console.log(
//     handlebars.compile(fs.readFileSync("template_dues.html", "utf-8"))({
//         dues0:"200",
//         dues_state0:"pagado"
//     })
// )

// 713755735951-3v4l81g9k3802d5lkaocl33lub3rfpat.apps.googleusercontent.com
// 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
// hsuq jucg asys nlwh

cron.schedule("0 0 12 * * *", () => {
    
    let DD = new Date()
    DD.setTime(Date.now())
    
    if ((configs.day+"") === (DD.getDate()+"")) {
        
    }
    
});

function copy(c) {
    return JSON.parse(JSON.stringify(c))
}

app.post("/get_list", async (req, res) => {

    let {start, long, auth} = req.body;
    let error = 0;

    let results = await authFunction(auth, async () => {

        let datas = await db.Student.find();

        let datas2 = await Promise.all(datas.map(async (x) => {
            // let out = copy(x)
            let dues = await db.Dues_Student.findOne({ci: x.ci})
            // let dues = await db.Dues_Student.find({ci: x.ci})
            // console.log(dues)
            x.dues = dues.dues_state;
            return x
        }))

        console.log(datas2)

        return datas;
    },  (async (e) => {
        error = e;
        return [];
    }))

    res.json(
        {
            data: results.slice(start, start + long),
            error
        }
    )
});

app.post("/parent/get_list", async (req, res) => {

    let {start, long, auth} = req.body;
    let error = 0;

    let results = await authFunction(auth, async () => {

        let datas = await db.Parent.find();

        return datas;
    },  (async (e) => {
        error = e;
        return [];
    }))

    res.json(
        {
            data: results.slice(start, start + long),
            error
        }
    )
});



app.post("/student/new", async (req, res) => {
    let {auth, ci} = req.body;
    let error = 0;

    let data = await authFunction(auth, async () => {
        let notes = [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0]
        
        let exist = await db.Student.find({ci});

        if (exist.length > 0) {
            error = 10;
            return {}
        }
        
        let Student = new db.Student({
            ci,
            ci_parent:0,
            name_student: "",
            curso:"none",
            // direction:"",
            // email:"",
            gender:0,
            // name_parent:"",
            // tlf:"",
            year_income:0
        })
        
        Student.save();
        

        let Notes = new db.Notes({
            ci,
            lapse0: notes,
            lapse1: notes,
            lapse2: notes,
            period: 2023,
        })

        Notes.save();

        let Dues = new db.Dues_Student({
            ci,
            dues:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            period: 2023,
        });

        Dues.save();

        return {};
    },  (async (e) => {
        error = e;
        return {};
    }))

    res.json({
        data,
        error
    })
});

app.post("/parent/new", async (req, res) => {
    let {auth, ci} = req.body;
    let error = 0;

    let data = await authFunction(auth, async () => {
        
        let exist = await db.Parent.find({ci});

        if (exist.length > 0) {
            error = 10;
            return {}
        }
        
        let Parent = new db.Parent({
            ci,
            direction:"",
            email:"",
            name_parent:"",
            tlf:"",
            students:[]
        })
        
        Parent.save();
        

        return {};
    },  (async (e) => {
        error = e;
        return {};
    }))

    res.json({
        data,
        error
    })
});


app.post("/curso/new", async (req, res) => {
    let {auth, id, title} = req.body;
    let error = 0;

    let data = await authFunction(auth, async () => {
        
        let exist = await db.Cursos.find({id});
        let counts = await db.Cursos.find();

        if (exist.length > 0) {
            error = 10;
            return {}
        }
        
        let Curso = new db.Cursos({
            id,
            caption: title,
            materias:[
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
            ],
            index: counts.length
        });

        Curso.save();

        return {};
    },  (async (e) => {
        error = e;
        return {};
    }))

    res.json({
        data,
        error
    })
});

app.post("/cursos/edit", async (req, res) => {
    let {auth, cursos} = req.body;
    let error = 0;

    let data = await authFunction(auth, async () => {
        
        let cur = [...cursos]

        
        for (let i = 0; i < cur.length; i++) {
            const x = cur[i];
            
            let curso = await db.Cursos.findOne({id:x.id});
            // console.log(x, curso)

            if (curso !== null) {
                curso.materias = x.materias;
                curso.index = i;
                curso.save();
            }
        }

        return {};
    },  (async (e) => {
        error = e;
        return {};
    }))

    res.json({
        data,
        error
    })
});

app.post("/student/edit", async (req, res) => {
    let {auth, ci, student, dues, notes, dues_state} = req.body;
    let error = 0;

    console.log("editar")

    let data = await authFunction(auth, async () => {
        
        let student_db = await db.Student.findOne({ci: ci});
        let notes_db = await db.Notes.findOne({ci: ci});
        let dues_db = await db.Dues_Student.findOne({ci: ci});

        let asi = Object.assign;

        let old_parent = student_db.ci_parent
        let new_parent = student.ci_parent

        if (old_parent !== new_parent) {
            
            if (old_parent !== 0) {
                let OLD_PARENT = await db.Parent.findOne({ci: old_parent});
                
                OLD_PARENT.students = OLD_PARENT.students.filter(x=> ci!=x)
                OLD_PARENT.save();
            }

            if (new_parent !== 0) {
                let NEW_PARENT = await db.Parent.findOne({ci: new_parent});
                
                NEW_PARENT.students.push(ci);
                NEW_PARENT.save();

            }

            
        }


        asi(student_db, student);
        asi(notes_db, notes);
        asi(dues_db, {dues, dues_state});
        
        // dues_db.dues = dues;
        student_db.save();
        notes_db.save();
        dues_db.save();


        return {student, dues, notes};
    },  (async (e) => {
        error = e;
        return {
            student: {},
            notes: {},
            dues: {},
        };
    }))

    res.json({
        data,
        error
    })
});

app.post("/parent/edit", async (req, res) => {
    let {auth, ci, parent} = req.body;
    let error = 0;

    console.log("editar")

    let data = await authFunction(auth, async () => {
        
        let Parent = await db.Parent.findOne({ci: ci});

        let asi = Object.assign;
        console.log(Parent, parent);

        asi(Parent, parent);
        
        Parent.save();


        return Parent;
    },  (async (e) => {
        error = e;
        return {};
    }))

    res.json({
        data,
        error
    })
});

app.post("/student/delete", async (req, res) => {
    let {auth, ci} = req.body;
    let error = 0;

    console.log("eliminar:", ci)

    let datas = await authFunction(auth, async () => {
        
        let student_db = await db.Student.findOne({ci});

        if (null === student_db) {
            error = 11;
            return {}
        };

        let old_parent = student_db.ci_parent;

        if (old_parent !== 0) {
            let OLD_PARENT = await db.Parent.findOne({ci: old_parent});
            
            OLD_PARENT.students = OLD_PARENT.students.filter(x=> ci!=x)
            OLD_PARENT.save();
        }

        await db.Student.deleteOne({ci});
        await db.Notes.deleteOne({ci});
        await db.Dues_Student.deleteOne({ci});

        return {};
    },  (async (e) => {
        error = e;
        return {};
    }))

    res.json({
        datas,
        error
    })
});

app.post("/parent/delete", async (req, res) => {
    let {auth, ci} = req.body;
    let error = 0;

    console.log("eliminar:", ci)

    let datas = await authFunction(auth, async () => {
        
        let Parent = await db.Parent.findOne({ci});

        if (null === Parent) {
            error = 11;
            return {}
        } else {
            let sts = Parent.students;

            sts.forEach(async x=>{
                let st = await db.Student.findOne({ci:x});
                st.ci_parent = 0;
                st.save()
            })
        };
        await db.Parent.deleteOne({ci});

        return {};
    },  (async (e) => {
        error = e;
        return {};
    }))

    res.json({
        datas,
        error
    })
});


app.post("/curso/delete", async (req, res) => {
    let {auth, curso} = req.body;
    let error = 0;

    console.log("eliminar:", curso)

    let datas = await authFunction(auth, async () => {
        
        let curso_db = await db.Cursos.findOne({id: curso});

        if (null === curso_db) {
            error = 11;
            return {}
        };
        await db.Cursos.deleteOne({id: curso});

        let sort = await db.Cursos.find({});
        let sort2 = lodash.sortBy(sort, "index");

        sort2.forEach((x, y) => {
            x.index = y;
            x.save();
        })

        

        return {};
    },  (async (e) => {
        error = e;
        return {};
    }))

    res.json({
        datas,
        error
    })
});

app.post("/student/get", async (req, res) => {
    let {auth, ci} = req.body;
    let error = 0;

    let data = await authFunction(auth, async () => {
        let datas = {
            student: {},
            notes: {},
            dues: {},
        }

        datas.student = await db.Student.findOne({ci: ci});
        datas.notes = await db.Notes.findOne({ci: ci});
        datas.dues = await db.Dues_Student.findOne({ci: ci});

        return datas;
    },  (async (e) => {
        error = e;
        return {
            student: {},
            notes: {},
            dues: {},
        };
    }))

    res.json({
        data,
        error
    })
});

app.post("/parent/get", async (req, res) => {
    let {auth, ci} = req.body;
    let error = 0;

    let data = await authFunction(auth, async () => {
        let datas = {}

        datas = await db.Parent.findOne({ci});

        return datas;
    },  (async (e) => {
        error = e;
        return {};
    }))

    res.json({
        data,
        error
    })
});

app.post("/accounts/get", async (req, res) => {
    let {auth} = req.body;
    let error = 0;

    let data = await authFunction(auth, async () => {
        let datas = [...accounts]

        return datas;
    },  (async (e) => {
        error = e;
        return []
    }))

    res.json({
        data,
        error
    })
});

app.post("/account/new", async (req, res) => {
    let {auth, user, pass} = req.body;
    let error = 0;

    let data = await authFunction(auth, async () => {
        let datas = {}
        let exist = false;

        accounts.forEach(x=> {
            if (x.user === user) {
                exist = true
            }
        });

        if (exist) {
            error = 10;
            return[];
        };

        accounts.push(ModelAccount(user, pass))

        accounts.save();

        return datas;
    },  (async (e) => {
        error = e;
        return []
    }))

    res.json({
        data,
        error
    })
});

app.post("/accounts/edit", async (req, res) => {
    let {auth, accounts: a} = req.body;
    let error = 0;

    let data = await authFunction(auth, async () => {
        
        [...a].forEach((x, i)=> {
            accounts[i] = a[i]
        });

        accounts.save();

        return {};
    },  (async (e) => {
        error = e;
        return {};
    }))

    res.json({
        data,
        error
    })
});

app.post("/accounts/delete", async (req, res) => {
    let {auth, user} = req.body;
    let error = 0;

    let data = await authFunction(auth, async () => {
        
        accounts.forEach((x, i)=>{
            if (x.user === user) {
                accounts.splice(i, 1);
                // console.log(x)
            }
        })

        accounts.save();

        return {};
    },  (async (e) => {
        error = e;
        return {};
    }))

    res.json({
        data,
        error
    })
});

app.post("/cursos/get", async (req, res) => {
    let {auth, curso} = req.body;
    let error = 0;

    let data = await authFunction(auth, async () => {
        let datas = {
            cursos: {}
        }
        let s = {}
        if (curso) {
            s = {curso}
        }
        let cur = await db.Cursos.find(s);


        let cur2 = lodash.sortBy(cur, "index");
        datas.cursos = cur2;
        return datas;
    },  (async (e) => {
        error = e;
        return {
            cursos: {},
        };
    }))

    res.json({
        data,
        error
    })
});

app.post("/connect", async (req, res) => {
    let {auth} = req.body;
    let error = 0;

    await authFunction(auth, async () => {

        return 0;
    },  (async (e) => {
        error = e;
        return 0;
    }))

    res.json(
        {
            error
        }
    )
});

app.post("/configs", async (req, res) => {
    let {new_data, auth} = req.body;
    let error = 0;
    

    let data = await authFunction(auth, async () => {
        Object.assign(configs, new_data)

        if (!["", undefined, null, NaN].includes(new_data?.pass)) {
            console.log("config pass: ", new_data.pass)
            admin_user.pass = new_data.pass
            admin_user.save({
                user: admin_user.user,
                pass: admin_user.pass
            })
        }
        console.log("set configs: ", configs, new_data)
        configs.save();

        return configs;
    },  (async (e) => {
        error = e;
        return {};
    }))

    res.json(
        {
            error,
            data
        }
    )
});

app.post("/sendmail", async (req, res) => {
    let {subject, body, to, auth} = req.body;
    let error = 0;
    

    let data = await authFunction(auth, async () => {
        
        sendmail(subject, to, body)

        return {};
    },  (async (e) => {
        error = e;
        return {};
    }))

    res.json(
        {
            error,
            data
        }
    )
});

app.post("/duesreport", async (req, res) => {
    let {auth} = req.body;
    let error = 0;
    

    let data = await authFunction(auth, async () => {
        
        dues_report();

        return {};
    },  (async (e) => {
        error = e;
        return {};
    }))

    res.json(
        {
            error,
            data
        }
    )
});

app.post("/account/me", async (req, res) => {
    let {auth} = req.body;
    let error = 0;
    

    let data = await authFunction(auth, async (user) => {
        
        let user_data = JSON.parse(JSON.stringify(user));
        user_data.pass = undefined;

        return user_data;
    },  (async (e) => {
        error = e;
        return {};
    }))

    res.json(
        {
            error,
            data
        }
    )
})

module.exports = {
    api: app
}