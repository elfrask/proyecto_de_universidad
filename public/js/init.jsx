let remote = require("@electron/remote");

function dbs(caption, img, path) {
    return {caption: caption, host: path, img: img}
}

function load_db() {
    if (localStorage.getItem("dbs") === null) {
        localStorage.setItem("dbs", "[]");

    }

    let lista = JSON.parse(
        localStorage.getItem("dbs")
    );
    return lista
}

function save_db(data) {
    localStorage.setItem("dbs", JSON.stringify(data));
}

let data= {
    dbs: load_db()
};

class App extends React.Component {

    state = {
        dbs: data.dbs,
        find: ""
    }

    render() {


        return(
            <div className="marco">
                <div className="header">
                    <div className="top1">
                        <ControlButton img="/img/gui/add.svg" click={() => {
                            openWin("/add_db.html", {
                                width:"400",
                                height:"300",
                                resizable:"no",
                                menubar:"no"
                            }, {
                                done: (host, name) => {

                                    if (localStorage.getItem("dbs") === null) {
                                        localStorage.setItem("dbs", "[]");

                                    }

                                    let lista = JSON.parse(
                                        localStorage.getItem("dbs")
                                    );

                                    lista.push(
                                        dbs(name, "/img/gui/cstBig.svg", host)
                                    );

                                    localStorage.setItem("dbs", JSON.stringify(lista));

                                    this.setState({
                                        dbs: lista
                                    })
                                }
                            });
                        }}>
                            Conectarse a una plantilla
                        </ControlButton>
                        
                        
                    </div>
                    <div className="top2">
                        <div className="search"  style={{width:"-webkit-fill-available"}}>
                            <input type="text" className="search-input" placeholder="Buscar..." onChange={(e) => {
                                let se = e.target.value;

                                this.setState({
                                    find: se
                                })
                            }} />
                            

                        </div>
                    </div>
                                        
                    
                </div>
                <div className="body">
                    <div className="list-dbs">
                        {
                            this.state.dbs.map((x, i)=>{

                                if (!x.caption.includes(this.state.find)) {
                                    return []
                                }

                                return(
                                    <Dbcard title={x.caption} img={x.img} click={() => {

                                        // let tempserver = server(x.host, "admin")

                                        openWin("/login.html", {
                                            width:"400",
                                            height:"400",
                                            resizable:"no",
                                            menubar:"no"
                                        }, {
                                            host: x.host,
                                            done: (host, user, pass) => {

                                                

                                                sessionStorage.setItem("db", JSON.stringify(
                                                    {
                                                        host:x.host,
                                                        user: user,
                                                        pass: pass
                                                    }
                                                ));

                                                document.location.href = "/";
                                            }
                                        })


                                        
                                        
                                                                               
                                    }} deleteclick={async () => {
                                        let result = remote.dialog.showMessageBoxSync(null, {
                                            title: "Eliminar",
                                            message: "¿Seguro que quieres eliminar a este acceso de tu lista?",
                                            buttons: [
                                                "No, Cancelar",
                                                "Si, Eliminar",
                                            ]
                                        });
    
                                        console.log(result);
    
                                        if (result) {
                                            let db =load_db();
                                            // console.log(db);
                                            db.splice(i, 1);

                                            save_db(db);
                                            // console.log(db);
                                            
                                            this.setState({
                                                dbs: db
                                            })
                                        }
                                    }}>

                                    </Dbcard>
                                )
                            })
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