const BASE_URL = "https://api.spacexdata.com/v3";
const infoCards = document.getElementById("infoCards");
let data;

const getSpaceInfo = async() => {
  await axios.get(
    `${BASE_URL}/history`
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
  const cardElements = data.map((selectedHistory) => {
    const card = document.createElement("div");
    card.classList.add("card", "card-small", "m-3");


    const cardBody =  document.createElement("div");
    cardBody.classList.add("card-body","bg-dark", "border-dark");
    card.appendChild(cardBody);

    const eventTitle = document.createElement("h3");
    eventTitle.classList.add("card-title");
    eventTitle.textContent = `${selectedHistory.title} `;
    cardBody.appendChild(eventTitle);

    const eventTime = document.createElement("p");
    eventTime.classList.add("text-muted",);
    const eventDate = new Date(selectedHistory.event_date_utc);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    const legibleDate = eventDate.toLocaleDateString('en-US', options);
    eventTime.textContent = `${legibleDate}`;
    cardBody.appendChild(eventTime);

    const details = document.createElement("p");
    details.classList.add("card-text",  "text-overflow");
    details.textContent = selectedHistory.details;
    cardBody.appendChild(details);

    const buttons = document.createElement("div");
    buttons.classList.add("d-flex", "justify-content-between", "p-3");
    card.appendChild(buttons);

    const cardBtn =  document.createElement("a");
    cardBtn.classList.add("btn", "btn-dark", "border", "border-light");
    cardBtn.href = selectedHistory.links.article;
    cardBtn.textContent ="Read More";
    cardBtn.target="_blank";

    buttons.appendChild(cardBtn);


    const cardBtn2 =  document.createElement("a");
    cardBtn2.classList.add("btn", "btn-dark", "border", "border-light");
    cardBtn2.textContent ="Wikipedia";
    cardBtn2.href = selectedHistory.links.wikipedia;
    cardBtn2.target="_blank";
    buttons.appendChild(cardBtn2);



    return card;
  });
  cardElements.forEach((card) => {
    infoCards.appendChild(card);
  });
}







(async () => {
  await getSpaceInfo(BASE_URL);
})();
