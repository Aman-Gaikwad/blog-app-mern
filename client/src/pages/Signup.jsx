// import React from 'react';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Link,  useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa6";
import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id] : e.target.value.trim()});
    // console.log(formData);
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage("Please Fill out all fields.")
    }

    try{
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(formData),
      });

      const data = await res.json();
      // console.log(data);
      if(data.success === false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/signin');
      }


    } catch(error){
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen mt-20">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          {/* left side  */}
          <div className="flex-1">
            <Link to="/" className="font-bold text-4xl dark:text-white ">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
                Roger&apos;s
              </span>{" "}
              Blog
            </Link>
            <p className="text-sm mt-5">
              This is a demo project. You can sign up or sign in or maybe just
              with Google.
            </p>
          </div>

          {/* right side */}
          <div className="flex-1">
            <form className="flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div>
                <Label value="Your Username" />
                <TextInput 
                id="username" 
                type="text" 
                placeholder="Username" 
                onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Your Email" />
                <TextInput
                  id="email"
                  type="email"
                  placeholder="name@gmail.com"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Your Password" />
                <TextInput
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
              <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
                {
                  loading? (
                    <>
                      <Spinner size='sm'/>
                      <span className='pl-3'>Loading....</span>
                    </>
                  ) :("Sign Up")
                }
                
              </Button>
            </form>

            <div className="flex flex-col gap-4 mt-2">
              <Button gradientDuoTone="redToYellow" outline>
                <FaGoogle className="mr-2 h-5 w-5" />
                Continue with Google
              </Button>
            </div>

            <div className="flex gap-2 text-sm mt-5">
              <span>Have an Account?</span>
              <Link to="/signin" className="text-blue-500">
                Sign In
              </Link>
            </div>

            {
              errorMessage && (
                <Alert className='mt-5' color='failure'>
                  {errorMessage}</Alert>
              )
            }

          </div>
        </div>
      </div>
    </>
  );
}
