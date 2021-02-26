
const inputs = document.querySelectorAll("#styleMenu input");
let style = JSON.parse(localStorage.getItem("style")) || {mainColor: "#ccc", bgImg: "cats"} ;
var imgStyle = style.bgImg; // starwar cats

function styleMenuBtn(style){
  let styleMenu = document.getElementById("styleMenu");
  let HB = document.getElementById("HB");
  let styleMenuBtn = document.getElementById("styleMenuBtn");
  let leftBtn = document.getElementsByClassName("leftBtn");

  if(style === "remove"){
    styleMenu.classList.remove ("open");
    HB.classList.remove("open");
    Array.prototype.forEach.call(leftBtn,(e)=>e.classList.remove("open"));
  }
  if(style === "toggle"){
    if(window.innerWidth <= 960) return; // 960 以下 要失效
    styleMenu.classList.toggle ("open");
    HB.classList.toggle("open");
    styleMenuBtn.classList.toggle("open");
  }
}

//更改樣式
function styleHandler(){
  
  let name = this.name;
  let value = this.value;

  //更新JS
  name == "bgImg" ?  style.bgImg = value : style.mainColor = value
  console.log(style);

  //更新 LS
  localStorage.setItem("style", JSON.stringify(style));
  
  //更新DOM
  updateDOM();
  styleMenuBtn("remove")
};
//更新畫面 
function updateDOM(){
  let img = document.querySelector(".img");
  let month = document.getElementById("noteMonth").innerHTML - 1;

  imgStyle = style.bgImg;
  
  img.style.backgroundImage  = "url(./imgs/"+imgStyle+"/"+month+".png)";
  document.documentElement.style.setProperty("--mainColor", style.mainColor);
  
}

inputs.forEach(input => {
  input.addEventListener("change",styleHandler);
})
updateDOM();
