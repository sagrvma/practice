import { Route, Routes, useParams } from "react-router";
import { allProblems } from "./problemRegistry";

const ProblemRenderer = () => {
  const { slug } = useParams<{ slug: string }>();

  const problem = allProblems.find((p) => p.slug === slug);

  if (!problem) {
    return <p>Component not found!</p>;
  }

  const Component = problem.Component;

  return <Component />;
};

const App = () => {
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/frontend/:slug" element={<ProblemRenderer />} />
    </Routes>
  </div>;
};

export default App;
