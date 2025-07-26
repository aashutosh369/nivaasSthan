import React, { createContext } from 'react'
export const authDataContext = createContext()
function AuthContext({children}) {
    const serverUrl = "http://localhost:8000/";
                     // http://localhost:8000/api/auth/signup
    let value={
        serverUrl,
      
    }
  return (
    <div>
     <authDataContext.Provider value={value}>
        {children}
     </authDataContext.Provider>
    </div>
  )
}

export default AuthContext;
