exports.seasons = seasons = (list, content) =>`
    <section id="seasons" class="seasons">
        <ul class="seasons-header">
            ${list}
        </ul>
        <div id="eventsBlock" class="season-body">
            ${content}
        </div>
    </section>
`