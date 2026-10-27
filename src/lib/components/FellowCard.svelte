<script lang="ts">
import {getZone, initials, type Fellow} from '$lib/data/fellows';
let {fellow, index=0}: {fellow:Fellow; index?:number} = $props();
</script>
<a class="fellow-card" href={'/fellows/'+fellow.slug}>
 <div class={'fellow-art '+getZone(fellow.zones[0]).color} aria-hidden="true"><span class="art-symbol">{getZone(fellow.zones[0]).symbol}</span><span class="initials">{initials(fellow.name)}</span><span class="fellow-number">HARARE / {String(index+1).padStart(2,'0')}</span><span class="circle-link">↗</span></div>
 <div class="card-meta"><span>FELLOW</span><span>COHORT {fellow.cohort}</span></div><h3>{fellow.name}</h3><p>{fellow.zones.map(id=>getZone(id).short).join(' · ')}</p>
</a>