// Utility functions
export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  let percentage = Math.round((raisedAmount * 100) / goal);

  // cap at 100 because people can donate beyond 100%
  percentage = Math.min(percentage, 100);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  // call callback with true arg if image already complete (in browser cache)
  if (img.complete) callback(true);

  // call callback with true arg when image finishes loading, or false arg if error
  img.onload = () => callback(true);
  img.onerror = () => callback(false);
  // this ensures callback is called whether image.complete is truthy (image in browser cache) or not
};
