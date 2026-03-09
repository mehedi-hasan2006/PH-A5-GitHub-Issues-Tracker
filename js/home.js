// get switching buttons
let allBtn = document.getElementById("btn-all");
let openBtn = document.getElementById("btn-open");
let closedBtn = document.getElementById("btn-closed");
let loading = document.getElementById("loading");

let allIssues = [];

// function for  loading start state
const startLoading = () => {
  loading.classList.remove("hidden");
};

const endLoading = () => {
  loading.classList.add("hidden");
};

// fetch all issues
const fetchAllIssues = async () => {
  startLoading();
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const details = await res.json();
  allIssues = details.data;
  displayAllIssues(allIssues);
  endLoading();
};

fetchAllIssues();

const displayAllIssues = (cards) => {
  let allIssuesCards = document.getElementById("allIssuesCards");
  allIssuesCards.innerHTML = "";

  cards.forEach((card) => {
    let createElement = document.createElement("div");
    createElement.innerHTML = `
        <div id="issueCard" onclick="fetchIssueForModal(${card.id})" class="issueCard bg-base-100 p-6 ${cardTopBorder(card.priority)} rounded-sm  h-[290px]  shadow-lg  cursor-pointer transition-all duration-500 hover:scale-105">
                    <div class="flex justify-between">
                          <div>
                              ${showStatusIcon(card.priority)}
                          </div>
                          <div>
                          ${showStatus(card.priority)}                                
                    </div>
                    </div>
                    <div class="space-y-2 mt-2">
                        <h2 class="font-semibold text-[16px]"> ${card.title}</h2>
                        <p class="text-[#64748B] text-[12px]"> ${card.description} </p>
                        <div class="flex gap-2">
                            ${showLabes(card.labels)}
                        </div>
                        <div class="divider "></div>
                        <div class="text-[#64748B] text-[12px]">
                            <p> #1 by ${card.author} </p>
                            <p> ${card.createdAt.trim("T")} </p>
                        </div>
                    </div>
        </div>
    `;
    allIssuesCards.appendChild(createElement);
  });
  let totalIssues = document.getElementById("totalIssues");
  totalIssues.innerText = allIssuesCards.children.length + " Issues";
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

    const openIssues = allIssues.filter((issue) => issue.status === "open");
    displayAllIssues(openIssues);
  } else if (btn === "closedBtn") {
    closedBtn.classList.add("btn-primary", "text-white");
    closedBtn.classList.remove("text-[#64748B]");

    const closedIssue = allIssues.filter((issue) => issue.status === "closed");
    displayAllIssues(closedIssue);
  } else {
    allBtn.classList.add("btn-primary", "text-white");
    allBtn.classList.remove("text-[#64748B]");
    displayAllIssues(allIssues);
  }
};

// function for  search
const search = () => {
  let searchInput = document.getElementById("searchText");

  searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.trim();

    if (searchText === "") {
      displayAllIssues(allIssues);
      return;
    }

    fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`,
    )
      .then((res) => res.json())
      .then((data) => displayAllIssues(data.data));
  });
};
search();

// function for card top border
const cardTopBorder = (priority) => {
  if (priority === "high" || priority === "medium") {
    return "border-t-4 border-green-500";
  } else {
    return "border-t-4 border-violet-500";
  }
};

// function for show status icon
const showStatusIcon = (status) => {
  if (status === "high" || status === "medium") {
    return ` <img id="statusOpen" src="./assets/Open-Status.png" alt="">`;
  } else {
    return `<img id="statusClose" src="./assets/Closed- Status .png" alt="">`;
  }
};

// function for show status high medium low
const showStatus = (st) => {
  if (st === "high") {
    return `<span id="high" class="text-red-600  px-4 py-1 bg-red-100 rounded-full font-medium text-[12px] uppercase">HIGH</span>`;
  } else if (st === "low") {
    return `<span id="low" class="text-[#9CA3AF]  px-4 py-1 bg-[#EEEFF2] rounded-full font-medium text-[12px] uppercase"> low </span>`;
  } else {
    return `<span id="medium" class="text-[#F59E0B]  px-4 py-1 bg-[#FFF6D1] rounded-full font-medium text-[12px] uppercase"> medium </span>`;
  }
};

// function for show labels
const showLabes = (label) => {
  return label.map((lab) => {
    lab = lab.toLowerCase();

    if (lab === "bug") {
      return `
    <div
                                class="flex gap-1 items-center px-2 py-1 bg-red-100 rounded-full font-medium text-[10px] border-red-200 border-2 text-red-600">
                                <i class="fa-solid fa-bug"></i>
                                <p>BUG</p>
                            </div>`;
    } else if (lab === "help wanted") {
      return `
      <div
                                class="flex gap-1 items-center px-2 py-1 bg-yellow-100 rounded-full font-medium text-[10px] border-red-200 border-2 text-[#D97706]">
                                <i class="fa-regular fa-circle-stop"></i>
                                <p class="uppercase">help wanted</p>
                            </div>
    `;
    } else if (lab === "enhancement") {
      return `
      <div
                                class="flex gap-1 items-center px-2 py-1 bg-green-100 rounded-full font-medium text-[10px] border-red-200 border-2 text-green-700">
                                <i class="fa-regular fa-circle-stop"></i>
                                <p class="uppercase">enhancement</p>
                            </div>
    `;
    } else if (lab === "good first issue") {
      return `
      <div
                                class="flex gap-1 items-center px-2 py-1 bg-sky-100 rounded-full font-medium text-[10px] border-red-200 border-2 text-sky-700">
                                <i class="fa-regular fa-circle-stop"></i>
                                <p class="uppercase">good first issue</p>
                            </div>
    `;
    } else if (lab === "documentation") {
      return `
      <div
                                class="flex gap-1 items-center px-2 py-1 bg-pink-100 rounded-full font-medium text-[10px] border-red-200 border-2 text-pink-700">
                                <i class="fa-regular fa-circle-stop"></i>
                                <p class="uppercase">documentation</p>
                            </div>
    `;
    } else {
      return " ";
    }
  });
};

// function for modal
const fetchIssueForModal = (id) => {
  startLoading();
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((res) => res.json())
    .then((res) => showModal(res.data));
  endLoading();
};

// fetch modal
const showModal = (modal) => {
  let modalContainer = document.getElementById("modalContainer");
  modalContainer.innerHTML = `
     <section>
                        <div class="p-5 space-y-3 bg-white">
                            <h1 class="font-bold text-24px "> ${modal.title}</h1>

                            <div class="flex items-center gap-2">
                                <span class="text-white bg-green-500 rounded-full px-4 py-1 text-[12px] ">${modal.status}</span>
                                <span class="status"></span>
                                <span class="text-[#64748B] text-[12px]"> Opened by ${modal.author}</span>
                                <span class="status"></span>
                                <span class="text-[#64748B] text-[12px]"> ${modal.createdAt}</span>
                            </div>
                            <div class="flex gap-2">
                                ${showLabes(modal.labels)}
                            </div>

                            <div>
                                <p class="text-[#64748B]">${modal.description}</p>
                            </div>
                            <div class="p-3 bg-[#F8FAFC] rounded-md">
                                <div class="grid grid-cols-2 justify-between">
                                    <div>
                                        <p class="text-[#64748B]">Assignee:</p>
                                        <h2 class="font-bold">${modal.author}</h2>
                                    </div>
                                    <div>
                                        <p class="text-[#64748B]"> Priority: </p>
                                        <span> ${showStatus(modal.priority)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
  `;
  let showModal = document.getElementById("my_modal").showModal();
};
