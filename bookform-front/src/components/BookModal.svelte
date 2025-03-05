<script lang="ts">
    import Fa from "svelte-fa";
    import { faXmark } from '@fortawesome/free-solid-svg-icons';
    import { updateBook } from "../services/BookService";
    import type { BookModel } from "../classes/BookModel";
    import { createEventDispatcher } from 'svelte';


    export let book: BookModel;
    export let showModal: boolean;
    const dispatch = createEventDispatcher();

    async function updateBookModal(book: BookModel) {
        try {
            await updateBook(book);
            dispatch('save', book); 
            showModal = false;
        } catch (error) {
            console.error("Error updating book:", error);
        }
    }

    function cancel() {
        dispatch('cancel');
    }
</script>

<dialog open={showModal} on:close={cancel} class="modal modal-dialog modal-dialog-centered modal-dialog-scrollable border-2 border-[#F96167] p-7 m-9">
    {#if book != null}
        <div class="p-4">
            <div class="flex justify-between items-center mb-4">
                <p class="text-lg font-bold">Datos del libro</p>
                <button on:click={cancel} class="text-gray-500 hover:text-gray-900 transition duration-300">
                    <Fa icon={faXmark} />
                </button>
            </div>
            <form class="mt-5">
                <div class="flex flex-col gap-2 mb-3">
                    <label for="title" class="font-bold text-gray-700">Título</label>
                    <input type="text" placeholder="Título" bind:value={book.title} class="input-field w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" />
                </div>
                <div class="flex flex-col gap-2 mb-3">
                    <label for="author" class="font-bold text-gray-700">Autor</label>
                    <input type="text" placeholder="Autor" bind:value={book.author} class="input-field w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" />
                </div>
                <div class="flex justify-between gap-2">
                    <div class="flex items-center">
                        <input type="checkbox" checked={book.available} name="available" id="availableBook" on:change={() => book.available = !book.available} class="mr-2" />
                        <label for="availableBook" class="font-bold text-gray-700">Disponible</label>
                    </div>
                    <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => updateBookModal(book)}>Guardar</button>
                </div>
            </form>
        </div>
    {/if}
</dialog>
