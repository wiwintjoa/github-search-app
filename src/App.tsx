import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import UserAccordion from "./components/UserAccordion";
import type { User } from "./types/github";
import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <Header />

        <SearchBar onSearch={setUsers} onError={setError} />

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}

        <div className="mt-8">
          {users.length > 0 ? (
            users.map((user) => <UserAccordion key={user.id} user={user} />)
          ) : (
            <div className="text-center text-gray-600 mt-12">
              <p>🔍 Ready to explore GitHub?</p>
              <p>
                Enter a GitHub username to discover users and explore their
                repositories.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App
