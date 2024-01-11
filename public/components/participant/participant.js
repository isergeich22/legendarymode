exports.participant = participant = (content) =>`
    <section id="participants" class="participant">
        <div class="part-header">
            <h1 class="part-header__text">Участники</h1>
        </div>
        <div class="part-list">            
            ${content}
        </div>
    </section>
`