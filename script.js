const container = document.querySelector(".content");

const SpeechRecognition = window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  const micButton = container.querySelector("button");
  const micIcon = micButton.firstElementChild;
  micButton.addEventListener("click", (e) => {
    // console.log(e);
    console.log("click");
    e.preventDefault();
    if (micIcon.classList.contains("fa-microphone")) {
      recognition.start();
    } else {
      recognition.stop();
    }
  });

  recognition.addEventListener("start", (e) => {
    console.log("Start Speech Recognition");
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-slash");
  });

  recognition.addEventListener("end", (e) => {
    console.log("Stop Speech Recognition");
    micIcon.classList.add("fa-microphone");
    micIcon.classList.remove("fa-microphone-slash");
  });

  recognition.addEventListener("result", (e) => {
    // console.log(e);
    const textContainer = container.querySelector(".text-container");

    const detectedText = e.results[e.resultIndex][0].transcript;
    const instruction = detectedText.toLowerCase().trim();
    console.log(instruction);

    if (instruction === "stop recording") {
      recognition.stop();
    } else if (instruction === "reset input") {
      textContainer.textContent = "";
    } else {
      const prevContent = textContainer.textContent;
      textContainer.textContent = prevContent + " " + instruction;
    }
  });
} else {
  const button = container.querySelector("button");
  button.remove();
  console.log("Speech Recognition Not Supported");
}

/**
 *
 * CLick on Mic Button -> recognition.start() -> Auto Fire 'start' event
 * -> starts recording your speech, until you stop ->
 * Once recording finishes -> Browser generates the results -> Auto Fire 'result' event -> Auto Fire 'end' event
 */
