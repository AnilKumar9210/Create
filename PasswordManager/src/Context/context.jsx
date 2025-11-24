import { createContext, useEffect, useState } from "react";

export const Appcontext = createContext();

export const AppProvider = ({ children }) => {
  const [isLogin, setisLogin] = useState(false);
  const [loginForm,setLoginForm] = useState ({email:"",password:""});
  const [result, setResult] = useState([]);
  const [user, setUser] = useState("");
  const [update,setUpdate] = useState (false);
  const [loading , setLoading] = useState (true);
 
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5000/api/passwords/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setResult(data);
      } catch (err) {
        console.log(err);
      }  finally {
        setLoading (false)
      }
      console.log("hellow")
    }
    fetchData ();
  }, [update]);

  return (
    <Appcontext.Provider
      value={{
        setUpdate,
        loginForm,
        setLoginForm,
        isLogin,
        setisLogin,
        result,
        user,
        setUser,
        setResult,
        loading,
      }}
    >
      {children}
    </Appcontext.Provider>
  );
};
