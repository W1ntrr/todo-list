const content = document.querySelector('.content');

export const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

export const renderInboxDetails = (projects) => {};

export const renderTodayDetails = () => {
  clearElement(content);
};
