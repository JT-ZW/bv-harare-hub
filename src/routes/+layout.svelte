<script lang="ts">
import '../app.css';
import {page} from '$app/state';
let {children}=$props(); let menuOpen=$state(false);
const links=[['/fellows','Our fellows'],['/noticeboard','Noticeboard'],['/about','About the hub'],['/contact','Get involved']];
</script>
<svelte:head><meta name="theme-color" content="#f5f6f1"/></svelte:head>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
 <a class="brand" href="/" aria-label="beVisioneers Harare Hub home"><img class="global-wordmark" src="/images/bevisioneers-logo.svg" alt="beVisioneers - The Mercedes-Benz Fellowship"/><img class="hub-mark" src="/images/harare-hub-mark.svg" alt="Harare Local Hub"/></a>
 <nav class="desktop-nav" aria-label="Main navigation">{#each links as [href,label]}<a {href} aria-current={page.url.pathname.startsWith(href)?'page':undefined}>{label}</a>{/each}</nav>
 <a class="button header-cta" href="/fellows">Meet the fellows <span>↗</span></a>
 <button class="menu-button" aria-expanded={menuOpen} aria-controls="mobile-menu" onclick={()=>menuOpen=!menuOpen}>{menuOpen?'Close ×':'Menu ☰'}</button>
</header>
{#if menuOpen}<nav id="mobile-menu" class="mobile-nav" aria-label="Mobile navigation">{#each [['/','Home'],...links] as [href,label]}<a {href} onclick={()=>menuOpen=false}>{label}<span>↗</span></a>{/each}</nav>{/if}
<main id="main" tabindex="-1">{@render children()}</main>
<footer><div class="footer-top"><div><p class="eyebrow">LOCAL IDEAS. SHARED POSSIBILITIES.</p><h2>A better future<br/>starts with a connection.</h2><a class="button yellow" href="/contact">Let’s connect <span>↗</span></a></div><div class="footer-nav"><a href="/fellows">Discover our fellows ↗</a><a href="/noticeboard">The hub noticeboard ↗</a><a href="/about">Our chapter ↗</a><a href="https://bevisioneers.world/" target="_blank" rel="noreferrer">Global fellowship ↗</a></div></div><div class="footer-bottom"><div class="footer-brand">beVisioneers <span>HARARE HUB</span></div><p>A local chapter of the beVisioneers community.<br/>Connecting youth-led environmental ideas in Harare.</p><span>© {new Date().getFullYear()} Harare Hub</span></div></footer>
