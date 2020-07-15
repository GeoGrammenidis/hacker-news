import React from 'react';
import { Switch, BrowserRouter, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import Post from './components/Post';
import User from './components/User';
import { fetchMap } from './utils/api'
import { ThemeProvider } from './contexts/theme'
import TopComp from './components/TopComp';
import NewComp from './components/NewComp';
const Posts = React.lazy(() => import('./components/Posts'))

class App extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            theme: 'light',
            toggleTheme: () => {
                this.setState(({ theme }) => ({
                    theme: theme === 'light' ? 'dark' : 'light'
                }))
            }
        }
    }

    getMap(x){
        if(x==='/')
            return fetchMap("top")
        else
            return fetchMap("new")
    }

    render() {
        return (
            <div className={this.state.theme}>
                <div className="container">
                    <BrowserRouter>
                        <ThemeProvider value={this.state}>
                            <Navigation/>
                            <React.Suspense fallback={<div>Loading....</div>}>
                                <Switch>
{/*                                     <Route exact path='/' render={(routeProps)=><Posts getMap={this.getMap} {...routeProps}/>} />
                                    <Route path='/new' render={(routeProps)=><Posts getMap={this.getMap} {...routeProps}/>} /> */}
                                    <Route path='/' exact component={TopComp} />
                                    <Route path='/new' component={NewComp} />
                                    <Route path='/post' component={Post} />
                                    <Route path='/user' component={User} />
                                    <Route component={()=><h1>404</h1>}/>
                                </Switch>
                            </React.Suspense>
                        </ThemeProvider>
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}

export default App;