import { D3Logo } from "./D3Logo"
import { FastApiLogo } from "./FastAPILogo"
import { OpenWeatherMapLogo } from "./OpenWeatherMapLogo"
import { PythonLogo } from "./PythonLogo"
import { ReactLogo } from "./ReactLogo"
import { ViteLogo } from "./ViteLogo"

export const AboutPage =() =>{
    return <div className="pt-10">
            <div className="flex justify-center font-playwrite text-white text-3xl">
                Here's Our <span className="font-extrabold from-sky-200 via-cyan-400 to-blue-300 bg-gradient-to-l bg-clip-text text-transparent px-2">  Tech-Stack! </span>
            </div>
            <div>
                <ReactLogo />
                <FastApiLogo />
                <PythonLogo/>
                <ViteLogo/>
                <D3Logo/>
                <OpenWeatherMapLogo/>
            </div>
            
            
        </div>
}