<script lang="ts">

export let mobile: boolean = false;

</script>

<div class="flex h-screen">

    <div class="w-full">
        <div class="text-white font-bold flex flex-col tracking-widest bg-cai-blue {mobile ? '' : 'pl-48'} p-4 mb-5">
            CAI Los Realejos
        </div>

        <div class='absolute inset-y-0 inset-x-0 top-20 overflow-y-auto'>
            <slot />
        </div>
    </div>
</div>
