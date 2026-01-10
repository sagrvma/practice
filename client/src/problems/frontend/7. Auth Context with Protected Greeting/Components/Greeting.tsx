import { useAuth } from "../Context/AuthProvider";
import "./Greeting.css";

const Greeting = () => {
  const { user } = useAuth();

  return <h3>{user ? `Hi ${user.name}` : "Please Log In"}</h3>;
};

export default Greeting;
