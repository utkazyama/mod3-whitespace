const BASE_URL = "http://localhost:3000"
const ROUTINES_URL = `${BASE_URL}/routines`
const TODOS_URL = `${BASE_URL}/todos`


const mainRoutine = document.querySelector(".routine")
const mainTodo = document.querySelector(".todo")
const routineList = document.querySelector(".routineList")
const todoList = document.querySelector(".todoList")
const backbutton = document.createElement('button')
const body = document.querySelector("body")
let a;
const header = document.querySelector("header")

backbutton.className = "back"
backbutton.innerText = "<<Back"
mainTodo.append(backbutton)


backbutton.addEventListener("click", () => {
  const previousLi = document.querySelectorAll(".todoList li")
  previousLi.forEach((i) => i.remove())
  console.log(previousLi)

  mainRoutine.style = "display:inline"
  mainTodo.style = "display:none"
  body.style.backgroundImage = "url('/Users/yutakatsuyama/flatiron/mod3_project/mod3-whitespace/background-blank-empty-62693.png')"
})


function startTimer(duration, display) {
  let li = display.parentNode
   clearInterval(a)
    let timer = duration, minutes, seconds;
    a = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds　+" ";

        li.addEventListener("click", ()=>{
          clearInterval(a)
          const rest = document.querySelector(".rest")
          rest.style = "display:inline"
          body.style.backgroundImage = "url('/Users/yutakatsuyama/flatiron/mod3_project/mod3-whitespace/banana-close-up-colors-1166648.png')"
          li.innerText = "Take a rest!"
          li.style.background =""
          li.style.color="black"
          setTimeout(function() {
            li.remove()
            body.style.backgroundImage = "url('/Users/yutakatsuyama/flatiron/mod3_project/mod3-whitespace/clop-adventure-black-and-white-boat-910213.png')"
          }, 6000);
        })

        if (--timer < -1) {
            clearInterval(a)
            const rest = document.querySelector(".rest")
            rest.style = "display:inline"
            body.style.backgroundImage = "url('/Users/yutakatsuyama/flatiron/mod3_project/mod3-whitespace/banana-close-up-colors-1166648.png')"
            li.innerText = "Take a rest!"
            li.style.background =""
            li.style.color="black"
            setTimeout(function() {
              li.remove()
              body.style.backgroundImage = "url('/Users/yutakatsuyama/flatiron/mod3_project/mod3-whitespace/clop-adventure-black-and-white-boat-910213.png')"
            }, 6000);

        }
    }, 1000);
}


document.addEventListener('DOMContentLoaded', () => {
  fetch(ROUTINES_URL)
  .then(resp => resp.json())
  .then(data => data.forEach((routine) => {renderRoutines(routine)}))

  const logo = document.querySelector(".white-logo")

  logo.addEventListener("click", () => {
    const login = document.querySelector(".login")
    const start = document.querySelector(".routine")
    const opening = document.querySelector(".opening")


    login.style = "display:none"
    opening.style = "display:none"
    start.style = "display:inline"

    body.style.backgroundImage = "url('/Users/yutakatsuyama/flatiron/mod3_project/mod3-whitespace/background-blank-empty-62693.png')"


  })

function renderRoutines(routine){

      const li = document.createElement("li")
      const deleteButton = document.createElement("button")
      const br = document.createElement("br")

      // deleteButton.src = "/Users/yutakatsuyama/flatiron/mod3_project/mod3-whitespace/whitespacelogo_v1.png"

      li.innerText = `${routine.title}  `


      li.append(deleteButton)
      routineList.append(li, br)

      deleteButton.addEventListener("click", () => {
        let id = routine.id
        fetch(ROUTINES_URL + `/${id}`, {
          method: "DELETE"
        })
        li.remove();
        deleteButton.remove();
      })


      li.addEventListener("mouseover", (e) => {

        e.target.style.color = "white";
        e.target.style.background = "black";
        e.target.style.paddingLeft = "10px";
        // e.target.style.fontSize = "60px"
      })

      li.addEventListener("mouseout", (e) => {
          e.target.style.color = "black";
          e.target.style.background = "";
          e.target.style.paddingLeft = "";
          // e.target.style.fontSize = "40px"
        })


      li.addEventListener("click", (e) => {
        let id = routine.id
        if (e.target === deleteButton){
        }else{
        fetch(TODOS_URL)
        .then(resp => resp.json())
        .then(data => renderTodos(data, id))}

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

    body.style.backgroundImage = "url('/Users/yutakatsuyama/flatiron/mod3_project/mod3-whitespace/clop-adventure-black-and-white-boat-910213.png')"




    mainRoutine.style = "display:none"
    mainTodo.style = "display:inline"

    newTodoForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const todoData = {
        routine_id: newTodoForm.dataset.routine_id,
        name: newTodoName.value,
        duration: newTodoDuration.value
      }

      if (parseInt(newTodoDuration.value) > 25){
        alert("You work too long, the max duration is 25min!")
        newTodoDuration.value=""
      }else{

      fetch(TODOS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(todoData)
      })
      .then(res => res.json())
      .then(data => {
        newTodoName.value=""
        newTodoDuration.value=""
        renderTodo(data)
      })}
    })

    todos.forEach((todo) => {
      if (id === todo.routine_id) {
        const li = document.createElement("li")
        const h4 = document.createElement("span")
        const deleteButton = document.createElement("button")
        const br = document.createElement("br")


        let id = todo.id

        h4.setAttribute("id", id)


        li.innerText = `${todo.name}      `
        h4.innerText = `    ${todo.duration}:00  `

        li.append(h4, deleteButton)
        todoList.append(li)

        deleteButton.addEventListener("click", () => {
          let id = todo.id
          fetch(TODOS_URL + `/${id}`, {
            method: "DELETE"
          })
          li.remove()
          deleteButton.remove()
        })

        li.addEventListener("click", () => {


          const body = document.querySelector("body")
          li.style.background = "black"
          li.style.color = "white"
          li.style.padding = "5px"
          li.style.fontSize = "80px"

        let num = todo.duration
        let todoDuration = 60 * num
        let id = todo.id
            display = document.getElementById(id);
        startTimer(todoDuration, display)})
      }
      // debugger
      })


  function renderTodo(todo){

      const li = document.createElement("li")
      const h4 = document.createElement("span")
      const deleteButton = document.createElement("button")
      const br = document.createElement("br")

      let id = todo.id

      h4.setAttribute("id", id)

      li.innerText = `${todo.name}      `
      h4.innerText = `    ${todo.duration}:00  `

      li.append(h4, deleteButton)
      todoList.append(li)

      deleteButton.addEventListener("click", () => {
        let id = todo.id
        fetch(TODOS_URL + `/${id}`, {
          method: "DELETE"
        })
        li.remove()
        deleteButton.remove()
      })

      li.addEventListener("click", () => {


        const body = document.querySelector("body")
        li.style.background = "black"
        li.style.color = "white"
        li.style.padding = "5px"
        li.style.fontSize = "80px"

      let num = todo.duration
      let todoDuration = 60 * num
      let id = todo.id
          display = document.getElementById(id);
      startTimer(todoDuration, display)})

  }
}


})
