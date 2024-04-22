const BASE_URL = "https://api.spacexdata.com/v3";
const infoCards = document.getElementById("infoCards");
let data;

const getSpaceInfo = async() => {
  await axios.get(
    `${BASE_URL}/cores`
  )
  .then((res) => {
    data = res.data;
    console.log(data);
    if (data && data.length > 0){
      showSpaceInfo(data);

    }
  })
  .catch((error) => console.error(`Error: ${error}`));
};

const showSpaceInfo = (data) =>{
  const cardElements = data.map((fetchedData) => {
    const card = document.createElement("div");
    card.classList.add("card", "border-dark", "m-3", "card-small");

    const cardBody =  document.createElement("div");
    cardBody.classList.add("card-body","bg-dark", "border-dark");
    card.appendChild(cardBody);

    const spaceCraftTitle = document.createElement("h4");
    spaceCraftTitle.classList.add("card-title");
    spaceCraftTitle.textContent = `${fetchedData.core_serial} `;
    cardBody.appendChild(spaceCraftTitle);

    const details = document.createElement("p");
    details.classList.add("card-text");
    details.textContent = fetchedData.details !== null ? fetchedData.details : "No information available";
    cardBody.appendChild(details);

    const launchInfo = document.createElement("ul");
    launchInfo.classList.add("list-group", "list-group-flush");
    card.appendChild(launchInfo);

    const attempts = document.createElement("li");
    attempts.classList.add("list-group-item", "bg-dark", "text-muted");
    attempts.textContent = `ASDS attempts: ${fetchedData.asds_attempts}`;
    launchInfo.appendChild(attempts);

    const landingCount = document.createElement("li");
    landingCount.classList.add("list-group-item", "bg-dark", "text-muted");
    landingCount.textContent = `ASDS Landings: ${fetchedData.asds_landings}`;
    launchInfo.appendChild(landingCount);

    const reuseCount = document.createElement("li");
    reuseCount.classList.add("list-group-item", "bg-dark", "text-muted");
    reuseCount.textContent = `Reused ${fetchedData.reuse_count} times`;
    launchInfo.appendChild(reuseCount);

    const spaceStatus = document.createElement("li");
    spaceStatus.classList.add("list-group-item", "bg-dark", "text-" + (fetchedData.status === "active" ? "success" : "danger"));


    spaceStatus.textContent = `Status: ${fetchedData.status}`;
    launchInfo.appendChild(spaceStatus);

    return card;
  });
  cardElements.forEach((card) => {
    infoCards.appendChild(card);
  });
}




(async () => {
  await getSpaceInfo(BASE_URL);
})();

