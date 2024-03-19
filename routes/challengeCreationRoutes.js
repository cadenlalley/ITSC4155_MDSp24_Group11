function handleRoute(route) {
    var content = document.getElementById('content');

    switch (route) {
        case '/':
            content.innerHTML = '<h3>Welcome to the Home Page</h3>';
            break;
        case '/about':
            content.innerHTML = '<h3>About Us</h3><p>This is the about page content.</p>';
            break;
        case '/contact':
            content.innerHTML = '<h3>Contact Us</h3><p>Reach out to us using the contact form below.</p>';
            break;
        default:
            content.innerHTML = '<h3>Page Not Found</h3><p>The requested page could not be found.</p>';
    }
}

function navigate() {
    var path = window.location.hash;
    var route = path.split('#')[1] || '/';
    handleRoute(route);
}

window.addEventListener('load', navigate);
window.addEventListener('hashchange', navigate);
