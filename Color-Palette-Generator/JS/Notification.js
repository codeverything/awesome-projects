function Notification(message, type) {
  let Old_Alert = document.querySelector(".alert");
  if (Old_Alert) {
    Old_Alert.parentNode.removeChild(Old_Alert);
  }

  let Alert = document.createElement("div");
  Alert.className = `alert alert-${type}`;
  Alert.innerHTML = message;
  document.body.appendChild(Alert);

  setTimeout(() => Alert.classList.add("active"), 1);
  setTimeout(() => Alert.classList.remove("active"), 1000);
}

export default Notification;
