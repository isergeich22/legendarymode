exports.auth = auth = `
    <form class="auth" action="/home" method="POST">
        <input type="text" name="userType" value="admin">
        <label for="adminName">Имя пользователя</label>
        <input type="text" name="adminName">
        <label for="adminPass">Пароль</label>
        <input type="text" name="adminPass">
        <input type="submit" value="Войти">
    </form>
`