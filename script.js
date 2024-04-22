const BASE_URL = "https://api.spacexdata.com/v3";
const infoCards = document.getElementById("infoCards");
let data;

const getSpaceInfo = async() => {
  await axios.get(
    `${BASE_URL}/info`
  )
  .then((res) => {
    data = res.data;
    console.log(data);
    showSpaceInfo(data);

  })
  .catch((error) => console.error(`Error: ${error}`));
};

const showSpaceInfo = (data) =>{
  const summary = document.createElement("p");
  summary.classList.add("border", "p-3");
  summary.textContent = `${data.summary}`;
  infoCards.appendChild(summary);


  const infoBody =  document.createElement("div");
  infoBody.classList.add("d-flex", "flex-row", "align-items-center");
  infoCards.appendChild(infoBody);

  const founding = document.createElement("div");
  founding.classList.add("m-4", "infoP");
  founding.textContent = `Founded by ${data.founder}, SpaceX is valued at $${data.valuation}, the Company has ${data.launch_sites} Launch Sites, ${data.test_sites} Test Sites and ${data.employees} Employees.`
  infoBody.appendChild(founding);

  const address = document.createElement("div");
  address.classList.add("m-4");
  address.textContent = `Address: ${data.headquarters.address}, ${data.headquarters.city}, ${data.headquarters.state},`
  infoBody.appendChild(address);

  const links = document.createElement("div");
  links.classList.add("m-5", "d-flex", "flex-column");
  const linkOne = document.createElement("a");
  linkOne.classList.add("link-secondary", "d-block");
  linkOne.href = data.links.elon_twitter;
  linkOne.textContent = "Elon Musks Twitter";

  const linkTwo = document.createElement("a");
  linkTwo.classList.add("link-light");
  linkTwo.href = data.links.twitter;
  linkTwo.textContent = "SpaceX Twitter";

  const linkThree = document.createElement("a");
  linkThree.classList.add("link-secondary");
  linkThree.href = data.links.website;
  linkThree.textContent = "Website";

  const linkFour = document.createElement("a");
  linkFour.classList.add("link-secondary");
  linkFour.href = data.links.flickr;
  linkFour.textContent = "Flickr";

  links.appendChild(linkOne);
  links.appendChild(linkTwo);
  links.appendChild(linkThree);
  links.appendChild(linkFour);
  infoBody.appendChild(links);

}




(async () => {
  await getSpaceInfo(BASE_URL);
})();

