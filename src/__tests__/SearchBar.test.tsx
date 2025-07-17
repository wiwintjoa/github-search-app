import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "../components/SearchBar";
import { vi } from "vitest";

let fetchFollowersMock: any;

vi.mock("../api/githubapi", () => {
  return {
    fetchFollowers: (...args: any[]) => fetchFollowersMock(...args),
  };
});

describe("SearchBar", () => {
  const mockOnSearch = vi.fn();
  const mockOnError = vi.fn();
  const mockSetLoading = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    fetchFollowersMock = vi.fn(() => Promise.resolve([{ id: 1, login: "mockuser", avatar_url: "" }]));
  });

  test("renders input and button", () => {
    render(
      <SearchBar
        onSearch={mockOnSearch}
        onError={mockOnError}
        setLoading={mockSetLoading}
      />
    );

    expect(screen.getByPlaceholderText(/Enter GitHub username/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("shows validation error when input is empty", async () => {
    render(
      <SearchBar
        onSearch={mockOnSearch}
        onError={mockOnError}
        setLoading={mockSetLoading}
      />
    );

    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);

    await screen.findByText("Username is required");
    expect(mockOnSearch).not.toHaveBeenCalled();
    expect(mockSetLoading).not.toHaveBeenCalled();
  });

  test("calls fetchFollowers and onSearch when input is valid", async () => {
    render(
      <SearchBar
        onSearch={mockOnSearch}
        onError={mockOnError}
        setLoading={mockSetLoading}
      />
    );

    const input = screen.getByPlaceholderText(/Enter GitHub username/i);
    fireEvent.change(input, { target: { value: "bruno" } });

    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(fetchFollowersMock).toHaveBeenCalledWith("bruno");
      expect(mockOnSearch).toHaveBeenCalledWith([{ id: 1, login: "mockuser", avatar_url: "" }]);
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  test("calls onError when fetchFollowers fails", async () => {
    fetchFollowersMock = vi.fn(() => Promise.reject(new Error("API failed")));

    render(
      <SearchBar
        onSearch={mockOnSearch}
        onError={mockOnError}
        setLoading={mockSetLoading}
      />
    );

    const input = screen.getByPlaceholderText(/Enter GitHub username/i);
    fireEvent.change(input, { target: { value: "bruno" } });

    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(mockOnError).toHaveBeenCalledWith("API failed");
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });
});