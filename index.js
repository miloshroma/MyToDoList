let priority = [];
let list;
let now = new Date();
let check = document.querySelectorAll('input[type="radio"]');
    for (let i = 0; i<check.length; i++){
        check[i].addEventListener('click', function(event) {
           priority.push(this.value);
     });
    } 
    document.querySelector("body > div.container-fluid.wrapper > nav > div:nth-child(3) > button").addEventListener('click', function(){
        document.getElementById('inputTitle').value = '';
        document.getElementById('inputText').value = '';
    });
    document.querySelector("#exampleModal > div > div > div.modal-body > form > div:nth-child(4) > div > button.btn.btn-primary").addEventListener('click', function(e) {
        document.querySelector("#exampleModal").style.display = 'none';
        document.querySelector("body > div.modal-backdrop.fade.show").remove();
        document.querySelector("#exampleModal").classList.remove('show');
        document.querySelector("body").classList.remove('modal-open');
        document.querySelector("body").style.padding = '0';

        let nextTask = document.querySelector("#currentTasks > li").cloneNode(true);
        nextTask.querySelector('.mb-1').innerHTML =  document.getElementById('inputTitle').value;
        nextTask.querySelector(".mb-1.w-100").innerHTML =  document.getElementById('inputText').value;
        nextTask.querySelector("small.mr-2").innerHTML =  priority[priority.length-1];
        nextTask.querySelector("small.time").innerHTML =  now;
        list = document.querySelector("#currentTasks");
        if(priority[priority.length-1] === 'Low'){
            nextTask.style.background = 'green';
        }
        if(priority[priority.length-1] === 'Medium'){
            nextTask.style.background = 'yellow';
        }
        if(priority[priority.length-1] === 'High'){
            nextTask.style.background = 'red';
        }
        list.appendChild(nextTask); 
        
    }); 


   function completedTask(e) {
        let  element = e.target.closest('button');
        if(element.innerHTML === 'Complete'){
            document.querySelector("#completedTasks").appendChild(e.target.closest('li'))
        }
    }
    document.querySelector("#currentTasks").addEventListener('click', function(e){
        completedTask(e);
    });

    function deleteTask(e) {
        let  element = e.target.closest('button');
        if(element.innerHTML === 'Delete'){
            e.target.closest('li').remove();
        }
    }
    document.querySelector("#currentTasks").addEventListener('click', function(e){
        deleteTask(e);
    });

    