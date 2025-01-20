import { Link } from "react-router-dom";

const NotFoundPage = () => {
  document.title = "404 Not Found | Car Rental";
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-2xl w-full bg-blue-100 rounded-lg shadow-lg p-10 flex flex-col gap-16 items-center mb-20">
        <h1 className="text-3xl font-semibold text-center">404 Not Found</h1>
        <p className="text-center">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-[#FFC147] text-white rounded hover:bg-[#FFC147]">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
