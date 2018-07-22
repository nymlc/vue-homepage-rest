<template>
    <svg @click="click" class="svg-icon" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
export default {
    name: 'icon-svg',
    props: {
        click: {
            type: [Function, Boolean]
        },
        iconClass: {
            type: String,
            required: true
        }
    },
    computed: {
        iconName() {
            return `#icon-${this.iconClass}`;
        }
    }
};
</script>
<style>
.svg-icon {
    width: 1rem;
    height: 1rem;
    fill: currentColor;
    vertical-align: -0.15em;
    overflow: hidden;
}
</style>
