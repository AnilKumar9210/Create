import { Children, createContext, useContext, useState } from "react";

export const Appcontext = createContext ();

export const AppProvider = ({Children})=> {
    const [isLogin,setisLogin] = useState (true);
    const [result,setResult] = useState([]);
    return (<Appcontext.Provider 
    value={{
        isLogin,
        setisLogin,
        result,
    }}>
        {Children}
    </Appcontext.Provider>
    );
};
