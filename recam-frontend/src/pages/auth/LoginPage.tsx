import { useState } from "react";
import { useDispatch } from "react-redux"; // returns the Redux store's dispatch function, allowing components to trigger state changes by dispatching actions.
import { useNavigate } from "react-router";
import { mockLogin } from "../../mocks/authMock";
import { loginStart, loginSuccess, loginFailure } from "../../store/authSlice";
import type { AppDispatch } from "../../store/store";

const LoginPage = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginStart()); // once submit, trigger loading (from authSlice)
    try {
      const result = await mockLogin(formData.email, formData.password);
      // 1. store token and user info in Redux state for global access
      dispatch(loginSuccess({ token: result.token, user: result.user }));

      // 2. store token to localstorage
      localStorage.setItem("token", result.token);

      // 3. decide to navigate to which page base on role
      if (result.user.role === "photographyCompany") {
        navigate("/admin");
      } else {
        navigate("/agent");
      }
    } catch (error) {
      // instanceof here is to make sure that error is type Error then proceed to store error
      if (error instanceof Error) {
        dispatch(loginFailure(error.message));
      } else {
        dispatch(loginFailure("Login Failed"));
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}

      {/* Main Content */}
      <div className="flex flex-col items-center pt-20">
        {/* Title */}
        <h1 className="text-4xl  m-7">Sign in to your account</h1>
        {/* Card */}
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input
              className="border rounded-lg p-1 focus:outline-1 h-10"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label>Password</label>
            <input
              className="border rounded-lg p-1 focus:outline-1 h-10"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              className="w-full py-2 mt-4 rounded-lg text-white font-semibold bg-gradient-to-r from-recam-start via-recam-mid to-recam-end"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
