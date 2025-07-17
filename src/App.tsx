import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import UserAccordion from "./components/UserAccordion";
import Spinner from "./components/Spinner";

import type { User } from "./types/github";
import "./App.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <Header />

        <SearchBar
          onSearch={setUsers}
          onError={setError}
          setLoading={setLoading}
        />

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}

        <div className="mt-8">
          {loading && (
            <div className="flex justify-center items-center mt-12">
              <Spinner />
            </div>
          )}

          {!loading && users.length > 0 && (
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Search Results</CardTitle>
                <CardDescription className="text-gray-600">
                  Click on a user to view their repositories.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {users.map((user) => (
                  <UserAccordion key={user.id} user={user} />
                ))}
              </CardContent>
            </Card>
          )}

          {!loading && users.length === 0 && (
            <div className="text-center text-gray-600 mt-12">
              <p className="text-gray-500">
                Powered by{" "}
                <a href="https://github.com" className="text-blue-500">
                  github.com
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
