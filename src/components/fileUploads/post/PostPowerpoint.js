import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../lib/init-firebase";

import './post.css'
const Post = () => {

  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')



  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = () => {
    const promises = [];

    images.map((image) => {

      const storage = getStorage();
      var storagePath = image.name;;
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, image);

      promises.push(uploadTask);

      //progress of uploads
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
        (error) => {
          console.log(error)
        },
        () => {
          //get the image url 
          getDownloadURL(uploadTask.snapshot.ref)
            .then((urls) => {
              console.log('file available at', urls);
              var urls = urls;
              const resourceCollectionRef = collection(db, 'uploads')
              //add values to firestore firebase

              addDoc(resourceCollectionRef, { urls, name, desc })
              setUrls((prevState) => [...prevState, urls]);
            })
        }
      )
    });

    Promise.all(promises)
      .then(() => alert("All images uploaded"),
        setUrls(urls),

      )
      .catch((err) => console.log(err))


  };
  console.log("urlData", urls);

  return (
    <div>
      {/* <progress value={progress} max="100" /> */}
      <br />
      <section className='post-form'>
        <h2 style={{ margin: '10px 0' }}>Upload your powerpoint document</h2>
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
        <section className="selected-image">
          {urls.map((url, i) => (
            <div>
              <img
                key={i}

                src={url || "http://via.placeholder.com/300"}
                alt="firebase"
              />
            </div>
          ))}
        </section>
        <section className="">
          {urls.map((url, i) => (
            <div>
              {url}
            </div>
          ))}
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


export default Post