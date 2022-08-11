
const saludo = document.querySelector('#saludo')
const btnLogout = document.querySelector('#btnLogout')




btnLogout.addEventListener('click', async () => { 
    
    
    await fetch('/logout')
    document.querySelector('#deslog').innerHTML = `<p>DESCONECTANDO... HASTA LUEGO</p>`

    setTimeout(() => {
        location.reload()
      
    }, 3000
    )
})


