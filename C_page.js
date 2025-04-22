let button1=document.querySelector(".button1");
let button2=document.querySelector(".button2");
let button3=document.querySelector(".button3");
let button4=document.querySelector(".button4");
let button5=document.querySelector(".button5");

let c1=document.getElementsByClassName(".c1");

let isbutton1clicked=false;
let isbutton2clicked=false;
let isbutton3clicked=false;
let isbutton4clicked=false;

button1.addEventListener("click",(e)=>{
    
     isbutton1clicked=true;
     c1.classList.add("active");

});

button2.addEventListener("click", (e)=>{
    if(!isbutton1clicked)
    {
        e.preventDefault();
        console.log("Alert!");
        alert("Complete the Resoure 1 before going to Resource 2.");
    }
    else
    {
        isbutton2clicked=true;
    }
});


button3.addEventListener("click", (e)=>{

    if(!isbutton2clicked)
    {
        e.preventDefault();
        console.log("Alert!");
        alert("Complete the Resoure 2 before going to Resource 3.");
    }
    else
    {
        isbutton3clicked=true;
    }
});


button4.addEventListener("click", (e)=>{

    if(!isbutton3clicked)
    { 
        e.preventDefault();
        console.log("Alert!");
        alert("Complete the Resoure 3 before going to Resource 4.");
    }
    else
    {
        isbutton4clicked=true;
    }
});


button5.addEventListener("click", (e)=>{

    if(!isbutton4clicked)
    {
        e.preventDefault();
        console.log("Alert!");
        alert("Complete the Resoure 4 before going to Resource 5.");
    }
});


