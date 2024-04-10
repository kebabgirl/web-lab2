import { controller } from "./controller.js";
import { view } from "./view.js";
import { model } from "./model.js";

window.addEventListener("DOMContentLoaded", () => {
  controller.init();

  controller.addPollBtn.addEventListener("click", (e) => {
    view.openAddModal();
  });

  controller.exitAddModal.addEventListener("click", (e) => {
    view.clearAddModal();
    view.closeAddModal();
  });

  controller.buttonAddModal.addEventListener("click", (e) => {
    e.preventDefault();
    const title = controller.nameAddModal.value;
    const variants = controller.variantsAddModal.value.split(", ");
    if (!model.validateVariants(variants, ", ") && title.length == 0) {
      controller.errorMessage.innerHTML =
        "Некоректний формат заголовку та варіантів опитування.";
    } else if (!model.validateVariants(variants, ", ")) {
      controller.errorMessage.innerHTML =
        "Варіанти опитування не можуть бути пустими.";
    } else if (title.length == 0) {
      controller.errorMessage.innerHTML =
        "Заголовок опитування не може бути пустим.";
    } else {
      controller.createPoll(title, variants);

      controller.deleteButtons = document.querySelectorAll(".delete-poll-btn");
      controller.deleteButtons.forEach((button) => {
        button.addEventListener("click", controller.handleDeletePoll);
      });

      controller.voteButtons = document.querySelectorAll(".vote-poll-btn");
      controller.voteButtons.forEach((button) => {
        button.addEventListener("click", controller.handleVotePoll);
      });

      controller.cancelButtons = document.querySelectorAll(".cancel-poll-btn");
      controller.cancelButtons.forEach((button) => {
        button.addEventListener("click", controller.handleCancelPoll);
      });

      view.clearAddModal();
      view.closeAddModal();
    }
  });

  controller.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    controller.filterPolls();
  });
});
