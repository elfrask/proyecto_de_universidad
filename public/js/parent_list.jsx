let remote = require("@electron/remote")

let list = MyServer.get_list_parents(0, 10000).data;


class App extends React.Component {


    render() {


        return(
            <div className="marco fill">
               <Minitable 
               
               elements={list.map(x=> {
                return {
                    title: `${x.ci} - ${x.name_parent}`
                }
               })}
               click={(x) => {
                    subapi.done(x.title, window)
               }}
               />
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