var TodoListApp= (function(){
    let tasks = [];
    const taskList = document.getElementById('list');   // tasklist is ul element
    const addTaskInput = document.getElementById('add');  // addTaskInput is input element
    const tasksCounter = document.getElementById('tasks-counter');
    
    console.log('Working');
    var a=10;
    async function fetchtodos()
    {
        // fetch('https://jsonplaceholder.typicode.com/todos')   // return promise
        //     .then(function(response){
        //         return response.json();         //return promise
        //     }).then(function(data){
        //         tasks=data.slice(0,10);
        //         renderList();
        //     }).catch(function(error){
        //         console.log('Error-',error);
        //     });
    
        try{
            const response=await fetch('https://jsonplaceholder.typicode.com/todos');
            const data=await response.json();
            tasks=data.slice(0,10);
            renderList();
        }catch(error){
            showNotification(error);
        }
    }
    function addTaskToDom(task){
        const li=document.createElement('li');
        li.innerHTML=`
            <input type="checkbox" id="${task.id}" class="custom-checkbox" ${task.completed ? 'checked' : ''}>
            <label for="${task.id}">${task.title}</label>
            <img src="delete.svg" class="delete" data-id="${task.id}"/>
        `;
        taskList.append(li);      
    }
    function renderList () {
        taskList.innerHTML='';
        for(const task of tasks){
            addTaskToDom(task);
        }
        tasksCounter.innerHTML=tasks.length;
    }
    
    function toggleTask (taskId) {
        for(const task of tasks)
        {
            if(task.id === Number(taskId))
            {
                task.completed= !task.completed;
                renderList();
                if(task.completed){
                    showNotification('Task completed Successfully.');
                }
                else{
                    showNotification('Task marked as not completed!!');
                }
                return;
            }
        }
        showNotification('Could not toggle the task');
    }
    
    function deleteTask (taskId) {
        tasks=tasks.filter(function(task){
           return Number(taskId) !== task.id; 
        });
        renderList();
        showNotification('Task Deleted Successfully');
    }
    
    function addTask (task) {
        if(task){
            tasks.push(task);
            renderList();
            showNotification('Task added successfully');
            return;
        }
        showNotification('Task not added!');
    }
    
    function showNotification(text) {
        alert(text);
    }
    
    function handleInputKeyPress(e){
        if(e.key==='Enter'){
            const text= e.target.value;
            if(!text){
                showNotification('Hey! Please enter some data');
                return;
            }
            const task={
                title:text,      
                id:Date.now(),
                completed:false
            }
            e.target.value='';
            addTask(task);
        }
    }
    function handleclickEvents(e){
        if(e.target.className==='custom-checkbox'){
            const taskid=e.target.id;
            toggleTask(taskid);
        }
        else if(e.target.className==='delete'){
            const taskid=e.target.dataset.id;
            deleteTask(taskid);
        }
    }
    function initializeApp(){
        fetchtodos();
        addTaskInput.addEventListener('keyup',handleInputKeyPress);
        document.addEventListener('click',handleclickEvents);
    }
    return{         // whatever the variables and functions we want to make it public, we place here.(Revealing Module Pattern)
        initialize: initializeApp,
        a:a,
    }
})();     // We are also calling it here itself.



/*We are calling TodoListApp immd. here itself, that function will return an object containing data
that is public, and TodoListApp will point to that object, and we can use this 
TodoListApp outside(see html).*/

