import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../managers/AuthManager";
import { Button } from "@radix-ui/themes";
import { FormInput } from "../utils/FormInput";

export const Register = ({ setToken, setCurrentUserId }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    bio: "",
    location: "",
    imgurl:
      "https://i.pinimg.com/736x/a9/a9/88/a9a98869ff5558d9e853b6d7c34fe500.jpg",
    verifyPassword: "",
  });

  const [matchUnsuccessful, setMatchUnsuccessful] = useState(false);
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
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
          setCurrentUserId(authInfo.user_id);
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
      <section className="bg-white p-8 mt-10 rounded-lg shadow-lg w-96">
        <h1 className="text-center text-3xl font-semibold mb-6">
          Create an Account
        </h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <FormInput
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <FormInput
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <FormInput
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <FormInput
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <FormInput
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Verify Password</label>
            <FormInput
              type="password"
              id="verifyPassword"
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
            <label className="block text-gray-700">
              Tell Us About Yourself
            </label>
            <FormInput
              type="textarea"
              id="bio"
              value={formData.bio}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <FormInput
              type="text"
              id="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Profile Picture</label>
            <FormInput
              type="text"
              id="imgurl"
              value={formData.imgurl}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <Button className="w-full">Get Started</Button>
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
