const addNotes = document.querySelector(".addNote");
const noteList = document.querySelector(".noteList");
const note = JSON.parse(localStorage.getItem("items")) || [];
// --------------------
var noteYYYYMM = document.getElementById("noteYYYYMM");
var noteDD = document.getElementById("noteDD");

noteYYYYMM.value = today.getFullYear()+"-"+MMDD((today.getMonth()+1));
noteDD.value = MMDD(today.getDate());



//新增清單
function addNote(e){
  e.preventDefault();//取消預設發生事件 submit > 頁面重整
  let noteText = this.querySelector("[name=note]").value;
  let addNoteYYYYMM = noteYYYYMM.value;
  let addNoteDD = noteDD.value;
  let obj = {noteText,done: false,noteYYYYMM:addNoteYYYYMM,noteDD:addNoteDD};
  note.push(obj); //更新JS

  ///重新排序note陣列
  note.sort((a, b) => a.noteDD > b.noteDD ? 1 : -1);

  // 更新LocalStorage //只能字串,數字
  localStorage.setItem("items", JSON.stringify(note));
  //清空 form input
  this.reset();
  //更新畫面
  creatList(note, noteList);
  thisYYYYMMnote("flex");

  
  // let dataDate = `[data-date='${noteDate}']`;
  // document.querySelector(dataDate).classList.remove("choiceDate"); 
  // document.querySelector(dataDate).classList.add("haveNote");//當下的 
};

//將LS的清單顯示在畫面上 //若沒有data 就是[]
function creatList(data = [], dom){
  dom.innerHTML = data.map((note, i) => {
    return `
      <li class="YM${note.noteYYYYMM}" >
        <input type="checkbox" id="item${i}" data-index="${i}"${
          note.done ? 'checked' : ''
        } >
        <label for="item${i}">${note.noteYYYYMM}/${note.noteDD} - ${note.noteText}</label>
        <div class="button deleteBtn" data-index="${i}">DELETE</div>
      </li>
    `;
  }).join("");

};

function noteHandler(e){
  // console.log(e.target);

  //判斷是否為 input 被 click
  if(!e.target.matches("input") && !e.target.matches("div")) return; // 不是input 就跳過

  let index = e.target.dataset["index"];

  //toggle
  if(e.target.matches("input")){
    //更新JS
    note[index].done = !note[index].done;
  }

  //delete
  if(e.target.matches("div")){
    // console.log(note[index].noteDate);
    //更新JS
    note.splice(index,1);
  }
  
  //更新LS
  localStorage.setItem("items",JSON.stringify(note));
  //更新dom
  creatList(note, noteList);

};

function thisYYYYMMnote(style){
  let thisYYYYMM = state.current.getFullYear()+"-"+MMDD(state.current.getMonth()+1);
  thisYYYYMM = `.YM${thisYYYYMM}`;
  let noteLis = document.querySelectorAll(thisYYYYMM);
  console.log(style);
  noteLis.forEach((i)=> i.style.display=style);
};

creatList(note, noteList);
thisYYYYMMnote("flex");

addNotes.addEventListener("submit", addNote);
noteList.addEventListener("click", noteHandler);