import { useCachedFetch } from "./useCachedFetch";

const DataDisplay = () => {
  const { data, loading, error, refresh } = useCachedFetch<
    { id: number; name: string }[]
  >(
    "https://jsonplaceholder.typicode.com/users",
    300000 // Cache for 5 minutes
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={refresh}>Refresh Data</button>
    </div>
  );
};

export default DataDisplay;
