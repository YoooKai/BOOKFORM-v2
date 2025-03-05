<script>

    import { isMobile } from "../../services/Services";

</script>
<div class="bg-white {!$isMobile ? 'p-4 rounded-md' : ''} mt-5 mb-5">
  <slot/>
</div>