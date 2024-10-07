import { useEffect, useState } from "react";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase.config";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

export default function CreatePost() {
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const validImageFileTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/bmp",
    "image/svg+xml",
    "image/tiff",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!validImageFileTypes.includes(file.type)) {
        setImageFileUploadError(
          "Invalid file type. Only image files are allowed."
        );
      } else if (file.size > MAX_FILE_SIZE) {
        setImageFileUploadError(`File size exceeds the limit of 2 MB.`);
      } else {
        setImageFile(file);
      }
    }
  };
  // useEffect(() => {
  //   if (imageFile) {
  //     uploadImage();
  //   }
  // }, [imageFile]);

  const uploadImage = async () => {
    if(!imageFile){
      setImageFileUploadError("Please select a image to upload.");
      return;
    }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName =
      new Date().getTime() +
      imageFile.name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9-_.]/g, "");
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)",
          error
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, image: downloadURL });
          setImageFileUploading(false);
        });
        setImageFileUploadProgress(null);
      }
    );
  };

  return (
    <>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">
          Create a post
        </h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              className="flex-1"
              onChange={(e) =>{
                setFormData({ ...formData, title: e.target.value});
              }}
            />
            <Select
              onChange={(e) =>{
                setFormData({ ...formData, category: e.target.value});
              }}
            >
              <option value="uncategorized">Select a category</option>
              <option value="javascript">JavaScript</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
            </Select>
          </div>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              onClick={uploadImage}
              className="w-40 h-10 relative overflow-hidden"
              disabled={imageFileUploadError || imageFileUploadProgress}
            >
              {imageFileUploadProgress ? (
              <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute w-full h-full rounded bg-gray-200">
                <div
                  className={`h-full rounded bg-green-600`}
                  style={{ width: `${imageFileUploadProgress}%` }}
                />
              </div>
              <span className="absolute text-black font-semibold">{`${imageFileUploadProgress || 0}%`}</span>
            </div>
            ) : (
              'Upload Image'
            )}
            </Button>
          </div>
          {imageFileUploadError &&
            <Alert color='failure'>
              {imageFileUploadError}
            </Alert>
          }
          {formData.image && (
            <img
              src={formData.image}
              alt='upload'
              className='w-full h-72 object-cover'
            />
            )
          }
          <ReactQuill
            placeholder="Write something..."
            className="h-72 mb-12"
            required
            onChange={(value)=>{
              setFormData({...formData, content:value});
            }}
          />
          <Button type="submit" gradientDuoTone="purpleToPink" disabled={imageFileUploading || imageFileUploadError}>
            Publish
          </Button>
        </form>
      </div>
    </>
  );
}
