import {useState, useEffect} from 'react'
import './App.css';
import Post from './Post'
import db from './firebase'

function App() {
  const [posts, setPosts] = useState([])
    useEffect(() => {
      db.collection('posts').onSnapshot(snapshot => (
        setPosts(snapshot.docs.map(doc => doc.data()))
      ))
    }, [])


  return (
    <div className="app">
      <div className="app_header">
          <img className="app_headerImage"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
          />
      </div>
      <h1>The instgram Logo</h1>
      {posts.map(post => (
        <Post 
          username={post.username} 
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
