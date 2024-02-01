let express = require("express");
let app = express.Router();
let mysql = require("mysql");
let datas = require("./datas.json");
let mail = require("nodemailer");
let bp = require("body-parser");
let cors = require("cors");
let db = require("./db.js");
let fs = require("fs")

app.use(bp.json());
app.use(cors())



require("dotenv").config();


mysql.createConnection({
    host:"localhost",
    password:"carlos12",
    user:"root"
})


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
    loaded: true,
    email: "",
    token_mail: "",
    pass_mail: "",
    smtp:"",
    // smtp:"smtp.mail.yahoo.com:465",
}

const admin_user = {
    user:"admin",
    pass:"admin"
}

const accounts = [];

if (!fs.existsSync("conf")) {
    fs.mkdirSync("conf")
}

load(accounts, "conf/accounts.json")
load(configs, "conf/configs_server.json");
load(admin_user, "conf/root.json")

admin_user.root = true;

accounts.push(admin_user)




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

async function authFunction(auth, callback, errorcall) {
    
    let user = {};
    accounts.forEach(x=> {
        if (auth.user === x.user) user = x;
    });

    if (user.user) {

        if (user.pass === auth.pass) {
            return await callback()
        };

        return await errorcall(2)
        
    }
    return await errorcall(1)

}


app.post("/get_list", async (req, res) => {

    let {start, long, auth} = req.body;
    let error = 0;

    let results = await authFunction(auth, async () => {

        let datas = await db.Student.find();

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
        
        
        let Student = new db.Student({
            ci,
            ci_parent:0,
            name_student: "",
            curso:"none",
            direction:"",
            email:"",
            gender:0,
            name_parent:"",
            tlf:"",
            year_income:0
        })

        try {
            
            Student.save();
        } catch (error) {
            error = 10;
            return {}
        }

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
})

app.post("/student/edit", async (req, res) => {
    let {auth, ci, student, dues, notes} = req.body;
    let error = 0;

    console.log("editar")

    let data = await authFunction(auth, async () => {
        
        let student_db = await db.Student.findOne({ci: ci});
        let notes_db = await db.Notes.findOne({ci: ci});
        let dues_db = await db.Dues_Student.findOne({ci: ci});

        let asi = Object.assign;

        asi(student_db, student);
        asi(notes_db, notes);
        asi(dues_db, dues);

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
        datas,
        error
    })
})

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
})
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
})

module.exports = {
    api: app
}