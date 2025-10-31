# TalentFlow

**UPDATED BY NEHA SHA (2022BCSE062) from NIT SRINAGAR**

A modern, full-stack talent management platform built with React, TypeScript, and Vite. TalentFlow provides comprehensive tools for HR teams to manage job postings, candidate assessments, and recruitment workflows.


## Assessment Tasks Completed

### Core Flows Implemented

#### 1. Jobs Board
- ✅ List with server-like pagination & filtering (title, status, tags)
- ✅ Create/Edit job in modal with validation (title required, unique slug)
- ✅ Archive/Unarchive functionality
- ✅ Reorder via drag-and-drop with **optimistic updates** and rollback on failure
- ✅ Deep link to a job: `/jobs/:jobId`
- ✅ Indian job context (₹ LPA salary, Indian cities)

#### 2. Candidates
- ✅ Virtualized list supporting 1000+ seeded candidates
- ✅ Client-side search by name or email
- ✅ Server-like filter based on current stage
- ✅ Candidate profile route: `/candidates/:id` with timeline of status changes
- ✅ Kanban board with drag-and-drop for stage transitions
- ✅ Notes with @mentions (rendered with suggestions from local list)
- ✅ Indian names and phone numbers (+91 format)

#### 3. Assessments
- ✅ Assessment builder per job with sections
- ✅ Multiple question types:
  - Single-choice
  - Multi-choice
  - Short text
  - Long text
  - Numeric with range
  - File upload (stub)
- ✅ Live preview pane rendering assessment as fillable form
- ✅ Local persistence (builder state and candidate responses)
- ✅ Form runtime with validation rules (required, numeric range, max length)
- ✅ Conditional questions (show/hide based on previous answers)

#### 4. Data & "API"
- ✅ Simulated REST API using MSW (Mock Service Worker)
- ✅ Seed data:
  - 25 jobs (mix of active and archived)
  - 1000 candidates, randomly assigned to jobs and stages
  - 3+ assessments, each with 10+ questions
- ✅ Simulated network conditions:
  - Artificial latency (50-200ms)
  - Error rate (2% on write endpoints)
- ✅ Local persistence with IndexedDB via Dexie
  - Write-through to IndexedDB
  - State restoration on refresh

## Open Source Resources & Libraries Used

### Buttons & UI Components
- **Radix UI** - https://www.radix-ui.com/
  - Accessible, unstyled UI primitives for building high-quality design systems
  - Used for: Dialog, Dropdown, and other accessible components

- **Class Variance Authority (CVA)** - https://cva.style/
  - Component variant management for consistent button styles
  - Used for: Button component variants and styling

- **Shadcn/ui** (inspiration) - https://ui.shadcn.com/
  - Beautifully designed components built with Radix UI and Tailwind CSS
  - Used as reference for: Button, Card, and other UI components

### Layout & Containers
- **Tailwind CSS** - https://tailwindcss.com/
  - Utility-first CSS framework for rapid UI development
  - Used for: All layout, spacing, colors, and responsive design
  - Documentation: https://tailwindcss.com/docs

- **CSS Grid & Flexbox** (native CSS)
  - Used for: Responsive grid layouts and flexible container alignment
  - Reference: https://css-tricks.com/guides/css-grid/ & https://css-tricks.com/guides/flexbox/

### Animations & Transitions
- **CSS Animations** (custom keyframes)
  - Fade-up, scale-in, slide-right animations
  - Float animations for decorative elements
  - Gradient-shift for animated text effects

- **Intersection Observer API** (browser native)
  - Scroll-triggered animations with custom Reveal component
  - Used for: Animating sections when they enter viewport
  - Reference: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

- **Framer Motion** (conceptual inspiration)
  - Animation library patterns applied with vanilla CSS
  - Reference: https://www.framer.com/motion/

### Icons
- **Lucide React** - https://lucide.dev/
  - Beautiful & consistent icon toolkit
  - Used for: All icons throughout the application

### State Management
- **React Hooks** (native)
  - useState, useEffect, useRef for component state management
  - Custom hooks for reusable logic

### Form Handling & Validation
- **React Hook Form** (patterns applied)
  - Form validation patterns and best practices
  - Reference: https://react-hook-form.com/

### Styling Utilities
- **Tailwind CSS Plugins**
  - Custom animation utilities and variants
  - Line-clamp utilities for text truncation

- **CSS Variables**
  - Custom theme variables for consistent design tokens
  - Color system with OKLCH color space

### Development Tools
- **Vite** - https://vitejs.dev/
  - Next generation frontend tooling
  - Fast HMR and optimized builds

- **TypeScript** - https://www.typescriptlang.org/
  - Type-safe JavaScript development
  - Better IDE support and error catching

### Testing & Mocking
- **MSW (Mock Service Worker)** - https://mswjs.io/
  - API mocking that works in browser and Node.js
  - Used for: Simulating REST API endpoints

- **Dexie.js** - https://dexie.org/
  - A wrapper library for IndexedDB
  - Used for: Local data persistence

### Additional Resources
- **React Router** - https://reactrouter.com/
  - Declarative routing for React applications
  
- **React Hot Toast** - https://react-hot-toast.com/
  - Beautiful toast notifications
  
- **Faker.js** - https://fakerjs.dev/
  - Generate massive amounts of fake data for testing

## Features

### Core Functionality

- **Job Management**: Create, edit, and manage job postings with detailed requirements
- **Candidate Management**: Track and manage candidate profiles and applications
- **Assessment Builder**: Create dynamic, multi-section assessments with various question types
- **Assessment Preview**: Real-time preview of assessments before publishing
- **Assessment Results**: View and analyze candidate assessment responses
- **Dashboard Analytics**: Comprehensive HR dashboard with key metrics

### Question Types

- Single Choice
- Multiple Choice
- Short Text
- Long Text
- Numeric Input
- File Upload

### Advanced Features

- **Conditional Logic**: Questions can be shown/hidden based on previous answers
- **Real-time Validation**: Client-side validation with customizable rules
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Mock API**: Complete mock backend with MSW (Mock Service Worker)
- **Local Storage**: Persistent data storage with IndexedDB via Dexie

## Tech Stack

### Frontend

- **React 19.1.1** - UI library with latest features
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Vite 7.1.2** - Fast build tool and dev server
- **React Router DOM 7.9.0** - Client-side routing
- **Tailwind CSS 4.1.13** - Utility-first CSS framework

### State Management & Data

- **Dexie 4.2.0** - IndexedDB wrapper for local storage
- **MSW 2.11.2** - Mock Service Worker for API mocking
- **Axios 1.12.1** - HTTP client for API requests

### UI Components

- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Toast notifications
- **Class Variance Authority** - Component variant management

### Development Tools

- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Faker.js** - Fake data generation for development

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components (JobCard, JobSkeleton)
│   ├── HrDashboard/     # HR-specific components
│   ├── Jobs/            # Job-related components
│   ├── layout/          # Layout components (Header, Footer, HrLayout)
│   ├── sections/        # Landing page sections
│   └── ui/              # Base UI components (Button, Card, Logo)
├── pages/               # Page components
│   ├── AssessmentBuilder.tsx
│   ├── AssessmentPreview.tsx
│   ├── AssessmentResults.tsx
│   ├── Assessments.tsx
│   ├── CandidateJobs.tsx
│   ├── CandidateProfile.tsx
│   ├── Candidates.tsx
│   ├── HrDashboard.tsx
│   ├── JobDetails.tsx
│   ├── Jobs.tsx
│   └── Landing.tsx
├── services/            # Business logic and data layer
│   ├── db/              # Database layer (Dexie)
│   ├── mocks/           # Mock API handlers (MSW)
│   └── seed/            # Seed data generation
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── main.tsx            # Application entry point
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd talentflow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Architecture

### Frontend Architecture

- **Component-Based**: Modular React components with clear separation of concerns
- **Type-Safe**: Full TypeScript coverage with strict type checking
- **Responsive**: Mobile-first design with Tailwind CSS
- **Accessible**: Built with accessibility in mind using Radix UI primitives

### Data Layer

- **Mock Backend**: MSW provides complete API simulation
- **Local Storage**: Dexie manages IndexedDB for persistent data
- **Seed Data**: Faker.js generates realistic test data
- **Type Safety**: All data operations are fully typed

### Routing

- **Client-Side Routing**: React Router DOM handles navigation
- **Nested Routes**: Dashboard with nested assessment routes
- **Route Protection**: Automatic redirects for HR login flow

## Technical Decisions

### Why React 19?

- Latest React features including improved concurrent rendering
- Better performance with automatic batching
- Enhanced developer experience with new hooks

### Why Vite over Create React App?

- **Faster builds**: 10-100x faster than CRA
- **Better HMR**: Instant hot module replacement
- **Modern tooling**: Built-in TypeScript and CSS support
- **Smaller bundle**: Tree-shaking and optimized builds

### Why Dexie over localStorage?

- **Better performance**: IndexedDB is more efficient for large datasets
- **Structured queries**: SQL-like query capabilities
- **Type safety**: Full TypeScript support
- **Offline-first**: Works without network connection

### Why MSW over JSON Server?

- **Realistic mocking**: Intercepts actual HTTP requests
- **Development**: Same code works in both environments
- **Better debugging**: Network tab shows actual requests
- **Flexible**: Easy to add complex business logic

### Why Tailwind CSS?

- **Utility-first**: Rapid prototyping and consistent design
- **Responsive**: Mobile-first approach built-in
- **Customizable**: Easy to extend with custom design system
- **Performance**: Purges unused styles in production

## Known Issues & Solutions

### 1. SPA Routing on Vercel

**Issue**: 404 errors when refreshing pages on Vercel
**Solution**: Added `vercel.json` with rewrite rules to serve `index.html` for all routes

### 2. MSW Import Errors in Production

**Issue**: Dynamic MSW imports failing in production builds
**Solution**: Added error handling with fallback to start app without MSW

### 3. Hydration Errors with Option Elements

**Issue**: React hydration errors with `<span>` elements inside `<option>` elements
**Solution**: Removed HTML elements from option content, using only text

### 4. Assessment List Not Refreshing

**Issue**: New assessments not appearing in list after creation
**Solution**: Added multiple refresh triggers (location change, window focus)

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Vite configuration
3. The `vercel.json` file handles SPA routing
4. Deploy with zero configuration

### Other Platforms

- **Netlify**: Add `_redirects` file with `/* /index.html 200`
- **GitHub Pages**: Use `gh-pages` package with proper base path
- **AWS S3 + CloudFront**: Configure error pages to redirect to `index.html`

## Future Enhancements

### Planned Features

- [ ] User authentication and authorization
- [ ] Real-time collaboration on assessments
- [ ] Advanced analytics and reporting
- [ ] Email notifications and integrations
- [ ] Bulk operations for candidates
- [ ] Assessment templates and library
- [ ] API rate limiting and caching
- [ ] Progressive Web App (PWA) features

### Technical Improvements

- [ ] Add comprehensive test coverage
- [ ] Implement error boundaries
- [ ] Add performance monitoring
- [ ] Optimize bundle size further
- [ ] Add internationalization (i18n)
- [ ] Implement dark mode theme

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/) - The UI library
- [Vite](https://vitejs.dev/) - The build tool
- [Tailwind CSS](https://tailwindcss.com/) - The CSS framework
- [MSW](https://mswjs.io/) - The API mocking library
- [Dexie](https://dexie.org/) - The IndexedDB wrapper
- [Radix UI](https://www.radix-ui.com/) - The component primitives

---

**TalentFlow** - Streamlining talent management for modern HR teams.
