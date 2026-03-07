const createEl = (arr) => {
  let el = arr.map(
    (label) => `
    <div class="flex gap-1 items-center px-2 py-1 bg-red-100 rounded-full font-medium text-[12px] border-red-200 border-2 text-red-600">
      <i class="fa-solid fa-bug"></i>
      <p class="uppercase"> ${label} </p>
    </div>                    
  `,
  );
  return el.join(" ");
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

  cards.forEach((card) => {
    let createElement = document.createElement("div");
    createElement.innerHTML = `
        <div class="bg-base-100 p-6 rounded-sm border-t-4 border-green-500 shadow-lg  cursor-pointer transition-all duration-500 hover:scale-105">
                    <div class="flex justify-between">
                        <div>
                            <img src="./assets/Open-Status.png" alt="">
                        </div>
                        <div class="">
                            <p class="text-red-600  px-4 py-1 bg-red-100 rounded-full font-medium text-[12px] uppercase"> ${card.priority}</p>
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
                            <p> ${card.author} </p>
                            <p> ${card.createdAt} </p>
                        </div>
                    </div>
        </div>
    `;
    allIssuesCards.appendChild(createElement);
  });
};
