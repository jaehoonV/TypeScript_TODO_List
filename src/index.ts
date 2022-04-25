import { v4 as uuidV4 } from "uuid"
import '../src/index.css'

type Task = { // Task 유형 설정
   id: string
   title: string
   completed: boolean
   createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem) // 각 페이지에 렌더링

form?.addEventListener("submit", e => {
   e.preventDefault()

   // input? : input.value가 있을 경우 정의되지 않은 값을 반환
   if (input?.value == "" || input?.value == null) return

   const newTask: Task = {
      id: uuidV4(),
      title: input.value,
      completed: false,
      createdAt: new Date(),
   }
   tasks.push(newTask)
   saveTasks()

   addListItem(newTask)
   input.value = ""
})

function addListItem(task: Task) {
   const item = document.createElement("li")
   const label = document.createElement("label")
   const checkbox = document.createElement("input")
   checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked
      saveTasks()
   })
   // TODO 항목 생성
   checkbox.type = "checkbox"
   checkbox.checked = task.completed
   label.append(checkbox, task.title)
   item.append(label)
   list?.append(item)
}

function saveTasks() { // 로컬 저장소에 저장
   //  JSON.stringify() 는 값을 JSON 표기법으로 변환
   localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] { // null 배열 반환을 위한 함수
   const taskJSON = localStorage.getItem("TASKS")
   if (taskJSON == null) return []
   return JSON.parse(taskJSON)
}