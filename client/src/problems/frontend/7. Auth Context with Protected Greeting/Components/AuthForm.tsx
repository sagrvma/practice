import { useState } from "react";
import { useAuth, type AuthContextType } from "../Context/AuthProvider";
import "./AuthForm.css";

const AuthForm = () => {
  const [inputText, setInputText] = useState<string>("");

  const { user, login, logout } = useAuth();

  const handleSubmit = () => {
    if (user) {
      logout();
      setInputText("");
    } else {
      if (inputText) {
        login(inputText);
        setInputText("");
      }
    }
  };

  return (
    <div className="formWrapper">
      <input
        className="inputText"
        type="text"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      <button className="btn" onClick={handleSubmit}>
        {user ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default AuthForm;
