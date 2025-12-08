import { useState } from "react";

const users = [
  { id: 1, name: "Alice Johnson", role: "Frontend Dev" },
  { id: 2, name: "Bob Smith", role: "Backend Dev" },
  { id: 3, name: "Charlie Brown", role: "Designer" },
  { id: 4, name: "Diana Prince", role: "Product Manager" },
  { id: 5, name: "Ethan Hunt", role: "DevOps Engineer" },
];

const UserDirectory = () => {
  const [searchText, setSearchText] = useState<string>("");

  const filteredList = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.role.toLowerCase().includes(searchText.toLowerCase())
  ); //Not needed to store in a state as when searchText changes, react re-renders the entire component anyways

  return (
    <>
      <h1>User Directory</h1>
      <input
        type="text"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      {filteredList.length === 0 ? (
        <h2>No users found.</h2>
      ) : (
        <ul>
          {filteredList.map((user) => (
            <li key={user.id}>
              {user.name} - {user.role}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export const meta = {
  title: "User Directory Filter",
  category: "frontend" as const,
};
export default UserDirectory;
