let remote = require("@electron/remote")

function dbs(caption, path) {
    return {caption: caption, path: path}
}

let data= {
    filter:[
        gen_date("Locales", "local"),
        gen_date("Remotas", "remote"),
    ],
    dbs: [
        dbs("Estudiantes", "./saves/dbs/students"),
        dbs("Empleados", "./saves/dbs/students"),
        dbs("Maestros", "./saves/dbs/students"),
        dbs("Gastos", "./saves/dbs/students"),
    ]
};

class App extends React.Component {


    render() {


        return(
            <div className="marco">
                <div className="header">
                    <div className="top1">
                        <ControlButton img="/img/gui/adddb.svg">
                            Nueva plantilla
                        </ControlButton>
                        <ControlButton img="/img/gui/db.svg">
                            Cargar plantilla
                        </ControlButton>
                        <ControlButton img="/img/gui/net.svg">
                            Conectarse a una plantilla remota
                        </ControlButton>
                        
                        
                    </div>
                    <div className="top2">
                        {/*
                        <select defaultValue={"none"} className="select-gui">
                            <option value={"none"} className="select-gui-option">
                                Selecciona un grupo o sección
                            </option>
                            {
                                test_dates.groups.map(x=> {

                                    return(
                                        <option value={x.id} className="select-gui-option">
                                            {x.caption}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <div style={{float:"left", width:"6px", height:"50px"}}></div>
                        */}
                        <div className="search"  style={{width:"-webkit-fill-available"}}>
                            <input type="text" className="search-input" placeholder="Buscar..." />
                            <select defaultValue={test_dates.dates[0].id} className="search-select">
                                <option value={test_dates.dates[0].id} className="select-gui-option">
                                    Filtrar por...
                                </option>
                                {
                                    data.filter.map(x=> {

                                        return(
                                            <option value={x.id} className="select-gui-option">
                                                {x.caption}
                                            </option>
                                        )
                                    })
                                }
                            </select>

                        </div>
                    </div>
                                        
                    
                </div>
                <div className="body">
                    <div className="list-dbs">
                        {
                            data.dbs.map(x=>{
                                return(
                                    <Dbcard title={x.caption} click={() => {
                                        console.log(`haz abierto la base de datos '${x.path}'`);
                                        sessionStorage.setItem("path_db", x.path);
                                        document.location.href = "/";
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