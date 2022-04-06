<template>
    <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    v-for="header in tableHeaders"
                                    :key="header.name"
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {{ header.name }}
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="data in tableData" :key="data.id" class="relative">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <span
                                            class="rounded-lg inline-flex p-3 ring-4 ring-white text-purple-700 bg-purple-50"
                                        >
                                            <component :is="data.icon" class="h-6 w-6" aria-hidden="true" />
                                        </span>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">
                                                {{ data.title }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ data.lastModified }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span
                                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                        :class="{
                                            'bg-red-100 text-red-800': !data.status,
                                            'bg-green-100 text-green-800': data.status,
                                        }"
                                    >
                                        {{ data.status ? 'Voltooid' : 'Onvoltooid' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a :href="data.href" class="text-indigo-600 hover:text-indigo-900">
                                        <span class="absolute inset-0" aria-hidden="true" />
                                        <ChevronRightIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ChevronRightIcon } from '@heroicons/vue/solid';

    interface IProps {
        tableHeaders: any[];
        tableData: any[];
    }

    const { tableHeaders, tableData } = defineProps<IProps>();
</script>

<style scoped></style>
