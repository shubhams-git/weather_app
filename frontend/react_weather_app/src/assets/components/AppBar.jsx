import { MiddleBar } from "./MiddleBar";
import { SignInButton } from "./SignInButton";
import { Link } from "react-router-dom";

export const AppBar = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-evenly mt-5">
      <div className="inline-flex justify-center my-5 sm:my-0 text-white text-2xl font-semibold">
        Bright SideUp
      </div>
      <div className="sm:inline-flex sm:items-end md:items-center">
        <hr className="sm:hidden block"/>
        <MiddleBar />
        <hr className="sm:hidden block"/>
      </div>
      <div className="inline-flex items-center">
        <SignInButton />
      </div>
    </div>
  );
};
