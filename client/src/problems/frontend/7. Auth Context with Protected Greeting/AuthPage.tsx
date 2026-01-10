import AuthForm from "./Components/AuthForm";
import Greeting from "./Components/Greeting";
import { AuthProvider } from "./Context/AuthProvider";
import "./AuthPage.css";

const AuthPage = () => {
  return (
    <AuthProvider>
      <div className="wrapper">
        <div className="title">Auth Page</div>
        <Greeting />
        <AuthForm />
      </div>
    </AuthProvider>
  );
};

export default AuthPage;

export const meta = {
  title: "Auth Context with Protected Greeting",
  category: "frontend" as const,
};
