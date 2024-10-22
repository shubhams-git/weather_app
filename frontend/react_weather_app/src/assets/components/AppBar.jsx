import { MiddleBar } from "./MiddleBar"
import { SignInButton } from "./SignInButton"

export const AppBar = ()=>{
    return <div className="flex justify-evenly pt-2">
                <div className="text-white text-2xl font-semibold content-center">
                    Bright SideUp
                </div>
                <MiddleBar/>
                <SignInButton/>
            </div>  
}