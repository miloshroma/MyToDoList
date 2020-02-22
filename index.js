let priority = [];
let fullDate = [];
let listComleted =  document.querySelector('#completedTasks');
let list = document.querySelector("#currentTasks");
let color = document.getElementById('color');
function local(){
    let ul = list.innerHTML;
    localStorage.setItem('list', ul);
}
function localComplete(){
    let completedList = listComleted.innerHTML;
    if(completedList.innerHTML !== ''){
        localStorage.setItem('completedList', completedList);
    }
}
function numTask(){
    let col = '('+ document.querySelector('#currentTasks').children.length + ')'
    localStorage.setItem('col', col);
    return col;
}
function numTaskCompl(){
    let colCompl = '('+ listComleted.children.length + ')'
    localStorage.setItem('colCompl', colCompl);
    return colCompl;
}
function colorApp(){
    let color = document.getElementById('chooseColor').value;
    localStorage.setItem('color', color);
   return color;
}
let check = document.querySelectorAll('input[type="radio"]');
    for (let i = 0; i<check.length; i++){
        check[i].addEventListener('click', function(event) {
           priority.push(this.value);
     });
    } 
    document.querySelector("body > div.container-fluid.wrapper > nav > div:nth-child(3) > button").addEventListener('click', function(){
        document.getElementById('inputTitle').value = '';
        document.getElementById('inputText').value = ''; 
        document.querySelector("#color").value = '#ffffff';
    });
    function createTask(){
        let nextTask = document.querySelector("#currentTasks > li").cloneNode(true);
        nextTask.querySelector('.mb-1').innerHTML =  document.getElementById('inputTitle').value;
        nextTask.querySelector(".mb-1.w-100").innerHTML =  document.getElementById('inputText').value;
        nextTask.querySelector("small.mr-2").innerHTML =  priority[priority.length-1];
        nextTask.querySelector("small.time").innerHTML =  new Date();
        nextTask.style.background = color.value;
        list.appendChild(nextTask); 
        document.getElementById('col').innerHTML = numTask();
    }
    function removePopup(){
        document.querySelector("#exampleModal").style.display = 'none';
        document.querySelector("body > div.modal-backdrop.fade.show").remove();
        document.querySelector("#exampleModal").classList.remove('show');
        document.querySelector("body").classList.remove('modal-open');
    }
    document.querySelector("#exampleModal > div > div > div.modal-body > form").addEventListener('submit', function(e) {
        e.preventDefault();

        removePopup();

        createTask();
        local();
    }); 
    document.querySelector("body > div.container-fluid.wrapper > nav > div:nth-child(2) > button.btn.btn-primary.mx-2").addEventListener('click', function(){
        let items =  document.querySelectorAll('#currentTasks > li');
        let sortedCurrentList = [...items].sort((a,b) => Date.parse(a.querySelector("small.time").innerHTML) - Date.parse(b.querySelector("small.time").innerHTML));
        list.innerHTML = '';
        for (let li of sortedCurrentList){
            list.appendChild(li);
        }
        if(document.querySelectorAll('#completedTasks > li').length !== 0){
            let itemsCompleted =  document.querySelectorAll('#completedTasks > li');
            let sortedCompetedList = [...itemsCompleted].sort((a,b) => Date.parse(a.querySelector("small.time").innerHTML) - Date.parse(b.querySelector("small.time").innerHTML));
            document.querySelector("#completedTasks").innerHTML = '';
            for (let li of sortedCompetedList){
                document.querySelector("#completedTasks").appendChild(li);
            }
        }
        local();
        localComplete();
    });
    document.querySelector("body > div.container-fluid.wrapper > nav > div:nth-child(2) > button:nth-child(2)").addEventListener('click', function(){
        let itemsList =  document.querySelectorAll('#currentTasks > li');
        let sortedCurrent = [...itemsList].sort((a,b) => Date.parse(b.querySelector("small.time").innerHTML) - Date.parse(a.querySelector("small.time").innerHTML));
        list.innerHTML = '';
        for (let li of sortedCurrent){
            list.appendChild(li);
        }
        if(document.querySelectorAll('#completedTasks > li').length !== 0){
            let itemsCompleted =  document.querySelectorAll('#completedTasks > li');
            let sortedCompetedList = [...itemsCompleted].sort((a,b) => Date.parse(b.querySelector("small.time").innerHTML) - Date.parse(a.querySelector("small.time").innerHTML));
            document.querySelector("#completedTasks").innerHTML = '';
            for (let li of sortedCompetedList){
                document.querySelector("#completedTasks").appendChild(li);
            }
        }
        local();
        localComplete();
    });

   function completedTask(e) {
        let  element = e.target.closest('button');
        if(element.innerHTML === 'Complete'){
            document.querySelector("#completedTasks").appendChild(e.target.closest('li'));
            element.innerHTML = 'Uncomplete';
            document.getElementById('col').innerHTML = numTask();
            document.getElementById('colCompleted').innerHTML = numTaskCompl();
        }
    }
    document.querySelector("#currentTasks").addEventListener('click', function(e){
        if(document.querySelector("#currentTasks > li > div.dropdown.m-2.dropleft.show > div").classList.contains('show')){
            document.querySelector("#currentTasks > li > div.dropdown.m-2.dropleft.show > div").classList.remove('show');
        }
        completedTask(e);
        local();
        localComplete();

    });


    function unCompletedTask(e) {
        let  element = e.target.closest('button');
        if(element.innerHTML === 'Uncomplete'){
            document.querySelector("#currentTasks").appendChild(e.target.closest('li'));
            element.innerHTML = 'Complete';
            document.getElementById('col').innerHTML = numTask();
            document.getElementById('colCompleted').innerHTML = numTaskCompl();
            local();
            localComplete();
        }
    }
    document.querySelector("#completedTasks").addEventListener('click', function(e){
        if(document.querySelector("#completedTasks > li > div.dropdown.m-2.dropleft.show > div").classList.contains('show')){
            document.querySelector("#completedTasks > li > div.dropdown.m-2.dropleft.show > div").classList.remove('show');
        }
        unCompletedTask(e);
    
    });

    function deleteTask(e) {
        let  element = e.target.closest('button');
        if(element.innerHTML === 'Delete'){
            e.target.closest('li').remove();
            document.getElementById('col').innerHTML = numTask();
        }
    }
    document.querySelector("#currentTasks").addEventListener('click', function(e){
        deleteTask(e);
        local();
    });
    function whiteBlack(){
        if(document.querySelector("body").style.backgroundColor === 'rgb(0, 0, 0)'){
            document.querySelector("body > div.container-fluid.wrapper > div > div > div:nth-child(1)").style.color = '#ffffff';
            document.querySelector("body > div.container-fluid.wrapper > div > div > div:nth-child(4)").style.color = '#ffffff';
        }
        else{
            document.querySelector("body > div.container-fluid.wrapper > div > div > div:nth-child(1)").style.color = "rgb(0, 0, 0)";
            document.querySelector("body > div.container-fluid.wrapper > div > div > div:nth-child(4)").style.color = "rgb(0, 0, 0)";
        }
    }
    let colorDef = document.getElementById('chooseColor');
    document.querySelector("body > div.container-fluid.wrapper > nav > div:nth-child(3) > div > div").appendChild(colorDef);
    document.querySelector(".btn__app-color").addEventListener('click', function() {
        document.querySelector("body").style.backgroundColor = colorApp();
        whiteBlack();
    });

    function editTask(e) {
        let  element = e.target.closest('button');
        let task = e.target.closest('li');
        if(element.innerHTML === 'Edit'){
            let node = document.createElement('div');
            node.classList.add('modal-backdrop');
            node.classList.add('fade');
            node.classList.add('show');
            document.querySelector("body").appendChild(node);
            document.querySelector('.popup__edit').style.display = 'block';
            document.getElementById('title').value = element.parentElement.parentElement.parentElement.querySelector('.mb-1').innerHTML;
            document.getElementById('text').value = element.parentElement.parentElement.parentElement.querySelector(".mb-1.w-100").innerHTML;

            document.querySelector('.btn__edit').addEventListener('click', function(e) {
                e.preventDefault();
                element.parentElement.parentElement.parentElement.querySelector('.mb-1').innerHTML = document.getElementById('title').value;
                element.parentElement.parentElement.parentElement.querySelector(".mb-1.w-100").innerHTML = document.getElementById('text').value;
                element.parentElement.parentElement.parentElement.querySelector("small.mr-2").innerHTML =  priority[priority.length-1];
                element.parentElement.parentElement.parentElement.querySelector("small.time").innerHTML =  new Date();
                element.parentElement.parentElement.parentElement.style.background = document.getElementById('color__edit').value;
                document.querySelector("body > div.modal-backdrop.fade.show").remove();
                document.querySelector('.popup__edit').style.display = 'none';
                local();
            });
        } 
    }
    document.querySelector("#currentTasks").addEventListener('click', function(e){
        editTask(e);
    });

    if(localStorage.getItem('list')){
        document.querySelector("#currentTasks").innerHTML = localStorage.getItem('list'); 
       
    }
    if(localStorage.getItem('completedList')){
        document.querySelector("#completedTasks").innerHTML = localStorage.getItem('completedList');
        
    }
    if(localStorage.getItem('col')){
        document.getElementById('col').innerHTML = localStorage.getItem('col');
    }
    if(localStorage.getItem('colCompl')){
        document.getElementById('colCompleted').innerHTML = localStorage.getItem('colCompl');
    }
    if(localStorage.getItem('color')){
        document.querySelector("body").style.backgroundColor = localStorage.getItem('color');
        whiteBlack();
    }
    window.onload = function(){
        if(document.querySelector("#currentTasks > li > div.dropdown.m-2.dropleft.show > div").classList.contains('show')){
            document.querySelector("#currentTasks > li > div.dropdown.m-2.dropleft.show > div").classList.remove('show');
        }
    }