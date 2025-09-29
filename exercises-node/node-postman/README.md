# HTTP Methods Guide and Postman Demo

This project demonstrates the use of different HTTP methods with an Express.js server and Postman.

## HTTP Methods Explained

HTTP defines a set of request methods (or "verbs") that indicate the desired action to be performed on a resource. Here's an overview of the most common HTTP methods:

### GET

**Purpose**: Retrieve data from the server.

**Characteristics**:
- Read-only operation (should not modify any resources)
- Can be cached
- Remains in browser history
- Can be bookmarked
- Should never be used for sensitive data
- Has length restrictions

**Use when**: You need to fetch information without altering server state.

**Example use cases**:
- Fetch a user profile
- Load a webpage
- Get a list of products

### POST

**Purpose**: Submit data to be processed to a specified resource.

**Characteristics**:
- Creates a new resource
- Not idempotent (multiple identical requests may create multiple resources)
- Cannot be cached
- Does not remain in browser history
- Cannot be bookmarked
- No length restrictions on data

**Use when**: You need to create a new resource or send data that will cause a change in server state.

**Example use cases**:
- Submit a form
- Create a new user account
- Add a blog post

### PUT

**Purpose**: Update an existing resource or create it if it doesn't exist.

**Characteristics**:
- Idempotent (multiple identical requests have the same effect as a single request)
- Replaces the entire resource with the supplied representation
- Should include a complete representation of the resource

**Use when**: You need to update an existing resource when you know its exact location, or create it if it doesn't exist.

**Example use cases**:
- Update a user's complete profile information
- Replace a document or image
- Update product details

### PATCH

**Purpose**: Apply partial modifications to a resource.

**Characteristics**:
- Updates only specified fields
- Idempotent (should be, but depends on implementation)
- Typically smaller payload than PUT

**Use when**: You need to make a partial update to an existing resource.

**Example use cases**:
- Change a user's email address
- Update a product's price
- Modify specific fields in a document

### DELETE

**Purpose**: Remove a specified resource.

**Characteristics**:
- Idempotent (deleting multiple times has same effect as deleting once)
- Removes the resource at the specified location

**Use when**: You need to delete a resource.

**Example use cases**:
- Delete a user account
- Remove a blog post
- Delete an uploaded file

## PUT vs POST: Key Differences

| Aspect | PUT | POST |
|--------|-----|------|
| **Idempotency** | Yes (multiple requests = same result) | No (multiple requests may create multiple resources) |
| **Resource location** | Client decides the URI | Server decides the URI |
| **Safety** | Not safe (modifies state) | Not safe (modifies state) |
| **Complete vs Partial** | Complete replacement | Can be partial or complete |
| **Purpose** | Update or create if doesn't exist | Create new resource |

## PATCH vs PUT: Key Differences

| Aspect | PATCH | PUT |
|--------|-------|-----|
| **Update scope** | Partial update | Complete replacement |
| **Payload size** | Typically smaller | Complete resource representation |
| **Idempotency** | Should be (depends on implementation) | Always |

## Setup

```bash
npm install

nodemon index.js

# Open Postman app
```

Run Postman requests:

## Postman Examples

Below are examples of each HTTP method for testing with Postman:

```json
# Fetch homepage
GET localhost:3000

# Create a new user
POST localhost:3000/register
{
    "name": "John"
}

# Update a user's complete profile
PUT localhost:3000/user/john
{
    "name": "John",
    "email": "john@gmail.com"
}

# Modify just a single field (first name)
PATCH localhost:3000/user/john?fName=Johnny
{
    "fName": "Johnny"
}

# Delete a user
DELETE localhost:3000/user/john
```

## Common HTTP Status Codes

HTTP status codes indicate the result of the HTTP request. They are grouped into five classes:

### 1xx - Informational
- **100 Continue**: The server has received the request headers and the client should proceed to send the request body.

### 2xx - Success
- **200 OK**: Standard response for successful HTTP requests.
- **201 Created**: The request has been fulfilled, resulting in the creation of a new resource.
- **204 No Content**: The server successfully processed the request but is not returning any content.

### 3xx - Redirection
- **301 Moved Permanently**: The requested resource has been permanently moved to a new location.
- **302 Found**: Temporary redirect.
- **304 Not Modified**: The resource has not been modified since last requested.

### 4xx - Client Error
- **400 Bad Request**: The server cannot or will not process the request due to a client error.
- **401 Unauthorized**: Authentication is required and has failed or has not been provided.
- **403 Forbidden**: The request was valid, but the server is refusing action (insufficient permissions).
- **404 Not Found**: The requested resource could not be found.
- **405 Method Not Allowed**: The request method is not supported for the requested resource.
- **409 Conflict**: The request could not be processed because of conflict in the current state of the resource.
- **429 Too Many Requests**: The user has sent too many requests in a given amount of time.

### 5xx - Server Error
- **500 Internal Server Error**: A generic error message when an unexpected condition was encountered.
- **501 Not Implemented**: The server does not support the functionality required to fulfill the request.
- **502 Bad Gateway**: The server was acting as a gateway or proxy and received an invalid response from the upstream server.
- **503 Service Unavailable**: The server is currently unavailable (overloaded or down for maintenance).
- **504 Gateway Timeout**: The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.

## Status Code Selection Guidelines

When designing your API, follow these guidelines for status code selection:

1. **Use 2xx for successful operations**
   - 200 for successful GET
   - 201 for successful POST that creates a resource
   - 204 for successful DELETE or when no response body is needed

2. **Use 4xx for client-side errors**
   - 400 for malformed requests or validation errors
   - 401 for unauthenticated requests
   - 403 for authenticated but unauthorized requests
   - 404 for resources that don't exist

3. **Use 5xx for server-side errors**
   - Only when something went wrong on the server that wasn't the client's fault

4. **Be consistent with status codes across your API**
   - Don't use 200 for some errors and 4xx for others
   - Don't return 200 with error messages in the body

## RESTful API Design Best Practices

REST (Representational State Transfer) is an architectural style for designing networked applications. Here are some best practices for designing RESTful APIs:

### Resource Naming

1. **Use nouns, not verbs for resources**
   - Good: `/users`, `/products`
   - Avoid: `/getUsers`, `/createProduct`

2. **Use plural for collection resources**
   - Good: `/users`, `/articles`
   - Avoid: `/user`, `/article`

3. **Use concrete resource names**
   - Good: `/products`, `/orders`
   - Avoid: `/items`, `/entities`

### URL Structure

1. **Hierarchical relationships with nesting**
   - `/users/{userId}/orders` (orders belonging to a specific user)
   - `/products/{productId}/reviews` (reviews for a specific product)

2. **Limit nesting depth**
   - Keep URLs readable by limiting to 2-3 levels of nesting
   - Too deep: `/users/{userId}/orders/{orderId}/products/{productId}/reviews`

3. **Use query parameters for filtering, sorting and pagination**
   - Filtering: `/products?category=electronics`
   - Sorting: `/products?sort=price_asc`
   - Pagination: `/products?page=2&limit=10`

### Request and Response

1. **Use HTTP methods appropriately**
   - As detailed above in the HTTP Methods section

2. **Consistent response format**
   - Use a consistent structure for all responses
   - Include metadata like pagination info, timestamps, or request IDs

3. **Content negotiation**
   - Support multiple formats (JSON, XML) using Accept headers
   - Default to JSON in most modern APIs

4. **Meaningful error responses**
   ```json
   {
     "error": {
       "code": 404,
       "message": "User not found",
       "details": "The requested user with ID 123 does not exist"
     }
   }
   ```

### Security

1. **Authentication and authorization**
   - Use OAuth 2.0, JWT, or API keys for authentication
   - Check permissions before processing requests

2. **Rate limiting**
   - Protect your API from abuse
   - Include rate limit info in response headers

3. **HTTPS everywhere**
   - Never use HTTP for production APIs

### Versioning

1. **Include version in the URL or header**
   - URL path: `/v1/users`
   - Header: `Accept: application/vnd.company.v1+json`

2. **Make breaking changes only in new versions**
   - Maintain backward compatibility within a version

### Documentation

1. **Provide comprehensive API documentation**
   - Use standards like OpenAPI (Swagger) or API Blueprint
   - Include examples for each endpoint

2. **Document expected status codes and error conditions**
   - What errors can occur and how they'll be formatted

By following these principles, you'll create APIs that are intuitive, consistent, and easy to use.
