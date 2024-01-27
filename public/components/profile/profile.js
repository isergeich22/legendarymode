exports.profile = profile = (profileName, profileInfo, currentSeasonResult, seasonsHistory, eventHistory) => `
    <section class="profile">
        <div class="profile-header">
            <h1 class="profile-header__text">${profileName}</h1>
        </div>
        <div class="profile-info">
            ${profileInfo}
        </div>
    </section>
`