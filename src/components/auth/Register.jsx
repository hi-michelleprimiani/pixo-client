import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../managers/AuthManager";
import { Button } from "@radix-ui/themes";

export const Register = ({ setToken, setCurrentUserId }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    bio: "",
    location: "",
    imgurl: "",
    verifyPassword: "",
  });

  const [matchUnsuccessful, setMatchUnsuccessful] = useState(false);
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password === formData.verifyPassword) {
      const newUser = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        bio: formData.bio,
        location: formData.location,
        img_url: formData.imgurl,
      };

      registerUser(newUser).then((authInfo) => {
        if (authInfo && authInfo.token) {
          setToken(authInfo.token);
          setCurrentUserId(authInfo.user_id)
          navigate("/");
        } else {
          existDialog.current.showModal();
        }
      });
    } else {
      setMatchUnsuccessful(true);
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center">
      <section className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-center text-3xl font-semibold mb-6">Create an Account</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              className="form-input mt-1 block w-full"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              className="form-input mt-1 block w-full"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              className="form-input mt-1 block w-full"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              className="form-input mt-1 block w-full"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              className="form-input mt-1 block w-full"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Verify Password</label>
            <input
              className="form-input mt-1 block w-full"
              type="password"
              name="verifyPassword"
              value={formData.verifyPassword}
              onChange={handleInputChange}
              required
            />
            {matchUnsuccessful && (
              <p className="text-red-500 text-center">
                Password does not match
              </p>
            )}
          </div>

          <div className="mb-4 whitespace-pre-wrap">
            <label className="block text-gray-700">Tell Us About Yourself</label>
            <input
              className="form-input mt-1 block w-full"
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              className="form-input mt-1 block w-full"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Profile Picture</label>
            <input
              className="form-input mt-1 block w-full"
              type="text"
              name="imgurl"
              value={formData.imgurl}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <Button className="w-full">
              Get Started
            </Button>
            <Button
                className="w-full"
                variant="outline"
                onClick={() => navigate("/login")}
                >
                Back to Login
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};
