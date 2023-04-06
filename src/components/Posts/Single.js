import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { uploadCollectionRef } from '../../lib/firestoreCollections';
import { onSnapshot } from 'firebase/firestore';

const Single = () => {
    const params = useParams();
    console.log(params);
    const [files, setFiles] = useState(null);
    useEffect(()=>{
        const unSubscribe = onSnapshot(uploadCollectionRef, snapshot=>{
            setFiles(snapshot.docs.map(doc=>({id:doc.id, power:doc.data()})))
        })
        return unSubscribe;
    }, [])

    const found  = files && files.find(file=>file.id === params.id);
    console.log(found);

  return (
    <div>
        {
            found && (
                <div>
                    <h1>{found.power.name}</h1>
                    <p>{found.power.desc}</p>
                    <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(found.power.urls)}`} width="100%" height="600px" frameborder="0" title='app'></iframe>
                </div>
            )
        }
    </div>
  )
}

export default Single