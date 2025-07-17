import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchFollowers } from "../api/githubapi";
import type { User } from "../types/github";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (users: User[]) => void;
  onError: (message: string) => void;
  setLoading: (loading: boolean) => void;
}

const schema = z.object({
  username: z.string().min(1, "Username is required"),
});

type FormData = z.infer<typeof schema>;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onError, setLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    onError("");
    setLoading(true);
    try {
      const followers = await fetchFollowers(data.username);
      onSearch(followers);
    } catch (err: any) {
      onError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Search className="w-5 h-5 text-blue-600" />
          Search Users
        </CardTitle>
        <CardDescription className="text-gray-600">
          Enter a username to find up to 5 similar GitHub users
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center mt-8"
        >
          <div className="flex w-full max-w-xl gap-2">
            <input
              type="text"
              {...register("username")}
              placeholder="Enter GitHub username(e.g. wiwin, bruno, mars)"
              className="border border-gray-300 focus:border-black focus:outline-none px-4 py-2 rounded-md w-full"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              Search
            </button>
          </div>

          {errors.username && (
            <p className="text-red-500 mt-2">{errors.username.message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchBar;
