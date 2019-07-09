const BASE_URL = "http://localhost:3000"
const ROUTINES_URL = `${BASE_URL}/routines`
const TODOS_URL = `${BASE_URL}/todos`


const mainRoutine = document.querySelector(".routine")
const mainTodo = document.querySelector(".todo")
const routineList = document.querySelector(".routineList")
const todoList = document.querySelector(".todoList")


document.addEventListener('DOMContentLoaded', () => {
  fetch(ROUTINES_URL)
  .then(resp => resp.json())
  .then(data => data.forEach((routine) => {renderRoutines(routine)}))

function renderRoutines(routine){

      const li = document.createElement("li")
      const deleteButton = document.createElement("button")

      deleteButton.innerHTML = `<img src="">`

      li.innerText = routine.title

      routineList.append(li, deleteButton)

      deleteButton.addEventListener("click", () => {
        let id = routine.id
        fetch(ROUTINES_URL + `/${id}`, {
          method: "DELETE"
        })
        li.remove();
        deleteButton.remove();
      })


      li.addEventListener("click", (e) => {
        let id = routine.id
        li.style.color = "red"
        fetch(TODOS_URL)
        .then(resp => resp.json())
        .then(data => renderTodos(data, id))

      })


  mainRoutine.append(routineList)

}


  const newRoutineForm = document.querySelector("#create-routine-form")
  newRoutineForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const newRoutineTitle = document.querySelector("#new-routine-title")
    fetch(ROUTINES_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: newRoutineTitle.value
      })
    })
    .then(res => res.json())
    .then(data => {
      newRoutineTitle.value=""
      renderRoutines(data)
    })
  })


  function renderTodos(todos, id){
    const newTodoForm = document.querySelector("#create-todo-form")
    newTodoForm.dataset.routine_id = id
    const newTodoName = document.querySelector("#new-todo-name")
    const newTodoDuration = document.querySelector('#new-todo-duration')

    mainRoutine.style = "display:none"
    mainTodo.style = "display:inline"

    newTodoForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const todoData = {
        routine_id: newTodoForm.dataset.routine_id,
        name: newTodoName.value,
        duration: newTodoDuration.value
      }

      fetch(TODOS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(todoData)
      })
      .then(res => res.json())
      .then(data => {
        newTodoName.value=""
        newTodoDuration.value=""
      })
    })

    todos.forEach((todo) => {
      if (id === todo.routine_id) {
        const li = document.createElement("li")
        const h4 = document.createElement("h4")
        const clockdiv = document.createElement("div")
        const minutesSpan = document.createElement("span")
        const secondsSpan = document.createElement("span")
        const deleteButton = document.createElement("button")

        clockdiv.setAttribute("id", "clockdiv")
        minutesSpan.className = "minutes"
        secondsSpan.className = "seconds"

        deleteButton.innerHTML = `<img src="">`

        li.innerText = todo.name
        h4.innerText = todo.duration

        clockdiv.append(minutesSpan, secondsSpan)

        li.append(h4,clockdiv, deleteButton)
        todoList.append(li)

        deleteButton.addEventListener("click", () => {
          let id = todo.id
          fetch(TODOS_URL + `/${id}`, {
            method: "DELETE"
          })
          li.remove()
          deleteButton.remove()
        })
      }
      })

      function renderTodo(){
        const li = document.createElement("li")
        const h4 = document.createElement("h4")
        const clockdiv = document.createElement("div")
        const minutesSpan = document.createElement("span")
        const secondsSpan = document.createElement("span")
        const deleteButton = document.createElement("button")

        clockdiv.setAttribute("id", "clockdiv")
        minutesSpan.className = "minutes"
        secondsSpan.className = "seconds"

        deleteButton.innerHTML = `<img src="">`

        li.innerText = todo.name
        h4.innerText = todo.duration

        clockdiv.append(minutesSpan, secondsSpan)

        li.append(h4,clockdiv, deleteButton)
        todoList.append(li)

        deleteButton.addEventListener("click", () => {
          let id = todo.id
          fetch(TODOS_URL + `/${id}`, {
            method: "DELETE"
          })
          li.remove()
          deleteButton.remove()
        })

      }

      mainTodo.append(todoList);
  }


})
