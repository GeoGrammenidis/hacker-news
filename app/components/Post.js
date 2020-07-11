import React, { Component } from 'react'
import queryString from 'query-string'
import { fetchItem } from '../utils/api'
import PostMetaInfo from './PostMetaInfo'

export class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: null,
            error: null,
            loading: true,
        }
    }
    componentDidMount() {
        fetchItem(queryString.parse(location.search).id)
        .then(post => this.setState({
            post,
            error: null,
            loading: false
        }))
        .catch(({message}) => this.setState({
            post,
            error: message,
            loading: false     
        }))
    }

    render() {
        const {loading, error, post} = this.state;
        console.log(this.state);
        return (
            <div>
                {loading&&<div>Loading...</div>}
                {error&&<div>{error}</div>}
                {post&&<>
                    <h1>{post.title}</h1>
                    <PostMetaInfo by={post.by} time={post.time} commentsNumber={post.kids?post.kids.length:0}/>
                </>}
            </div>
        )
    }
}

export default Post
