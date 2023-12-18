import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../managers/AuthManager";

export const Login = ({ setToken, setCurrentUserId }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUnsuccessful, setIsUnsuccessful] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };

    loginUser(user).then((authInfo) => {
      if (authInfo && authInfo.token) {
        setToken(authInfo.token);
        setCurrentUserId(authInfo.user_id);
        navigate("/");
      } else {
        setIsUnsuccessful(true);
      }
    });
  };

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center">
      <section className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-center text-3xl font-semibold mb-6">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              className="input"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isUnsuccessful && (
            <p className="text-red-500 text-center">
              Username or password not valid
            </p>
          )}

          <div className="mb-4 mt-6">
            <button className="bg-green hover:bg-black text-white py-2 px-4 rounded-full w-full">
              Login
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link
            className="text-black hover:text-green visited:text-black"
            to="/register"
          >
            Create an Account
          </Link>
        </div>
      </section>
    </main>
  );
};
