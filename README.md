# testing_github_actions_workflow

Test display of SVG files:

<img src="cp-rtp-tool - 🚀 Prepare RTP (Run RTP Checks) - workflow diagram.svg" alt="Workflow Diagram" width="auto">

Test display of PNG files:

[Workflow Diagram](workflow_diagram.png)


Test of Mermaid:
```mermaid
sequenceDiagram
	title: Using Mermaid in Markdown files
	autonumber
    participant Client as Client (Frontend/API Request)
    participant API as API Server
    participant Redis as Redis Cache
    participant DB as Database (MongoDB/PostgreSQL)
    participant Datadog as Datadog

    Client->>API: Request Data
	activate Redis	
    API->>Redis: Check Cache
	Note right of Redis: Get data from cache <br/> if it exists

    alt Cache Hit
        Redis-->>API: Return Cached Data
		deactivate Redis
        API-->>Client: Respond with Cached Data
    else Cache Miss
		
		rect rgb(200, 230, 255)
			activate DB
        	API->>DB: Query Database
			Note right of DB: Else <br/> get data from DB
        	DB-->>API: Return Data
			deactivate DB
		end
		
		activate Redis

	    loop For each country
			loop For each car
	        	API->>API: Format data
	    	end
	    end
		
        API->>Redis: Store Data in Cache
        API-->>Client: Respond with Fresh Data
		deactivate Redis
    end
    API->>Datadog: Log Request & Cache Performance
    Datadog-->>DevOps: Alert on Cache Issues (if any)
```
