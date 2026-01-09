import AuthForm from "./Components/AuthForm";
import { AuthProvider } from "./Context/AuthProvider";

const AuthPage = () => {
  return (
    <AuthProvider>
      <div>
        <h1>Auth Page</h1>
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
