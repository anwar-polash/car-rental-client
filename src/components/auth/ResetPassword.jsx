import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const ResetPassword = () => {
  document.title = "Reset Password | Chill Gamer";
  const navigate = useNavigate();
  const { sendPasswordResetEmailToUser, forgotEmail, setForgotEmail } =
    useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setEmail(forgotEmail);
  }, [forgotEmail]);

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please fill all the fields");
      return;
    }

    sendPasswordResetEmailToUser(email)
      .then(() => {
        toast.success(`Check your email for password reset link.`);
        setForgotEmail("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        setError(
          "Failed to send reset link. Please try again. " + error.message
        );
      });
  };

  return (
    <div
      data-aos="fade-up"
      className="max-w-[600px] w-full mx-auto px-4 lg:px-0 bg-[#F5A529] shadow-2xl border border-yellow-500 mt-[3rem] rounded-lg mb-12">
      <div className="p-12">
        <h2 className="text-center text-semibold text-[1.8rem] text-white">
          Reset Password
        </h2>
        <p className="text-center pb-4 text-white">
          Please enter your email to reset password
        </p>

        <form onSubmit={handleResetPassword}>
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="grow py-2"
              placeholder="Email"
            />
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="btn text-lg btn-primary w-full mt-6 bg-[#0B0854] border-none">
            Reset Password
          </button>
        </form>

        <p className="text-start text-sm py-4">
          Remember Password?
          <Link
            to="/login"
            className="text-blue-500 hover:underline ml-1 text-white">
            Login
          </Link>
        </p>
        <hr />
        <p className="text-center text-sm py-4">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-500 hover:underline ml-1 text-white">
            SignUp
          </Link>
        </p>
        <hr />
      </div>
    </div>
  );
};

export default ResetPassword;
