let errorDivs = document.getElementsByClassName('error-div');
let errorCloseButtons = document.getElementsByClassName('error-close');

if (errorDivs.length > 0) {
    for (i = 0; i < errorDivs.length; i++) {
        let errorCloseButton = errorCloseButtons[i];
        let errorDiv = errorDivs[i];
        errorCloseButton.addEventListener('click', function() {
            errorDiv.style.display = 'none';
        });
    }
}

let successDivs = document.getElementsByClassName('success-div');
let successCloseButtons = document.getElementsByClassName('success-close');

if (successDivs.length > 0) {
    for (i = 0; i < successDivs.length; i++) {
        let successCloseButton = successCloseButtons[i];
        let successDiv = successDivs[i];
        successCloseButton.addEventListener('click', function() {
            successDiv.style.display = 'none';
        });
    }
}
