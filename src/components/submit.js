import React, { useState } from "react"
import './submit.css'

function Submit() {
  const [state, setState] = useState({ title: "", content: "", username: "", loading: false, link: false })
  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value, })
  }
  const submit_post = () => {
    setState({ loading: true });
    if (state.title.length === 0 || state.username.length === 0 || state.content.length === 0) {
      setState({ title: "", content: "", username: "" });
      state.loading = false;
    }
    let post = {
      title: state.title,
      content: state.content,
      username: state.username,
    }
    if(state.link){
      post.contenttype = "imglink"
    } else {
      post.contenttype = "text"
    }
    fetch("https://basic.michael-best.workers.dev/", {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(post)
    }).then(res => {
      setState({ title: "", content: "", username: "" });
      state.loading = false;
    });
  }

  return (
    <div className="submit_outside_wrapper">
      <div className="submit_inside_wrapper">
        <div className="submit_header">Whats happening?</div>
        <div>
          <div>
            <input
              placeholder="Title"
              className="submit_title"
              type="text"
              name="title"
              value={state.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <textarea
              maxLength="500"
              placeholder="Content"
              className="submit_content"
              name="content"
              value={state.content}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              placeholder="Username"
              className="submit_username"
              type="text"
              name="username"
              value={state.username}
              onChange={handleChange} />
          </div>
        </div>
        <button className="submit_button" onClick={submit_post}>Post</button>
        <label className="submit_checkbox_label">https://i.imgur.com/ Link?
          <input
            className="submit_checkbox"
            type="checkbox"
            name="link"
            value={state.link}
            onChange={handleChange} />
        </label>
      </div>

    </div>
  )
}
export default Submit;