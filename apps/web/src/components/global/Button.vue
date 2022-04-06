<template>
    <button
        type="button"
        class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md"
        :class="bgColor + ' ' + textColor + ' ' + border"
        :disabled="disabled"
    >
        <slot />
    </button>
</template>

<script lang="ts" setup>
    interface IProps {
        bgColor: string;
        textColor: string;
        border: string;
        disabled?: boolean;
    }

    const { bgColor, textColor, border, disabled } = withDefaults(defineProps<IProps>(), {
        bgColor: 'bg-primary-500',
        textColor: 'text-white',
        border: 'border border-transparent',
        disabled: false,
    });
</script>

<style scoped></style>
