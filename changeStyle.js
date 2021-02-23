
const inputs = document.querySelectorAll("input");
let style = JSON.parse(localStorage.getItem("style")) || {mainColor: "#ccc", bgImg: "cats"} ;
var imgStyle = style.bgImg; // starwar cats

function styleMenuBtn(){
  let btn = document.getElementById("styleMenuBtn");
  let styleMenu = document.getElementById("styleMenu");

  btn.classList.toggle("open");
  styleMenu.classList.toggle("open");
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
};
//更新畫面 
function updateDOM(){
  let img = document.querySelector(".img");
  let month = document.getElementById("noteMonth").innerHTML - 1;

  imgStyle = style.bgImg;
  
  img.style.backgroundImage  = "url(./imgs/"+imgStyle+"/"+month+".jpg)";
  document.documentElement.style.setProperty("--mainColor", style.mainColor);
}

inputs.forEach(input => {
  input.addEventListener("change",styleHandler);
})
updateDOM();
