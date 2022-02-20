function validateCode() {
    const name = document.getElementById("name").value
    const mcode = document.getElementById('modCode').value
    const acode = (document.getElementById('attCode').value)
    const code = btoa(document.getElementById('code').value)
    const uid = document.getElementById('classUID').value
    const url = "/bigbluebutton/class/join/" + uid
    if (!name) {
        document.getElementById("nameError").style.display = "block";
        return false
    }
    if (code && [mcode, acode].includes(code)) {
        fetch(url, {
            method: 'post', // Default is 'get'
            body: JSON.stringify({
                fullName: name,
                password: atob(code)
            }),
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then(json => window.location.replace(json.joinURL))
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