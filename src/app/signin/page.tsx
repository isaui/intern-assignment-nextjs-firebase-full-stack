'use client'
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'
import { BiUserCircle } from "react-icons/bi";
import { CgPassword } from "react-icons/cg";
import TextField from "../component/elements/TextField";

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleSignIn = async () => {

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/admin")
    }
    return (<div className="h-screen  flex flex-col justify-center items-center">
        <div className="text-center text-2xl font-bold">Please Sign In</div>
       <div className="w-full max-w-sm flex flex-col my-6">
                     <TextField readonly={false} textfieldKey={"Email"} value={email} placeholder="Enter your email" 
                     isPassword={false} icon={<BiUserCircle 
                        className="text-xl" color="white"/>} onChangeValue={function (text: string): void {
                        setEmail(text)
                    } }/>
                     <TextField readonly={false} textfieldKey={"Password"} value={password} placeholder="Enter your password"
                      isPassword={true} icon={<CgPassword className="text-xl" color="white"/>} onChangeValue={function (text: string): void {
                        setPassword(text)
                    } }/>
                     <button onClick={handleSignIn} className="mt-6 px-4 py-2 auth-popup-btn w-full rounded-2xl">Sign In</button>
                </div>
    </div>);
}

export default Page;