import { useState } from "react";
import { useAuth, type AuthContextType } from "../Context/AuthProvider";

const AuthForm = () => {
  const [inputText, setInputText] = useState<string>();

  const { user, login, logout } = useAuth();

  const handleSubmit = () => {
    if (user) {
      logout();
      setInputText("");
    } else {
      if (inputText) {
        login(inputText);
      }
    }
  };

  return (
    <div>
      <h1>Auth Form</h1>

      <h1>{user ? `Hi ${user.name}` : "Please Log in"}</h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>{user ? "Logout" : "Login"}</button>
    </div>
  );
};

export default AuthForm;
