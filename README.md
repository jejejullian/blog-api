# Blog API — Full Stack Blog Platform

A full-stack blog platform built as part of **The Odin Project - NodeJS Course**. This project consists of three separate applications: a **REST API backend**, a **public reader frontend**, and a **private admin dashboard**.

---

## Tech Stack

### Backend
- **Runtime**: Node.js (ESM)
- **Framework**: Express.js v5
- **Database**: PostgreSQL
- **ORM**: Prisma v7 (with `@prisma/adapter-pg`)
- **Auth**: JWT (jsonwebtoken) + bcryptjs
- **Other**: dotenv, cors, nodemon

### Frontend Reader
- **Framework**: React (Vite)
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS v4

### Frontend Admin
- **Framework**: React (Vite)
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS v4
- **State**: React Context API (AuthContext)

---

## Project Structure

```
blog-api/
├── backend/                    # REST API Server
│   ├── prisma/
│   │   ├── schema.prisma       # Database models
│   │   └── migrations/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── postController.js
│   │   │   └── commentController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── postRoutes.js
│   │   │   └── commentRoutes.js
│   │   ├── lib/
│   │   │   └── prisma.js       # PrismaClient instance
│   │   └── app.js              # Express entry point
│   ├── .env
│   └── package.json
│
├── frontend-reader/            # Public blog for readers
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── PostCard.jsx
│   │   │   └── CommentForm.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── PostDetailPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   ├── .env
│   └── package.json
│
├── frontend-admin/             # Private dashboard for authors
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── PostTable.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── NewPostPage.jsx
│   │   │   └── EditPostPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   └── App.jsx
│   ├── .env
│   └── package.json
│
└── .gitignore
```

---

## Database Models

```prisma
model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  username  String    @unique
  password  String
  isAuthor  Boolean   @default(false)
  createdAt DateTime  @default(now())
}

model Post {
  id        Int       @id @default(autoincrement())
  title     String
  content   String
  published Boolean   @default(false)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  authorId  Int
}

model Comment {
  id        Int       @id @default(autoincrement())
  content   String
  guestName String?
  createdAt DateTime  @default(now())
  postId    Int
  authorId  Int?
}
```

---

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login, returns JWT |

### Posts
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/posts` | Public | Get all published posts. If token is provided & valid author → returns all posts including drafts |
| GET | `/api/posts/:id` | Public | Get post by ID (author token can view drafts) |
| POST | `/api/posts` | Author | Create new post (default: draft) |
| PUT | `/api/posts/:id` | Author | Update post title & content |
| DELETE | `/api/posts/:id` | Author | Delete post |
| PATCH | `/api/posts/:id/publish` | Author | Toggle publish/unpublish |

### Comments
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/posts/:postId/comments` | Public | Get all comments for a post |
| POST | `/api/posts/:postId/comments` | Public | Add comment (guest or logged-in) |
| DELETE | `/api/posts/:postId/comments/:commentId` | Author | Delete a comment |

---

## Getting Started

### Prerequisites
- Node.js (LTS)
- PostgreSQL (running locally)
- npm

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd blog-api
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:
```env
PORT=3000
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/blogdb"
JWT_SECRET="your_random_secret_key_here"
```

Run database migration:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

Start the backend server:
```bash
npm run dev
```

Backend will run at `http://localhost:3000`

### 3. Setup Frontend Reader
```bash
cd frontend-reader
npm install
```

Create a `.env` file inside `/frontend-reader`:
```env
VITE_API_URL=http://localhost:3000/api
```

Start the dev server:
```bash
npm run dev
```

Reader will run at `http://localhost:5173`

### 4. Setup Frontend Admin
```bash
cd frontend-admin
npm install
```

Create a `.env` file inside `/frontend-admin`:
```env
VITE_API_URL=http://localhost:3000/api
```

Start the dev server:
```bash
npm run dev
```

Admin will run at `http://localhost:5174`

---

## Creating Your First Author Account

Since there is no public register page in the Admin frontend (by design — admin is private), you need to register via Postman or any API client:

**1. Register via Postman:**
```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "your@email.com",
  "username": "yourname",
  "password": "yourpassword"
}
```

**2. Set `isAuthor` to `true` in Prisma Studio:**
```bash
cd backend
npx prisma studio
```
Open `http://localhost:5555`, find your user, and set `isAuthor` to `true`.

**3. Login via Admin Frontend** and start writing!

---

## Authentication Flow

```
[Admin] Fill login form
   ↓
POST /api/auth/login → { token }
   ↓
Token stored in localStorage
   ↓
Every request → Authorization: Bearer <token>
   ↓
Backend verifies JWT → grants access to protected routes
```

---

## Design

Both frontends use a custom **Zenless Zone Zero (ZZZ)** inspired industrial/cyber theme:
- Color palette: Neon Lime `#D2FF00` on Pure Black `#000000`
- Fonts: **Chakra Petch** (headings) + **Space Grotesk** (body)
- Skewed UI elements, neon glow effects, and terminal-style typography

---

## License

This project is for educational purposes as part of [The Odin Project](https://www.theodinproject.com/) curriculum.
