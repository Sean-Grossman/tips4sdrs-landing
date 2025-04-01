# Tips4SDRs.org Landing Page

A modern landing page for Tips4SDRs.org, a platform allowing people to recognize and tip their Sales Development Representatives.

## Project Overview

This landing page includes:

- Responsive navigation bar
- Hero section with call-to-action button
- Live tipping feed section in a Venmo-style format
- Modern UI design following the specified style guide

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Strongly typed JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React**: UI library

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

Then, to start the production server:

```bash
npm run start
# or
yarn start
```

## Project Structure

```
tips4sdrs-landing/
├── public/
│   └── images/         # Static image assets
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── page.tsx    # Homepage
│   │   ├── layout.tsx  # Root layout
│   │   └── globals.css # Global styles
│   └── components/     # React components
│       ├── Navbar.tsx  # Navigation bar component
│       ├── Hero.tsx    # Hero section component
│       └── TippingFeed.tsx # Tipping feed component
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Design System

The website follows a specific design system with:

- Custom color palette (primary blue, accent orange, etc.)
- Typography based on Montserrat and Open Sans
- Consistent spacing and component styling
- Responsive design for all device sizes

## Running the Project

To start the project in development mode, run:

```bash
npm run dev
```

Visit http://localhost:3000 to see the website in action.
