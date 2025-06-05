let button1=document.querySelector(".button1");
let button2=document.querySelector(".button2");
let button3=document.querySelector(".button3");
let button4=document.querySelector(".button4");
let button5=document.querySelector(".button5");

let c1_obj=document.querySelector(".c1");
let c2_obj=document.querySelector(".c2");
let c3_obj=document.querySelector(".c3");
let c4_obj=document.querySelector(".c4");
let c5_obj=document.querySelector(".c5");

let bar1=document.querySelector(".bar1");
let bar2=document.querySelector(".bar2");
let bar3=document.querySelector(".bar3");
let bar4=document.querySelector(".bar4");

let back=document.querySelector(".back");

let isbutton1clicked=false;
let isbutton2clicked=false;
let isbutton3clicked=false;
let isbutton4clicked=false;

button1.addEventListener("click",(e)=>{
    
     isbutton1clicked=true;
     //c1_obj.classList.add("active");
     c1_obj.style.backgroundColor="#00008B";
     c1_obj.style.color="white";

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
        bar1.style.backgroundColor="#00008B";
        c2_obj.style.backgroundColor="#00008B";
        c2_obj.style.color="white";
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
        bar2.style.backgroundColor="#00008B";
        c3_obj.style.backgroundColor="#00008B";
        c3_obj.style.color="white";
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
        bar3.style.backgroundColor="#00008B";
        c4_obj.style.backgroundColor="#00008B";
        c4_obj.style.color="white";
    }
});


button5.addEventListener("click", (e)=>{

    if(!isbutton4clicked)
    {
        e.preventDefault();
        console.log("Alert!");
        alert("Complete the Resoure 4 before going to Resource 5.");
    }
    else
    {
        bar4.style.backgroundColor="#00008B";
        c5_obj.style.backgroundColor="#00008B";
        c5_obj.style.color="white";
    }
});

back.addEventListener("click", (e)=>{
    if(!isbutton4clicked)
    {
        e.preventDefault();
        console.log("Alert!");
        alert("Complete All the resources First!");
    }
});

