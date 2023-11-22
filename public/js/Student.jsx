let remote = require("@electron/remote")

let exitcode = 0;

window.addEventListener("beforeunload", (evento) => {
    //let res = preventDefaultClose();

    
    if (true) {
        evento.preventDefault();
        evento.returnValue = res; 
        
        return "";
    };

});


function preventDefaultClose() {
    let result = remote.dialog.showMessageBoxSync({
        title: "Alerta de perdida de datos",
        message: "Los datos no se han guardado, ¿deseas salir?",
        buttons: ["Salir", "No Salir"]
    })
    
    console.log(result)

    return result
}


class App extends React.Component {


    render() {


        return(
            <div className="marco">
                <div className="header">
                    <div className="top1">
                        <ControlButton img="/img/gui/add.svg" click={() => {
                            
                        }}>
                            Cerrar
                        </ControlButton>
                        <ControlButton img="/img/gui/db.svg">
                            Guardar
                        </ControlButton>
                        <ControlButton img="/img/gui/conf.svg">
                            Eliminar estudiante
                        </ControlButton>
                        
                        
                    </div>
                    <div className="top2">
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
                        <div className="search"  style={{width:"-webkit-fill-available"}}>
                            <input type="text" className="search-input" placeholder="Buscar..." />
                            <select defaultValue={test_dates.dates[0].id} className="search-select">
                                <option value={test_dates.dates[0].id} className="select-gui-option">
                                    Filtrar por...
                                </option>
                                {
                                    test_dates.dates.map(x=> {

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
                    <Table 
                        id="principal"
                    
                        dates = {test_dates.dates}
                        items = {test_dates.items}
                        states = {test_dates.states}

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