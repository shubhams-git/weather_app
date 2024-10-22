import { SyncLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <SyncLoader color="#3498db" size={20} />
      <span className="ml-2">Loading...</span>
    </div>
  );
};
