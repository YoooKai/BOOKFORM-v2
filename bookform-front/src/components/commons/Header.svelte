<script lang="ts">
    import { onMount } from "svelte";
    import { actualUser } from "../../services/UserSevice";
    import Fa from "svelte-fa";
    import {
    faBars,
    faBolt,
    faCaretDown,
        faCaretUp,
        faEnvelope,
        faGear,
        faGlobe,
        faGripLines,
        faHouse,
        faListAlt,
        faRightFromBracket,
        faUser,
        faUsers,
    } from "@fortawesome/free-solid-svg-icons";
    import UserModal from "../UserModal.svelte";
    import { page } from "$app/stores";
    import type { UserModel } from "../../classes/UserModel";
    import type { Rol } from "../../interfaces/Rol";
    import { faWpforms } from "@fortawesome/free-brands-svg-icons";
    import { isMobile } from "../../services/Services";

    let user: UserModel;
    let rol: Rol;
    let accessToken: string | null;

    let shortMenu: boolean = false;
    let showText: boolean = false;
    let showModal: boolean = false;
    let showParameters: boolean = false;

    const arrayLink = [
        "/areas",
        "/indicators",
        "/initiatives",
        "/lines",
    ];

    $: if (!$isMobile && !shortMenu) shortMenu = true;

    onMount(() => {
        user = actualUser();

        if (user) {
            rol = user.rol;
        }

        shortMenu = localStorage.getItem("shortMenu") === "true";
        showText = localStorage.getItem("showText") === "true";
    });

    async function dropDownParameters() {
        if (showParameters && $page.route.id && arrayLink.includes($page.route.id)) {
            return; 
        }

        showParameters = !showParameters
    }

    async function logout() {
        if (!confirm("¿Está seguro que quiere cerrar la sesión?")) {
            return;
        }

        localStorage.removeItem("user");
        localStorage.setItem("userLogged", "false");
        location.reload();
    }
</script>

<div class="flex h-screen">
    <div class=" text-white  flex flex-col  text-center ">
        {#if shortMenu}
            <div class="flex flex-col 
            {!$isMobile && !showText ? 'w-20' : ''} 
            {$isMobile && !showText ? 'w-20' : ''} 
            {!$isMobile && showText ? 'w-60' : ''} 
            
            ">
                <div class="h-20 text-white font-bold flex items-center justify-center tracking-widest bg-cai-blue p-4 pr-0">
                    CAI 
                    {#if !$isMobile && showText}
                        Los Realejos
                    {/if}
                </div>
            </div>

  
            <div class="h-full 
                {!$isMobile && !showText ? 'w-20' : ''} 
                {$isMobile && !showText ? 'w-20' : ''} 
                {!$isMobile && showText ? 'w-60' : ''} 
                flex flex-col items-start justify-start bg-cai-blue"
                >

                <a href="/dashboard" class="flex {$isMobile || !showText ? 'justify-center' : ''} gap-3 p-4  hover:bg-hover-select min-w-full min-h-14 {$page.route.id == '/dashboard' ? 'bg-selected border-white border-l-4' : '' }">
                    <p class="text-xl mx-2 text-white"><Fa icon={faHouse} /></p>
                    <span class="text-white font-ligth flex flex-col tracking-wide {$isMobile || !showText ? 'hidden' : ''}">
                        Inicio
                    </span>
                </a>

                <a href="/performances_cai" class="flex {$isMobile || !showText ? 'justify-center' : ''} gap-3 p-4 hover:bg-hover-select min-w-full min-h-14 {$page.route.id == '/performances_cai' || $page.route.id == '/performances_cai/form' ? 'bg-selected border-white border-l-4' : '' }">
                    <p class="text-xl mx-2 text-white"><Fa icon={faWpforms} /></p>
                    <span class="text-white font-ligth flex flex-col tracking-wide {$isMobile || !showText ? 'hidden' : ''}">
                        Actuaciones CAI
                    </span>
                </a>

                {#if rol && rol.level == 10}
            
                    <a href="/performances" class="flex gap-3 p-4 {$isMobile || !showText ? 'justify-center' : ''} hover:bg-hover-select min-w-full min-h-14 {$page.route.id == '/performances' || $page.route.id == '/performances/form' ? 'bg-selected border-white border-l-4' : '' }">
                        <p class="text-xl mx-2 text-white"><Fa icon={faWpforms} /></p>
                        <span class="text-white font-ligth flex flex-col tracking-wide {$isMobile || !showText ? 'hidden' : ''}">
                            Actuaciones
                        </span>
                    </a>

                    <button on:click={() => dropDownParameters()} class="flex gap-3 p-4 {$isMobile || !showText ? 'justify-center' : ''} hover:bg-hover-select min-w-full min-h-14 {showParameters ? 'border-b-4' : ''} {$page.route.id && arrayLink.includes($page.route.id) ? 'bg-selected border-white border-l-4' : '' }" type="button">
                        <p class="text-xl mx-2 text-white"><Fa icon={faListAlt} /></p>
                        <span class="text-white font-ligth flex flex-col tracking-wide {$isMobile || !showText ? 'hidden' : ''}">
                            Parámetros
                        </span>
                        {#if !$isMobile && showText}
                            <Fa icon={showParameters ? faCaretUp : faCaretDown} />
                        {/if}
                    </button>
                    
                    {#if showParameters || ($page.route.id && arrayLink.includes($page.route.id))}
                        <div class="pl-2 min-w-full min-h-14">
                            <div class="border-b-4 border-white border-l-4 min-w-full min-h-14">
                                <a href="/areas" class="flex gap-3 p-2 {$isMobile || !showText ? 'justify-center' : ''} hover:bg-hover-select min-w-full min-h-14 {$page.route.id == '/areas' ? 'bg-selected ' : 'pl-2' }">
                                    <p class="text-xl mx-2 text-white"><Fa icon={faGlobe} /></p>
                                    <span class="text-white font-ligth flex flex-col tracking-wide {$isMobile || !showText ? 'hidden' : ''}">
                                        Areas
                                    </span>
                                </a>
                                <a href="/indicators" class="flex gap-3 p-2 {$isMobile || !showText ? 'justify-center' : ''} hover:bg-hover-select min-w-20 {$page.route.id == '/indicators' ? 'bg-selected' : 'pl-2' }">
                                    <p class="text-xl mx-2 text-white"><Fa icon={faBolt} /></p>
                                    <span class="text-white font-ligth flex flex-col tracking-wide {$isMobile || !showText ? 'hidden' : ''}">
                                        Indicadores
                                    </span>
                                </a>
                                <a href="/initiatives" class="flex gap-3 p-2 {$isMobile || !showText ? 'justify-center' : ''} hover:bg-hover-select min-w-full min-h-14 {$page.route.id == '/initiatives' ? 'bg-selected' : 'pl-2' }">
                                    <p class="text-xl mx-2 text-white"><Fa icon={faBolt} /></p>
                                    <span class="text-white font-ligth flex flex-col tracking-wide {$isMobile || !showText ? 'hidden' : ''}">
                                        Iniciativas
                                    </span>
                                </a>
                                <a href="/lines" class="flex gap-3 p-2 {$isMobile || !showText ? 'justify-center' : ''} hover:bg-hover-select min-w-full min-h-14 {$page.route.id == '/lines' ? 'bg-selected' : '' }">
                                    <p class="text-xl mx-2 text-white"><Fa icon={faGripLines} /></p>
                                    <span class="text-white font-ligth flex flex-col tracking-wide {$isMobile || !showText ? 'hidden' : ''}">
                                        Lineas
                                    </span>
                                </a>
                            </div>
                        </div>
                    {/if}
                {/if}
            </div>
            <div class="flex flex-col bg-cai-blue
                {!$isMobile && !showText ? 'w-20' : ''} 
                {$isMobile && !shortMenu ? 'w-0' : ''} 
                {!$isMobile && showText ? 'w-60' : ''} 
                {$isMobile && shortMenu ? 'w-20' : ''}
                ">
                <a href="/users" class="flex gap-3 p-4 {$isMobile || !showText ? 'justify-center' : ''} hover:bg-hover-select min-w-full min-h-14 {$page.route.id == '/users' ? 'bg-selected border-white border-l-4' : '' }">
                    <p class="text-xl mx-2 text-white"><Fa icon={faUsers} /></p>
                    <span class="text-white font-ligth tracking-wide {$isMobile || !showText ? 'hidden' : ''}">Usuarios</span
                    >
                </a>
            
                {#if rol && rol.level == 10}
                    <a href="/settings" class="flex gap-3 p-4 {$isMobile || !showText ? 'justify-center' : ''} hover:bg-hover-select mb-5 min-w-full min-h-14 {$page.route.id == '/settings' ? 'bg-selected border-white border-l-4' : '' }">
                        <p class="text-xl mx-2 text-white"><Fa icon={faGear} /></p>
                        <span class="text-white font-ligth tracking-wide {$isMobile || !showText ? 'hidden' : ''}">Configuración</span>
                    </a>
                {/if}

            </div>

        {/if}
    </div>

    <div class="w-full">

        <div class="drop-shadow-xl">
            <div class="h-20 flex flex-row p-3 justify-between items-center bg-white shadow-md">
                <div class="flex flex-row">
                    {#if !shortMenu && $isMobile}
                        <div class="flex flex-col {$isMobile ? 'w-15' : 'w-60'}">
                            <div class="h-20 bg-white font-bold flex items-center justify-center tracking-widest text-cai-blue pr-7 p-4">
                                CAI 
                                {#if !$isMobile}
                                    Los Realejos
                                {/if}
                            </div>
                        </div>
                        
                    {/if}
                    <!-- {#if $isMobile} -->
                        <button class="text-cai-blue" on:click={() => {
                            if ($isMobile) {
                                shortMenu = !shortMenu;
                                localStorage.setItem("shortMenu", shortMenu.toString());  
                            }else{
                                shortMenu = true
                                showText = !showText;
                                localStorage.setItem("showText", showText.toString());
                                localStorage.setItem("shortMenu", shortMenu.toString());  
                            }
                        }}>
                            <Fa icon={faBars} />
                        </button>
                    <!-- {/if} -->
                </div>
                <div class="flex flex-row gap-3">
                    <span class="font-bold me-4">
                        {#if user?.name != null}
                            {#if !$isMobile}
                                Bienvenido/a,
                            {/if}
                            <button
                                on:click={() => {
                                    showModal = true;
                                    accessToken = localStorage.getItem('accessToken');
                                }}
                                class="text-cai-blue">{user?.name}</button
                            >
                        {/if}
                    </span>
                    <button on:click={logout}>
                        <Fa icon={faRightFromBracket} />
                    </button>
                </div>

            </div>
        </div>

        <div class='absolute inset-y-0 inset-x-0 top-20 overflow-y-auto
            {!$isMobile && !showText ? 'left-20' : ''} 
            {$isMobile && !shortMenu ? 'left-0' : ''} 
            {!$isMobile && showText ? 'left-60' : ''} 
            {$isMobile && shortMenu ? 'left-20' : ''}
            '>
            <slot />
        </div>
    </div>
</div>

<UserModal bind:showModal {user} />
