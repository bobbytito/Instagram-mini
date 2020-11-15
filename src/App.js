import './App.css';
import Post from './Post'

function App() {
  return (
    <div className="app">
      <div className="app_header">
          <img className="app_headerImage"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
          />
      </div>
      <h1>The instgram Logo</h1>

      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default App;
