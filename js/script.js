const container = document.querySelector(".quest");
const id = document.querySelector(".quest__id");
const content = document.querySelector(".quest__content");
const button = document.querySelector("button");

let gettedQuests = JSON.parse(localStorage.getItem("data")) || [];

console.log(gettedQuests);

function getRandomQuest(gettedQuests, quests) {
	const randomId = Math.floor(Math.random() * quests.length) + 1;

	if (gettedQuests.length === quests.length) {
		return alert("The questions are over!");
	}

	if (gettedQuests.includes(randomId)) {
		return getRandomQuest(gettedQuests, quests);
	} else {
		gettedQuests.push(randomId);
		localStorage.setItem("data", JSON.stringify(gettedQuests));
		return { id: randomId, quest: quests[randomId] };
	}
}

button.addEventListener("click", () => {
	fetch("../quests.json", {
		headers: {
			"Content-type": "application/json",
		},
	})
		.then((response) => response.json())
		.then((response) => {
			container.classList.remove("hidden");

			const quest = getRandomQuest(gettedQuests, response);

			id.textContent = `#${quest.id}`;
			content.textContent = quest.quest;
		});
});
