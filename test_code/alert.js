alert("Welcome to my pluggin")

function getConnectWithUser() {
    let name = document.getElementById("name");
    if (!name) {
        alert("good bye!")
    }else {
        alert("hello ", name)
    }
}
getConnectWithUser()