//Take the object of all imported problem modules, turn it into an array of [path, module] pairs, loop over each pair, and map it into a nicely structured ProblemEntry object. The result is strongly typed array problems that the rest of the app can use for routing and listing.

import type React from "react";

const modules = import.meta.glob("./problems/frontend/**/*.tsx", {
  //import.meta.glob is a Vite feature that imports multiple files that match a glob pattern in a single call
  eager: true, //eager set to true tells Vite to import all of them at runtime instead of returning lazy loader functions
});

//modules now is an object of the type { [path: string] : any}, where any is a module with .default, .meta, whatever the files export
/*
{
  "./problems/frontend/UserDirectory.tsx": {
    default: [Function UserDirectoryComponent],
    meta: { title: "User Directory Filter", category: "frontend" }
  },
  "./problems/frontend/AnotherProblem.tsx": {
    default: [Function AnotherProblemComponent],
    meta: { title: "Another Problem", category: "frontend" }
  },
  // ...etc for every .tsx file matching the glob
}
*/

//Define the shape of each problem in my registry
export type ProblemEntry = {
  id: string;
  slug: string;
  path: string; //for react-router
  title: string;
  category: "frontend";
  Component: React.ComponentType; //the actual component to be rendered
};

//Turn file names into URL slugs, e.g UserDirectory -> user-directory
const toSlug = (name: string) =>
  name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(); //Finds the first place where a lowercase character is immediately followed by an uppercase and inserts a hyphen between them, converts the whole thing to lowercase

const problems: ProblemEntry[] = Object.entries(modules).map(
  //Object.entries() converts an object {key :value} into an array [key, value]
  ([path, mod]: any) => {
    // path example: "./problems/frontend/UserDirectory.tsx"
    const filename = path.split("/").pop()!.replace(".tsx", ""); //"UserDirectory"
    const slug = toSlug(filename); //"user-directory"
    const meta = mod.meta ?? {};
    const title = meta.title ?? filename.replace(/([a-z])([A-Z])/g, "$1 $2"); //fallback "User Directory"
    const Component = mod.default;

    return {
      id: `frontend-${slug}`,
      slug,
      path: `/frontend/${slug}`,
      title,
      category: "frontend",
      Component,
    };
  }
);

export const allProblems = problems;
export const frontendProblems = problems; //Same for now, can later be changed and split amongst backend too
