exports.eventBlock = eventBlock = (content, style) =>`
    <section class="event" id="eventBlock">
        <div class="event-body" id="eventBody" ${style}>
            ${content}
        </div>
    </section>
`