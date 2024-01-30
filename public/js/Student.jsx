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
                <div className="header one-top">
                    <div className="top1">
                        <ControlButton img="/img/gui/close.svg" click={() => {
                            close()
                        }}>
                            Cerrar
                        </ControlButton>
                        <ControlButton img="/img/gui/save.svg">
                            Guardar
                        </ControlButton>
                        <ControlButton img="/img/gui/reload.svg" click={() => {
                            reload()
                        }}>
                            recargar
                        </ControlButton>
                        <ControlButton img="/img/gui/delete.svg">
                            Eliminar estudiante
                        </ControlButton>
                        
                        
                    </div>
                                        
                    
                </div>
                <div className="body one-top">
                    
                    <div></div>

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