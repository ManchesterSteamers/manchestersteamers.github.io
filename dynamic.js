const routes = {
    '/': {
        sectionElementId: 'home',
        pageTitle: "Steamers | Home"
    },
    '/home': {
        sectionElementId: 'home',
        pageTitle: "Steamers | Home"
    },
    '/register': {
        sectionElementId: 'register',
        pageTitle: "Steamers | Registration"
    }
};

function navigate(path) {
    history.pushState({}, '', path);
    updateView();
}

function updateView() {
    const path = window.location.pathname;

    document.querySelectorAll('section').forEach((sec) => sec.classList.remove('active'));

    const sectionConfig = routes[path] ?? {
        sectionElementId: 'error',
        pageTitle: "Steamers | Error 404"
    };

    const section = document.getElementById(sectionConfig.sectionElementId);
    if (section) {
        section.classList.add('active');
    }
}

document.querySelectorAll('a[data-link]').forEach((link) => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        navigate(this.getAttribute('href'));
    });
});

window.addEventListener('popstate', updateView);

updateView();