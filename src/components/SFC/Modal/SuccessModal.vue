<script lang="ts" setup>
import BookOpen from "../../Icons/BookOpen.vue"
</script>

<script lang="ts">
   // "Bravo ! La fiche est enregistrée !" failText : "Oops ! Quelque chose s'est mal passé, veuillez réessayer plus tard !",     

export default {
    name : "SuccessModal",
    props : ['successText'],
    components: { BookOpen }
}
</script>
<template>
    <div id="successModal" role="dialog" class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" 
    tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
    <div class="fixed inset-0 bg-secondary bg-opacity-80">
        <div class="modal-dialog">
            <div class="modal-content fixed inset-0 z-12 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div class="p-7 max-h-18 relative transform overflow-hidden rounded-3xl bg-white text-left transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white sm:p-6">
                    <div class="flex flex-col p-6">
                    <div class="mx-auto flex mb-6 mt-6 basis-full items-center justify-left">
                        <span class="w-6 basis-1/10 ">
                        <BookOpen class="w-6 color-primary"></BookOpen>
                        </span>
                        <span class="basis-9/10 pl-5">
                        <h3 
                        class="text-lg  font-medium leading-6 text-gray-900" 
                        id="modal-title-questionmark">
                            <span>{{ successText }}</span>
                        </h3>
                        </span>
                    </div>
                    <div class="mx-auto flex basis-full">
                        <button type="button" data-bs-dismiss="modal" class="basis-1/4 hover:shadow-button text-gray p-2 rounded-3xl border border-solid border-gray-light">
                        Fermer
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    </div>
</template>