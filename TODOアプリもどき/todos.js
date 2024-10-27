let todoList = [];

document.getElementById('saveButton').addEventListener('click', function() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const importance = parseInt(document.getElementById('importance').value);

    if (title && content) {
        const todoItem = { title, content, importance };
        todoList.push(todoItem);
        todoList.sort((a, b) => b.importance - a.importance); // 重要度順にソート
        updateTodoList();
        clearInputs();
    } else {
        alert("タイトルと内容を入力してください。");
    }
});

function updateTodoList() {
    const todoListDiv = document.getElementById('todoList');
    todoListDiv.innerHTML = ''; // リストをクリア

    todoList.forEach((item, index) => {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo-item';
        todoDiv.innerHTML = `
            <div>
                <strong>${item.title}</strong><br>
                <span>${item.content}</span>
            </div>
            <button class="deleteButton" onclick="deleteTodo(${index})">削除</button>
        `;
        todoListDiv.appendChild(todoDiv);
    });
}

function deleteTodo(index) {
    todoList.splice(index, 1); // 指定したインデックスのTODOを削除
    updateTodoList();
}

function clearInputs() {
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('importance').value = '1';
}
