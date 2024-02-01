let remote = require("@electron/remote")


class App extends React.Component {

    state = {
        search: "",
        curso:"none",
        filter:"name_student"
    }

    render() {

        let items = [...test_dates.items];

        items = items.filter(x=> {

            if (["all", "none"].includes(this.state.curso)) return true;

            return x.curso === this.state.curso
        })
        
        items = items.filter(x=> {
            if (this.state.search === "") return true;

            return (x[this.state.filter]+"").toUpperCase().includes(this.state.search.toUpperCase())
        })

        return(
            <div className="marco">
                <div className="header">
                    <div className="top1">
                        <ControlButton img="/img/gui/add.svg" click={() => {


                            openWin("/add_student.html", {
                                width:"400",
                                height:"300",
                                resizable:"no",
                                menubar:"no"
                            }, {
                                host: x.host,
                                done: () => {

                                    

                                    document.location.reload();
                                }
                            })
                        }}>
                            Agregar alumno
                        </ControlButton>
                        <ControlButton img="/img/gui/logout.svg" click={() => {
                            sessionStorage.removeItem("db")
                            document.location.href = "/init.html"
                        }}>
                            Cambiar de plantilla
                        </ControlButton>
                        <ControlButton img="/img/gui/reload.svg" click={() => {
                            document.location.reload()
                        }}>
                            recargar
                        </ControlButton>
                        <ControlButton img="/img/gui/conf.svg" click={() => {
                            openWin("/conf.html", {
                                width: 1000,
                                height: 700,
                                resizable: "no"
                            })
                        }}>
                            Configuraciones de la plantilla
                        </ControlButton>
                        
                        
                    </div>
                    <div className="top2">
                        <select defaultValue={"none"} className="select-gui" onChange={(x) => {
                            let curso = (x.target.value);

                            this.setState({
                                curso
                            })
                        }}>
                            <option value={this.state.curso} className="select-gui-option">
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
                        <div className="search"  style={{width:"-webkit-fill-available"}}>
                            <input type="text" className="search-input" placeholder="Buscar..." onChange={(e) => {
                                let search = e.target.value;

                                this.setState({search})
                            }} />
                            <select defaultValue={test_dates.dates[0].id} className="search-select" onChange={(e) => {
                                let filter = e.target.value;

                                this.setState({
                                    filter
                                })
                            }}>
                                <option value={test_dates.dates[0].id} className="select-gui-option">
                                    Filtrar por...
                                </option>
                                {
                                    test_dates.dates.map(x=> {
                                        //console.log(x)
                                        if (["curso"].includes(x.id)) return [];

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
                <div className="body" style={{
                    overflow:"unset"
                }}>
                    <Table 
                        id="principal"
                    
                        dates = {test_dates.dates}
                        items = {items}
                        states = {test_dates.states}
                        dbclick ={(e) => {
                            openWin("/student.html", {}, {id: e.ci})
                        }}

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