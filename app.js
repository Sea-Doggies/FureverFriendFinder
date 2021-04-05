const heightQuestion = document.querySelector("#question1");
const weightQuestion = document.querySelector("#question2");
const submitBtn = document.querySelector("#submit-btn");
const resultsArea = document.querySelector("#results");

const apiKey = `f0042504-b451-49fe-a1d7-d83d59145255`;
const url = `https://api.thedogapi.com/v1/breeds?${apiKey}`;

submitBtn.addEventListener("click", function (event) {
	event.preventDefault();
	getDogs();
});

function getDogs() {
	while (resultsArea.firstChild) {
		resultsArea.firstChild.remove();
	}

	const [
		minHeightRequirement,
		maxHeightRequirement,
	] = heightQuestion.value.split("-").map((num) => parseInt(num));

	const [
		minWeightRequirement,
		maxWeightRequirement,
	] = weightQuestion.value.split("-").map((num) => parseInt(num));

	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {

			const result = data.filter((dog) => {
				const [minHeight, maxHeight] = dog.height.metric
					.split("-")
					.map((num) => parseInt(num));

				const [minWeight, maxWeight] = dog.weight.metric
					.split("-")
					.map((num) => parseInt(num));

				if (minHeight >= minHeightRequirement) {
					if (
						maxHeight <= maxHeightRequirement ||
						maxHeight === "undefined"
					) 
					if (minWeight >= minWeightRequirement) 
						if (
							maxWeight <= maxWeightRequirement ||
							maxWeight === "undefined"
						)
						{
						return dog;
					}
				}
			});

			result.forEach((dogObj) => {
				const element = document.createElement("img");
				element.setAttribute("src", dogObj.image.url);
				element.setAttribute("alt", dogObj.name);
				const name = document.createElement("h2");
				name.textContent = dogObj.name;
				const temperament = document.createElement(`p`);
				temperament.textContent = dogObj.temperament;
				resultsArea.appendChild(element);
				resultsArea.appendChild(name);
				resultsArea.appendChild(temperament);
			});
		});
}
