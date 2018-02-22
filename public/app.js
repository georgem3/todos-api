$(document).ready(function() {
	$.getJSON("/api/todos")
	.then(addTodos)
	.catch(function(err) {
		console.log(err);
	});

	$("#todoInput").keypress(function(event) {
		if (event.which == 13) createTodo();
	});

	$(".list").on("click", "li", function() {
		updateTodo($(this));
	});

	$(".list").on("click", "span.x", function(e) {
		e.stopPropagation();
		removeTodo($(this).parent().parent());
	});
});

function addTodos(todos) {
	todos.forEach(function(todo){ 
		addTodo(todo);
	});
}

function addTodo(todo) {
	var newTodo = $('<li class="task">'+ todo.task +'<span class="date">'+ todo.created_date.substring(0,10) +'<span class="x">X</span></span></li>');
	newTodo.data("id", todo._id);
	newTodo.data("completed", todo.completed);
	if (todo.completed) newTodo.addClass("done");
	$(".list").append(newTodo);
}

function createTodo() {
	var usrInp = $("#todoInput").val();
	if (usrInp.length > 0) {
		$.post("/api/todos", {task: usrInp})
		.then(function(newTodo) {
			$("#todoInput").val("");
			addTodo(newTodo);
		})
		.catch(function(err) {
			console.log(err);
		});
	}
}

function removeTodo(todo) {
	var delUrl = "/api/todos/" + todo.data("id");
	$.ajax({
		method: "DELETE",
		url: delUrl
	})
	.then(function(data) {
		todo.remove();
	})
	.catch(function(err) {
		console.log(err);
	});
}

function updateTodo(todo) {
	var updateUrl = "/api/todos/" + todo.data("id");
	var newState = !todo.data("completed");
	var updateData = {completed: newState};
	$.ajax({
		method: "PUT",
		url: updateUrl,
		data: updateData
	})
	.then(function(updatedTodo) {
		todo.toggleClass("done");
		todo.data("completed", newState);
	})
	.catch(function(err) {
		console.log(err);
	});
}