<template>
    <div>
        <div class="lg:hidden">
            <div class="border-b border-gray-200">
                <nav class="-mb-px flex" aria-label="Tabs">
                    <a
                        v-for="tab in tabs"
                        :key="tab.name"
                        :href="tab.href"
                        :class="[
                            tab.current
                                ? 'border-primary-500 text-primary-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm',
                        ]"
                        :aria-current="tab.current ? 'page' : undefined"
                    >
                        {{ tab.name }}
                    </a>
                </nav>
            </div>
        </div>
        <div class="hidden lg:block">
            <nav class="flex space-x-4" aria-label="Tabs">
                <a
                    v-for="tab in tabs"
                    :key="tab.name"
                    :href="tab.href"
                    :class="[
                        tab.current ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:text-gray-700',
                        'px-3 py-2 font-medium text-sm rounded-md',
                    ]"
                    :aria-current="tab.current ? 'page' : undefined"
                >
                    {{ tab.name }}
                </a>
            </nav>
        </div>
    </div>
</template>

<script lang="ts" setup>
    interface IProps {
        tabs: any[];
    }

    const { tabs } = defineProps<IProps>();
</script>

<style scoped></style>
