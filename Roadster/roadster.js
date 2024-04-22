const BASE_URL = "https://api.spacexdata.com/v4";
const infoCards = document.getElementById("infoCards");
let data;

const getRoadster = async() => {
  await axios.get(
    `${BASE_URL}/roadster`
  )
  .then((res) => {
    data = res.data;
    console.log(data);
    showRoadster(data);
  })
  .catch((error) => console.error(`Error: ${error}`));
};

const showRoadster = (data) =>{

  const roadster = document.createElement("div");
  infoCards.appendChild(roadster);
  infoCards.classList.add("bg-dark", "p-4")
  roadster.classList.add("d-flex", "flex-row", "justify-content-center", "align-items-center")

  const roadsterImgs = document.createElement("div");
  roadsterImgs.classList.add("img-display");
  const selectedImg = document.createElement("div");
  selectedImg.classList.add("details-image");
  selectedImg.style.backgroundImage = `url(${data.flickr_images[0]})`;
  roadsterImgs.appendChild(selectedImg);

  const imgSelection = document.createElement("div");
  imgSelection.classList.add("d-flex", "flex-column");
  
  data.flickr_images.forEach((img) => {
    let imgBtn = document.createElement("button");
    imgBtn.classList.add("m-2")
    let thumbnail = document.createElement("img");
    thumbnail.classList.add("thumbnail")
    imgBtn.appendChild(thumbnail);

    thumbnail.src = img;
    imgSelection.appendChild(imgBtn);
    imgBtn.addEventListener("click", (event) => selectedImg.style.backgroundImage = `url(${event.target.src})`);

  })
  roadster.appendChild(imgSelection);
  roadster.appendChild(roadsterImgs);

  const details = document.createElement("p");
  details.classList.add("text-muted");
  details.textContent = data.details;
  infoCards.appendChild(details);

  const info = document.createElement("div");
  info.classList.add("d-flex", "flex-row");
  infoCards.appendChild(info);

  const launchInfo = document.createElement("div");
  launchInfo.classList.add("d-flex", "flex-column");
  info.appendChild(launchInfo);

  const launchDate = document.createElement("p");
  const eventDate = new Date(data.launch_date_utc);
  const options = { year: 'numeric', month: 'long', day: 'numeric'}
  const legibleDate = eventDate.toLocaleDateString('en-US', options);
  launchDate.textContent = `Date of Flight: ${legibleDate}`;
  launchInfo.appendChild(launchDate);

  const launchMass = document.createElement("p");
  launchMass.textContent = `Launch Mass: ${data.launch_mass_kg} KG`;
  launchInfo.appendChild(launchMass);

  const daysSinceLaunch = document.createElement("p");
  daysSinceLaunch.textContent = `Days Since Launch: ${Math.round(data.period_days)}`;
  launchInfo.appendChild(daysSinceLaunch);
  
  const speed = document.createElement("p");
  speed.textContent = `speed: ${Math.round(data.speed_kph)} KpH`;
  launchInfo.appendChild(speed);

  const links = document.createElement("div");
  links.classList.add("d-flex", "flex-column", "ml-4");
  info.appendChild(links);

  const videoLink = document.createElement("a");
  videoLink.textContent = `Youtube Video`;
  videoLink.href = data.video;
  links.appendChild(videoLink);

  const wikipedia = document.createElement("a");
  wikipedia.textContent = `Wikipedia`;
  wikipedia.href = data.wikipedia;
  links.appendChild(wikipedia);
}




(async () => {
  await getRoadster(BASE_URL);
})();

