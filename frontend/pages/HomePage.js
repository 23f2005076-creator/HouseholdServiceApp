export default {
    template: `
    <div>
        <section class="hero">
            <h1>Trusted help for every corner of your home</h1>
            <p>Book verified professionals for cleaning, plumbing, electrical work, painting and more, all in one place.</p>
            <router-link to="/login" class="btn btn-hero-light">Get started</router-link>
            <router-link to="/register" class="btn btn-hero-ghost">Create an account</router-link>
        </section>

        <section class="feature-grid">
            <div class="feature"><div class="ico">🧹</div><h5>Cleaning</h5><p>Spotless homes and offices.</p></div>
            <div class="feature"><div class="ico">🔧</div><h5>Plumbing</h5><p>Leaks and repairs fixed fast.</p></div>
            <div class="feature"><div class="ico">💡</div><h5>Electrical</h5><p>Safe, reliable wiring and fittings.</p></div>
            <div class="feature"><div class="ico">🎨</div><h5>Painting</h5><p>Fresh colour for every room.</p></div>
            <div class="feature"><div class="ico">✂️</div><h5>Haircut at home</h5><p>Grooming without leaving home.</p></div>
        </section>

        <p class="auth-links">Are you an administrator? <router-link to="/admin/login">Admin login</router-link></p>
    </div>
    `,
}
