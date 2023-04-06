import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../lib/init-firebase";

import './post.css'
const PostWord = () => {

  const [file, setFile] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')



  const handleChange = (e) => {

    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const storage = getStorage();
    var storagePath = file.name;;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((urls) => {
            console.log('file available at', urls);
            const wordCollectionRef = collection(db, 'word')
            addDoc(wordCollectionRef, { urls, name, desc })
            setUrls((prevState) => [...prevState, urls]);
          })
      })
  };
  console.log("urlData", urls);
//Here's a code snippet for handling file uploads using Firebase Storage in JavaScript.
//This line creates a reference to the storage location where the file will be uploaded.




  return (
    <div>
      {/* <progress value={progress} max="100" /> */}
      <br />
      <section className='post-form'>
        <h2 style={{ margin: '10px 0' }}>Upload your document</h2>
        <div className='form-group'>
          <label htmlFor='title'>Doc's Name</label>
          <input type='text' name='title' id='name' value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea name='description' id='description' cols='30' rows='10' value={desc} onChange={e => setDesc(e.target.value)}></textarea>
        </div>

        <input type="file" multiple onChange={handleChange} />
        <div className="product-upload-btn">
          <button onClick={handleUpload}>Upload</button>

        </div>
        <h3>selected documents</h3>

        <section className="">
          {
          }
          {
            <div >
              <p>{file.name}</p>
            </div>

          }
        </section>
      </section>
      <br />
      {/* <input type="file" multiple onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleSend}>Send</button> */}
      <br />
      {/* {urls.map((url, i) => (
        <div key={i}>
          <a href={url} target="_blank">
            {url}
          </a>
        </div>
      ))} */}
      <br />

    </div>
  );
};


export default PostWord