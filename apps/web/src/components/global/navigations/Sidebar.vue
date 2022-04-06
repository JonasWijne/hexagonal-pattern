<template>
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div class="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
            <div class="flex items-center flex-shrink-0 px-4 border-b border-gray-200">
                <img class="h-8 w-auto" src="#" alt="Logo" />
                <h3 class="text-lg font-medium">Company Name</h3>
            </div>
            <div class="mt-5 flex-grow flex flex-col">
                <nav class="flex-1 px-2 pb-4 space-y-1">
                    <router-link
                        v-for="item in navigation"
                        :key="item.name"
                        :to="{ name: item.name }"
                        :class="[
                            $route.matched.some(route => route.name === item.name)
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                        ]"
                    >
                        <component
                            :is="item.icon"
                            :class="[
                                $route.matched.some(route => route.name === item.name)
                                    ? 'text-gray-500'
                                    : 'text-gray-400 group-hover:text-gray-500',
                                'mr-3 flex-shrink-0 h-6 w-6',
                            ]"
                            aria-hidden="true"
                        />
                        {{ item.name }}
                    </router-link>
                </nav>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { HomeIcon } from '@heroicons/vue/outline';

    const navigation = [{ name: 'Home', icon: HomeIcon }];
</script>

<style scoped></style>
