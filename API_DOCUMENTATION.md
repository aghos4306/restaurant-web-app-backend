# Restaurant Web App Backend - API Documentation

## Overview

This is a comprehensive API documentation for the Restaurant Web App Backend. The API provides endpoints for authentication, news/blog management, admin user management, and file uploads.

**Base URL**: `http://localhost:3001/api/v1`

**All endpoints are prefixed with `/api/v1`** - see examples below.

## Table of Contents

1. [Authentication](#authentication)
2. [Auth Endpoints](#auth-endpoints)
3. [News Endpoints](#news-endpoints)
4. [Admin Endpoints](#admin-endpoints)
5. [Upload Endpoints](#upload-endpoints)
6. [Error Handling](#error-handling)
7. [Response Format](#response-format)

---

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. All protected endpoints require a valid JWT token in the `Authorization` header.

### Format
```
Authorization: Bearer <token>
```

### Token Structure
- **Type**: HS256
- **Expiration**: 7 days
- **Payload**: 
  - `id`: Admin user ID
  - `email`: Admin email
  - `role`: Admin role (ADMIN or SUPER_ADMIN)

### Getting a Token

Use the Login endpoint to obtain a JWT token.

---

## Auth Endpoints

### 1. Login
Create a new session and receive a JWT token.

**Endpoint**: `POST /api/v1/auth/login`

**Auth Required**: No

**Request Body**:
```json
{
  "email": "admin@restaurant.com",
  "password": "password123"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "admin@restaurant.com",
    "name": "Admin Name",
    "role": "ADMIN"
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Login successful"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid request body
- `401 Unauthorized`: Invalid credentials
- `500 Internal Server Error`: Server error

---

### 2. Signup
Create a new admin account.

**Endpoint**: `POST /api/v1/auth/signup`

**Auth Required**: No

**Request Body**:
```json
{
  "email": "neoadmin@restaurant.com",
  "password": "password123",
  "name": "New Admin"
}
```

**Success Response (201)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "neoadmin@restaurant.com",
    "name": "New Admin",
    "role": "ADMIN"
  },
  "message": "Admin created successfully"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid request body
- `409 Conflict`: Email already exists
- `500 Internal Server Error`: Server error

---

### 3. Get Current User
Retrieve the current authenticated user's information.

**Endpoint**: `GET /api/v1/auth/me`

**Auth Required**: Yes

**Query Parameters**: None

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "admin@restaurant.com",
    "name": "Admin Name",
    "role": "ADMIN",
    "isActive": true,
    "createdAt": "2026-04-13T10:30:00Z"
  }
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or missing token
- `500 Internal Server Error`: Server error

---

### 4. Forgot Password
Request a password reset token.

**Endpoint**: `POST /api/v1/auth/forgot-password`

**Auth Required**: No

**Request Body**:
```json
{
  "email": "admin@restaurant.com"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Password reset email sent successfully"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid request body
- `404 Not Found`: Email not found
- `500 Internal Server Error`: Server error

---

### 5. Reset Password
Reset password using a reset token.

**Endpoint**: `POST /api/v1/auth/reset-password`

**Auth Required**: No

**Request Body**:
```json
{
  "token": "reset-token-from-email",
  "newPassword": "newpassword123"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid request body or expired token
- `500 Internal Server Error`: Server error

---

## News Endpoints

### 1. Get All News Posts
Retrieve all published news posts with pagination.

**Endpoint**: `GET /api/v1/news`

**Auth Required**: No

**Query Parameters**:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | number | 20 | Maximum 100, number of posts to return |
| `offset` | number | 0 | Pagination offset |
| `published` | boolean | true | Only return published posts |

**Success Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "publisherId": "admin-uuid",
      "title": "Restaurant News Title",
      "slug": "restaurant-news-title",
      "body": "Full article content...",
      "coverMediaUrl": "https://uploadthing.com/...",
      "coverMediaType": "IMAGE",
      "status": "PUBLISHED",
      "publishedAt": "2026-04-13T10:30:00Z",
      "createdAt": "2026-04-13T10:30:00Z",
      "updatedAt": "2026-04-13T10:30:00Z"
    }
  ],
  "pagination": {
    "limit": 20,
    "offset": 0,
    "total": 50,
    "pages": 3
  }
}
```

---

### 2. Get News by ID
Retrieve a specific news post by ID.

**Endpoint**: `GET /api/v1/news/:id`

**Auth Required**: No

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | News post ID |

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "publisherId": "admin-uuid",
    "title": "Restaurant News Title",
    "slug": "restaurant-news-title",
    "body": "Full article content...",
    "coverMediaUrl": "https://uploadthing.com/...",
    "coverMediaType": "IMAGE",
    "status": "PUBLISHED",
    "publishedAt": "2026-04-13T10:30:00Z",
    "createdAt": "2026-04-13T10:30:00Z",
    "updatedAt": "2026-04-13T10:30:00Z"
  }
}
```

**Error Responses**:
- `404 Not Found`: News post not found

---

### 3. Get News by Slug
Retrieve a specific news post by slug.

**Endpoint**: `GET /api/v1/news/slug/:slug`

**Auth Required**: No

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `slug` | string | News post slug |

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "publisherId": "admin-uuid",
    "title": "Restaurant News Title",
    "slug": "restaurant-news-title",
    "body": "Full article content...",
    "coverMediaUrl": "https://uploadthing.com/...",
    "coverMediaType": "IMAGE",
    "status": "PUBLISHED",
    "publishedAt": "2026-04-13T10:30:00Z",
    "createdAt": "2026-04-13T10:30:00Z",
    "updatedAt": "2026-04-13T10:30:00Z"
  }
}
```

**Error Responses**:
- `404 Not Found`: News post not found

---

### 4. Create News Post
Create a new news post (admin only).

**Endpoint**: `POST /api/v1/news`

**Auth Required**: Yes (Admin)

**Request Body**:
```json
{
  "title": "New Restaurant News",
  "slug": "new-restaurant-news",
  "body": "Detailed article content with at least 20 characters...",
  "coverMediaUrl": "https://uploadthing.com/...",
  "coverMediaType": "IMAGE",
  "status": "DRAFT"
}
```

**Success Response (201)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "publisherId": "admin-uuid",
    "title": "New Restaurant News",
    "slug": "new-restaurant-news",
    "body": "Detailed article content...",
    "coverMediaUrl": "https://uploadthing.com/...",
    "coverMediaType": "IMAGE",
    "status": "DRAFT",
    "publishedAt": null,
    "createdAt": "2026-04-13T10:30:00Z",
    "updatedAt": "2026-04-13T10:30:00Z"
  },
  "message": "News post created successfully"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid request body
- `401 Unauthorized`: Not authenticated
- `409 Conflict`: Slug already exists
- `500 Internal Server Error`: Server error

---

### 5. Update News Post
Update an existing news post (admin only).

**Endpoint**: `PUT /api/v1/news/:id`

**Auth Required**: Yes (Admin)

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | News post ID |

**Request Body** (all fields optional):
```json
{
  "title": "Updated Title",
  "slug": "updated-slug",
  "body": "Updated content...",
  "coverMediaUrl": "https://uploadthing.com/...",
  "coverMediaType": "VIDEO",
  "status": "PUBLISHED"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "publisherId": "admin-uuid",
    "title": "Updated Title",
    "slug": "updated-slug",
    "body": "Updated content...",
    "coverMediaUrl": "https://uploadthing.com/...",
    "coverMediaType": "VIDEO",
    "status": "PUBLISHED",
    "publishedAt": "2026-04-13T10:30:00Z",
    "createdAt": "2026-04-13T10:30:00Z",
    "updatedAt": "2026-04-13T11:00:00Z"
  },
  "message": "News post updated successfully"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid request body
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: News post not found
- `409 Conflict`: Slug already exists
- `500 Internal Server Error`: Server error

---

### 6. Delete News Post
Delete a news post (admin only).

**Endpoint**: `DELETE /api/v1/news/:id`

**Auth Required**: Yes (Admin)

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | News post ID |

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "publisherId": "admin-uuid",
    "title": "Deleted News Title",
    "slug": "deleted-news-slug",
    "body": "Deleted content...",
    "coverMediaUrl": "https://uploadthing.com/...",
    "coverMediaType": "IMAGE",
    "status": "DRAFT",
    "publishedAt": null,
    "createdAt": "2026-04-13T10:30:00Z",
    "updatedAt": "2026-04-13T10:30:00Z"
  },
  "message": "News post deleted successfully"
}
```

**Error Responses**:
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: News post not found
- `500 Internal Server Error`: Server error

---

### 7. Publish News Post
Publish a draft news post (admin only).

**Endpoint**: `PATCH /api/v1/news/:id/publish`

**Auth Required**: Yes (Admin)

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | News post ID |

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "publisherId": "admin-uuid",
    "title": "Published News Title",
    "slug": "published-news-slug",
    "body": "Published content...",
    "coverMediaUrl": "https://uploadthing.com/...",
    "coverMediaType": "IMAGE",
    "status": "PUBLISHED",
    "publishedAt": "2026-04-13T11:00:00Z",
    "createdAt": "2026-04-13T10:30:00Z",
    "updatedAt": "2026-04-13T11:00:00Z"
  },
  "message": "News post published successfully"
}
```

**Error Responses**:
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: News post not found
- `500 Internal Server Error`: Server error

---

## Admin Endpoints

### 1. Get All Admins
Retrieve all admin users with pagination (admin only).

**Endpoint**: `GET /api/v1/admins`

**Auth Required**: Yes (Admin)

**Query Parameters**:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | number | 20 | Maximum 100, number of admins to return |
| `offset` | number | 0 | Pagination offset |

**Success Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Admin Name",
      "email": "admin@restaurant.com",
      "role": "ADMIN",
      "isActive": true,
      "createdAt": "2026-04-13T10:30:00Z",
      "updatedAt": "2026-04-13T10:30:00Z"
    }
  ],
  "pagination": {
    "limit": 20,
    "offset": 0,
    "total": 5,
    "pages": 1
  }
}
```

---

### 2. Get Admin by ID
Retrieve a specific admin user by ID (admin only).

**Endpoint**: `GET /api/v1/admins/:id`

**Auth Required**: Yes (Admin)

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Admin user ID |

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Admin Name",
    "email": "admin@restaurant.com",
    "role": "ADMIN",
    "isActive": true,
    "createdAt": "2026-04-13T10:30:00Z",
    "updatedAt": "2026-04-13T10:30:00Z"
  }
}
```

**Error Responses**:
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: Admin not found

---

### 3. Create Admin
Create a new admin user (admin only).

**Endpoint**: `POST /api/v1/admins`

**Auth Required**: Yes (Admin)

**Request Body**:
```json
{
  "name": "New Admin",
  "email": "newadmin@restaurant.com",
  "password": "securepassword123",
  "role": "ADMIN"
}
```

**Success Response (201)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "New Admin",
    "email": "newadmin@restaurant.com",
    "role": "ADMIN",
    "isActive": true,
    "createdAt": "2026-04-13T10:30:00Z",
    "updatedAt": "2026-04-13T10:30:00Z"
  },
  "message": "Admin created successfully"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid request body
- `401 Unauthorized`: Not authenticated
- `409 Conflict`: Email already exists
- `500 Internal Server Error`: Server error

---

### 4. Update Admin
Update an existing admin user (admin only).

**Endpoint**: `PUT /api/v1/admins/:id`

**Auth Required**: Yes (Admin)

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Admin user ID |

**Request Body** (all fields optional):
```json
{
  "name": "Updated Name",
  "email": "newemail@restaurant.com",
  "role": "SUPER_ADMIN",
  "isActive": false
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Updated Name",
    "email": "newemail@restaurant.com",
    "role": "SUPER_ADMIN",
    "isActive": false,
    "createdAt": "2026-04-13T10:30:00Z",
    "updatedAt": "2026-04-13T11:00:00Z"
  },
  "message": "Admin updated successfully"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid request body
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: Admin not found
- `409 Conflict`: Email already exists
- `500 Internal Server Error`: Server error

---

### 5. Delete Admin
Delete an admin user (admin only).

**Endpoint**: `DELETE /api/v1/admins/:id`

**Auth Required**: Yes (Admin)

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Admin user ID |

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Deleted Admin",
    "email": "deleted@restaurant.com",
    "role": "ADMIN",
    "isActive": true,
    "createdAt": "2026-04-13T10:30:00Z",
    "updatedAt": "2026-04-13T10:30:00Z"
  },
  "message": "Admin deleted successfully"
}
```

**Error Responses**:
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: Admin not found
- `500 Internal Server Error`: Server error

---

### 6. Change Admin Password
Change password for an admin user (admin only).

**Endpoint**: `POST /api/v1/admins/:id/change-password`

**Auth Required**: Yes (Admin)

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Admin user ID |

**Request Body**:
```json
{
  "newPassword": "newsecurepassword123"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Responses**:
- `400 Bad Request`: Password too short (minimum 8 characters)
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: Admin not found
- `500 Internal Server Error`: Server error

---

## Upload Endpoints

### 1. Upload News Image
Upload an image for a news post (admin only).

**Endpoint**: `POST /api/v1/upload/news-image`

**Auth Required**: Yes (Admin)

**Content-Type**: `multipart/form-data`

**Request Body**:
```
file: <image file> (max 4MB)
```

**Supported Formats**: PNG, JPG, JPEG, GIF, WebP

**Success Response (201)**:
```json
{
  "success": true,
  "message": "Files uploaded successfully",
  "data": {
    "file": {
      "name": "image.jpg",
      "size": 1024000,
      "url": "https://uploadthing.com/...",
      "type": "image/jpeg"
    }
  }
}
```

**Error Responses**:
- `400 Bad Request`: No file uploaded or invalid format
- `401 Unauthorized`: Not authenticated
- `413 Payload Too Large`: File exceeds 4MB
- `500 Internal Server Error`: Server error

---

### 2. Upload News Video
Upload a video for a news post (admin only).

**Endpoint**: `POST /api/v1/upload/news-video`

**Auth Required**: Yes (Admin)

**Content-Type**: `multipart/form-data`

**Request Body**:
```
file: <video file> (max 64MB)
```

**Supported Formats**: MP4, WebM, MOV, AVI

**Success Response (201)**:
```json
{
  "success": true,
  "message": "Files uploaded successfully",
  "data": {
    "file": {
      "name": "video.mp4",
      "size": 52428800,
      "url": "https://uploadthing.com/...",
      "type": "video/mp4"
    }
  }
}
```

**Error Responses**:
- `400 Bad Request`: No file uploaded or invalid format
- `401 Unauthorized`: Not authenticated
- `413 Payload Too Large`: File exceeds 64MB
- `500 Internal Server Error`: Server error

---

### 3. Delete File
Delete an uploaded file (admin only).

**Endpoint**: `DELETE /api/v1/upload/:fileKey`

**Auth Required**: Yes (Admin)

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `fileKey` | string | File key from UploadThing |

**Success Response (200)**:
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

**Error Responses**:
- `400 Bad Request`: File key is required
- `401 Unauthorized`: Not authenticated
- `500 Internal Server Error`: Server error

---

## Error Handling

The API follows a consistent error response format:

### Error Response Format
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request body or parameters |
| 401 | Unauthorized - Missing or invalid authentication |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists (e.g., duplicate email) |
| 413 | Payload Too Large - File size exceeds limit |
| 500 | Internal Server Error - Server error |

---

## Response Format

### Success Response
All successful responses follow this format:
```json
{
  "success": true,
  "data": {},
  "message": "Optional success message",
  "pagination": {} // Only for paginated endpoints
}
```

### Pagination Response
Paginated endpoints include pagination metadata:
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "limit": 20,
    "offset": 0,
    "total": 100,
    "pages": 5
  }
}
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. Future versions may include rate limiting to prevent abuse.

---

## CORS

The API supports CORS for browser-based requests. Cross-origin requests are enabled by default.

---

## Webhooks

Webhooks will be implemented in future versions to notify external services of events like news publication.

---

## Environment Variables

Required environment variables:

```
DATABASE_URL=postgresql://user:password@localhost:5432/restaurant_web_app_backend
JWT_SECRET=your-jwt-secret-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@restaurant.com
UPLOADTHING_TOKEN=your-uploadthing-token
```

---

## Installation & Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 13+
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd restaurant-web-app-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate deploy
   ```

5. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3001`

---

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run database migrations
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio
```

---

## Testing

### Using Postman or similar tools:

1. **Login to get a token**
   - POST http://localhost:3001/auth/login
   - Body: `{"email": "admin@restaurant.com", "password": "password123"}`

2. **Use the token for protected endpoints**
   - Add header: `Authorization: Bearer <token>`

### Example cURL requests:

**Login:**
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@restaurant.com","password":"password123"}'
```

**Get all news:**
```bash
curl http://localhost:3001/news
```

**Create news (requires token):**
```bash
curl -X POST http://localhost:3001/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "New Article",
    "slug": "new-article",
    "body": "This is a long article content with more than 20 characters..."
  }'
```

---

## Support

For issues or questions, please contact support@restaurant.com or create an issue in the repository.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Version History

### v1.0.0 (2026-04-13)
- Initial release
- Authentication endpoints (login, signup, forgot password, reset password)
- News management endpoints (CRUD)
- Admin user management endpoints
- File upload integration with UploadThing
- JWT-based authentication
- Comprehensive API documentation
