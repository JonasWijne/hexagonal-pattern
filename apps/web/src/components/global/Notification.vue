<template>
    <div class="grid grid-cols-12 gap-4 bg-white shadow py-2 px-3 shadow-md mb-2 w-96 rounded-lg select-none">
        <div class="col-span-1">
            <check-circle-icon v-if="data?.type === 'success'" class="h-7 w-7" :class="`text-${iconColor}-400`" />
            <exclamation-icon v-if="data?.type === 'warning'" class="h-7 w-7" :class="`text-${iconColor}-400`" />
            <exclamation-circle-icon v-if="data?.type === 'error'" class="h-7 w-7" :class="`text-${iconColor}-400`" />
            <information-circle-icon v-if="data?.type === 'info'" class="h-7 w-7" :class="`text-${iconColor}-400`" />
        </div>
        <div class="col-span-10">
            <h3 v-if="data?.title" class="font-medium truncate">{{ data?.title }}</h3>
            <span v-if="data?.message" class="pt-1">{{ data?.message }}</span>
        </div>
        <div class="col-span-1">
            <x-icon class="text-gray-500 cursor-pointer h-6 w-6" @click.stop="close()" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, computed } from 'vue';
    import { Notification } from '@/types/notification';
    import {
        CheckCircleIcon,
        ExclamationCircleIcon,
        ExclamationIcon,
        InformationCircleIcon,
        XIcon,
    } from '@heroicons/vue/outline';

    interface IProps {
        showDelay?: number;
        data: Notification;
    }

    const { showDelay, data } = withDefaults(defineProps<IProps>(), {
        showDelay: 6000,
    });

    const emit = defineEmits(['remove-toast']);

    let timeout: any;
    const close = () => {
        emit('remove-toast');
        clearTimeout(timeout);
    };

    const iconColor = computed(() => {
        switch (data?.type) {
            case 'error':
                return 'red';
            case 'warning':
                return 'yellow';
            case 'information':
                return 'blue';
            case 'success':
                return 'green';
            default:
                return 'blue';
        }
    });

    onMounted(() => {
        timeout = setTimeout(() => {
            emit('remove-toast');
            clearTimeout(timeout);
        }, showDelay);
    });
</script>

<style scoped></style>
