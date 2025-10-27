## 🚀 Installation

```bash
# Initialize npm (if needed)
npm init -y

# Install dependencies
npm install

# Fix security vulnerabilities
npm audit fix
```

Start the server:
```bash
# Option 1: Using node directly
node index.js

# Option 2: Using nodemon (if installed)
nodemon index.js

# Option 3: Using a different port to avoid conflicts
PORT=3001 node index.js
# Or for nodemon:
PORT=3001 nodemon index.js
```

Open URL in Browser:  
http://localhost:3000/

---

## 🧪 Testing the API

### Base URL
```
http://localhost:3000
```

### Using cURL

**1. Get a random joke:**
```bash
curl http://localhost:3000/random
```

**2. Get a specific joke by ID:**
```bash
curl http://localhost:3000/jokes/1
```

**3. Filter jokes by type:**
```bash
curl "http://localhost:3000/filter?type=Science"
```

**4. Create a new joke (POST):**
```bash
curl -X POST http://localhost:3000/jokes \
  -d "text=Why did the chicken cross the road? To get to the other side!" \
  -d "type=Classic"
```

**5. Replace a joke (PUT):**
```bash
curl -X PUT http://localhost:3000/jokes/1 \
  -d "text=Updated joke text" \
  -d "type=Puns"
```

**6. Partially update a joke (PATCH):**
```bash
curl -X PATCH http://localhost:3000/jokes/1 \
  -d "text=Partially updated joke"
```

**7. Delete a specific joke:**
```bash
curl -X DELETE http://localhost:3000/jokes/1
```

**8. Delete all jokes (requires master key):**
```bash
curl -X DELETE "http://localhost:3000/all?key=4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT"
```

---

### Using Postman

**1. GET /random**
- Method: `GET`
- URL: `http://localhost:3000/random`

**2. GET /jokes/:id**
- Method: `GET`
- URL: `http://localhost:3000/jokes/5`

**3. GET /filter**
- Method: `GET`
- URL: `http://localhost:3000/filter?type=Puns`

**4. POST /jokes**
- Method: `POST`
- URL: `http://localhost:3000/jokes`
- Body: `x-www-form-urlencoded`
  - `text`: "Why don't programmers like nature? It has too many bugs."
  - `type`: "Programming"

**5. PUT /jokes/:id**
- Method: `PUT`
- URL: `http://localhost:3000/jokes/2`
- Body: `x-www-form-urlencoded`
  - `text`: "Replacement joke text"
  - `type`: "Wordplay"

**6. PATCH /jokes/:id**
- Method: `PATCH`
- URL: `http://localhost:3000/jokes/3`
- Body: `x-www-form-urlencoded`
  - `text`: "Updated joke text" (only field to update)

**7. DELETE /jokes/:id**
- Method: `DELETE`
- URL: `http://localhost:3000/jokes/10`

**8. DELETE /all**
- Method: `DELETE`
- URL: `http://localhost:3000/all?key=4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT`

---

## 📝 API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/random` | Get a random joke |
| GET | `/jokes/:id` | Get a specific joke by ID |
| GET | `/filter?type=<type>` | Filter jokes by type |
| POST | `/jokes` | Create a new joke |
| PUT | `/jokes/:id` | Replace a joke completely |
| PATCH | `/jokes/:id` | Partially update a joke |
| DELETE | `/jokes/:id` | Delete a specific joke |
| DELETE | `/all?key=<masterKey>` | Delete all jokes (requires master key) |

**Available Joke Types:** Science, Puns, Wordplay, Math, Food, Sports, Movies  
