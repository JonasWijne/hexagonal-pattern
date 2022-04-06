<template>
    <div class="rounded-lg bg-white relative max-w-xs shadow p-5">
        <div class="flex justify-between items-center">
            <span class="rounded-lg inline-flex p-3 ring-4 ring-white text-purple-700 bg-purple-50">
                <component :is="itemDetails.icon" class="h-6 w-6" aria-hidden="true" />
            </span>
            <span
                class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium"
                :class="{
                    'bg-red-100 text-red-800': !itemDetails.status,
                    'bg-green-100 text-green-800': itemDetails.status,
                }"
            >
                {{ itemDetails.status ? 'Voltooid' : 'Onvoltooid' }}
            </span>
        </div>
        <div class="mt-4">
            <h3 class="text-lg font-medium">
                <a :href="itemDetails.href" class="focus:outline-none">
                    <!-- Extend touch target to entire panel -->
                    <span class="absolute inset-0" aria-hidden="true" />
                    {{ itemDetails.title }}
                </a>
            </h3>
            <p class="mt-2 text-sm text-gray-500">{{ itemDetails.lastModified }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
    interface IProps {
        itemDetails: any;
    }

    const { itemDetails } = defineProps<IProps>();
</script>

<style scoped></style>
