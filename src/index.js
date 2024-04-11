const createProjectArray = (function () {
    const projectArray = [];
    return {projectArray};
})();

const createDefaultListArray = (function () {
    const Default = [];
    createProjectArray.projectArray.push(Default);
    return {Default};
})();

function getCurrentArray () {
    let currentArray = "Default";
    return currentArray;
}

function List (title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
}

function newList (title, description, dueDate, priority) {
    const list = new List (title, description, dueDate, priority);
    if (getCurrentArray() == "Default") {
        createDefaultListArray.Default.push(list);
    }
    console.log(createDefaultListArray.Default);
    console.log(createProjectArray.projectArray);
}

const getInfo = (function () {
    const dialog = document.querySelector("dialog");
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

const pageStart = (function () {
    const dialog = document.querySelector("dialog");
    const newBtn = document.querySelector("#new");
    newBtn.addEventListener("click", () => {
        dialog.showModal();
    });
})();
