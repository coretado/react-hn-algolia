import React from "react";
import { tellTime } from "../../../utility/tellTime";
import {
  CalendarIcon,
  CommentIcon,
  UpvoteIcon,
  UserIcon
} from "../../../icons";

const PostItem = ({
  author,
  created_at_i,
  num_comments,
  objectID,
  points,
  title,
  story_title,
  url
}) => (
  <li>
    <div className="row-link">
      <h4>
        <a
          href={url ? url : `https://news.ycombinator.com/item?id=${objectID}`}
        >
          {story_title ? story_title : title}
        </a>
      </h4>
    </div>
    <div className="row-flex">
      <p className="row-icon">
        {UserIcon()}
        <a href={`https://news.ycombinator.com/user?id=${author}`}>{author}</a>
      </p>
      <p className="row-icon">
        {CalendarIcon()}
        <a href={`https://news.ycombinator.com/item?id=${objectID}`}>
          {tellTime(created_at_i)}
        </a>
      </p>
      <p className="row-icon">
        {UpvoteIcon()}
        <a href={`https://news.ycombinator.com/item?id=${objectID}`}>
          {points ? points : "0"} points
        </a>
      </p>
      <p className="row-icon">
        {CommentIcon()}
        <a href={`https://news.ycombinator.com/item?id=${objectID}`}>
          {num_comments} comments
        </a>
      </p>
    </div>
    <hr />
  </li>
);

export default PostItem;
