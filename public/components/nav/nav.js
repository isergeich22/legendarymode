exports.nav = nav = (content) => `
    <section class="nav">
        <div class="nav-item"><a href="#about">О ТУРНИРЕ</a></div>
        <div class="nav-item"><a href="#participants">УЧАСТНИКИ</a></div>
        <div class="dropdown nav-item">
            <a class="btn" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                Сезоны
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                ${content}
                <!--<li><a class="dropdown-item" id="seasonNumber" href="#seasons">1 сезон</a></li>
                <li><a class="dropdown-item" id="seasonNumber" href="#seasons">2 сезон</a></li>-->
            </ul>
        </div>
    </section>
`