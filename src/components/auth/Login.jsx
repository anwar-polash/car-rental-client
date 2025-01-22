import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiEyeOff } from "react-icons/hi";
import { HiEye } from "react-icons/hi2";
import useAuth from "./../../hooks/useAuth";
import { toast } from "react-toastify";
import modern from "../../assets/images/undraw_Modern_design_re_dlp8.png";

const Login = () => {
  document.title = "Login | Car Rental";
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const { loginWithGooglePopup, setUser, logIn, setForgotEmail } = useAuth();

  const handleLogin = (e) => {
    setError("");
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }

    logIn(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success(`Login successful!`);
        setForgotEmail("");
        navigate(state ? state : "/");
      })
      .catch((error) => {
        setError(
          "Failed to login with Google. Please try again. " + error.message
        );
      });
  };

  const handleLoginWithGoogle = () => {
    loginWithGooglePopup()
      .then((result) => {
        setUser(result.user);
        toast.success(`Login successful!`);
        navigate(state ? state : "/");
      })
      .catch((error) => {
        setError(
          "Failed to login with Google. Please try again. " + error.message
        );
      });
  };

  return (
    <div
      data-aos="fade-up"
      className="max-w-[1000px] my-20 w-full mx-auto px-4 lg:px-0 bg-[#F5A529] shadow-2xl border border-yellow-500 mt-[3rem] rounded-lg  flex flex-col lg:flex-row ">
      <div className="max-w-full lg:max-w-[40%]">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={modern}
          alt=""
        />
      </div>
      <div className="p-12 space-y-4 lg:max-w-[60%] mx-auto">
        <h2 className="text-center text-semibold text-[1.8rem] text-white">
          Login
        </h2>
        <p className="text-center pb-4">Please login to your account</p>
        <form onSubmit={handleLogin} className="space-y-5">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
                setForgotEmail(e.target.value);
              }}
              value={email}
              className="grow py-2"
              placeholder="Email"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>

            <input
              type={showPassword ? "text" : "password"}
              className="grow"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer">
              {showPassword ? (
                <HiEyeOff className="text-blue-600 text-xl" />
              ) : (
                <HiEye className="text-blue-600 text-xl" />
              )}
            </span>
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="btn text-xl bg-[#0B0854] text-white border-none w-full mt-6">
            Login
          </button>
        </form>
        <p className="text-center text-sm">
          Forget password?
          <Link
            to="/reset-password"
            className="text-white hover:underline ml-1">
            Reset Password
          </Link>
        </p>
        <hr />
        <p className="text-center text-sm">
          Don't have an account?
          <Link to="/register" className="text-white hover:underline ml-1">
            SignUp
          </Link>
        </p>
        <hr />
        <button
          onClick={handleLoginWithGoogle}
          className="btn flex justify-center gap-2 w-[80%] border-2 border-solid border-black text-center py-2 font-bold mx-auto bg-[#0B0854] text-white"
          href="">
          <p>
            <i className="fa-brands fa-google"></i>
          </p>
          Login With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
