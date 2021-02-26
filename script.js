//今天
var todayDay = today.getFullYear()+"-"+MMDD((today.getMonth()+1))+"/"+MMDD(today.getDate()); 
console.log("todayDay",todayDay)

//Note 日期
// let LSNoteDate = JSON.parse(localStorage.getItem("items")).map((e)=> e.noteDate);
// console.log(LSNoteDate);

// 資料
let state = null ;


// 初始化萬年曆
function init(){
  state = {
    current:new Date() // 取得現在時間
  };
  render();
};

//上個月
function preMonth() {
  thisYYYYMMnote("none");
  state.current.setMonth(state.current.getMonth()-1); //現在月份-1
  render();
  thisYYYYMMnote("flex");
}

//下個月
function nextMonth() {
  thisYYYYMMnote("none");
  state.current.setMonth(state.current.getMonth()+1); //現在月份-1
  render();
  thisYYYYMMnote("flex");
}

//回到今天
function backToday(){
  init();
  thisYYYYMMnote("flex");
  styleMenuBtn("remove");
}


// 根據資料產生畫面
function render(){
  let head = document.querySelector("#year_month");
  let month = state.current.getMonth()
  let img = document.querySelector(".img");

  // 月份顯示數字 ------------
  // head.textContent = state.current.getFullYear() + " / " + (state.current.getMonth()+1); // getMonth()取得月份 是 0 - 11 0:1月, 1:2月....
  
  // 月份顯示英文 ------------
  let monthEN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  head.textContent = state.current.getFullYear() + "  " + monthEN[month];


  let list = document.getElementById("list");
  let noteMonth = document.getElementById("noteMonth");

  list.innerHTML=""; //清空畫面
  noteMonth.innerHTML= month+1; //清空

  // 取得本月第一天 //(年, 月, 第一天)
  let firstDate = new Date(state.current.getFullYear(), state.current.getMonth(), 1); 

  let date = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1); 

  //往前算到星期日
  date.setDate(date.getDate()-date.getDay()); // getDay()取得星期 0:星期日, 1:星期一 .....

  //畫出上個月的後幾天
  while(date < firstDate){ //當月份小於本月
    renderDate(date, list);
    date.setDate(date.getDate()+1);
  }
  
  // 畫出這個月
  while(date.getMonth() === state.current.getMonth()){// 如果現在的月份 == 目前時間的月份 就開始畫圖
    // 畫出一天的格子
    renderDate(date, list);
    // 日期 + 1
    date.setDate(date.getDate()+1);
  }

  //畫出下個月的前幾天
  while(date.getDay() > 0){ //畫到下周日前
    renderDate(date, list);
    date.setDate(date.getDate()+1);
  }
  
  //本月照片
  img.style.backgroundImage  = "url(./imgs/"+imgStyle+"/"+month+".png)";
  
};

//畫日期格子
function renderDate(date, list) {
  
  let thisYear = date.getFullYear();
  let thisMonth = MMDD(date.getMonth()+1);
  let thisDate = MMDD(date.getDate());
  let thisMMDD = thisMonth+"/"+thisDate; // 這隔日期 格式MMDD
  
  let cell = document.createElement("div");//創造日期格子
  let festival = [
    {festivalDate:"01/01", festivalName:"元旦"},
    {festivalDate:"02/14", festivalName:"情人節"},
    {festivalDate:"02/22", festivalName:"猫の日"},
    {festivalDate:"03/14", festivalName:"白色情人節"},
    {festivalDate:"04/05", festivalName:"清明節"},
    {festivalDate:"05/01", festivalName:"勞動節"},
    {festivalDate:"08/08", festivalName:"父親節"},
    {festivalDate:"10/10", festivalName:"雙十節"},
    {festivalDate:"12/25", festivalName:"聖誕節"}
  ];

  //dataset
  cell.dataset["yyyymm"] = thisYear+"-"+thisMonth;
  cell.dataset["dd"] = thisDate;

  cell.className = "date"+" pointer"+
  (date.getMonth() === state.current.getMonth() ? "" : " fadeout")+ //判斷是否為本月
  ((cell.dataset["yyyymm"]+"/"+cell.dataset["dd"]) === todayDay ? " today" : ""); //判斷是否為今天

  //今天節日
  festival.forEach( value => {
    if(thisMMDD == value.festivalDate){
      cell.classList.add("festival");
      cell.setAttribute("data-festival", value.festivalName);//新增dataset
    }
  });

  cell.textContent = date.getDate();//日期格子塞入文字(日期) 
  list.appendChild(cell); //將日期格子塞進指定DOM->list
};



// 處理流程 控制
init();


// 寫法1
// let dateCell = document.querySelectorAll(".date");
// dateCell.forEach(() => addEventListener("click",choiceDate));
// 寫法2
let dateCell = document.getElementsByClassName("date");
Array.prototype.forEach.call(dateCell,()=>addEventListener("click",choiceDate))


//日期被選中
function choiceDate(e){
  if(!e.target.dataset.dd){return};
// 寫法1
  // dateCell.forEach((a) => a.classList.remove("choiceDate"));
// 寫法2
  Array.prototype.forEach.call(dateCell,(a)=>a.classList.remove("choiceDate"));

  // ---------------------------------------------------
  noteYYYYMM.value = e.target.dataset.yyyymm;
  noteDD.value = e.target.dataset.dd;

  e.target.classList.add("choiceDate");
}

//月份日期改為兩位數
function MMDD(e){
  if(e < 10){ return ("0"+e)
  }else{return e}
}


