const dogApp = {};

dogApp.key = `f0042504-b451-49fe-a1d7-d83d59145255`;

dogApp.init = () => {
  dogApp.getPictures();
};

// PHASE 1 - Fetching the Data

dogApp.getPictures = () => {

  const url = new URL(`https://api.thedogapi.com/v1/breeds`);

  url.search = new URLSearchParams({
    key: dogApp.key,
    image: true
  });

  fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    dogApp.displayPictures(data)
  })
}




// PHASE 2 - Display the Data

dogApp.displayPictures = (arrayOfDogs) => {

  const resultElement = document.querySelector(`#result`);
  resultElement.innerHTML = ``;

  arrayOfDogs.forEach((dogObject) => {
    const breeds = document.createElement(`div`);
    breeds.classList.add('dogCard');
    const name = document.createElement(`h2`);
    name.textContent = dogObject.name;
    const temperament = document.createElement(`p`);
    temperament.textContent = dogObject.temperament;
    const image = document.createElement(`img`);
    image.src = dogObject.image.url;
    image.alt = dogObject.name;
    dogObject.appendChild(name);
    dogObject.appendChild(temperament);
    dogObject.appendChild(image);
    resultElement.appendChild(breeds);
  });
}



dogApp.init();