import { Link } from "react-router";
import { frontendProblems } from "../problemRegistry";

const Home = () => {
  return (
    <div>
      <h1>MERN Practice Problems</h1>
      <h2>Frontend Problems</h2>
      {frontendProblems.length === 0 ? (
        <p>No Frontend problems found!</p>
      ) : (
        <ul>
          {frontendProblems.map((p) => (
            <li key={p.id}>
              <Link to={p.path}>{p.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
