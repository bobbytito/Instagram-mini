import React, {useState} from 'react'
import Button from "@material-ui/core/Button"

function ImageUpload() {
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState('')
    const [progress, setProgress] = useState(0)

    const handleChange = (event) => {
        if(event.target.file[0]) {
            setImage(event.target.file[0])
        }
    }

    const handleUpload = () => {

    }

    return (
        <div>
            <h1>Image</h1>
            <input type="text" onChange={(event) => setCaption(event.target.value)} placeholder="Enter a caption" value={caption} />
            <input type="file" onChange={handleChange} placeholder="Enter file image" value={image} />
            <Button onClick={handleUpload} >
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
