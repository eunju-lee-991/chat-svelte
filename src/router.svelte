<script>
    import {Route} from 'tinro'

    import Articles from './pages/Articles.svelte'
    import Login from './pages/Login.svelte'
    import Register from './pages/Register.svelte';
    import Main from './pages/Main.svelte';
    import NotFound from './pages/NotFound.svelte';
</script>

<Route path="/" redirect="/articels" />
<Route path="/articles/*"><Articles/></Route>
<Route path="/login"><Login/></Route>
<Route path="/register"><Register/></Route>
<Route path="/main"><Main/></Route>
<Route fallback><NotFound /></Route>
