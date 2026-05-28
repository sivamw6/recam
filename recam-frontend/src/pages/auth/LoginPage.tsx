import { useState } from "react";

const LoginPage = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
              className="border rounded-lg p-1 focus:outline-1"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label>Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
