import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import logout from "../assets/logout.png";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../Context/context";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const { isLogin, setisLogin, result, setUpdate, loading ,setLoginForm} =
    useContext(Appcontext);
  const [updatePass, setUpdatePass] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    website: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);

  const handleCopy = (pass) => {
    navigator.clipboard.writeText(pass);
    toast("password copied to clipboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/passwords/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      setUpdate((prev) => !prev);
    } catch (err) {
      console.log(err);
    }

    setUpdatePass(false);
    setFormData({
      website: "",
      username: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    if (!window.confirm ("Are you sure you want to logout?")) {
      return;
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setisLogin(false);
    setLoginForm ({email:"",password:""});
    navigate("/login");
    toast.info("Logging out...");

    toast.success("Logged out successfully");
  };

  const handleEdit = async (item) => {
    setUpdatePass(true);
    setFormData(item);
    try {
      await fetch("http://localhost:5000/api/passwords/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id: item._id }),
      });
      setUpdate((prev) => !prev);
      toast.success("Password updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this password?")) {
      return;
    }
    try {
      await fetch("http://localhost:5000/api/passwords/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id: id }),
      });
      setUpdate((prev) => !prev);
      toast.success("Password deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <section class="dots-container">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</section>;

  return (
    <div className="home">
      <nav>
        <div>
          <span style={{ color: "white" }}>Password/</span>
          <span style={{ color: "#0a031f" }}>Manager</span>
        </div>
        <div className="edit">
          {/* <span className="userName">Anil kumar</span> */}
          <img
            src={logout}
            onClick={handleLogout}
            alt="user"
            className="userLogo"
          />
        </div>
      </nav>

      <div className="getData">
        <h1>Welcome, Save your password's securely</h1>
        <form action="" className="getDetails" onSubmit={handleSubmit}>
          <input
            type="text"
            name="website"
            value={formData.website}
            required
            placeholder="Enter Website link or name"
            onChange={handleChange}
          />
          <div className="div">
            <input
              type="text"
              name="username"
              value={formData.username}
              required
              placeholder="Enter Username or Email"
              onChange={handleChange}
            />
            <div className="pass">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={formData.password}
                required
                placeholder="Enter Password"
                onChange={handleChange}
              />
              {/* <div style={{position:'absolute'}}> */}
              <svg
                onClick={() => setShowPass(!showPass)}
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              {/* </div> */}
            </div>
          </div>
          <button type="submit">
            {updatePass ? "Update Password" : "Add Password"}
          </button>
        </form>
      </div>
      <div className="line"></div>
      <div className="showData">
        <h2>Saved Passwords</h2>
        {result.map((item, index) => (
          <div
            className="card"
            key={index}
            style={{ backgroundColor: index % 2 === 0 ? "#ccfad5" : "" }}
          >
            <div className="cardDetails">
              <span>{item.website.length > 60 ? item.website.substring(0, 60) + "..." : item.website}</span>
              <span>{item.username}</span>
              <span style={{ alignContent: "center" }} className="flex">
                {"*".repeat(item.password.length)}
                <svg
                  onClick={() => {
                    handleCopy(item.password);
                  }}
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <div className="flex">
              <svg
                onClick={() => {
                  handleDelete(item._id);
                }}
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                onClick={() => handleEdit(item)}
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
