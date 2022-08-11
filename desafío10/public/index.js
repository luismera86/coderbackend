

const loginForm = document.querySelector('#loginForm')
const userName = document.querySelector('#userName')
const btnSend = document.querySelector('#btnSend')
const saludo = document.querySelector('#saludo')

const control2 = (dato) => { 
    console.log(data)
     document.querySelector('#saludo').innerHTML = `<h3>${dato}</h3>`  
 }


const control = async (e) => { 
  
    e.preventDefault();
    
    try {
        
       await fetch(`/api/login?username=${userName.value}`);
        
        await fetch('/user')
        

        window.location.href = "/"; 


    } catch (error) {
        console.log(error)
    }
 }

 loginForm.addEventListener('submit', control)

