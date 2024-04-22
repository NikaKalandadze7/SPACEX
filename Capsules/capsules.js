const BASE_URL = "https://api.spacexdata.com/v3";
const infoCards = document.getElementById("infoCards");
let data;

const getCapsules = async() => {
  await axios.get(
    `${BASE_URL}/capsules`
  )
  .then((res) => {
    data = res.data;
    console.log(data);
    if (data && data.length > 0){
      showCapsules(data);

    }
  })
  .catch((error) => console.error(`Error: ${error}`));
};

const showCapsules = (data) =>{
  const cardElements = data.map((capsuleData) => {
    const card = document.createElement("div");
    card.classList.add("card", "border-dark", "m-3", "card-small");

    const cardBody =  document.createElement("div");
    cardBody.classList.add("card-body","bg-dark", "border-dark");
    card.appendChild(cardBody);

    const capsuleTitle = document.createElement("h4");
    capsuleTitle.classList.add("card-title");
    capsuleTitle.textContent = `${capsuleData.type} `;
    cardBody.appendChild(capsuleTitle);

    const serial = document.createElement("span");
    serial.classList.add("badge", "badge-secondary");
    serial.textContent = `${capsuleData.capsule_serial}`;
    capsuleTitle.appendChild(serial);

    const details = document.createElement("p");
    details.classList.add("card-text");
    details.textContent = capsuleData.details !== null ? capsuleData.details : "No information available";
    cardBody.appendChild(details);

    const launchInfo = document.createElement("ul");
    launchInfo.classList.add("list-group", "list-group-flush");
    card.appendChild(launchInfo);

    const launchTime = document.createElement("li");
    launchTime.classList.add("list-group-item", "bg-dark", "text-muted");
    const originalLaunchDate = new Date(capsuleData.original_launch);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    const legibleDate = originalLaunchDate.toLocaleDateString('en-US', options);

    launchTime.textContent = `Launched on: ${legibleDate}`;
    launchInfo.appendChild(launchTime);

    const reuseCount = document.createElement("li");
    reuseCount.classList.add("list-group-item", "bg-dark", "text-muted");
    reuseCount.textContent = `Reused ${capsuleData.reuse_count} times`;
    launchInfo.appendChild(reuseCount);

    const landingCount = document.createElement("li");
    landingCount.classList.add("list-group-item", "bg-dark", "text-muted");
    landingCount.textContent = `Landed ${capsuleData.landings} times`;
    launchInfo.appendChild(landingCount);

    const capsuleStatus = document.createElement("li");
    capsuleStatus.classList.add("list-group-item", "bg-dark", "text-" + (capsuleData.status === "active" ? "success" : "danger"));


    capsuleStatus.textContent = `Status: ${capsuleData.status}`;
    launchInfo.appendChild(capsuleStatus);

    return card;
  });
  cardElements.forEach((card) => {
    infoCards.appendChild(card);
  });
}




(async () => {
  await getCapsules(BASE_URL);
})();

