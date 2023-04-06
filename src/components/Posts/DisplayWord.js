import { onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { uploadCollectionRef, wordCollectionRef } from '../../lib/firestoreCollections';
import './display.css'
import { Link } from 'react-router-dom';
const DisplayWord = () => {
    const [files, setFiles] = useState([]);
    useEffect(()=>{
        const unSubscribe = onSnapshot(wordCollectionRef, snapshot=>{
            setFiles(snapshot.docs.map(doc=>({id:doc.id, power:doc.data()})))
        })
        return unSubscribe;
    })

    const handleDisplayFile = () => {
        alert('File is downloading')
    }

  return (
    <div>
    {files.length === 0 && 
    (
        <p>No uploads</p>
    )
    }
        {
            files.map(file=>(
                <div key={file.id} className='item-data' >
                        <Link to={ `/display/word/${file.id}`}>
                            <section>
                                <h1>{file.power.name}</h1>
                                <p>{file.power.desc}</p>
                            </section>
                        </Link>
                    <a href={file.power.urls} target="blank" onClick={handleDisplayFile}>
                        DownLoad
                     </a>
                </div>
                
            ))
        }
    </div>
  )
}

export default DisplayWord