const recognition = new webkitSpeechRecognition();
recognition.onresult = (event) => {
  const command = event.results[0][0].transcript.toLowerCase();
  if (command.includes("amazon")) window.open("https://www.amazon.in", "_blank");
};
recognition.start();
