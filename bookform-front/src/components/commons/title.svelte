<script lang='ts'>
    import { isMobile } from "../../services/Services";


</script>


<h1 class="mb-2 {$isMobile ? 'text-xl' : 'text-3xl'}">
    <slot/>
</h1>