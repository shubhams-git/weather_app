import { MiddleBar } from "./MiddleBar"
import { SignInButton } from "./SignInButton"

export const AppBar = ()=>{
    return <div className="flex justify-evenly pt-5">
                <div className="text-white text-4xl font-semibold content-center">
                    Bright SideUp
                </div>
                <MiddleBar/>
                <SignInButton/>
            </div>  
}