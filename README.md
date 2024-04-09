# react-django-docker-template
Basic web development project for a React (typescript), Django and Docker tech stack. Contains the following:
- containers for frontend, backend, database(mysql) and redis. ✅
- Backend for basic authentication. ✅
- Frontend for basic authentication. ✅
- integrations for css frameworks sass and bootstrap. ✅
- React config file for formatting. ✅
- Redux provider for keeping track of global state. ✅
- Basic frontend testing using jest. 
- Basic backend testing using django tests. ✅
- Django commands for changing app names and project name ✅

Things to change:
- Remove frontend from docker
- Add tailwindcss support
- Add support for django workers
- Add support for websockets
- Add support for cronjobs


# Get started
After forking the project, you can start the app by running `docker-compose up`.
Change the names of the containers in `docker-compose.yml` to your personal preference, and updating the values in `.env` in the backend folder, you can rename the app by running: `docker exec -it [BACKEND_CONTAINER_NAME] python3 manage.py renameapp backend [DESIRED_NAME]`.
