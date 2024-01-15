exports.auth = auth = `
    <form class="auth" id="authForm" action="/login?userType=viewer" method="POST">
        <div class="user-type-choice" id="userTypeChoice">
            <input type="submit" value="Зритель">
            <input class="admin-type" type="text" id="adminType" value="Админ / Ведущий">
        </div>
        <div class="auth-block" id="authBlock">
        </div>
    </form>
`