import React from 'react';
import { Switch, BrowserRouter, Route} from 'react-router-dom';
import NavComponent from './components/NavComponent';
import Post from './components/Post';
import User from './components/User';
const Posts = React.lazy(() => import('./components/Posts'))

class App extends React.Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <NavComponent/>
                    <React.Suspense fallback={<div>Loading....</div>}>
                        <Switch>
                            <Route exact path='/' render={(routeProps)=><Posts storyType="top" {...routeProps}/>} />
                            <Route path='/new' render={(routeProps)=><Posts storyType="new" {...routeProps}/>} />
                            <Route path='/post' component={Post} />
                            <Route path='/user' component={User} />
                            <Route component={()=><h1>404</h1>}/>
                        </Switch>
                    </React.Suspense>
                </BrowserRouter>
            </>
        )
    }
}

export default App;