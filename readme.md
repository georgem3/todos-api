### A single webpage todo list app with a JSON API.
Stack: NodeJS, MongoDB.

![Imgur](https://i.imgur.com/pRKwKlg.png)

## Dependencies
	express mongoose body-parser request
	

## Installation
	clone repo
	npm install [dependencies] --save
	mongod -path
	node index.js
	
## API endpoints
GET: **/api/todos** - list all todos

POST: **/api/todos** - create a todo

GET: **/api/todos/:id** - get one todo

PUT: **/api/todos/:id** - update todo

DELETE: **/api/todos/:id** - delete todo

---