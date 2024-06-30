import { Button, TextInput } from 'flowbite-react'
import {useSelector} from 'react-redux'
export default function DashProfile() {
    const {currentUser} = useSelector(state=>state.user)
  return (
    <div className="max-w-lg mx-auto w-full p-3">
      <h1 className='text-center text-3xl font-semibold'>Profile</h1>
      <form className='flex flex-col gap-4'> 
        <div className='w-32 h-32 self-center cursor-pointer  shadow-md overflow-hidden rounded-full '>
            <img src={currentUser.profilePicture} alt='user' className='rounded-full h-full w-full border-8 border-[lightgray] object-cover '/>
        </div>
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
