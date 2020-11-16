import {useState, useEffect} from 'react'
import './App.css';
import Post from './Post'
import db from './firebase'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Button, Input } from '@material-ui/core';

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

function App() {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)

  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //use effect function that connects to the database whenever the app runs
    useEffect(() => {
      db.collection('posts').onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data()
        })))
    })
    }, [])

    const signUp = (event) => {

    }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={()=> setOpen(false)}
      >
        
          <div style={modalStyle} className={classes.paper}>
            <form className="app_form">
              <center>
                <img className="form_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
                alt=""
                />
              </center>
                <Input
                placeholder="username"
                type="text"
                value={username} 
                onChange={(event) => setUsername(event.target.value)}
                />
                <Input
                  placeholder="email"
                  type="text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Input 
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Button onClick={signUp}>Sign Up</Button>
            </form>
          </div>
        </Modal>

      <div className="app_header">
          <img className="app_headerImage"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
          />
      </div>

      <Button onClick={()=>setOpen(true)}>Sign Up</Button>
      <h1>The instgram Logo</h1>
      {posts.map(({id, post}) => (
        <Post key={id}
          username={post.username} 
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))
    }
    </div>
  );
}

export default App;
