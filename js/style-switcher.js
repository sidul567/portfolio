//--- toggle style ---//

window.addEventListener('scroll',()=>{
    if(document.querySelector('.style-switcher').classList.contains("open")){
        document.querySelector('.style-switcher').classList.remove("open")
    }
})

document.body.addEventListener('click',(e)=>{
    if(e.target.classList.contains("style-switcher-toggler")){
        document.querySelector('.style-switcher').classList.toggle("open");
    }else{
        document.querySelector('.style-switcher').classList.remove("open");
    }    
})
//color change

let colorValue = document.getElementById('colorValue');
colorValue.addEventListener('input',(e)=>{
    color = e.target.value
    localStorage.setItem("color",color)
    changeColor()
})

function changeColor(){
    document.documentElement.style.setProperty('--skin-color', localStorage.getItem("color"));
    colorValue.value = localStorage.getItem("color")
}
if(localStorage.getItem("color")!==null){
    changeColor()
}
//Theme dark

let dayNight = document.querySelector('.day-night')
dayNight.addEventListener('click',()=>{
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark")
    }else{
        localStorage.setItem("theme","light")
    }
    updateIcon()
})

function themeMode(){
    if(localStorage.getItem("theme")!==null){
        if(localStorage.getItem("theme")==="light"){
            document.body.classList.remove("dark")
        }else{
            document.body.classList.add("dark")
        }
    }
    updateIcon()
}
themeMode()
function updateIcon(){
    if(document.body.classList.contains("dark")){
        dayNight.querySelector('i').classList.remove("fa-moon")
        dayNight.querySelector('i').classList.add("fa-sun")
    }else{
        dayNight.querySelector('i').classList.remove("fa-sun")
        dayNight.querySelector('i').classList.add("fa-moon")    
    }      
}



window.addEventListener('load',()=>{
    if(document.body.classList.contains("dark")){
        dayNight.querySelector('i').classList.add("fa-sun")
    }else{
        dayNight.querySelector('i').classList.add("fa-moon")
    }
})