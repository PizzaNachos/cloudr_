import logo from './logo.svg';
import './App.css';
import React from 'react';
import Particles from "react-tsparticles";

import Post from './components/post'
import Submit from './components/submit'
import Topbar from './components/top-bar'
// import Post from './components/post'



class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: false
    };
  }
  async componentDidMount() {
    fetch("https://basic.michael-best.workers.dev/", {
      mode: 'cors',
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then((res) => res.json())
      .then((posts) => {
        posts.sort((x,y) => {return y.timestamp - x.timestamp})
        this.setState({
          items: posts,
          DataisLoaded: true
        });


        // })
      })
 
  }
  
  render() {
    if(!this.state.DataisLoaded){
      return (
        <div className="posts-wrapper">
          <div className="lds-dual-ring"></div>
        </div>
      )
    }
    return (
      <div className="posts-wrapper">
        {
          this.state.items.map((item) => (
            <Post 
              // post={item}
              title={item.title}
              content={item.content}
              username={item.username}
              key={item.id}
              contenttype={item.contenttype}
              likes={item.likes}
              id={item.id}
            />
          ))
        }
      </div>

    )

  }
}

const App = () => {
  const particlesInit = (main) => {
      console.log(main);

      // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
      console.log(container);
  };
  return (
    <div className="App">
      <Particles
          className="tsparticles"
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "#20202000",
            }},
              particles: {
                  number: {
                      value: 120,
                      density: {
                          enable: true,
                          area: 800,
                      },
                  },
                  color: {
                      value: ["#048099"],
                  },
                  shape: {
                      type: "circle",
                      stroke: {
                          width: 0,
                          color: "#b6b2b2",
                      },
                  },
                  size: {
                      value: 2,
                      random: true,
                  },
                  lineLinked: {
                      enable: true,
                      distance: 130,
                      color: "#282c34",
                      opacity: 1,
                      width: 2,
                  },
                  move: {
                      enable: true,
                      speed: 0.64,
                      direction: "none",
                      random: true,
                      straight: false,
                      outMode: "bounce",
                      bounce: false,
                      attract: {
                          enable: false,
                          rotateX: 600,
                          rotateY: 1200,
                      },
                  }}
            }}
          />
      <Topbar />
      <Submit />
      <Posts />
    </div>
      
);
};

export default App;
