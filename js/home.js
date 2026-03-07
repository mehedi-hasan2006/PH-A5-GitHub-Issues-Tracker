// get switching buttons
let allBtn = document.getElementById("btn-all");
let openBtn = document.getElementById("btn-open");
let closedBtn = document.getElementById("btn-closed");

const createEl = (arr) => {
  let el = arr.map(
    (label) => `
    <div class="flex gap-1 items-center px-2 py-1 bg-red-100 rounded-full font-medium text-[10px] border-red-200 border-2 text-red-600">
      <i class="fa-solid fa-bug"></i>
      <p class="uppercase"> ${label} </p>
    </div>                    
  `,
  );
  return el.join(" ");
};

// button switching
const switchBtn = (btn) => {
  allBtn.classList.remove("btn-primary", "text-white");
  openBtn.classList.remove("btn-primary", "text-white");
  closedBtn.classList.remove("btn-primary", "text-white");

  allBtn.classList.add("text-[#64748B]");
  openBtn.classList.add("text-[#64748B]");
  closedBtn.classList.add("text-[#64748B]");

  if (btn === "openBtn") {
    openBtn.classList.add("btn-primary", "text-white");
    openBtn.classList.remove("text-[#64748B]");
  } else if (btn === "closedBtn") {
    closedBtn.classList.add("btn-primary", "text-white");
    closedBtn.classList.remove("text-[#64748B]");
  } else {
    allBtn.classList.add("btn-primary", "text-white");
    allBtn.classList.remove("text-[#64748B]");
  }
};

// fetch all issues
const fetchAllIssues = async () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const details = await res.json();
  displayAllIssues(details.data);
};

fetchAllIssues();

const displayAllIssues = (cards) => {
  let allIssuesCards = document.getElementById("allIssuesCards");
  allIssuesCards.innerHTML = "";
  let issueCard = document.querySelectorAll(".issueCard");
  // console.log(issueCard);

  cards.forEach((card) => {
    // if(card.status === "open"){
    //   issueCard.classList.add("border-t-4", "border-green-500")
    // }
    let createElement = document.createElement("div");
    createElement.innerHTML = `
        <div id="issueCard" class="issueCard bg-base-100 p-6 rounded-sm  h-[290px]  shadow-lg  cursor-pointer transition-all duration-500 hover:scale-105">
                    <div class="flex justify-between">
                        <div class="flex justify-between">
                          <div class="flex">
                              <img id="statusOpen" src="./assets/Open-Status.png" alt="">
                              <img id="statusClose" src="./assets/Closed- Status .png" alt="">
                          </div>

                          <div class="flex">
                              <p id="high" class="text-red-600  px-4 py-1 bg-red-100 rounded-full font-medium text-[12px] uppercase">HIGH</p>
                              <p id="medium" class="text-[#F59E0B]  px-4 py-1 bg-[#FFF6D1] rounded-full font-medium text-[12px] uppercase"> medium </p>
                              <p id="low" class="text-[#9CA3AF]  px-4 py-1 bg-[#EEEFF2] rounded-full font-medium text-[12px] uppercase"> low </p>
                          </div>
                    </div>
                    </div>
                    <div class="space-y-2 mt-2">
                        <h2 class="font-semibold text-[16px]"> ${card.title}</h2>
                        <p class="text-[#64748B] text-[12px]"> ${card.description} </p>
                        <div class="flex gap-2">
                            ${createEl(card.labels)}
                        </div>
                        <div class="divider "></div>
                        <div class="text-[#64748B]">
                            <p> #1 by ${card.author} </p>
                            <p> ${card.createdAt} </p>
                        </div>
                    </div>
        </div>
    `;
    allIssuesCards.appendChild(createElement);
  });
};
