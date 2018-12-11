export default function ({ store, redirect }) {
     if (!store.state.isLogin) {
      return store.$router.redirect('/login.html')
     }
}