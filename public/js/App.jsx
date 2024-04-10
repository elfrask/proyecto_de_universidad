// let remote = require("@electron/remote")

// window.addEventListener("keydown", (e) => {
//     // console.log(e.code)
//     if (e.code === "Enter") {
//         console.log("login")
//     }
// })

test_dates.items = MyServer.get_list(0, 10000).data;
test_dates_parents.items = MyServer.get_list_parents(0, 10000).data;

let TITLE = "Sistema de gestión de alumnado -"


class STUDENTS extends React.Component {

    state = {
        search: "",
        curso: "none",
        filter: "name_student"
    }

    render() {

        let items = [...test_dates.items];

        items = items.filter(x => {

            if (["all", "none"].includes(this.state.curso)) return true;

            if (this.state.curso === "duesonly") {
                
                return [...x.dues].includes(0)
                
            } else if (this.state.curso === "noduesonly") {
                
                return ![...x.dues].includes(0)
                
            }

            return x.curso === this.state.curso
        })

        items = items.filter(x => {
            if (this.state.search === "") return true;

            return (x[this.state.filter] + "").toUpperCase().includes(this.state.search.toUpperCase())
        })
        

        return (
            <div className="marco" key={"studets"}>
                <div className="header">
                    <div className="top1">
                        {
                            eif(
                                MyAccount.permisos.students === 1,
                                <ControlButton img="/img/gui/add.svg" click={() => {

                                    console.log("hi")
                                    openWin("/add_student.html", {
                                        width: "400",
                                        height: "250",
                                        resizable: "no",
                                        menubar: "no"
                                    }, {
                                        done: (win) => {


                                            win.close();
                                            document.location.reload();
                                        }
                                    })
                                }}>
                                    Agregar alumno
                                </ControlButton>,
                                []
                            )
                        }
                        {/* <ControlButton img="/img/gui/logout.svg" click={() => {
                            sessionStorage.removeItem("db")
                            document.location.href = "/init.html"
                        }}>
                            Cambiar de plantilla
                        </ControlButton> */}
                        <ControlButton img="/img/gui/reload.svg" click={() => {
                            document.location.reload()
                        }}>
                            recargar
                        </ControlButton>
                        {
                            // MyAccount.permisos.configs ? (
                            //     <ControlButton img="/img/gui/conf.svg" click={() => {
                            //         openWin("/conf.html", {
                            //             width: 1000,
                            //             height: 700,
                            //             resizable: "no"
                            //         })
                            //     }}>
                            //         Configuraciones de la plantilla
                            //     </ControlButton>
                            // ) : (
                            //     []
                            // )
                        }


                    </div>
                    <div className="top2">
                        <select defaultValue={"none"} className="select-gui" onChange={(x) => {
                            let curso = (x.target.value);

                            this.setState({
                                curso
                            })
                        }}>
                            <option value={"none"} className="select-gui-option optionbg">
                                Selecciona un grupo o sección
                            </option>
                            <option value={"duesonly"} className="select-gui-option optionbg">
                                Solo deudores
                            </option>
                            <option value={"noduesonly"} className="select-gui-option optionbg">
                                Solo solventes
                            </option>
                            
                            
                            {
                                test_dates.groups.map(x => {

                                    return (
                                        <option value={x.id} className="select-gui-option optionbg">
                                            {x.caption}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <div style={{ float: "left", width: "6px", height: "50px" }}></div>
                        <div className="search" style={{ width: "-webkit-fill-available" }}>
                            <input type="text" className="search-input" placeholder="Buscar..." onChange={(e) => {
                                let search = e.target.value;

                                this.setState({ search })
                            }} />
                            <select defaultValue={test_dates.dates[0].id} className="search-select" onChange={(e) => {
                                let filter = e.target.value;

                                this.setState({
                                    filter
                                })
                            }}>
                                <option value={test_dates.dates[0].id} className="select-gui-option optionbg">
                                    Filtrar por...
                                </option>
                                {
                                    test_dates.dates.map(x => {
                                        //console.log(x)
                                        if (["curso"].includes(x.id)) return [];

                                        return (
                                            <option value={x.id} className="select-gui-option optionbg">
                                                {x.caption}
                                            </option>
                                        )
                                    })
                                }
                            </select>

                        </div>
                    </div>


                </div>
                <div className="body back-table" style={{
                    // overflow: "unset"
                }}>
                    <div className="content2">

                        <Table
                            id="principal"

                            dates={test_dates.dates}
                            items={items}
                            states={test_dates.states}
                            dbclick={(e) => {
                                openWin("/student.html", {}, {
                                    id: e.ci,
                                    parent: window
                                })
                            }}
                            

                        />
                    </div>
                </div>

            </div>
        )
    }
};















class PARENTS extends React.Component {

    state = {
        search: "",
        curso: "none",
        filter: "name_student"
    }

    render() {

        let items = [...test_dates_parents.items];

        items = items.filter(x => {
            if (this.state.search === "") return true;

            return (x[this.state.filter] + "").toUpperCase().includes(this.state.search.toUpperCase())
        })
        

        return (
            <div className="marco" key={"parents"}>
                <div className="header">
                    <div className="top1">
                        {
                            eif(
                                MyAccount.permisos.students === 1,
                                <ControlButton img="/img/gui/add.svg" click={() => {

                                    console.log("hi")
                                    openWin("/add_parent.html", {
                                        width: "400",
                                        height: "250",
                                        resizable: "no",
                                        menubar: "no"
                                    }, {
                                        done: (win) => {


                                            win.close();
                                            document.location.reload();
                                        }
                                    })
                                }}>
                                    Agregar representante
                                </ControlButton>,
                                []
                            )
                        }
                        <ControlButton img="/img/gui/reload.svg" click={() => {
                            document.location.reload()
                        }}>
                            recargar
                        </ControlButton>


                    </div>
                    <div className="top2">
                        <div className="search" style={{ width: "-webkit-fill-available" }}>
                            <input type="text" className="search-input" placeholder="Buscar..." onChange={(e) => {
                                let search = e.target.value;

                                this.setState({ search })
                            }} />
                            <select defaultValue={test_dates_parents.dates[0].id} className="search-select" onChange={(e) => {
                                let filter = e.target.value;

                                this.setState({
                                    filter
                                })
                            }}>
                                <option value={test_dates_parents.dates[0].id} className="select-gui-option optionbg">
                                    Filtrar por...
                                </option>
                                {
                                    test_dates_parents.dates.map(x => {
                                        //console.log(x)
                                        if (["curso"].includes(x.id)) return [];

                                        return (
                                            <option value={x.id} className="select-gui-option optionbg">
                                                {x.caption}
                                            </option>
                                        )
                                    })
                                }
                            </select>

                        </div>
                    </div>


                </div>
                <div className="body back-table" style={{
                    // overflow: "unset"
                }}>
                    <div className="content2">

                        <Table
                            id="parents"

                            dates={test_dates_parents.dates}
                            items={items}
                            states={test_dates_parents.states}
                            dbclick={(e) => {
                                openWin("/parent.html", {}, {
                                    id: e.ci,
                                    parent: window
                                })
                            }}
                            

                        />
                    </div>
                </div>

            </div>
        )
    }
};






function gen_nav(id, page, img, title, click) {
    return {
        id,
        img,
        title,
        page,
        click
    }
}

let PAGES_LIST = [
    gen_nav("CLOSE", ()=>[], "/img/gui/logout.svg", "Salir", () => {
        sessionStorage.removeItem("db")
        document.location.href = "/init.html"
    }),
    gen_nav("STUDENTS", STUDENTS, "/img/gui/student.svg", "Estudiantes"),
    gen_nav("PARENTS", PARENTS, "/img/gui/parent.svg", "Representantes"),

    
    
    MyAccount.permisos.configs?gen_nav("CONFIGS", ()=>[], "/img/gui/conf.svg", "Configuraciones", () => {
        // msg("hola")
        openWin("/conf.html", {
            width: 1000,
            height: 700,
            resizable: "no"
        })
    }):[],
]
let PAGES = {};

PAGES_LIST.forEach(x=> {
    PAGES[x.id] = x
});
document.title = `${TITLE} ${PAGES[guiSession.page||"STUDENTS"].title} `
class App extends React.Component {

    state = {
        page: guiSession.page||"STUDENTS",
    }

    render() {
        
        let Pagina = PAGES[this.state.page];

        return (
            <div className="app-marco">
                <div className="left-banner">
                    {
                        PAGES_LIST.map(x=> {

                            return(
                                <div 
                                    className="left-banner-bt" 
                                    title={x.title} 
                                    onClick={() => genlink(x.click||((i) => {
                                        guiSession.page = i.id;
                                        sessionStorage.setItem("gui", JSON.stringify(guiSession));
                                        // console.log(guiSession)
                                        document.title= `${TITLE} ${x.title}`;
                                        this.setState({
                                            page: i.id
                                        })
                                        setTimeout(() => {

                                            onRender()
                                        }, 200)
                                    }))(x) }
                                    // style={{
                                    //     backgroundImage:`url('${x.img}')`
                                    // }}
                                    >
                                        <Img img={x.img} size="40px" className="force-invert" >
                                        </Img>
                                        <div className="title">{x.title}</div>


                                </div>
                            )
                        })
                    }
                </div>
                <div className="left-banner-out">
                    <Pagina.page>

                    </Pagina.page>
                </div>
            </div>
        )
    }

}


ReactDOM.render(
    <App />,
    document.body,
    () => {
        setTimeout(() => {

            onRender()
        }, 200)
        console.log("app is started")

    }
)