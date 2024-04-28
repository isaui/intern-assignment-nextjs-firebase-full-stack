'use client'
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation'
import { BiUserCircle } from "react-icons/bi";
import { CgPassword } from "react-icons/cg";
import TextField from "../component/elements/TextField";
import { toast } from "react-toastify";

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleSignUp = async () => {

        const { result, error } = await signUp(email, password);

        if (error) {
            return toast.error("email or password is empty")
        }
        toast.success("successfully sign up as "+ email)

        // else successful
        console.log(result)
        return router.push("/admin")
    }
    return (<div className="h-screen  flex flex-col justify-center items-center">
        <div className="text-center text-2xl font-bold">Please Sign Up</div>
       <div className="w-full max-w-sm flex flex-col my-6">
                     <TextField readonly={false} textfieldKey={"Email"} value={email} placeholder="Add your email" 
                     isPassword={false} icon={<BiUserCircle 
                        className="text-xl" color="white"/>} onChangeValue={function (text: string): void {
                        setEmail(text)
                    } }/>
                     <TextField readonly={false} textfieldKey={"Password"} value={password} placeholder="Add your password"
                      isPassword={true} icon={<CgPassword className="text-xl" color="white"/>} onChangeValue={function (text: string): void {
                        setPassword(text)
                    } }/>
                     <button onClick={handleSignUp} className="mt-6 px-4 py-2 auth-popup-btn w-full rounded-2xl">Sign Up</button>
                </div>
    </div>);
}

export default Page;