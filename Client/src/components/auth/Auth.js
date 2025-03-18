import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setSuccess("");
    if (!emailId || !password) {
      setError("Email and Password are required");
      return;
    }
    try {
      await axios.post("http://localhost:2000/login", { emailId, password }, { withCredentials: true });
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/restaurants"), 1500);
    } catch (err) {
      setError(err?.response?.data || "Invalid email or password!");
    }
  };

  const handleSignup = async () => {
    setError("");
    setSuccess("");
    if (!firstName || !lastName || !emailId || !password) {
      setError("All fields are required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    try {
      await axios.post("http://localhost:2000/signup", { firstName, lastName, emailId, password }, { withCredentials: true });
      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err?.response?.data || "Signup failed! Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md border border-gray-200">
        {success && <p className="text-green-600 text-center font-semibold mb-4">{success}</p>}
        {error && <p className="text-red-500 text-center font-semibold mb-4">{error}</p>}
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          {isLoginForm ? "Login" : "Signup"}
        </h2>
        <form className="space-y-5">
          {!isLoginForm && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                className="input input-bordered w-full h-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                className="input input-bordered w-full h-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={emailId}
            className="input input-bordered w-full h-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmailId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="input input-bordered w-full h-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-sm text-center text-gray-600">
            {isLoginForm ? "New user? " : "Already have an account? "}
            <span
              onClick={() => setIsLoginForm(!isLoginForm)}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              {isLoginForm ? "Signup" : "Login"}
            </span>
          </p>
          <button
            type="button"
            className="w-full h-12 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all shadow-md"
            onClick={isLoginForm ? handleLogin : handleSignup}
          >
            {isLoginForm ? "Login" : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
