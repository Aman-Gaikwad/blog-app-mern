// import React from 'react';
import { Label, TextInput, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa6";

export default function Signup() {
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
            <form className="flex flex-col gap-4">
              <div>
                <Label value="Your Username" />
                <TextInput id="username" type="text" placeholder="Username" />
              </div>
              <div>
                <Label value="Your Email" />
                <TextInput
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                />
              </div>
              <div>
                <Label value="Your Password" />
                <TextInput
                  id="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <Button gradientDuoTone="purpleToPink" type="submit">
                Sign Up
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
          </div>
        </div>
      </div>
    </>
  );
}
