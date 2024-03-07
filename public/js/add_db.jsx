let remote = require("@electron/remote")



class App extends React.Component {


    render() {


        return(
            <div className="marco form-box">
                {/* <a href="#" onClick={() => reload()}>reload</a>
                <br /><br /> */}
                <div className="medio fill">

                    <div className="login">
                        <input type="text" id="host" placeholder="Dirección del host" className="input" style={{
                            width:"100%"
                        }}/>
                        <br />
                        <br />
                        <input type="text" id="name" placeholder="Nombre/titulo" className="input" style={{
                            width:"100%"
                        }}/>
                        <br />
                        <br />
                        
                        
                        <Button
                            x="100%"
                            click={() => {
                                let path = go("host").value;
                                let caption = go("name").value;

                                subapi.done(path, caption);
                                close()


                            }}
                        >
                            Agregar plantilla
                        </Button>
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