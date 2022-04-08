<template>
    <h1>success</h1>
    <button @click="test">tset</button>
</template>

<script lang="ts" setup>
    import './index.css';
    import { container } from 'tsyringe';
    import { EventBus } from '@/infrastructure/Concrete/EventBus';

    const test = () => {
        const eventBus = container.resolve(EventBus);
        eventBus.publish('test');
    };
</script>

<style></style>
