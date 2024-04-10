import { controller } from "./controller.js";
import { view } from "./view.js";

export class Poll {
  constructor(title, variants) {
    this.index = controller.currentPolls + 1;
    this.title = title;
    this.variants = variants;
  }

  logData() {
    console.log(`Index: ${this.index}`);
    console.log(`Title: ${this.title}`);
    console.log(`Variants: ${this.variants}`);
  }
}

export const model = {
  validateVariants(inputString, delimiter) {
    inputString = inputString.toString();

    let regex = /^[a-zA-Zа-яА-Я0-9\s,]+$/;

    if (!regex.test(inputString)) {
      return null;
    }

    let dataArray = inputString.split(delimiter);

    if (dataArray.length === 0 || dataArray[0].trim() === "") {
      return null;
    }

    return dataArray;
  },

  deletePoll(pollElement, pollData) {
    pollElement.remove();

    const index = controller.pollsArray.indexOf(pollData);
    if (index !== -1) {
      controller.pollsArray.splice(index, 1);
    }
  },

  searchPolls(searchTerm) {
    const filteredPolls = controller.pollsArray.filter(
      (poll) =>
        poll.pollData.title &&
        poll.pollData.title.toLowerCase().includes(searchTerm)
    );
    view.displayFilteredPolls(filteredPolls);
  },
};
