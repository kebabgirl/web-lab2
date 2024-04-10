import { view } from "./view.js";
import { model, Poll } from "./model.js";

export const controller = {
  // polls
  currentPolls: undefined,
  pollsContainer: undefined,
  pollsArray: [],

  // add
  addPollBtn: undefined,
  addModal: undefined,
  exitAddModal: undefined,
  nameAddModal: undefined,
  variantsAddModal: undefined,
  buttonAddModal: undefined,
  errorMessage: undefined,

  // delete
  deleteButtons: undefined,

  createPoll(title, variants) {
    const pollData = new Poll(title, variants);
    const pollView = view.createPoll(pollData);
    this.pollsContainer.appendChild(pollView.element);
    this.pollsArray.push(pollView);
    this.currentPolls++;
  },

  handleDeletePoll(e) {
    const pollElement = e.target.closest(".poll");
    if (pollElement) {
      const pollData = controller.pollsArray.find(
        (poll) => poll.element === pollElement
      );
      if (pollData) {
        model.deletePoll(pollElement, pollData);
      }
    }
  },

  handleVotePoll(e) {
    const pollElement = e.target.closest(".poll");
    if (pollElement) {
      const pollData = controller.pollsArray.find(
        (poll) => poll.element === pollElement
      );
      if (pollData) {
        const checkedCheckboxes = pollElement.querySelectorAll(
          '.form-check-input[type="checkbox"]:checked'
        );
        const indexes = [];
        checkedCheckboxes.forEach((checkbox) => {
          const index = Array.from(
            pollElement.querySelectorAll('.form-check-input[type="checkbox"]')
          ).indexOf(checkbox);
          indexes.push(index);
        });

        indexes.forEach((index) => {
          const progressBar = pollData.element.querySelector(
            `.progress-bar-${index}`
          );
          if (progressBar) {
            progressBar.style.width = "100%";
            progressBar.style.backgroundColor = "#3459e6";
          }
        });

        pollElement
          .querySelectorAll(".form-check-input[type=checkbox]")
          .forEach((input) => {
            input.disabled = true;
          });

        pollElement.querySelector(".vote-poll-btn").disabled = true;
        pollElement.querySelector(".cancel-poll-btn").disabled = true;
      }
    }
  },

  handleCancelPoll() {
    controller.pollsArray.forEach((pollData) => {
      pollData.element
        .querySelector(".btn.btn-secondary")
        .addEventListener("click", () => {
          pollData.element
            .querySelectorAll(".form-check-input[type=checkbox]")
            .forEach((input) => {
              input.checked = false;
            });
        });
    });
  },

  filterPolls() {
    const searchTerm = this.searchInput.value.trim().toLowerCase();

    if (searchTerm.length === 0) {
      view.showAllPolls();
    } else {
      model.searchPolls(searchTerm);
    }
  },

  init() {
    //polls
    this.pollsContainer = document.querySelector(".pools");

    // add
    this.addPollBtn = document.querySelector(".button-add");
    this.addModal = document.querySelector(".add-modal");
    this.exitAddModal = document.querySelector(".add-modal__close");
    this.nameAddModal = document.querySelector(".add-modal__name");
    this.variantsAddModal = document.querySelector(".add-modal__variants");
    this.buttonAddModal = document.querySelector(".add-modal__button");
    this.errorMessage = document.querySelector("#addErrorMessage");

    // delete
    this.deleteButtons = document.querySelectorAll(".delete-poll-btn");

    // search
    this.searchForm = document.querySelector(".d-flex");
    this.searchInput = this.searchForm.querySelector(".form-control");

    //cancel
    this.buttonCancelPoll = document.querySelector(".cancel-poll-btn");

    //vote
    this.buttonVotePoll = document.querySelector(".vote-poll-btn");
  },
};
