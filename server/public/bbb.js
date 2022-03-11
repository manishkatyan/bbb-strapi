function validateCode() {
  const name = document.getElementById("name").value;
  const code = document.getElementById("code").value;
  const uid = document.getElementById("classUID").value;
  const validateUrl = "/bigbluebutton/class/auth/join/" + uid;
  const joinUrl = "/bigbluebutton/class/join/" + uid;
  const isMeetingRunning = "/bigbluebutton/class/status/" + uid;
  if (!name) {
    document.getElementById("nameError").style.display = "block";
    return false;
  }
  if (code) {
    fetch(validateUrl, {
      method: "post", // Default is 'get'
      body: JSON.stringify({
        code: code,
      }),
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.isValid) {
          document.getElementById("codeError").style.display = "none";
          document.getElementById("joinbbb").style.display = "none";
          document.getElementById("WaitingButton").style.display = "block";
          function joinBBBMeeting() {
            fetch(isMeetingRunning, {
              method: "get",
              mode: "cors",
              headers: new Headers({
                "Content-Type": "application/json",
              }),
            })
              .then((response) => response.json())
              .then((json) => {
                if (json.running) {
                  fetch(joinUrl, {
                    method: "post",
                    body: JSON.stringify({
                      fullName: name,
                      password: code,
                    }),
                    mode: "cors",
                    headers: new Headers({
                      "Content-Type": "application/json",
                    }),
                  })
                    .then((response) => response.json())
                    .then((json) => {
                      window.location.replace(json.joinURL);
                      stopInterval();
                    });
                } else {
                  document.getElementById("joinbbb").style.display = "none";
                  document.getElementById("meeting").style.display = "block";
                  document.getElementById("WaitingButton").style.display =
                    "block";
                  return false;
                }
              });
          }

          const runningMeeting = setInterval(() => {
            joinBBBMeeting();
          }, 10000);

          function stopInterval() {
            clearInterval(runningMeeting);
          }
        } else {
          document.getElementById("codeError").style.display = "block";
          return false;
        }
      });
  } else {
    document.getElementById("codeError").style.display = "block";
    return false;
  }
}

document.getElementById("joinbbb").addEventListener("click", () => {
  validateCode();
});
document.getElementById("code").addEventListener("click", () => {
  document.getElementById("codeError").style.display = "none";
  document.getElementById("nameError").style.display = "none";
});
document.getElementById("name").addEventListener("click", () => {
  document.getElementById("codeError").style.display = "none";
  document.getElementById("nameError").style.display = "none";
});
