<template>
    <div @keyup.enter="submitSearch" class="searchBox">
        <icon-svg icon-class="search"></icon-svg>
        <Input v-model="searchKeyword" placeholder="Search" disabled></Input>
    </div>
</template>
<<script>
export default {
    props: {
        submitSearch: {
            type: Function,
            default: null
        },
        searchKeyword: {
            type: String,
            default: ''
        }
    }
};
</script>
<style scoped>
.searchBox {
    display: flex;
    align-items: center;
}
.svg-icon {
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 1rem;
}
</style>
