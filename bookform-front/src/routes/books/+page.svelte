<script lang="ts">
    import { BookModel } from "../../classes/BookModel";
    import { getBooks, deleteBook, updateBook } from "../../services/BookService";
    import { onMount } from "svelte";
    import BookModal from "../../components/BookModal.svelte";
    import Fa from "svelte-fa";
    import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';


    onMount(async () => {
        downBooks();
    });

    let showModal = false;
    let books: BookModel[] = [];
    let editBook: any = null;
    let searching = true;
    let filters = {
        author: '' 
    };

    function newBook() {
        editBook = {
            id: '',
            title: '',
            author: '',
            available: true
        };
        showModal = true;
    }

   

    async function downBooks() {
        books = await getBooks(filters.author);
        searching = false;
        books = books.sort((a, b) => a.title.localeCompare(b.title));
    } 

    async function deleteBooks(bookDelete: BookModel) {
        if (!confirm('¿Estás seguro de eliminar el libro?')) {
            return;
        }
        try {
            await deleteBook(bookDelete);
            const index = books.findIndex((book) => book.id === bookDelete.id);
            if (index !== -1) {
                books.splice(index, 1);
            }
            books = books.sort((a, b) => a.title.localeCompare(b.title));
            alert('Libro eliminado correctamente.');
        } catch (error) {
            alert('Error al eliminar el libro.');
        }
        searching = false;
    }

    function searchBooks() {
        downBooks();
    }

    function updateBookList(event: any) {
        const bookEdit = event.detail;
        const index = books.findIndex((book) => book.id === bookEdit.id);
        if (index !== -1) {
            books[index] = bookEdit;
        } else {
            books.push(bookEdit);
        }
        alert('Libro guardado correctamente.');
        books = books.sort((a, b) => a.title.localeCompare(b.title));
    }
</script>

<svelte:head>
    <title>Libros</title>
    <meta property="og:title" content="Gestión de Libros" />
</svelte:head>

<!-- contenido principal -->
<header>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full p-6 shadow-md bg-[#F96167]">
        <div class="w-full sm:w-auto">
            <h1 class="text-3xl font-semibold text-white">Listado de Libros</h1>
        </div>
        <div class="flex flex-col sm:flex-row sm:gap-4 mt-4 sm:mt-0">
            <input
                type="text"
                bind:value={filters.author}
                placeholder="Filtrar por autor"
                on:input={searchBooks}
                class="p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <button
                on:click={newBook}
                class="bg-[#F9E795] text-grey-600 py-2 px-4 rounded-lg mt-3 sm:mt-0 hover:bg-orange-400 transition duration-300"
            >
                Nuevo libro
            </button>
        </div>
    </div>

    <div class="mt-6 px-6">
        {#if !searching}
            {#if books.length > 0}
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                    {#each books as book (book.id)}
                        <div class="max-w-sm p-6 bg-amber-100 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                            <a href="#" class="block">
                                <h5 class="mb-3 text-2xl font-bold text-gray-900 truncate">{book.title}</h5>
                            </a>
                            <p class="mb-4 text-gray-700">
                                {book.author} - 
                                {#if book.available}
                                    <span class="text-[#61b0f9]">Disponible</span>
                                {:else}
                                    <span class="text-[#F96167]">No disponible</span>
                                {/if}
                            </p>
                            <div class="flex justify-start gap-2">
                                <button
                                    on:click={() => { editBook = book; showModal = true; }}
                                    class="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded transition duration-300"
                                >
                                <Fa icon={faPencil} />
                                </button>
                                <button
                                    on:click={() => deleteBooks(book)}
                                    class="bg-orange-300 hover:bg-orange-400 text-white py-1 px-3 rounded transition duration-300"
                                >
                                <Fa icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
            {:else}
                <p class="text-center text-gray-500">No hay libros registrados.</p>
            {/if}
        {/if}
    </div>
</header>


{#if showModal}
    <BookModal
        book={editBook}
        showModal={showModal}
        on:save={updateBookList}
    />
{/if}

<style>

    button {
        cursor: pointer;
        border: none;
        margin-right: 10px;
    }

    input {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
    }
</style>
