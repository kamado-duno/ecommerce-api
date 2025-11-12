# ecommerce-api

Backend API for an e-commerce application built with Node.js, TypeScript and MongoDB.

## 🚀 Quick Start

### Setup

```bash
# Clone the template repository
git clone https://github.com/kamado-duno/ecommerce-api.git

# Navigate to your project
cd your-project-name

# Remove the existing git history and reinitialize
rm -rf .git
git init

# Install dependencies
npm install

# Start development
npm run dev
```

## 📁 Project Structure

```bash
.
├── src/
│   ├── controllers/          # Business logic and request handlers
│   │   ├── categories.ts     # Category CRUD operations
│   │   ├── index.ts          # Export all controllers
│   │   ├── orders.ts         # Order CRUD operations (includes priceAtPurchase logic)
│   │   ├── products.ts       # Product CRUD operations
│   │   └── users.ts          # User CRUD operations (with bcrypt encryption)
│   │
│   ├── db/                   # Database configuration
│   │   └── index.ts          # MongoDB connection setup
│   │
│   ├── middleware/           # Express middleware
│   │   ├── errorHandler.ts   # Centralized error handling
│   │   └── validation.ts     # Zod validation middleware
│   │
│   ├── models/               # Mongoose schemas and models
│   │   ├── Category.ts       # Category model
│   │   ├── Order.ts          # Order model (with priceAtPurchase field)
│   │   ├── Product.ts        # Product model
│   │   ├── User.ts           # User model
│   │   └── index.ts          # Export all models
│   │
│   ├── routers/              # API route definitions
│   │   ├── categoryRouter.ts # Category routes
│   │   ├── index.ts          # Combine all routers
│   │   ├── orderRouter.ts    # Order routes
│   │   ├── productRouter.ts  # Product routes
│   │   └── userRouter.ts     # User routes
│   │
│   ├── schemas/              # Zod validation schemas
│   │   ├── category.schemas.ts  # Category validation rules
│   │   ├── order.schemas.ts     # Order validation rules
│   │   ├── product.schemas.ts   # Product validation rules
│   │   └── user.schemas.ts      # User validation rules
│   │
│   ├── app.ts                # Application entry point (Express setup)
│   └── swagger.ts            # Swagger/OpenAPI configuration
│
├── .env                      # Environment variables (not in git)
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── package.json              # Project configuration and dependencies
├── package-lock.json         # Dependency lock file (auto-generated)
├── README.md                 # Project documentation
└── tsconfig.json             # TypeScript configuration

```

> **Note**: The `dist/` directory will be created automatically when you run `npm run build` to contain the compiled JavaScript output.

## 🛠 Available Scripts

| Command            | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `npm run dev`      | Start development server with file watching and hot reload |
| `npm run build`    | Compile TypeScript to JavaScript                           |
| `npm run start`    | Build and run the production version                       |
| `npm run prebuild` | Clean the dist directory (runs automatically before build) |
| `npm run prestart` | Build the project (runs automatically before start)        |

## 🔧 Features

### Modern TypeScript Configuration

- **ES2022** target with modern JavaScript features
- **Strict mode** enabled for better type safety
- **ES Modules** support (native Node.js ESM)
- **Path aliases** with `#` prefix to avoid conflicts
- **Import extensions** support for better IDE experience

### Development Experience

- **File watching** with `--watch` flag for instant reloads
- **TypeScript** compilation with proper module resolution
- **Clean builds** with automatic dist cleanup
- **Isolated modules** for better compilation performance

### Path Aliases

The project supports internal path aliases using the `#` prefix:

```typescript
// Instead of relative imports like this:
import { helper } from "../../../utils";

// You can use clean aliases like this:
import { helper } from "#utils";
```

You need to add additional modules subpaths to the `imports` field in `package.json`

## 📦 Dependencies

### Runtime Dependencies

- None (pure Node.js setup ready for your additions)
