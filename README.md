# GitHub User Search Application

A modern React application that allows users to search for GitHub users and explore their repositories. Built with Vite, TypeScript, React.js, and Tailwind CSS.

## 🚀 Features

- **User Search**: Search for up to 5 GitHub users with similar usernames
- **Repository Explorer**: View all repositories for selected users with detailed information
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Real-time Search**: Instant search results with loading states
- **Error Handling**: Graceful error handling with user-friendly messages
- **Accessibility**: Full keyboard navigation and screen reader support
- **Modern UI**: Clean, professional interface using shadcn/ui components

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **API**: GitHub REST API
- **Testing**: Jest, React Testing Library
- **Deployment**: GitHub Pages

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/wiwintjoa/github-search-app.git
cd github-search-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:5173/](http://localhost:5173/) in your browser.

## 🚀 Deployment

This application is configured for deployment on GitLab:

1. Link your GitHub account with GitLab
2. Create or import your GitHub repository e.g. github-search-app
3. Make sure your project setting same as repository name
4. The app will be automatically deployed on push to main branch

## 🧪 Testing

Run the test suite:

\`\`\`bash
npx vitest
\`\`\`


## 📖 Usage

1. **Search for Users**: Enter a GitHub username in the search field and click "Search" or press Enter
2. **Select User**: Choose a user from the dropdown list of up to 5 results
3. **Explore Repositories**: View the selected user's repositories with details like:
   - Repository name and description
   - Star and fork counts
   - Programming language
   - Last updated date
   - Direct links to GitHub

## 🎯 API Endpoints

The application uses the following GitHub API endpoints:

- \`GET /search/users?q={username}&per_page=5\` - Search for users (limited to 5 results)
- \`GET /users/{username}/repos\` - Fetch repositories for a user

## 🔧 Configuration

### Environment Variables

No environment variables are required as the application uses the public GitHub API.

## 🎨 UI/UX Features

- **Error Handling**: User-friendly error messages
- **Keyboard Navigation**: Full keyboard accessibility
- **Responsive Design**: Mobile-first approach

## 🧩 Project Structure

\`\`\`
├── src/
│   ├── __tests__/           # Test files
│   ├── api        # Root layout
│       └── githubapi.ts     # API call to GitHub
│   └── components/
│       └── ui/               # shadcn/ui components
│       └── Header.tsx        # Header component 
│       └── RepoList.tsx      # User List of repositories component 
│       └── SearchBar.tsx     # Search component 
│       └── Spinner.tsx       # Loading spinner component 
│       └── UserAccordion.tsx # Accordion component 
├── public/              # Static assets
└── README.md           # Project documentation
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/new-feature\`
3. Commit your changes: \`git commit -am 'Add new feature'\`
4. Push to the branch: \`git push origin feature/new-feature\`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- API rate limiting may occur with excessive usage
- Repository list is limited to 50 repositories per user (GitHub API limitation)

## 🔮 Future Enhancements

- GitHub OAuth integration for higher rate limits
- Repository filtering and sorting options
- User profile details (bio, location, followers)
- Repository search within user's repositories
- Export functionality for repository data
- Dark mode support

## 📞 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/wiwintjoa/github-user-search/issues) on GitHub.
