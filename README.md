
### Farm Task Manager
### Developed by Anthony Mwaura

### Overview
Farm Task Manager is a powerful and intuitive system designed to help farm managers organize and track farm activities efficiently. The application enables managers to assign tasks, monitor worker progress, and manage farm operations seamlessly. Built with Flask for the backend and React for the frontend, it ensures a smooth and responsive user experience.

### How the Application Works

### A. Manager (Admin)
A manager oversees all farm activities, including task assignment and worker management.

## Account Management

- 1. Registers a new account.
- 2. Logs in to access the dashboard.
- 3Logs out when finished.
## Task Management

- 1. Creates tasks for specific farms.
- 2. Assigns tasks to one or more workers.
- 3. Views all tasks and their current status (pending, in progress, completed).
- 4.Updates task details, including deadlines and progress.
- 5. Deletes tasks that are no longer needed.
## farm Management

- Adds new farms with details like name, size, and location.
- Views all farms and their associated tasks.
- Deletes farms if no tasks are linked to them.
- update farm details
## Worker Management

- Adds new workers with details like name and role.
- Views all workers and their assigned tasks.
- Deletes workers.
## WorkerTasks
- Add tasks to workers.
- Update workers tasks.
- Delete tasks from workers.


## System Workflow
- 1.Manager Registration & Login

- A new manager registers and logs in to the system.
- Once authenticated, the manager gains access to the dashboard.
## Adding Farms

- The manager adds farm details (name, size, location).
## Adding Workers

- The manager registers workers with names and roles.
## Creating Tasks

- The manager creates tasks and assigns them to workers.
- Each task is linked to a specific farm.
## Worker Task Progress

- Workers log in to view their assigned tasks.
- They update the task status as "In Progress" or "Complete."
## Task Monitoring

- The manager can track the progress of each task in real-time.
- Completed tasks can be reviewed or archived.
## Farm & Worker Management

- The manager can update or delete farm and worker details as needed.

## Database Structure
- The system is designed with well-defined relationships:

## One-to-Many (Users → Tasks)

- A manager can create and oversee multiple tasks.
## Many-to-Many (Workers ↔ Tasks)

- Tasks can involve multiple workers, and workers can work on multiple tasks.
## One-to-Many (Farms → Tasks)

- Each farm can have multiple tasks assigned.

      ## Technologies Used
## Frontend
- React – For building the user interface.
- CSS & TailwindCSS – For styling and responsive layouts.
## Backend
- Flask – For building RESTful APIs.
- Flask-SQLAlchemy – For database modeling.
- Flask-JWT-Extended – For secure authentication.
- Flask-Mail – For sending notifications.
- Flask-Migrate – For managing database migrations.
## Deployment
- Frontend – Hosted on Vercel.
- Backend – Hosted on Render.
- Postman – Used for API testing.

 ## Installation & Setup
- 1. Clone the Repository

- git clone https://github.com/your-username/farm-task-manager.git
- cd farm-task-manager
- 2. Backend Setup
   - 1. Install dependencies:
      - pipenv install.
      - pipenv shell.
- 3. Apply database migrations:

   - flask db upgrade
- 4.Start the Flask server:

   - flask run
## Frontend Setup
- 1.  Navigate to the frontend folder:

   - cd  frontend
- 2. Install dependencies:

  - npm install
- 3. Start the React application:

  -npm run dev

 ## API Endpoints
- Method	Endpoint	     Description
- POST	   /auth/register	 Register a new manager
- POST	   /auth/login	    Login as manager/worker
- GET	    /farms	        View all farms
- POST	   /farms	        Create a new farm
- DELETE	/farms/:id	   Delete a farm
- GET	  /workers	       View all workers
- POST	  / workers	       Add a new worker
- GET	  /tasks	      View all tasks
- POST	  /tasks	      Create a new task
- PUT	  /tasks/:id	    Update task details
- DELETE	/tasks/:id	  Delete a task

## Live Demo & Deployment
- 🔗 Live Application: https://phasefrontend-git-main-anthonyocmpo1s-projects.vercel.app/
- 🎥 Demo Video: https://www.youtube.com/live/xT7xl00nxos


## Contact Information
📧 Email: mwauraa@gmail.com
📞 Phone: 0715284708

## License
This project is licensed under the MIT License.
