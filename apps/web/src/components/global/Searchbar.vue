<template>
    <div class="mt-1 relative rounded-md shadow-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
            <SearchIcon class="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
        <input
            v-model="searchString"
            @input="changeSearchValue"
            @keydown.enter="submitSearch"
            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
            placeholder="Search"
        />
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center" @click="clearSearch" aria-hidden="true">
            <XIcon class="h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { SearchIcon, XIcon } from '@heroicons/vue/solid';

    interface IProps {
        searchValue: string;
    }
    /* eslint-disable no-unused-vars */

    const { searchValue } = defineProps<IProps>();

    /* eslint-enable no-unused-vars */

    const emit = defineEmits(['update:searchValue', 'submit']);

    const searchString = ref<string>('');
    const changeSearchValue = () => {
        emit('update:searchValue', searchString.value);
    };
    const submitSearch = () => {
        emit('submit', searchString.value);
    };
    const clearSearch = () => {
        searchString.value = '';
        changeSearchValue();
    };
</script>

<style scoped></style>
