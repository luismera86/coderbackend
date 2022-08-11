

const btnLogout = document.querySelector('#btnLogout')

const mostrarMsg = async () => {
    const response = await fetch('/user')
    const data = await response.text()
    document.querySelector('#saludo').innerHTML = `<p>Bienvenido ${data}</p>`    
    console.log(data)
}

mostrarMsg()

btnLogout.addEventListener('click', async () => { 
    
    
    await fetch('/logout')
    document.querySelector('#deslog').innerHTML = `<p>DESCONECTANDO... HASTA LUEGO</p>`

    setTimeout(() => {
        location.reload()
      
    }, 1000
    )
})


