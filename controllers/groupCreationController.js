document.getElementById("groupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var groupName = document.getElementById("groupName").value;
    var groupIcon = document.getElementById("groupIcon").files[0];

    console.log("Group Name:", groupName);
    console.log("Group Icon File:", groupIcon);

    document.getElementById("groupName").value = "";
    document.getElementById("groupIcon").value = "";
});
