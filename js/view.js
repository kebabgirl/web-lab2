import { controller } from "./controller.js";

export const view = {
  createPoll(pollData) {
    const pollElement = document.createElement("div");
    pollElement.classList.add("poll");
    pollElement.innerHTML = `
    <div class="pool">
        <div class="pool__title-wrapper">
            <span class="pool__title">${pollData.title}</span>
            <div class="button-delete delete-poll-btn">
                <svg class="delete-icon" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26" xml:space="preserve">
                    <path d="M21.125,0H4.875C2.182,0,0,2.182,0,4.875v16.25C0,23.818,2.182,26,4.875,26h16.25
                    C23.818,26,26,23.818,26,21.125V4.875C26,2.182,23.818,0,21.125,0z M18.78,17.394l-1.388,1.387c-0.254,0.255-0.67,0.255-0.924,0
                    L13,15.313L9.533,18.78c-0.255,0.255-0.67,0.255-0.925-0.002L7.22,17.394c-0.253-0.256-0.253-0.669,0-0.926l3.468-3.467
                    L7.221,9.534c-0.254-0.256-0.254-0.672,0-0.925l1.388-1.388c0.255-0.257,0.671-0.257,0.925,0L13,10.689l3.468-3.468
                    c0.255-0.257,0.671-0.257,0.924,0l1.388,1.386c0.254,0.255,0.254,0.671,0.001,0.927l-3.468,3.467l3.468,3.467
                    C19.033,16.725,19.033,17.138,18.78,17.394z"/>
                </svg>
            </div>
        </div>
        <div class="separator"></div>
        <div class="pool__variants">
        ${pollData.variants
          .map(
            (variant, index) => `
                <div class="pool__variants__item">
                    <div class="variant__number">${index + 1}.</div>
                    <div class="variant__content">
                        <div class="variant__title">${variant}</div>
                        <div class="variant__progress-wrapper">
                        <div class="variant__progress-bar">
                                <div class="progress">
                                     <div class="progress-bar-${index} progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%; backgroundColor: 'transparent";></div>
                                </div>
                            </div>
                            <div class="variant__progress-percent">
                                <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="optionsRadios${
                                  pollData.index
                                }-${index}" id="optionsRadios${
              pollData.index
            }-${index}" value="option${pollData.index}-${index}" >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
          )
          .join("")}
        </div>
        <div class="buttons">
            <button type="button" class="btn btn-primary vote-poll-btn">Vote</button>
            <button type="button" class="btn btn-secondary cancel-poll-btn">Cancel</button>
        </div>
    </div>
    `;

    const pollView = {
      pollData,
      element: pollElement,
    };

    return pollView;
  },

  displayFilteredPolls(filteredPolls) {
    controller.pollsContainer.innerHTML = "";
    filteredPolls.forEach((pollData) => {
      controller.pollsContainer.appendChild(pollData.element);
    });
  },

  showAllPolls() {
    this.displayFilteredPolls(controller.pollsArray);
  },

  closeAddModal() {
    controller.addModal.classList.remove("add-modal_active");
  },

  openAddModal() {
    controller.addModal.classList.add("add-modal_active");
  },

  clearAddModal() {
    controller.nameAddModal.value = "";
    controller.variantsAddModal.value = "";
    controller.errorMessage.innerHTML = "";
  },
};
