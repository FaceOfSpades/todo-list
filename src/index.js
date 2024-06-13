import './styles.css';

const array = initializeArray();

const createProjectArray = (function () {
    const projectArray = [];
    return {projectArray};
})();

const createProjectNameArray = (function () {
    const projectNameArray = [];
    return {projectNameArray};
})();

const createDefaultListArray = (function () {
    const Default = [];
    createProjectArray.projectArray.push(Default);
    createProjectNameArray.projectNameArray.push("Default");
    Display();
})();

const createNewListArray = (function () {
    const dialog = document.querySelector("#project-name");
    const newArray = document.querySelector("#new-project");
    newArray.addEventListener("click", () => {
        dialog.showModal();
    })
})();

const getName = (function () {
    const name = document.querySelector("#name");
    const dialog = document.querySelector("#project-name");
    const submitBtn = document.querySelector("#submit-name");
    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        createProjectNameArray.projectNameArray.push(name.value);
        createProjectArray.projectArray.push(new Array());
        Display();
        ResetProjectForm();
        dialog.close();
    });
})();

function initializeArray () {
    let currentArray = 0;
    const getCurrentArray = () => currentArray;
    const setCurrentArray = (index) => currentArray = index;
    return {getCurrentArray, setCurrentArray};
}

function List (title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
}

function newList (title, description, dueDate, priority) {
    const list = new List (title, description, dueDate, priority);
    createProjectArray.projectArray[array.getCurrentArray()].push(list);
    Display();
}

const getInfo = (function () {
    const dialog = document.querySelector("#list-form");
    const submitBtn = document.querySelector("#submit");
    const listTitle = document.querySelector("#title");
    const listDescription = document.querySelector("#description");
    const listDueDate = document.querySelector("#dueDate");
    const listPriorityLow = document.querySelector("#low");
    const listPriorityMedium = document.querySelector("#medium");
    const listPriorityHigh = document.querySelector("#high");
    let title;
    let description;
    let dueDate;
    let priority;
    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        title = listTitle.value;
        description = listDescription.value;
        dueDate = listDueDate.value;
        if (listPriorityLow.checked) {
            priority = listPriorityLow.value;
        } else if (listPriorityMedium.checked) {
            priority = listPriorityMedium.value;
        } else if (listPriorityHigh.checked) {
            priority = listPriorityHigh.value;
        };
        newList(title, description, dueDate, priority)
        dialog.close();
        ResetForm();
    }); 
})();

function ResetForm () {
    const form = document.querySelector("#todo-form");
    form.reset();
}

function ResetProjectForm() {
    const form = document.querySelector("#project-form");
    form.reset();
}

const pageStart = (function () {
    const dialog = document.querySelector("#list-form");
    const newBtn = document.querySelector("#new");
    newBtn.addEventListener("click", () => {
        dialog.showModal();
    });
    return array;
})();

function Display () {
    const body = document.querySelector(".body-container");
    while (body.firstChild) {
        body.removeChild(body.lastChild);
    };
    let index = 0;
    createProjectArray.projectArray.forEach((e) => {
        const selector = index;
        const div = document.createElement("div");
        div.className = "projectContainer";
        const name = document.createElement("h2");
        name.textContent = "PROJECT - " + createProjectNameArray.projectNameArray[index];
        body.appendChild(div);
        div.appendChild(name);
        createProjectArray.projectArray[index].forEach((e) => {
            const title = document.createElement("div");
            const description = document.createElement("div");
            const dueDate = document.createElement("div");
            const priority = document.createElement("div");
            title.textContent = "Title: " + e.title;
            description.textContent = "Description: " + e.description;
            dueDate.textContent = "Due Date: " +  e.dueDate;
            priority.textContent = "Priority: " + e.priority;
            div.appendChild(title);
            div.appendChild(description);
            div.appendChild(dueDate);
            div.appendChild(priority);
        });
        div.addEventListener("click", () => {
            array.setCurrentArray(selector);
            div.classList.add("selected");
        });
        index++;
    });
}
