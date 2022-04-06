<template>
    <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium" :class="[textColor, bgColor]">
        <slot />
    </span>
</template>

<script lang="ts" setup>
    interface IProps {
        textColor: string;
        bgColor: string;
    }

    const { textColor, bgColor } = withDefaults(defineProps<IProps>(), {
        textColor: 'bg-red-100',
        bgColor: 'text-red-800',
    });
</script>

<style scoped></style>
