import {useState, useEffect} from 'react'
import './App.css';
import Post from './Post'
import {db, auth} from './firebase'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload'
import InstagramEmbed from 'react-instagram-embed';


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
  const [user, setUser] = useState(null)
  const [openSignIn, setOpenSignIn] = useState(false)

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in.....
        console.log(authUser)
        setUser(authUser)
      } else {
        // user has logged out....
        setUser(null)
      }

    })
    return () => {
      //perform some cleanup actions
      unsubscribe();
    }
  }, [user, username])

  //use effect function that connects to the database whenever the app runs
    useEffect(() => {
      db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({ id: doc.id, post: doc.data() })
        ))
      })
    }, [])

    const signUp = (event) => {
      event.preventDefault()

      auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))
    }

    const signIn = (event) => {
      event.preventDefault()

      auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

    setOpenSignIn(false)
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
                <Button type="submit" onClick={signUp}>Sign Up</Button>
            </form>
          </div>
        </Modal>

        <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}
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
                <Button type="submit" onClick={signIn}>Sign In</Button>
            </form>
          </div>
        </Modal>

      <div className="app_header">
          <img className="app_headerImage"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
          />
          { user ? (
          <Button onClick={()=> auth.signOut()}>Logout</Button>
          ): (
          <div className="app_loginContainer">
            <Button onClick={()=> setOpenSignIn(true)}>SignIn</Button>
            <Button onClick={()=> setOpen(true)}>Sign Up</Button>
          </div>
          )}
      </div>

      <div className="post_container">
        <div className="app_postleft">
            {posts.map(({id, post}) => (
              <Post key={id}
              postId={id}
                username={post.username} 
                caption={post.caption}
                imageUrl={post.imageUrl}
              />
            ))
            }
        </div>

        <div className="app_postright">
          <InstagramEmbed
            url='https://instagr.am/p/Zw9o4/'
            clientAccessToken='123|456'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>

      </div>
      
     {user?.displayName ? (
        <ImageUpload username={user.displayName}/>
      ): (
        <h3>You need to login to upload</h3>
      )}

    
    </div>
    
  );
}

export default App;
