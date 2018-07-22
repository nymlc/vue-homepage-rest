<template>
    <svg class="svg-icon" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
export default {
    name: 'icon-svg',
    props: {
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
    width: 1em;
    height: 1em;
    fill: currentColor;
    vertical-align: -0.15em;
    overflow: hidden;
}
</style>
