<template>
    <nav class="flex" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-4">
            <li>
                <div>
                    <a href="#" class="text-gray-400 hover:text-gray-500">
                        <HomeIcon class="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                        <span class="sr-only">Home</span>
                    </a>
                </div>
            </li>
            <li v-for="item in breadcrumbs" :key="item.name">
                <div class="flex items-center">
                    <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <a
                        :href="item.href"
                        class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                        :aria-current="item.current ? 'page' : undefined"
                        >{{ item.name }}</a
                    >
                </div>
            </li>
        </ol>
    </nav>
</template>

<script lang="ts" setup>
    import { ChevronRightIcon, HomeIcon } from '@heroicons/vue/solid';

    interface IProps {
        breadcrumbs: any[];
    }
    const { breadcrumbs } = defineProps<IProps>();
</script>

<style scoped></style>
