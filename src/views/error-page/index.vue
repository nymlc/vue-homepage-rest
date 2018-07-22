<template>
    <div class="not-found-wrapper">
        <icon-svg class="error-icon" icon-class="404"></icon-svg>
        <div class="error-message">
            <h1 class="error-code">404</h1>
            <h2 class="error-description">Page not found</h2>
            <a class="error-link" href="#/articles">Go to the home →</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'not-found'
};
</script>
<style lang="scss" scoped>
.not-found-wrapper {
    display: flex;
    justify-content: center;
    .error-icon {
        width: 14rem;
        height: 14rem;
    }
}
</style>
