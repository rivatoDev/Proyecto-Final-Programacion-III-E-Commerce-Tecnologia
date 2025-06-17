const headerContainer = document.querySelector('.header-container');
const unloggedNav = `<!-- header sin logear -->
            <div class="fixed-top container-fluid nav-container unlogged-nav p-0 d-flex justify-content-center align-items-center">
                <div class="position-absolute login-nav start-0 ms-4">
                    <a href="login.html" id="btn-unlogged" class="btn-style-1 d-flex align-items-center justify-content-center border-0 rounded-pill" type="button">
                        <i class="fa-solid fa-user"></i>
                        <span class="text-button">Iniciar Sesión</span>
                    </a>
                </div>
                <a href="/" id="logo-container" >
                    <h1 id="title">FOR GAMERS</h1>
                    <i class="fa-duotone fa-solid fa-gamepad" id="logo"></i>
                </a>
            </div>`;

const loggedNav = `<!-- header logeado -->
            <div class="fixed-top container-fluid nav-container logged-nav p-0 d-flex justify-content-center align-items-center">
                <div class="profile-offcanvas position-absolute start-0 ms-4">
                    
                </div>
                <a href="/" id="logo-container" >
                    <h1 id="title">FOR GAMERS</h1>
                    <i class="fa-duotone fa-solid fa-gamepad" id="logo"></i>
                </a>
            </div>`;
//Agregarle menu segun el rol

//Opciones de roles
getCurrentUser();

async function getCurrentUser() {
    const response = await fetch('/user', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (!response.ok) {
            renderMenu(null);
            return;
        }

    const user = await response.json();
    renderMenu(user);
}

// MENUS DISTINTOS POR ROL
function renderMenu(user) {
    if(user == null){
        headerContainer.innerHTML = unloggedNav;
    }else if (user.role === 'CLIENT') {
        clientMenu(user.name, user.lastname);
    } else if (user.role === 'ADMIN') {
        adminMenu(user.name, user.lastname);
    } else if (user.role === 'MANAGER') {
        managerMenu(user.name, user.lastname);
    }
};

function clientMenu(name, lastname){
    headerContainer.innerHTML = loggedNav;
    const offcanvas = document.querySelector('.profile-offcanvas');
    //Carrito
    const cart = document.createElement('div');
    cart.classList.add('cart', 'position-absolute', 'end-0', 'me-4');
    cart.innerHTML = `<button class="btn-cart btn-style-1 d-flex align-items-center justify-content-center p-0 border-0 rounded-pill" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                        <i class="fa-solid fa-cart-shopping ps-2 nav-cart"></i>
                        <span class="text-button">CARRITO</span>
                    </button>
                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCart" aria-labelledby="offcanvasCartLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            CARRITO
                        </div>
                    </div>`;
    document.querySelector('.logged-nav').appendChild(cart);
    //Menu
    offcanvas.innerHTML = `<button class="btn-offcanvas-logged btn-style-1 d-flex align-items-center justify-content-center p-0 border-0 rounded-pill" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasProfileClient" aria-controls="offcanvasProfileClient">
                                <div>
                                    <i class="fa-solid fa-user"></i>
                                </div>
                            </button>
                            <!-- offcanvas -->
                            <div class="offcanvas offcanvas-start offcanvas-profile" tabindex="-1" id="offcanvasProfileClient" aria-labelledby="offcanvasProfileClientLabel">
                                <div class="offcanvas-header justify-content-center logged">
                                    <h2 class="text-center m-0">${name} ${lastname}</h2>
                                    <button type="button" class="btn-offcanvas-close" data-bs-dismiss="offcanvas" aria-label="Close">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div class="offcanvas-body d-flex flex-column justify-content-between">
                                    <ul class="offcanvas-menu">
                                        <li class="offcanvas-item btn-style-1 d-flex align-items-center">
                                            <a href="profile.html" class="offcanvas-profile-item btn-style-1 d-flex justify-content-center align-items-center" type="button">
                                                <i class="fa-solid fa-user me-2"></i>
                                                <span class="me-2">Ver perfil</span>
                                            </a>
                                        </li>
                                        <li class="offcanvas-item btn-style-1 d-flex align-items-center">
                                            <a href="payment.html" class="text-center">Metodos de pago</a>
                                        </li>
                                    </ul>
                                    <a href="/logout" class="offcanvas-logout text-center btn-style-1" type="button">
                                        <span>Cerrar sesión</span>
                                    </a>
                                </div>
                            </div>`;
}

function adminMenu(name, lastname){
    headerContainer.innerHTML = loggedNav;
    const offcanvas = document.querySelector('.profile-offcanvas');
    offcanvas.innerHTML = `<button class="btn-offcanvas-logged btn-style-1 d-flex align-items-center justify-content-center p-0 border-0 rounded-pill" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasProfileAdmin" aria-controls="offcanvasProfileAdmin">
                                <div>
                                    <i class="fa-solid fa-user"></i>
                                </div>
                            </button>
                            <!-- offcanvas -->
                            <div class="offcanvas offcanvas-start offcanvas-profile" tabindex="-1" id="offcanvasProfileAdmin" aria-labelledby="offcanvasProfileAdminLabel">
                                <div class="offcanvas-header justify-content-center logged">
                                    <h2 class="text-center m-0">${name} ${lastname}</h2>
                                    <button type="button" class="btn-offcanvas-close" data-bs-dismiss="offcanvas" aria-label="Close">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div class="offcanvas-body d-flex flex-column justify-content-between">
                                    <ul class="offcanvas-menu text-center">
                                        <li class="offcanvas-item btn-style-1 d-flex align-items-center">
                                            <a href="profile.html" class="offcanvas-profile-item btn-style-1 d-flex justify-content-center align-items-center" type="button">
                                                <i class="fa-solid fa-user me-2"></i>
                                                <span class="me-2">Ver perfil</span>
                                            </a>
                                        </li>
                                        <h2 class="mb-2">GESTIONAR</h2>
                                        <li class="offcanvas-item btn-style-1 d-flex align-items-center">
                                            <a href="products.html" class="text-center">Productos</a>
                                        </li>
                                        <li class="offcanvas-item btn-style-1 d-flex align-items-center">
                                            <a href="clients.html" class="text-center">Clientes</a>
                                        </li>
                                        <li class="offcanvas-item btn-style-1 d-flex align-items-center">
                                            <a href="managers.html" class="text-center">Gestores</a>
                                        </li>
                                        <li class="offcanvas-item btn-style-1 d-flex align-items-center">
                                            <a href="admins.html" class="text-center">Admins</a>
                                        </li>
                                        <h2 class="mb-2">DOCUMENTACIÓN</h2>
                                        <li class="offcanvas-item btn-style-1 d-flex align-items-center">
                                            <a href="/docs" class="text-center">Swagger UI</a>
                                        </li>
                                    </ul>
                                    <a href="/logout" class="offcanvas-logout text-center btn-style-1" type="button">
                                        <span>Cerrar sesión</span>
                                    </a>
                                </div>
                            </div>`;
}

function managerMenu(name, lastname){
    headerContainer.innerHTML = loggedNav;
    const offcanvas = document.querySelector('.profile-offcanvas');
    offcanvas.innerHTML = `<button class="btn-offcanvas-logged btn-style-1 d-flex align-items-center justify-content-center p-0 border-0 rounded-pill" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasProfileManager" aria-controls="offcanvasProfileManager">
                                <div>
                                    <i class="fa-solid fa-user"></i>
                                </div>
                            </button>
                            <!-- offcanvas -->
                            <div class="offcanvas offcanvas-start offcanvas-profile" tabindex="-1" id="offcanvasProfileManager" aria-labelledby="offcanvasProfileManagerLabel">
                                <div class="offcanvas-header justify-content-center logged">
                                    <h2 class="text-center m-0">${name} ${lastname}</h2>
                                    <button type="button" class="btn-offcanvas-close" data-bs-dismiss="offcanvas" aria-label="Close">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div class="offcanvas-body d-flex flex-column justify-content-between">
                                    <ul class="offcanvas-menu text-center">
                                        <li class="offcanvas-item btn-style-1 d-flex align-items-center">
                                            <a href="profile.html" class="offcanvas-profile-item btn-style-1 d-flex justify-content-center align-items-center" type="button">
                                                <i class="fa-solid fa-user me-2"></i>
                                                <span class="me-2">Ver perfil</span>
                                            </a>
                                        </li>
                                        <h2 class="mb-2">GESTIONAR</h2>
                                        <li class="offcanvas-item btn-style-1 d-flex align-items-center">
                                            <a href="products.html" class="text-center">Productos</a>
                                        </li>
                                        <li class="offcanvas-item btn-style-1 d-flex align-items-center">
                                            <a href="clients.html" class="text-center">Clientes</a>
                                        </li>
                                    </ul>
                                    <a href="/logout" class="offcanvas-logout text-center btn-style-1" type="button">
                                        <span>Cerrar sesión</span>
                                    </a>
                                </div>
                            </div>`;
}