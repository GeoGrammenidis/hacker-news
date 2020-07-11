import React from 'react'
import { Link } from 'react-router-dom';
import PostMetaInfo from './PostMetaInfo';

function PostsList(props) {
    console.log(props)
    return (
        <ul>
            {props.posts.filter(x=> x!==null).map(x=>
                <li key={x.id}>
                    {x.url?
                        <a href={x.url}>{x.title}</a>:
                        <Link to={`/post?id=${x.id}`}>~~~~~~~~~~~~~{x.title}~~~~~~~~~</Link>
                    }
                    <PostMetaInfo by={x.by} time={x.time} commentsNumber={x.kids?x.kids.length:0}/>
                </li>
            )}
        </ul>
    )
}

export default PostsList