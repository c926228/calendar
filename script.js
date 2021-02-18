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
  state.current.setMonth(state.current.getMonth()-1); //現在月份-1
  render();
}

//下個月
function nextMonth() {
  state.current.setMonth(state.current.getMonth()+1); //現在月份-1
  render();
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


  let list = document.querySelector("#list");

  list.innerHTML=""; //清空畫面

  // 取得本月第一天 //(年, 月, 第一天)
  let firstDate = new Date(state.current.getFullYear(), state.current.getMonth(), 1); 

  let date = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1); 

  //往前算到星期日
  date.setDate(date.getDate()-date.getDay()); // getDate()取得星期 0:星期日, 1:星期一 .....

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

  
  
  img.style.backgroundImage  = "url(./imgs/cats/"+month+".jpg)";
  
};

//畫日期格子
function renderDate(date, list) {
  let today = new Date();
  let thisDate = (date.getMonth()+1)+"/"+date.getDate(); // 月/日
  let cell = document.createElement("div");//創造日期格子
  let festival = [
    {festivalDate:"1/1", festivalName:"元旦"},
    {festivalDate:"2/14", festivalName:"情人節"},
    {festivalDate:"3/14", festivalName:"白色情人節"},
    {festivalDate:"4/5", festivalName:"清明節"},
    {festivalDate:"5/1", festivalName:"勞動節"},
    {festivalDate:"8/8", festivalName:"父親節"},
    {festivalDate:"10/10", festivalName:"雙十節"},
    {festivalDate:"12/25", festivalName:"聖誕節"}
  ];
  

  cell.className = "date"+
  (date.getMonth() === state.current.getMonth() ? "" : " fadeout")+ //判斷是否為本月
  (thisDate === (today.getMonth()+1)+"/"+today.getDate() ? " today" : ""); //判斷是否為今天

  //今天節日
  festival.forEach( value => {
    if(thisDate == value.festivalDate){
      cell.classList.add("festival");
      cell.setAttribute("data-festival", value.festivalName);//新增dataset
    }
  });

  cell.textContent = date.getDate();//日期格子塞入文字(日期) 
  list.appendChild(cell); //將日期格子塞進指定DOM->list
};

// 處理流程 控制
init();