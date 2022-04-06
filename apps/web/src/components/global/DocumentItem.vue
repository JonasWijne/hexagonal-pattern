<template>
    <div class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
        <div class="w-full flex items-center justify-between p-6 space-x-6">
            <span class="rounded-lg inline-flex p-3 ring-4 ring-white text-purple-700 bg-purple-50">
                <DocumentIcon class="h-6 w-6" aria-hidden="true" />
            </span>
            <div class="flex-1 truncate">
                <div class="flex items-center space-x-3">
                    <h3 class="text-gray-900 text-base font-medium truncate">{{ documentDetails.name }}</h3>
                </div>
                <p class="mt-1 text-gray-500 text-sm truncate">
                    {{ documentDetails.type }} - {{ documentDetails.size }}
                </p>
            </div>
        </div>
        <div>
            <div class="-mt-px flex divide-x divide-gray-200">
                <div class="w-0 flex-1 flex">
                    <a
                        href="#"
                        class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                    >
                        <DownloadIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </a>
                </div>
                <div class="-ml-px w-0 flex-1 flex">
                    <a
                        href="#"
                        class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                    >
                        <PencilIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </a>
                </div>
                <div class="-ml-px w-0 flex-1 flex">
                    <a
                        href="#"
                        class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                    >
                        <TrashIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { DownloadIcon, PencilIcon, TrashIcon } from '@heroicons/vue/solid';
    import { DocumentIcon } from '@heroicons/vue/outline';

    interface IProps {
        documentDetails: any;
    }

    const { documentDetails } = defineProps<IProps>();
</script>

<style scoped></style>
