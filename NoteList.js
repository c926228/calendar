const addNotes = document.querySelector(".addNote");
const noteList = document.querySelector(".noteList");
const note = JSON.parse(localStorage.getItem("items")) || [];

//新增清單
function addNote(e){
  e.preventDefault();//取消預設發生事件 submit > 頁面重整
  let noteText = this.querySelector("[name=note]").value;
  let obj = {noteText,done: false};
  note.push(obj); //更新JS

  // 更新LocalStorage //只能字串,數字
  localStorage.setItem("items", JSON.stringify(note));
  //清空 form input
  this.reset();
  //更新畫面
  creatList(note, noteList);
};

//將LS的清單顯示在畫面上 //若沒有data 就是[]
function creatList(data = [], dom){
  dom.innerHTML = data.map((note, i) => {
    return `
      <li>
        <input type="checkbox" id="item${i}" data-index="${i}"${
          note.done ? 'checked' : ''
        } >
        <label for="item${i}">${note.noteText}</label>
      </li>
    `;
  }).join("");
};

function toggleNote(e){
  //判斷是否為 input 被 click
  if(!e.target.matches("input")) return; // 不是input 就跳過
  console.log(e);
  let index = e.target.dataset["index"];
  //更新JS
  note[index].done = !note[index].done;
  //更新LS
  localStorage.setItem("items",JSON.stringify(note));
  //更新dom
  creatList(note, noteList);
};

creatList(note, noteList);
addNotes.addEventListener("submit", addNote);
noteList.addEventListener("click", toggleNote);