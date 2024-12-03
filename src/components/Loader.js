import { PuffLoader } from "react-spinners";

export default function Loader({ loading }) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
        loading ? "visible" : "hidden"
      }`}
    >
      <PuffLoader color="#4A90E2" loading={loading} size={60} />
    </div>
  );
}
