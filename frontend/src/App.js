import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import BaseContextWrapper from "./components/common/BaseContext";

// Styles
import TodoContainer from "./components/TodoContainer";
import TodoCreate from "./components/TodoCreate";
import TodoUpdate from "./components/TodoUpdate";

class App extends Component {

    state = {
        data: []
    }

    callbackFunction = (childData) => {
        this.setState({ data: childData })
    }


    render() {
        const { data } = this.state
        return (
            <BrowserRouter>
                <BaseContextWrapper>
                    <Switch>

                        <Route exact path="/" render={(props) =>
                            <TodoContainer
                                parentFunc={this.callbackFunction}
                                {...props}
                            />
                        } />

                        <Route exact path="/create" render={(props) =>
                            <TodoCreate
                                items={data}
                                {...props}
                            />
                        } />

                        <Route exact path="/update" render={(props) =>
                            <TodoUpdate
                                items={data}
                                {...props}
                            />
                        } />
                    </Switch>
                </BaseContextWrapper>
            </BrowserRouter>
        )
    }
}

export default App


