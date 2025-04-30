# 🏡 HomeStay App

A modern web application for managing homestay bookings and accommodations built with Next.js/Nest.js and TypeScript. This platform helps connect hosts with guests, manage bookings, and provide a seamless homestay experience.

## 📖 Table of Contents
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Development Guide](#-development-guide)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)
- [FAQ](#-frequently-asked-questions)

## 🚀 Features

### For Hosts
- Create and manage property listings
- Interactive calendar for managing availability
- Real-time booking management
- Messaging system with guests
- Analytics and reporting dashboard

### For Guests
- Search and filter homestay options
- Real-time availability checking
- Secure booking and payment system
- Interactive maps for location viewing
- Review and rating system

### Technical Features
- Modern and responsive UI using Tailwind CSS and Material Tailwind
- Interactive calendar management with FullCalendar integration
- Google Maps integration for location services
- GraphQL integration with React Query for efficient data fetching
- Form handling with React Hook Form
- State management using Zustand
- PWA (Progressive Web App) support
- Rich text editing capabilities with React Quill

## 🛠️ Tech Stack

### Core
- **Framework:** Next.js 14 (React framework for production-grade applications)
- **Language:** TypeScript (Typed JavaScript for better development experience)

### Styling
- **Tailwind CSS:** Utility-first CSS framework
- **Material Tailwind:** Material Design components
- **DaisyUI:** Component library for Tailwind CSS

### State Management & Data Fetching
- **Zustand:** Lightweight state management solution
- **GraphQL:** API query language
- **React Query:** Powerful data synchronization
- **React Hook Form:** Performant form management

### UI Components & Utilities
- **FullCalendar:** Feature-rich calendar component
- **@react-google-maps/api:** Google Maps integration
- **React Icons:** Icon library
- **React Select:** Enhanced select inputs
- **React Quill:** Rich text editor
- **date-fns & dayjs:** Date manipulation libraries

## 📁 Project Structure

```
src/
├── app/         # Next.js app directory (pages, layouts)
│   ├── layout.tsx     # Root layout
│   ├── page.tsx      # Home page
│   └── [...routes]/  # Other pages
├── components/  # Reusable UI components
│   ├── common/       # Shared components
│   ├── forms/        # Form components
│   └── layouts/      # Layout components
├── features/    # Feature-specific components and logic
│   ├── auth/         # Authentication
│   ├── booking/      # Booking system
│   └── profile/      # User profiles
├── gql/        # GraphQL related files
│   ├── queries/      # GraphQL queries
│   ├── mutations/    # GraphQL mutations
│   └── schema/       # GraphQL schema
├── store/      # Zustand store configurations
├── utils/      # Utility functions
├── client/     # Client-side configurations
└── functions/  # Helper functions
```

## 🚦 Getting Started

### Prerequisites

1. **Node.js Installation**
   - Download and install Node.js from [nodejs.org](https://nodejs.org/)
   - Recommended version: 18.x or later
   - Verify installation:
     ```bash
     node --version
     ```

2. **Yarn Package Manager**
   - Install Yarn globally:
     ```bash
     npm install -g yarn
     ```
   - Verify installation:
     ```bash
     yarn --version
     ```

3. **Code Editor**
   - Recommended: Visual Studio Code
   - Useful VSCode extensions:
     - ESLint
     - Prettier
     - Tailwind CSS IntelliSense
     - GraphQL

### Environment Setup

1. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
# Add other environment variables
```

### Installation Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd homestay-app
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 💻 Development Guide

### Code Style and Standards
- Use TypeScript for all new files
- Follow the existing file/folder structure
- Use functional components with hooks
- Implement proper error handling
- Write meaningful comments
- Use proper TypeScript types/interfaces

### Working with GraphQL
1. Define your query/mutation in `src/gql`
2. Generate types:
```bash
yarn gqlgen
```
3. Use generated hooks in your components

### State Management
- Use Zustand for global state
- Use React Query for server state
- Use local state (useState) for component-specific state

### Component Development
1. Create new components in appropriate directories
2. Use TypeScript interfaces for props
3. Implement proper error boundaries
4. Add necessary unit tests

## 🚀 Deployment

### Build for Production
```bash
yarn build
```

### Start Production Server
```bash
yarn start
```

## 🔧 Available Scripts

- `yarn dev`: Runs development server
- `yarn build`: Creates production build
- `yarn start`: Starts production server
- `yarn lint`: Runs ESLint
- `yarn gqlgen`: Generates GraphQL code
- `yarn test`: Runs tests (if configured)

## 🐛 Troubleshooting

### Common Issues

1. **Installation Problems**
   ```bash
   # Clear yarn cache
   yarn cache clean
   # Delete node_modules
   rm -rf node_modules
   # Reinstall dependencies
   yarn install
   ```

2. **Build Errors**
   - Check Node.js version
   - Verify environment variables
   - Clear `.next` directory

3. **GraphQL Issues**
   - Run `yarn gqlgen`
   - Check API endpoint configuration
   - Verify query/mutation syntax

## ❓ Frequently Asked Questions

1. **How do I add a new page?**
   - Create a new directory/file in `src/app`
   - Use the page naming convention

2. **How do I style components?**
   - Use Tailwind CSS utilities
   - Create custom styles in `globals.css`

3. **How do I handle authentication?**
   - Check authentication implementations in `features/auth`
   - Use provided auth hooks and components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

[Add your license information here]

## 📞 Support

For more information or support:
- GitHub Issues: [Create an issue](<repository-url>/issues)
- Email: [Your Support Email]
- Documentation: [Link to documentation]

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- All contributors and maintainers
- [Add other acknowledgments]

---

Made with ❤️ by [Your Team/Organization Name]
