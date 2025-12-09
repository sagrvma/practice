import { useEffect, useState } from "react";

const users_API = "https://jsonplaceholder.typicode.com/users";

type user = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const UserDirectory = () => {
  const [users, setUsers] = useState<Array<user>>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        if (!isMounted) {
          return;
        }

        setError("");
        setLoading(true);

        const res = await fetch(users_API);
        const data = await res.json();

        setUsers(data);
      } catch (error) {
        if (!isMounted) {
          return;
        }
        setError("Error fetching the users list!");
      } finally {
        if (!isMounted) {
          return;
        }
        setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredList = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
      <h2>{searchText}</h2>
      {filteredList.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {filteredList.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
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
