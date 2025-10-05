# Blog Application - Architecture & Planning Diagrams

## Application Architecture

```mermaid
flowchart TB
    subgraph Client["Client Layer"]
        Browser["Web Browser"]
    end
    
    subgraph Server["Express Server (Node.js)"]
        Routes["Route Handlers"]
        Storage["In-Memory Storage"]
        Routes --> Storage
    end
    
    subgraph Views["View Layer (EJS)"]
        Layout["Layout/Partials"]
        Home["Home Page"]
        Create["Create/Edit Form"]
        Layout --> Home
        Layout --> Create
    end
    
    subgraph Static["Static Assets"]
        CSS["CSS Styles"]
        Images["Images/Icons"]
    end
    
    Browser --> Routes
    Routes --> Views
    Views --> Browser
    Static --> Browser
    
    style Client fill:#e1f5ff
    style Server fill:#fff4e1
    style Views fill:#e8f5e9
    style Static fill:#fce4ec
```

## Component Flow Diagram

```mermaid
flowchart LR
    subgraph Components["Application Components"]
        direction TB
        Header["Header/Navigation"]
        PostList["Post List Display"]
        PostCard["Individual Post Card"]
        PostForm["Create/Edit Form"]
        Footer["Footer"]
        
        Header -.-> PostList
        PostList --> PostCard
        PostForm -.-> PostList
    end
    
    subgraph Data["Data Flow"]
        direction TB
        Request["HTTP Request"]
        Controller["Route Handler"]
        Model["Post Model"]
        Response["HTTP Response"]
        
        Request --> Controller
        Controller --> Model
        Model --> Controller
        Controller --> Response
    end
    
    Components --> Data
    
    style Components fill:#e3f2fd
    style Data fill:#fff3e0
```

## Navigation Flow

```mermaid
flowchart TD
    Start(("User Visits Site")) --> Home["Home Page<br/>(View All Posts)"]
    
    Home --> Action1{"User Action"}
    
    Action1 -->|"Click 'New Post'"| CreatePage["Create Post Form"]
    Action1 -->|"Click 'Edit' on Post"| EditPage["Edit Post Form"]
    Action1 -->|"Click 'Delete' on Post"| ConfirmDelete{"Confirm Delete?"}
    Action1 -->|"Click 'Read More'"| ViewPost["View Full Post"]
    
    CreatePage --> FillCreate["Fill Form Fields:<br/>- Title<br/>- Author<br/>- Content"]
    FillCreate --> SubmitCreate["Submit New Post"]
    SubmitCreate --> ValidateCreate{"Valid Data?"}
    ValidateCreate -->|Yes| SaveCreate["Save to Memory"]
    ValidateCreate -->|No| ErrorCreate["Show Error"]
    ErrorCreate --> FillCreate
    SaveCreate --> Home
    
    EditPage --> FillEdit["Modify Form Fields:<br/>- Title<br/>- Author<br/>- Content"]
    FillEdit --> SubmitEdit["Submit Changes"]
    SubmitEdit --> ValidateEdit{"Valid Data?"}
    ValidateEdit -->|Yes| UpdatePost["Update in Memory"]
    ValidateEdit -->|No| ErrorEdit["Show Error"]
    ErrorEdit --> FillEdit
    UpdatePost --> Home
    
    ConfirmDelete -->|Yes| DeletePost["Remove from Memory"]
    ConfirmDelete -->|No| Home
    DeletePost --> Home
    
    ViewPost --> BackHome["Navigate Back"]
    BackHome --> Home
    
    style Home fill:#4caf50,color:#fff
    style CreatePage fill:#2196f3,color:#fff
    style EditPage fill:#ff9800,color:#fff
    style ConfirmDelete fill:#f44336,color:#fff
    style ViewPost fill:#9c27b0,color:#fff
```

## CRUD Operations Flow

```mermaid
flowchart TD
    subgraph Create["CREATE Operation"]
        C1["GET /new"] --> C2["Display Create Form"]
        C2 --> C3["User Fills Form"]
        C3 --> C4["POST /posts"]
        C4 --> C5["Validate Input"]
        C5 --> C6{"Valid?"}
        C6 -->|Yes| C7["Generate Unique ID"]
        C7 --> C8["Add to Posts Array"]
        C8 --> C9["Redirect to Home"]
        C6 -->|No| C10["Show Error"]
        C10 --> C2
    end
    
    subgraph Read["READ Operation"]
        R1["GET /"] --> R2["Fetch All Posts"]
        R2 --> R3["Render Home View"]
        R3 --> R4["Display Post Cards"]
        
        R5["GET /posts/:id"] --> R6["Find Post by ID"]
        R6 --> R7{"Post Exists?"}
        R7 -->|Yes| R8["Render Post View"]
        R7 -->|No| R9["404 Not Found"]
    end
    
    subgraph Update["UPDATE Operation"]
        U1["GET /posts/:id/edit"] --> U2["Find Post by ID"]
        U2 --> U3{"Post Exists?"}
        U3 -->|Yes| U4["Pre-fill Form"]
        U3 -->|No| U5["404 Not Found"]
        U4 --> U6["User Modifies Data"]
        U6 --> U7["POST /posts/:id/edit"]
        U7 --> U8["Validate Input"]
        U8 --> U9{"Valid?"}
        U9 -->|Yes| U10["Update Post in Array"]
        U10 --> U11["Redirect to Home"]
        U9 -->|No| U12["Show Error"]
        U12 --> U4
    end
    
    subgraph Delete["DELETE Operation"]
        D1["POST /posts/:id/delete"] --> D2["Find Post Index"]
        D2 --> D3{"Post Exists?"}
        D3 -->|Yes| D4["Remove from Array"]
        D4 --> D5["Redirect to Home"]
        D3 -->|No| D6["404 Not Found"]
    end
    
    style Create fill:#e8f5e9
    style Read fill:#e3f2fd
    style Update fill:#fff3e0
    style Delete fill:#ffebee
```

## Routes Structure

```mermaid
flowchart LR
    Root["/"] --> GetIndex["GET: Render Home Page<br/>with All Posts"]
    
    New["/new"] --> GetNew["GET: Render<br/>Create Post Form"]
    
    Posts["/posts"] --> PostPosts["POST: Create<br/>New Post"]
    
    PostId["/posts/:id"] --> GetPostId["GET: Render<br/>Single Post View"]
    
    Edit["/posts/:id/edit"] --> GetEdit["GET: Render<br/>Edit Post Form"]
    Edit --> PostEdit["POST: Update<br/>Existing Post"]
    
    Del["/posts/:id/delete"] --> PostDelete["POST: Delete Post<br/>& Redirect"]
    
    style Root fill:#4caf50,color:#fff
    style New fill:#2196f3,color:#fff
    style Posts fill:#9c27b0,color:#fff
    style Edit fill:#ff9800,color:#fff
    style Del fill:#f44336,color:#fff
```

## Data Model Structure

```mermaid
classDiagram
    class Post {
        +String id
        +String title
        +String author
        +String content
        +Date createdAt
        +Date updatedAt
        +String getExcerpt()
        +String getFormattedDate()
    }
    
    class PostsArray {
        +Array~Post~ posts
        +addPost(post)
        +getPost(id)
        +updatePost(id, data)
        +deletePost(id)
        +getAllPosts()
    }
    
    PostsArray "1" --> "*" Post : contains
    
    note for Post "Each post is stored as\nan object with metadata"
    note for PostsArray "In-memory array storage\n(resets on server restart)"
```

## Responsive Design Breakpoints

```mermaid
flowchart LR
    Mobile["📱 Mobile<br/>320px - 767px"] --> Tablet["📱 Tablet<br/>768px - 1023px"]
    Tablet --> Desktop["💻 Desktop<br/>1024px+"]
    
    Mobile -.->|Layout| MLayout["Single Column<br/>Stacked Cards<br/>Full-width Forms"]
    Tablet -.->|Layout| TLayout["2-Column Grid<br/>Compact Cards<br/>Optimized Forms"]
    Desktop -.->|Layout| DLayout["3-Column Grid<br/>Expanded Cards<br/>Side-by-side Layout"]
    
    style Mobile fill:#4caf50,color:#fff
    style Tablet fill:#2196f3,color:#fff
    style Desktop fill:#9c27b0,color:#fff
```

## Technology Stack

```mermaid
flowchart TB
    subgraph Frontend["Frontend Layer"]
        HTML["HTML5<br/>(Semantic Markup)"]
        CSS["CSS3<br/>(Flexbox/Grid)"]
        EJS["EJS Templates<br/>(Dynamic Rendering)"]
    end
    
    subgraph Backend["Backend Layer"]
        Node["Node.js<br/>(Runtime)"]
        Express["Express.js<br/>(Web Framework)"]
        Middleware["Middleware<br/>(body-parser, etc.)"]
    end
    
    subgraph Storage["Data Layer"]
        Memory["In-Memory Array<br/>(Temporary Storage)"]
    end
    
    Frontend --> Backend
    Backend --> Storage
    
    style Frontend fill:#e3f2fd
    style Backend fill:#fff3e0
    style Storage fill:#f3e5f5
```
