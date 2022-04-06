<template>
    <transition name="fade">
        <Dialog as="div" class="fixed z-50 inset-0 overflow-y-auto">
            <div class="grid place-items-center w-screen h-screen px-4 text-center sm:block sm:p-0">
                <DialogOverlay class="fixed inset-0 transition-opacity" aria-hidden="true" @click="close()" />
                <div
                    class="inline-block bg-white rounded-md text-left shadow-xl transform transition-all max-w-2xl md:w-3/4 align-middle"
                    role="dialog"
                    aria-modal="true"
                >
                    <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900"><slot name="header" /></h3>
                    </div>
                    <div class="bg-white px-4 py-4 sm:px-6">
                        <slot />
                    </div>
                    <div class="bg-white px-4 pb-4 sm:px-6">
                        <slot name="content" />
                    </div>
                    <div class="bg-gray-50 py-3 px-4 sm:px-6 flex flex-row-reverse rounded-b-md">
                        <JButton @click="confirmAction">Confirm Button</JButton>
                        <JButton
                            bgColor="bg-white"
                            textColor="text-gray-400"
                            border="border border-gray-400"
                            class="sm:mr-2"
                            @click="cancelAction"
                            >Cancel Button</JButton
                        >
                    </div>
                </div>
            </div>
        </Dialog>
    </transition>
</template>

<script lang="ts" setup>
    import { onBeforeUnmount, onBeforeMount } from 'vue';
    import { Dialog, DialogOverlay } from '@headlessui/vue';
    import JButton from './Button.vue';

    interface IProps {
        confirmAction: () => void;
        cancelAction: () => void;
    }

    const { confirmAction, cancelAction } = withDefaults(defineProps<IProps>(), {
        confirmAction: () => {
            console.log('this function is empty');
        },
        cancelAction: () => {
            console.log('this function is empty');
        },
    });

    const emit = defineEmits(['close']);

    let escListener: any = null;
    const close = () => {
        emit('close');
    };

    onBeforeMount(() => {
        escListener = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') {
                return;
            }
            emit('close');
        };
        document.addEventListener('keyup', escListener);
    });

    onBeforeUnmount(() => {
        document.removeEventListener('keyup', escListener);
    });
</script>

<style scoped></style>
