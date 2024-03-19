document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('challengeForm').addEventListener('submit', function (event) {
        event.preventDefault();


        var challengeName = document.getElementById('challengeName').value;
        var challengeDescription = document.getElementById('challengeDescription').value;
        var completionDate = document.getElementById('completionDate').value;


        console.log('Challenge Name:', challengeName);
        console.log('Challenge Description:', challengeDescription);
        console.log('Completion Date:', completionDate);


        document.getElementById('challengeName').value = '';
        document.getElementById('challengeDescription').value = '';
        document.getElementById('completionDate').value = '';
    });
});
