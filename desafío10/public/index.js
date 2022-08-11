

const loginForm = document.querySelector('#loginForm')
const userName = document.querySelector('#userName')
const btnSend = document.querySelector('#btnSend')
const saludo = document.querySelector('#saludo')



const control = async (e) => { 
    
    e.preventDefault();
    
    try {
        
        await fetch(`/api/login?username=${userName.value}`);
        
        
        window.location.href = "/"; 
       
        
        
    } catch (error) {
        console.log(error)
    }
}

loginForm.addEventListener('submit', control)

const control2 = async () => { 
 console.log('insertando')
await  document.querySelector('#saludo').innerHTML `<h3>hola</h3>`  
}
