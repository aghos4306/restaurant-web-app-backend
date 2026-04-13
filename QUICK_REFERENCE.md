# Quick Reference & Testing Guide

## Quick Start

```bash
# 1. Start the server
npm run dev

# Server runs on: http://localhost:3001
# All API endpoints are prefixed with: /api/v1

# 2. Test with curl or import into Postman
```

---

## Testing Endpoints with cURL

### 1. Authentication

#### Sign Up (Create Admin)
```bash
curl -X POST http://localhost:3001/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@restaurant.com",
    "password": "password123",
    "name": "Admin User"
  }'
```

#### Login
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@restaurant.com",
    "password": "password123"
  }'
```

**Response includes token:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Get Current User
```bash
curl -X GET http://localhost:3001/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 2. News Management

#### Get All News (Public)
```bash
curl -X GET "http://localhost:3001/api/v1/news?limit=10&offset=0"
```

#### Get News by ID (Public)
```bash
curl -X GET http://localhost:3001/api/v1/news/NEWS_ID_HERE
```

#### Get News by Slug (Public)
```bash
curl -X GET http://localhost:3001/api/v1/news/slug/my-article-slug
```

#### Create News (Admin Only)
```bash
curl -X POST http://localhost:3001/api/v1/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Restaurant News Article",
    "slug": "restaurant-news-article",
    "body": "This is a detailed article content that must be at least 20 characters long for validation...",
    "coverMediaUrl": "https://example.com/image.jpg",
    "coverMediaType": "IMAGE",
    "status": "DRAFT"
  }'
```

#### Update News (Admin Only)
```bash
curl -X PUT http://localhost:3001/api/v1/news/NEWS_ID_HERE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Updated Title",
    "status": "PUBLISHED"
  }'
```

#### Delete News (Admin Only)
```bash
curl -X DELETE http://localhost:3001/api/v1/news/NEWS_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Publish News (Admin Only)
```bash
curl -X PATCH http://localhost:3001/api/v1/news/NEWS_ID_HERE/publish \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 3. Admin Management

#### Get All Admins (Admin Only)
```bash
curl -X GET "http://localhost:3001/api/v1/admins?limit=10&offset=0" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Get Admin by ID (Admin Only)
```bash
curl -X GET http://localhost:3001/api/v1/admins/ADMIN_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Create Admin (Admin Only)
```bash
curl -X POST http://localhost:3001/api/v1/admins \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "New Admin",
    "email": "newadmin@restaurant.com",
    "password": "securepassword123",
    "role": "ADMIN"
  }'
```

#### Update Admin (Admin Only)
```bash
curl -X PUT http://localhost:3001/api/v1/admins/ADMIN_ID_HERE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Updated Name",
    "isActive": true
  }'
```

#### Delete Admin (Admin Only)
```bash
curl -X DELETE http://localhost:3001/api/v1/admins/ADMIN_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Change Admin Password (Admin Only)
```bash
curl -X POST http://localhost:3001/api/v1/admins/ADMIN_ID_HERE/change-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "newPassword": "newpassword123"
  }'
```

---

### 4. File Upload

#### Upload Image (Admin Only)
```bash
curl -X POST http://localhost:3001/api/v1/upload/news-image \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "file=@/path/to/image.jpg"
```

#### Upload Video (Admin Only)
```bash
curl -X POST http://localhost:3001/api/v1/upload/news-video \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "file=@/path/to/video.mp4"
```

#### Delete File (Admin Only)
```bash
curl -X DELETE http://localhost:3001/api/v1/upload/FILE_KEY_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Testing Workflow

### Step 1: Create Initial Admin Account
```bash
npm run dev  # Start server

# In another terminal:
curl -X POST http://localhost:3001/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@restaurant.com",
    "password": "password123",
    "name": "Admin"
  }'
```

### Step 2: Login to Get Token
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@restaurant.com",
    "password": "password123"
  }' | jq '.token' -r
```

**Save the token as environment variable:**
```bash
export TOKEN="eyJhbGciOiJIUzI1NiIs..."
```

### Step 3: Test News Endpoints
```bash
# Create draft news
curl -X POST http://localhost:3001/api/v1/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Test Article",
    "slug": "test-article",
    "body": "This is a test article with sufficient content length for validation purposes..."
  }'

# Get all news
curl -X GET http://localhost:3001/api/v1/news

# Publish news (replace with actual ID)
curl -X PATCH http://localhost:3001/api/v1/news/NEWS_ID/publish \
  -H "Authorization: Bearer $TOKEN"
```

### Step 4: Test Admin Endpoints
```bash
# Get all admins
curl -X GET http://localhost:3001/api/v1/admins \
  -H "Authorization: Bearer $TOKEN"

# Create new admin
curl -X POST http://localhost:3001/api/v1/admins \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Second Admin",
    "email": "admin2@restaurant.com",
    "password": "password123"
  }'
```

### Step 5: Test File Upload
```bash
# Create a test image file
echo "test" > test.txt

# Upload as image
curl -X POST http://localhost:3001/api/v1/upload/news-image \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@test.txt"
```

---

## Postman Collection Import

### Using Postman Desktop App:

1. **Create New Collection**: "Restaurant API"

2. **Create requests for each endpoint**:
   - Set Authorization: Bearer Token
   - Use variables for TOKEN and BASE_URL

3. **Environment Setup**:
   ```json
   {
     "base_url": "http://localhost:3001",
     "token": "YOUR_TOKEN_HERE"
   }
   ```

4. **Authorization Header Template**:
   ```
   Authorization: Bearer {{token}}
   ```

---

## Important: API Endpoints Prefix

**All endpoints are prefixed with `/api/v1`**

| Category | Base URL |
|----------|----------|
| Auth | `http://localhost:3001/api/v1/auth` |
| News | `http://localhost:3001/api/v1/news` |
| Admins | `http://localhost:3001/api/v1/admins` |
| Upload | `http://localhost:3001/api/v1/upload` |

---

## Common Response Examples

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "Item Name"
  },
  "message": "Operation successful"
}
```

### Error Response (400)
```json
{
  "success": false,
  "error": "Invalid request body"
}
```

### Error Response (401)
```json
{
  "success": false,
  "error": "Unauthorized"
}
```

### Error Response (404)
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### Error Response (409)
```json
{
  "success": false,
  "error": "Email already exists"
}
```

---

## Validation Rules

### News Post Creation
- `title`: Minimum 5 characters
- `slug`: Minimum 3 characters, must be unique
- `body`: Minimum 20 characters
- `coverMediaUrl`: Must be valid URL (optional)
- `coverMediaType`: Must be 'IMAGE' or 'VIDEO' (optional)
- `status`: Must be 'DRAFT' or 'PUBLISHED' (optional, defaults to DRAFT)

### Admin Creation
- `name`: Minimum 3 characters
- `email`: Must be valid email format, must be unique
- `password`: Minimum 8 characters
- `role`: Must be 'ADMIN' or 'SUPER_ADMIN' (optional, defaults to ADMIN)

### File Upload
- **Images**: Max 4MB, formats: PNG, JPG, JPEG, GIF, WebP
- **Videos**: Max 64MB, formats: MP4, WebM, MOV, AVI

---

## Database Schema

### Admin Table
```sql
id (UUID)
name (String)
email (String, unique)
password_hash (String)
role (Enum: ADMIN, SUPER_ADMIN)
is_active (Boolean, default: true)
created_at (DateTime)
updated_at (DateTime)
```

### NewsPost Table
```sql
id (UUID)
publisher_id (UUID, FK to Admin)
title (String)
slug (String, unique)
body (String)
cover_media_url (String, nullable)
cover_media_type (Enum: IMAGE, VIDEO, nullable)
status (Enum: DRAFT, PUBLISHED, default: DRAFT)
published_at (DateTime, nullable)
created_at (DateTime)
updated_at (DateTime)
```

### PasswordResetToken Table
```sql
id (UUID)
admin_id (UUID, FK to Admin)
token (String, unique)
expires_at (DateTime)
used (Boolean, default: false)
created_at (DateTime)
```

---

## Troubleshooting

### Issue: "Database connected" not showing
**Solution**: Check DATABASE_URL in .env file
```bash
echo $DATABASE_URL
```

### Issue: Token not working
**Solution**: Token might be expired (7 day expiry)
```bash
# Get new token with login endpoint
```

### Issue: Validation errors
**Solution**: Check required fields in request body
```bash
# Example validation error response
{
  "success": false,
  "error": "Validation failed"
}
```

### Issue: File upload failing
**Solution**: Check file size limits and UploadThing token
- Images: Max 4MB
- Videos: Max 64MB

### Issue: Port 3001 already in use
**Solution**: Kill existing process or use different port
```bash
# Find process using port 3001
lsof -i :3001

# Kill process
kill -9 PID
```

---

## Performance Tips

1. **Pagination**: Always use pagination for list endpoints
   ```bash
   GET /news?limit=20&offset=0
   ```

2. **Filtering**: Use query parameters to filter data
   ```bash
   GET /news?published=true
   ```

3. **Caching**: Implement caching for frequently accessed data
   ```bash
   # Future enhancement
   ```

4. **Database Indexes**: Ensure indexes on frequently queried fields
   - email (unique)
   - slug (unique)
   - status
   - created_at

---

## API Rate Limiting (Future)

Currently unlimited, but recommended limits:
- 100 requests per minute for authenticated endpoints
- 20 requests per minute for public endpoints
- 10 requests per minute for auth endpoints

---

## Security Checklist

- ✅ JWT token expiration (7 days)
- ✅ Password hashing with bcryptjs
- ✅ Email validation
- ✅ Input sanitization with Zod
- ✅ SQL injection prevention (Prisma)
- ✅ Admin-only route protection
- ✅ CORS enabled
- ⚠️ Rate limiting (recommended)
- ⚠️ HTTPS in production (recommended)
- ⚠️ Environment variables (required)

---

## Environment Configuration

### Development (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/restaurant_web_app_backend
JWT_SECRET=dev-secret-key-change-in-production
NODE_ENV=development
```

### Production (.env)
```
DATABASE_URL=postgresql://user:password@prod-db:5432/restaurant_web_app_backend
JWT_SECRET=secure-random-secret-key
NODE_ENV=production
UPLOADTHING_TOKEN=your-uploadthing-token
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## Version Information

- **API Version**: 1.0.0
- **Node.js**: 18+
- **PostgreSQL**: 13+
- **TypeScript**: 6.0.2
- **Express**: 5.2.1
- **Prisma**: 6.19.3

---

**Last Updated**: April 13, 2026
**Status**: ✅ Ready for Testing
