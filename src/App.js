import {useState} from 'react'
import './App.css';
import Post from './Post'

function App() {
  const [posts, setPosts] = useState([
    {
      username: 'bobby_tito',
      caption: 'Lets build the Instagram clone',
      imageUrl: "https://lerablog.org/wp-content/uploads/2019/02/React-JS.jpg"
    },
    {
      username: 'naan_tito',
      caption: 'build the clone is awesome',
      imageUrl: "https://lerablog.org/wp-content/uploads/2019/02/React-JS.jpg"
    }
  ])

  return (
    <div className="app">
      <div className="app_header">
          <img className="app_headerImage"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
          />
      </div>
      <h1>The instgram Logo</h1>
      {posts.map(post => (
        <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
      ))}
    </div>
  );
}

export default App;
