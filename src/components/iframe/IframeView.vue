<template>
    <div class="iframe-container">
        <iframe
            :src="url"
            :title="title"
            frameborder="0"
            width="100%"
            height="100%"
            allowfullscreen
        ></iframe>
    </div>
</template>

<script setup>
defineProps({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ''
    }
})
</script>

<style scoped>
.iframe-container {
    width: 100%;
    height: calc(100vh - 180px);
    overflow: hidden;
}
</style>