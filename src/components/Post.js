import React from 'react';
import { tellTime } from '../utility/tellTime';

const Post = (props) => {
  const { author, created_at_i, num_comments, objectID, points, title, story_title, url } = props.post;
  return (
    <div className='post-card'>
      <a href={url}>{story_title ? story_title : title}</a>
      <div className='row'>
        <span><a href={`https://news.ycombinator.com/item?id=${objectID}`}>{points ? points : 0} points</a></span>
        <span className='leave-a-space'>|</span>
        <span><a href={`https://news.ycombinator.com/user?id=${author}`}>{author}</a></span>
        <span className='leave-a-space'>|</span>
        <span><a href={`https://news.ycombinator.com/item?id=${objectID}`}>{tellTime(created_at_i)}</a></span>
        <span className='leave-a-space'>|</span>
        <span><a href={`https://news.ycombinator.com/item?id=${objectID}`}>{num_comments} comments</a></span>        
      </div>      
    </div>
  );
}

export default Post;