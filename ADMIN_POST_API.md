# Admin API Documentation - POST /api/posts

## Endpoint Overview
**POST /api/posts** - Membuat postingan baru (HANYA ADMIN)

Endpoint ini digunakan untuk membuat postingan blog baru dan hanya dapat diakses oleh pengguna dengan role admin.

## Authentication & Authorization

### Headers
```
Content-Type: application/json
Authorization: Bearer <Auth_token_Admin>
```

### Guard Clause
Endpoint ini menggunakan **guard clause** untuk memastikan hanya admin yang dapat mengakses:

1. **Token Verification**: Verifikasi token JWT dari header Authorization
2. **User Authentication**: Validasi bahwa token valid dan user exists
3. **Admin Role Check**: Memastikan user memiliki role 'admin' di database
4. **Access Denied**: Return 403 jika bukan admin, 401 jika token invalid

## Request

### URL
```
POST /api/posts
```

### URL Params (Path Variable)
None

### Data Params (Request Body)
```json
{
  "title": "string (required)",
  "content": "string (required)", 
  "published": "boolean (optional, default: false)",
  "image_url": "string (optional, nullable)"
}
```

### Field Descriptions
- **title**: Judul postingan (required, akan di-trim whitespace)
- **content**: Konten postingan (required)
- **published**: Status publikasi (optional, default: false)
- **image_url**: URL gambar featured (optional)

### Auto-Generated Fields
- **id**: UUID yang dibuat otomatis oleh database
- **created_at**: Timestamp dibuat otomatis oleh database
- **author_id**: Diisi otomatis dengan ID admin yang membuat post
- **updated_at**: Field ini tidak ada (sesuai permintaan karena tidak ada update)

## Response

### Success Response
**Code**: 201 (Created)

**Content**:
```json
{
  "message": "Post created successfully",
  "post": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Judul Postingan",
    "content": "Isi konten postingan...",
    "published": false,
    "author_id": "admin-user-uuid",
    "created_at": "2024-10-04T10:30:00Z",
    "image_url": null,
    "author": {
      "id": "admin-user-uuid",
      "display_name": "Admin User",
      "role": "admin"
    }
  }
}
```

### Error Responses

#### 400 Bad Request - Missing Required Fields
```json
{
  "error": "Title and content are required"
}
```

#### 401 Unauthorized - Invalid/Missing Token
```json
{
  "error": "Authorization header with Bearer token is required"
}
```
atau
```json
{
  "error": "Invalid or expired token"
}
```

#### 403 Forbidden - Not Admin
```json
{
  "error": "Admin access required"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Failed to create post",
  "details": "Database error message"
}
```

## Usage Examples

### JavaScript/Fetch
```javascript
const createPost = async (postData, adminToken) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify(postData)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to create post')
  }

  return response.json()
}

// Usage
try {
  const newPost = await createPost({
    title: 'Postingan Baru',
    content: 'Ini adalah konten postingan baru...',
    published: true
  }, 'your-admin-jwt-token-here')
  
  console.log('Post berhasil dibuat:', newPost)
} catch (error) {
  console.error('Error:', error.message)
}
```

### cURL Example
```bash
curl -X POST "http://localhost:3000/api/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-admin-jwt-token-here" \
  -d '{
    "title": "Judul Postingan Baru",
    "content": "Ini adalah konten postingan yang panjang...",
    "published": true,
    "image_url": "https://example.com/featured-image.jpg"
  }'
```

### Python Example
```python
import requests
import json

def create_post(title, content, admin_token, published=False, image_url=None):
    url = "http://localhost:3000/api/posts"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {admin_token}"
    }
    data = {
        "title": title,
        "content": content,
        "published": published
    }
    if image_url:
        data["image_url"] = image_url
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 201:
        return response.json()
    else:
        raise Exception(f"Error: {response.json().get('error', 'Unknown error')}")

# Usage
try:
    result = create_post(
        title="Postingan dari Python",
        content="Ini konten dari Python script...",
        admin_token="your-admin-jwt-token-here",
        published=True
    )
    print("Post created:", result)
except Exception as e:
    print("Error:", str(e))
```

## Admin Setup

### 1. Run Database Migrations
```sql
-- Add role column to profiles
-- File: supabase/migrations/add_admin_role.sql
ALTER TABLE public.profiles 
ADD COLUMN role text DEFAULT 'user' CHECK (role IN ('user', 'admin'));
```

### 2. Make User Admin
```sql
-- Using the helper function
SELECT make_user_admin('your-user-uuid-here');

-- Or manually
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = 'your-user-uuid-here';
```

### 3. Verify Admin Status
```sql
SELECT id, display_name, role 
FROM public.profiles 
WHERE role = 'admin';
```

## Security Features

1. **JWT Token Validation**: Token harus valid dan tidak expired
2. **Role-Based Access**: Hanya user dengan role 'admin' yang dapat akses
3. **Input Sanitization**: Title di-trim untuk mencegah whitespace issues
4. **Error Handling**: Comprehensive error responses untuk debugging
5. **Database Constraints**: Role dibatasi dengan CHECK constraint
6. **RLS Policies**: Row Level Security untuk additional protection

## Testing

### Test Valid Admin Request
```bash
# Pastikan token admin valid
curl -X POST "http://localhost:3000/api/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VALID_ADMIN_TOKEN" \
  -d '{"title": "Test Post", "content": "Test content"}'
```

### Test Non-Admin User
```bash
# Akan return 403 Forbidden
curl -X POST "http://localhost:3000/api/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer NON_ADMIN_TOKEN" \
  -d '{"title": "Test Post", "content": "Test content"}'
```

### Test Missing Token
```bash
# Akan return 401 Unauthorized
curl -X POST "http://localhost:3000/api/posts" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Post", "content": "Test content"}'
```

Endpoint ini memberikan keamanan tingkat tinggi dengan guard clause yang ketat untuk memastikan hanya admin yang dapat membuat postingan baru.