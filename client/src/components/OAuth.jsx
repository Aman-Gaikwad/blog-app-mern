import { FaGoogle } from "react-icons/fa6";
import { Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import {app} from '../firebase.config.js';
import { signInSuccess } from "../redux/user/userSlice.js";

export default function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () =>{
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt: "select_account"});
        try {
            const resultsFromGoogle =await signInWithPopup(auth,provider);
            const res = await fetch('/api/auth/google', {
              method: "POST",
              headers : {"Content-Type" : "application/json"},
              body : JSON.stringify({
                name: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                googlePhotoURL: resultsFromGoogle.user.photoURL
              }),
            });

            const data = await res.json();
            if(res.ok){
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
      <Button gradientDuoTone="redToYellow" outline onClick={handleGoogleClick}>
        <FaGoogle className="mr-2 h-5 w-5" />
        Continue with Google
      </Button>
    </>
  );
}
