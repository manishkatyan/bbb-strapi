function validateCode() {
    const name = document.getElementById("name").value
    const code = btoa(document.getElementById('code').value)
    const uid = document.getElementById('classUID').value
    const validateUrl = "/bigbluebutton/class/auth/join/" + uid
    const joinUrl = "/bigbluebutton/class/join/" + uid
    if (!name) {
        document.getElementById("nameError").style.display = "block";
        return false
    }
    if (code) {
        fetch(validateUrl, {
            method: 'post', // Default is 'get'
            body: JSON.stringify({
                code: atob(code)
            }),
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then(json => {
                if (json.isValid) {
                    console.log("Join")
                    fetch(joinUrl, {
                        method: 'post',
                        body: JSON.stringify({
                            fullName: name,
                            password: code
                        }),
                        mode: 'cors',
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    })
                        .then(response => response.json())
                        .then(json => { console.log(json); window.location.replace(json.joinURL) })
                }
                else {
                    document.getElementById("codeError").style.display = "block";
                    return false
                }
            })
    } else {
        document.getElementById("codeError").style.display = "block";
        return false
    }
}

document.getElementById('joinbbb').addEventListener('click', () => { validateCode() })
document.getElementById('code').addEventListener('click', () => {
    document.getElementById("codeError").style.display = "none";
    document.getElementById("nameError").style.display = "none"
})
document.getElementById('name').addEventListener('click', () => {
    document.getElementById("codeError").style.display = "none";
    document.getElementById("nameError").style.display = "none"
})