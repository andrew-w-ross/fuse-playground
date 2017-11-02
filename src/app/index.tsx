import * as React from 'react'
import { Route, Link, Switch, RouteComponentProps } from 'react-router-dom'
import * as constants from './constants'

export const AppConstants = constants

const Home = () => <h1>Home</h1>

const About = () => <h1>About</h1>

const NotFound = (props: RouteComponentProps<{}>) => {
    if (props.staticContext != null) {
        props.staticContext.status = 404
    }
    return (<h1>Nothing to see here look I update again</h1>)
}


export const App = () => (
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/404">404</Link></li>
        </ul>
        <hr />
        <Switch>
            <Route component={Home} exact path="/" />
            <Route component={About} path="/about" />
            <Route component={NotFound} />
        </Switch>
    </div>
)