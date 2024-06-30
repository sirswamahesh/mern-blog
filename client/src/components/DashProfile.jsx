import { Alert, Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase'
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
export default function DashProfile() {
    const {currentUser} = useSelector(state=>state.user);
    const [imageFile,setImageFile] = useState(null);
    const [imageFileUrl,setImageFileUrl] = useState(null);
    const [imageFileUploadProgress,setImageFileUplaodProgress] = useState(null);
    const [imageFileUploadError,setImageFileUplaodError] = useState(null);
const fileImagePicker = useRef();
    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        if(file){
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file))
        }
    }


    useEffect(()=>{
        if(imageFile){
            uploadImage();
        }
    },[imageFile]);
    const uploadImage = ()=>{
        // rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//        allow write: if
//        request.resource.size < 2*1024 *1024 && 
//        request.resource.contentType.matches('image/.*')
       
//     }
//   }

// }
setImageFileUplaodError(null)
        console.log("uploading ....");
       const storage =  getStorage(app);

       const fileName = new Date().getTime()+imageFile+name; 
       const storageRef = ref(storage,fileName);
       const uploadTask = uploadBytesResumable(storageRef,imageFile);
       uploadTask.on('state_changed',(snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setImageFileUplaodProgress(progress.toFixed(0))
       },
       (error)=>{
        setImageFileUplaodError("Could not upload image (file must be less than 2MB)");
        setImageFileUplaodProgress(null)
        setImageFile(null);
        setImageFileUrl(null)
       },
       ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageFileUrl(downloadURL)
        })
       }
      )
    }

    console.log(imageFileUploadProgress,imageFileUploadError)
  return (
    <div className="max-w-lg mx-auto w-full p-3">
      <h1 className='text-center text-3xl font-semibold'>Profile</h1>
      <form className='flex flex-col gap-4'> 
        <input type='file' accept='image/*' onChange={handleImageChange} ref={fileImagePicker} hidden />
        <div className=' relative w-32 h-32 self-center cursor-pointer  shadow-md overflow-hidden rounded-full ' onClick={()=>fileImagePicker.current.click()}>
           {imageFileUploadProgress && (<CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} strokeWidth={5} 
           styles={{
            root:{
              width:"100%",
              height:"100%",
              position:"absolute",
              top:0,
              left:0
            },
            path:{
              stroke:`rgba(62,152,199,${imageFileUploadProgress/100})`
            }
           }}
          />)}
            <img src={imageFileUrl || currentUser.profilePicture} alt='user' className={`rounded-full h-full w-full border-8 border-[lightgray] object-cover ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`}/>
        </div>
        {imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>}
        
        <TextInput placeholder='username' type='text' id='username' defaultValue={currentUser.username}/>
        <TextInput placeholder='email' type='email' id='email' defaultValue={currentUser.email}/>
        <TextInput placeholder='password' type='password' id='password' defaultValue="***********"/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
      </form>

      <div className='flex justify-between mt-5 text-red-500'>
        <span>Delete Account</span>
        <span>Sign Out</span>
      </div>
    </div>
  )
}
