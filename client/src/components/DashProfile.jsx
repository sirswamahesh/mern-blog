import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom'
export default function DashProfile() {
  const { currentUser,loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUplaodProgress] = useState(null);
  const [imageFileUploadError, setImageFileUplaodError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const fileImagePicker = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = () => {
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
    setImageUploading(true);
    setImageFileUplaodError(null);
    console.log("uploading ....");
    const storage = getStorage(app);

    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(
          progress,
          snapshot.bytesTransferred,
          snapshot.totalBytes,
          progress.toFixed(0)
        );
        setImageFileUplaodProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUplaodError(
          "Could not upload image (file must be less than 2MB)"
        );
        setImageFileUplaodProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageUploading(false);
        });
      }
    );
  };

  const handleInputChange = async (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageUploading) {
      setUpdateUserError("Please await for image to upload.");
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully!");
      }
    } catch (error) {
      dispatch(updateFailure(data.message));
      setUpdateUserError(data.message);
    }
  };

  const handleDeleteAccount = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full p-3 text-center">
      <h1 className="text-center text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileImagePicker}
          hidden
        />
        <div
          className=" relative w-32 h-32 self-center cursor-pointer  shadow-md overflow-hidden rounded-full "
          onClick={() => fileImagePicker.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199,${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full h-full w-full border-8 border-[lightgray] object-cover ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

        <TextInput
          placeholder="username"
          type="text"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleInputChange}
        />
        <TextInput
          placeholder="email"
          type="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleInputChange}
        />
        <TextInput
          placeholder="password"
          type="password"
          id="password"
          defaultValue="***********"
          onChange={handleInputChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={loading || imageUploading}>
          {loading ? "Loading...." : "Update"}
        </Button>
        {currentUser.isAdmin && (

          <Link to="/create-post">
          <Button type="button"className="w-full" gradientDuoTone="purpleToBlue">
            Create a post
          </Button>
          </Link>
        )}
      </form>

      <div className="flex justify-between mt-5 text-red-500">
        <span onClick={() => setShowModal(true)}>Delete Account</span>
        <span onClick={handleSignout}>Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ModalHeader />
        <ModalBody >
          <div className="text-center">
            <HiOutlineExclamationCircle
              className="w-14 h-14 text-gray-400 mb-5 mx-auto  dark:text-gray-200"
              color=""
            />
            <h3 className="text-lg text-gray-500 mb-5 dark:text-gray-200">
              Are you sure you want to delete this account.
            </h3>
            <div className="flex justify-center gap-5">
              <Button color="failure" onClick={handleDeleteAccount}>
                yes,i'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No,cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
