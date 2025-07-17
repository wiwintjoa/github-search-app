export default function Header() {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        GitHub User Search
      </h1>
      <div className="text-center text-gray-600 mt-8">
        <p>Ready to explore GitHub?</p>
        <p>
          Enter a GitHub username to discover users and explore their
          repositories.
        </p>
      </div>
    </header>
  );
}
