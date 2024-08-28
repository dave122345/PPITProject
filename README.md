## Prerequisites
* Operating system: Ubuntu Linux or Ubuntu Windows WSL
* Node.js v18 or newer.
* Docker v24 or newer.


## Running the project
After cloning the repository:

1. Install node.js depenedencies by executing:
`npm install`

2. Start the containerized database:

    `cd mariadb-docker`

    `docker compose up`

3. Run the frontend:
`npm run dev`
4. Launch the backend:
`npm exec esno backend.ts`

5. Open http://localhost:3001 in your web browser.