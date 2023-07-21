sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of server: Create new note from request (body) info and save it into the db.
    server-->>browser: Status 302 - REDIRECT
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JS file
    deactivate server

    Note right of browser: Browser starts executing js code that fetches data (JSON) from the server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON raw data: "{content: 'asdasd', date: '2023-07-21T06:39:51.175Z'}..."
    deactivate server


    Note right of browser: When data is received the browser executes the callback of xmlhttprequeset obj that renders the notes

  
