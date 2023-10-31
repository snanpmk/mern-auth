import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { set } from "mongoose";
export default function Profile() {
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [error, setImageError] = useState(0);
  const [formData, setFormData] = useState({});
  console.log("uploading  " + imagePercent + " %");
  console.log(formData);
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
          setFormData({ ...formData, profilePicture: downloadUrl })
        );
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" action="">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          className="w-24 h-24 mt-2 self-center rounded-full object-cover cursor-pointer"
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {error ? (
            <span className="text-red-700">
              error in uploading image (file size must be less than 2 mb)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">
              {`Uploading : ${imagePercent} %`}
            </span>
          ) : imagePercent == 100 ? (
            <span className="text-green-700">Image uplaoded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="username"
          defaultValue={currentUser.username}
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          autoComplete="Username"
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          autoComplete="Email"
        />
        <input
          type="password"
          defaultValue={currentUser.password}
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          autoComplete="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5 ">
        <span className="text-red-700 cursor-pointer font-semibold">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer font-semibold">
          Sign out
        </span>
      </div>
    </div>
  );
}
