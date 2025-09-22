# Simple Blog - Developer Learning Guide

This document contains the extracted content from "For Developer untuk Belajar.pdf" converted into a readable format.

## Project Overview

**Simple Blog** is a learning project for both Frontend and Backend developers. This serves as a reference guide containing:

- API contracts and endpoints
- Database schema (ERD) 
- User stories and requirements
- Frontend mockups and designs
- Authentication flow using JWT

## Target Audience

- **Frontend Developers**: Use this as a reference to understand which endpoints to access, what data to send, and what response format to expect
- **Backend Developers**: Use this as a guide to build the server, database structure, and API routes according to the defined contracts

## User Stories

### As a Visitor:
- I want to see a list of all articles so I can choose which articles are interesting to read
- I want to see who the author is for each article so I can recognize the work of my favorite authors

### As an Author (Admin):
- I want to be able to create new articles (title and content) so I can share content with visitors

## Database Schema (ERD)

**Note**: Updated_at doesn't need to be included in the properties of each entity.

### User Object
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john.doe@example.com",
  "created_at": "2025-09-22T10:00:00Z",
  "updated_at": "2025-09-22T10:00:00Z"
}
```

### Post Object
```json
{
  "id": 1,
  "title": "Belajar Backend dari Nol",
  "content": "Ini adalah isi lengkap dari artikel tentang bagaimana memulai belajar backend...",
  "author_id": 1,
  "created_at": "2025-09-22T11:30:00Z",
  "updated_at": "2025-09-22T11:30:00Z"
}
```

## API Contracts

### Users (Authors) 

**Note**: Login API contract not included - you can use 3rd party Auth if you want, as long as you understand how authentication works.

#### GET /user/:id
**Purpose**: Return user with specific id (to display user data only)

- **URL Params**: *Required* `id` (integer)
- **Request Body**: None
- **Headers**: `Content-Type: application/json`
- **Success Response**: 
  - Code: `200`
  - Content: User object
- **Error Response**: 
  - Code: `404` (Not found)
  - Content: `{ "error": "User doesn't exist" }`

### Posts

#### GET /posts
**Purpose**: Return all posts in the system

- **URL Params**: None
- **Request Body**: None
- **Headers**: `Content-Type: application/json`
- **Success Response**: 
  - Code: `200`
  - Content: Array of post objects
- **Error Response**: 
  - Code: `404` (Not found)
  - Content: `{ "error": "No Posts" }`

#### GET /posts/:id
**Purpose**: Return post with specific id

- **URL Params**: *Required* `id` (integer)
- **Request Body**: None
- **Headers**: `Content-Type: application/json`
- **Success Response**: 
  - Code: `200`
  - Content: Post object
- **Error Response**: 
  - Code: `404` (Not found)
  - Content: `{ "error": "Post doesn't exist" }`

#### POST /posts
**Purpose**: Create new post and return the newly created object. **ADMIN ACCESS ONLY** (Create guard clause)

- **URL Params**: None
- **Request Body**: 
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ```
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <Auth_token_Admin>`
- **Success Response**: 
  - Code: `201` (Created)
  - Content: Created post object
- **Error Responses**: 
  - Code: `401` - Content: `{ "error": "Unauthorized" }`
  - Code: `400` - Content: `{ "error": "Title and content cannot be empty" }`

**Note**: `id` and `created_at` are automatically generated (ORMs usually provide this functionality). The `updated_at` field is not needed since there's no update functionality (PUT or PATCH).

## Sequence Diagrams

### Scenario 1: Visitor Gets All Posts (GET /posts)
[See extracted images for visual representation]

### Scenario 2: Admin Creates New Post (POST /posts)
[See extracted images for visual representation]

## Frontend Requirements

**Note**: Keep it simple, doesn't need to be fancy.

### Login Page
- For admin account creation, do it directly in the database (or you can have other ideas)

### For Users (non-admin)
- No login required

### For Admin
- Login required
- Must have "My Profile" button to route to profile page

## Helper Resources

For Supabase users, development should be easier since it's a BaaS (Backend as a Service) - you can just use the built-in functions:

- [Supabase Tutorial 1](https://www.youtube.com/watch?v=gTD8b5Yxuuo&t=59s)
- [TypeScript Version](https://www.youtube.com/watch?v=RDM-nk5f4SE)
- [Authentication with OTP](https://www.youtube.com/watch?v=tpesx-g-7t4) (implements OTP, somewhat irrelevant but useful)

**Key Concept**: JWT Authentication for admin users

## JWT Authentication Flow

### Step 1: User Login (Arrow 1)
- **Diagram**: Arrow 1 shows Client sending information to Server
- **Explanation**: This is when you enter your username and password on the login page. This request is sent to the server for verification. It's like showing your ID at the main gate of a concert.

### Step 2: Server Provides Token (Arrow 2)
- **Diagram**: Arrow 2 shows Server sending something back to Client
- **Explanation**: After the server successfully verifies your username and password, the server doesn't store your login session. Instead, it creates a secure digital "ticket" - the JWT. This token contains information about you (e.g., your user ID) and has a digital signature to prove its authenticity. The server then sends this token back to the client (your browser).

### Step 3: Client Stores Token (Arrow 3)
- **Diagram**: Arrow 3 shows the token being stored in Client's local storage
- **Explanation**: Your browser receives this token and stores it in a secure place, usually in Local Storage or Session Storage. This is like wearing an access wristband given by the event organizers.

### Step 4: Using Token for Subsequent Requests (Arrow 4)
- **Purpose**: For every subsequent request to the server (e.g., when you try to access profile page, post comments, or view private data), the Client will include the stored token in the request headers.
- **Diagram**: Arrow 4 shows Client sending new request to Server, but this time "carrying" the previously stored token.
- **Analogy**: Every time you want to enter the VIP area at the concert, you don't need to show your ID again. You just show your access wristband (token) to the security personnel.

### Step 5: Server Validates Token (Action 5 on Server Side)
- **Diagram**: Action 5 happens inside the Server after receiving the request from arrow 4
- **Explanation**: When the server receives a request containing a token, it will do two main things:
  1. **Check Signature**: Server will verify the digital signature on the token to ensure it's authentic (issued by this server) and hasn't been tampered with.
  2. **Check Expiration**: Server will also check if the token has expired.
- If the token is valid, the server will trust the information inside it and process your request (e.g., display profile page). If invalid, the server will reject the request. This is like security personnel checking if your wristband is real and not just a piece of torn paper.

## JWT Token Structure

JWT consists of 3 parts:
1. **Header**: Type and Algorithm
2. **Payload**: Data  
3. **Signature**: Identity

**Note**: The SECRET in the signature is only stored on the server.

## Visual References

The following images have been extracted from the original PDF and are available in the `extracted_images/` folder:

- `image-000.ppm` through `image-012.ppm`

These images contain visual representations of:
- ERD diagrams
- API flow charts
- Frontend mockups
- Sequence diagrams
- JWT authentication flow

---

*This document was automatically generated from the PDF "For Developer untuk Belajar.pdf"*