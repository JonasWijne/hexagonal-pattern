<template>
    <Popover v-slot="{ open }" class="relative">
        <PopoverButton
            :class="[
                open ? 'text-gray-900' : 'text-gray-500',
                'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
            ]"
        >
            <span>Solutions</span>
            <ChevronDownIcon
                :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']"
                aria-hidden="true"
            />
        </PopoverButton>

        <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
        >
            <PopoverPanel class="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
                <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                        <router-link
                            v-for="item in navigation"
                            :key="item.name"
                            :to="{ name: item.name }"
                            class="-m-3 p-3 block rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                        >
                            <p class="text-base font-medium text-gray-900">
                                {{ item.name }}
                            </p>
                        </router-link>
                    </div>
                </div>
            </PopoverPanel>
        </transition>
    </Popover>
</template>

<script lang="ts" setup>
    import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
    import { ChevronDownIcon } from '@heroicons/vue/solid';

    const navigation = [{ name: 'Home' }];
</script>

<style scoped></style>
