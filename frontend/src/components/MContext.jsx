// import React, { useState } from "react";

// export const MContext = React.createContext();  //exporting context object
// function MyProvider() {
//     // state = { message: "" }
//     const [todoId, setTodoId] = useState(0)
//     return (
//         <MContext.Provider value={
//             {
//                 // setMessage: (value) => this.setState({
//                 //     message: value
//                 // }),
//                 setTodoId: (value) => setTodoId({ todoId: value })
//             }}>
//             {props.children}
//             {/* {this.props.children}   //this indicates that all the child tags with MyProvider as Parent can access the global store. */}
//         </MContext.Provider>)
// }

export const MContext = React.createContext()  //exporting context object
export class MyProvider extends Component {
state = {message: ""}
render() {
        return (
            <MContext.Provider value={
            {   state: this.state,
                setMessage: (value) => this.setState({
                            message: value })}}>
            {this.props.children}   //this indicates that all the child tags with MyProvider as Parent can access the global store.
            </MContext.Provider>)
    }
}