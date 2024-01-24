let express = require("express");
let app = express.Router();
let mysql = require("mysql");
let datas = require("./datas.json");
let mail = require("nodemailer");
let bp = require("body-parser");
let cors = require("cors")

app.use(bp.json());
app.use(cors())

let admin_user = {
    user:"admin",
    pass:"admin"
}
let accounts = [
    admin_user
];

require("dotenv").config();


mysql.createConnection({
    host:"localhost",
    password:"carlos12",
    user:"root"
})


let configs = {
    loaded: true,
    email: "vinestar@yahoo.com",
    token_mail: "ypcqmlzdjvdwbojp",
    pass_mail: "akzhqejwxprxtqte",
    smtp:"yahoo",
    // smtp:"smtp.mail.yahoo.com:465",


}


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

        return datas
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

app.post("/connect", async (req, res) => {
    let {start, long, auth} = req.body;
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
        configs = {...configs, ...new_data};

        if (!["", undefined, null, NaN].includes(new_data?.pass)) {
            console.log("config pass: ", new_data.pass)
            admin_user.pass = new_data.pass
        }

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