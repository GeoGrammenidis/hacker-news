import React, { Component } from 'react'
import queryString from 'query-string'
import { fetchItem } from '../utils/api'
import MetaInfo from './MetaInfo'
import Posts from './Posts'
import Loading from './Loading'


export default class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: null,
            error: null,
            loading: true,
        }
        this._isMounted = false;
    }
    componentDidMount() {
        this._isMounted = true;
        fetchItem(queryString.parse(location.search).id)
        .then(post => this._isMounted&&this.setState({
            post,
            error: null,
            loading: false
        }))
        .catch(({message}) => this._isMounted&&this.setState({
            post,
            error: message,
            loading: false     
        }))
    }

    render() {
        const {loading, error, post} = this.state;
        return (
            <>
                {loading&&<Loading/>}
                {error&&<div>{error}</div>}
                {post&&<>
                    <h1 className="header">
                        <a className="link" href={post.url}>{post.title}</a>
                    </h1>
                    {post.text&& <div dangerouslySetInnerHTML={{__html: post.text}}></div>}
                    <MetaInfo by={post.by} time={post.time} commentsNumber={post.kids?post.kids.length:0}/>
                    <Posts getMap={()=>Promise.all(post.kids?post.kids:[])} history={this.props.history} location={this.props.location} match={this.props.match}>
                    </Posts>
                </>}
            </>
        )
    }
}