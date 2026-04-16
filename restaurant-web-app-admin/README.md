# Restaurant Web App - Admin Dashboard

A modern admin dashboard built with **Next.js 14+**, **TypeScript**, **Tailwind CSS**, and **Shadcn/UI** for managing restaurant admins and news/blog posts.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Git

### Installation

1. Clone the repository or navigate to the project:
```bash
cd restaurant-web-app-admin
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── (auth)/         # Authentication pages (login, signup)
│   ├── (dashboard)/    # Protected dashboard routes
│   └── layout.tsx      # Root layout
├── components/         # Reusable React components
│   ├── auth/          # Authentication components
│   ├── sidebar/       # Navigation sidebar
│   ├── header/        # Top navigation
│   └── common/        # Shared components
├── api/               # API client and endpoints
│   ├── client.ts      # Axios instance
│   ├── auth.ts        # Auth API calls
│   ├── admin.ts       # Admin API calls
│   ├── news.ts        # News API calls
│   └── upload.ts      # Upload API calls
├── context/           # React Context providers
│   └── AuthContext.tsx # Authentication context
├── hooks/             # Custom React hooks
│   └── useAuth.ts     # Auth hook
├── types/             # TypeScript types and interfaces
├── utils/             # Utility functions
├── lib/               # Library utilities
└── styles/            # Global styles

public/                # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📚 Technology Stack

### Core
- **Next.js 16.2** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/UI** - High-quality React components
- **Lucide React** - Icon library

### Forms & Validation
- **React Hook Form** - Efficient form management
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Integration with Zod

### State Management & HTTP
- **Zustand** - Lightweight state management
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications

### Development Tools
- **ESLint 9** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1

# Application Environment
NODE_ENV=development
```

See `.env.local.example` for more details.

## 🎨 Styling

The project uses **Tailwind CSS 4** for styling. All components are styled with utility classes.

### Custom Configuration

- **Tailwind Config**: `tailwind.config.ts`
- **PostCSS Config**: `postcss.config.mjs`
- **Global Styles**: `src/app/globals.css`

## 🧪 Code Quality

### Linting
```bash
npm run lint
```

### Code Formatting
```bash
npm run format
```

ESLint is configured to enforce Next.js and React best practices.
Prettier is configured for consistent code formatting.

## 📖 API Integration

The admin dashboard connects to the Restaurant Web App Backend API:

**Base URL**: `http://localhost:3001/api/v1`

### Main Endpoints
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `GET /admins` - List all admins
- `POST /admins` - Create new admin
- `GET /admins/:id` - Get admin details
- `PUT /admins/:id` - Update admin
- `DELETE /admins/:id` - Delete admin
- `GET /news` - List news posts
- `POST /news` - Create news post
- `GET /news/:id` - Get news details
- `PUT /news/:id` - Update news post
- `DELETE /news/:id` - Delete news post

For detailed API documentation, see the backend repository's `API_DOCUMENTATION.md`.

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

## 📝 Development Workflow

1. Create a new branch for your feature:
```bash
git checkout -b feature/ADMIN-XXX-description
```

2. Make your changes and commit:
```bash
git add .
git commit -m "feat: description of changes"
```

3. Push to remote:
```bash
git push origin feature/ADMIN-XXX-description
```

4. Create a Pull Request

## 🐛 Troubleshooting

### Port 3000 is already in use
```bash
npm run dev -- -p 3001
```

### Clear Next.js cache
```bash
rm -rf .next
npm run dev
```

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For issues and questions, please open a GitHub issue in the repository.

## 📄 License

This project is part of the Restaurant Web App and follows the same license as the parent project.

---

**Last Updated**: April 2026
