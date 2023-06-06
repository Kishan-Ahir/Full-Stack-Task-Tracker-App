let button = document.getElementById("submit");
let ul_toDoremains = document.getElementById("toDoremains");
let ul_toDocompleted = document.getElementById("toDocompleted");

// Event listeners
button.addEventListener("click", savedata);
window.addEventListener("load", loaddata);
ul_toDoremains.addEventListener("click", removedata);
ul_toDoremains.addEventListener("click", movedata);
ul_toDocompleted.addEventListener("click", deletetask);


// Save data to server
async function savedata(event) {
    event.preventDefault();
        let taskName = document.getElementById("taskname").value;
        let taskDescription = document.getElementById("description").value;
        let data = {
            taskName,
            taskDescription
        };
        ul_toDoremains.innerHTML = "";
        const response = await axios.post("http://localhost:3000/addtask", data);
        const tasklist = response.data;
        tasklist.forEach((task)=>{
            let li = document.createElement("li");
            li.className = "list-group-item";
            li.appendChild(
                document.createTextNode(`Task is ${task.name}. Description of the task is ${task.description}.`)
            );
            li.setAttribute("dataid", `${task.id}`);

            let delete_btn = document.createElement("button");
            delete_btn.className = "btn btn-danger float-end delete";
            delete_btn.style = "margin-left: 5px;";
            delete_btn.appendChild(document.createTextNode("X"));

            li.appendChild(delete_btn);

            let move_btn = document.createElement("button");
            move_btn.className = "btn btn-success float-end move";
            move_btn.style = "margin-left: 5px;";
            const checkmarkSymbol = '\u2713';
            move_btn.appendChild(document.createTextNode(checkmarkSymbol));

            li.appendChild(move_btn);
            ul_toDoremains.appendChild(li);
        })
}

async function loaddata() {
    const response = await axios.get("http://localhost:3000/getremainingtask");
        const tasklist = response.data;
        tasklist.forEach((task)=>{
            let li = document.createElement("li");
            li.className = "list-group-item";
            li.appendChild(
                document.createTextNode(`Task is ${task.name}. Description of the task is ${task.description}.`)
            );
            li.setAttribute("dataid", `${task.id}`);

            let delete_btn = document.createElement("button");
            delete_btn.className = "btn btn-danger float-end delete";
            delete_btn.style = "margin-left: 5px;";
            delete_btn.appendChild(document.createTextNode("X"));

            li.appendChild(delete_btn);

            let move_btn = document.createElement("button");
            move_btn.className = "btn btn-success float-end move";
            move_btn.style = "margin-left: 5px;";
            const checkmarkSymbol = '\u2713';
            move_btn.appendChild(document.createTextNode(checkmarkSymbol));

            li.appendChild(move_btn);
            ul_toDoremains.appendChild(li);
        })

        const completedtaskresponse = await axios.get("http://localhost:3000/getcompletedtask");
    const completedtasklist = completedtaskresponse.data;
    ul_toDocompleted.innerHTML = "";
    completedtasklist.forEach((task)=>{
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.appendChild(
            document.createTextNode(`Task is ${task.name}. Description of the task is ${task.description}.`)
        );
        li.setAttribute("dataid", `${task.id}`);
        let delete_btn = document.createElement("button");
        delete_btn.className = "btn btn-danger float-end delete";
        delete_btn.style = "margin-left: 5px;";
        delete_btn.appendChild(document.createTextNode("X"));

        li.appendChild(delete_btn);
        ul_toDocompleted.appendChild(li);
        })
}


async function movedata() {
    if (event.target.classList.contains("move")) {
        try {
            let parent_li = event.target.parentNode;
            let name = parent_li.firstChild.textContent.split(" is ")[1].split(".")[0];
            let description = parent_li.firstChild.textContent.split(" is ")[2].split(".")[0];
            let id = event.target.parentNode.getAttribute("dataid");
            addintocompleted(name, description);
            ul_toDoremains.removeChild(parent_li);
            return await axios.delete(`http://localhost:3000/delettetask/${id}`);
        } catch {
            alert("ERROR: Not able to transfer the data.");
        }
    }
}

// Add completed task to the completed task list
async function addintocompleted(name, discrp) {
    let data = {
        name,
        discrp
    };

    const completedtaskresponse = await axios.post("http://localhost:3000/taskcompletedlist", data);
    const completedtasklist = completedtaskresponse.data;
    ul_toDocompleted.innerHTML = "";
    completedtasklist.forEach((task)=>{
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.appendChild(
            document.createTextNode(`Task is ${task.name}. Description of the task is ${task.description}.`)
        );
        li.setAttribute("dataid", `${task.id}`);
        let delete_btn = document.createElement("button");
        delete_btn.className = "btn btn-danger float-end delete";
        delete_btn.style = "margin-left: 5px;";
        delete_btn.appendChild(document.createTextNode("X"));

        li.appendChild(delete_btn);
        ul_toDocompleted.appendChild(li);
        })
}

// Remove data from the to-do list
async function removedata(event) {
    if (event.target.classList.contains("delete")) {
        try {
            let parent_li = event.target.parentNode;
            let data_id = parent_li.getAttribute("dataid");
            ul_toDoremains.removeChild(parent_li);
            await axios.delete(`http://localhost:3000/delettetask/${data_id}`);
        } catch {
            alert("ERROR: Not able to delete the task.");
        }
    }
}

async function deletetask() {
    if (event.target.classList.contains("delete")) {
        try {
            let parent_li = event.target.parentNode;
            let data_id = parent_li.getAttribute("dataid");
            ul_toDocompleted.removeChild(parent_li);
            await axios.delete(`http://localhost:3000/deletecompletedtask/${data_id}`);
        } catch {
            alert("ERROR: Not able to delete the task.");
        }
    }
}