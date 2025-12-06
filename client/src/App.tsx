import { useEffect, useState } from "react";

const App = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>Practice</h1>
      <p>Backend status : {message || "Loading..."}</p>
    </div>
  );
};

export default App;
