import './post.css';
import React from 'react';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      likes: props.likes
    };
  }

  like_post = () => {
    if (!this.state.liked) {
      this.setState({ liked: true, likes: this.state.likes + 1 })
      let post = {}
      post.liked = this.props.id;
      fetch("https://basic.michael-best.workers.dev/", {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(post),
      }).catch(error => {                                         // ***
        console.log(error)
      });
    }
  }
  render() {
    console.log(this.props);
    if (this.props.contenttype == "imglink") {
      return (
        <div className="post_wrapper">
          <div className="post_title_wrapper">
            <span className="post_likes">
              {this.state.likes}
            </span>
            <span className="post_title">{this.props.title}</span>
            <button className="post_like_button" onClick={this.like_post}>Like</button>
          </div>
          <div className="post_content">
            <img height="250" width="250" src={this.props.content}></img>
          </div>
          <div className="post_username"> -{this.props.username}</div>
        </div>
      )
    } else {
      return (
        <div className="post_wrapper">
          <div className="post_title_wrapper">
            <span className="post_likes">
              {this.state.likes}
            </span>
            <span className="post_title">{this.props.title}</span>
            <button className="post_like_button" onClick={this.like_post}>Like</button>
          </div>          <div className="post_content"> {this.props.content} </div>
          <div className="post_username"> -{this.props.username}</div>
        </div>
      );
    }
  }
}
export default Post;