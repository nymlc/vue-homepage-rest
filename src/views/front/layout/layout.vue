<template>
    <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import { Sidebar, AppMain, Navbar } from './index';

export default {
    name: 'layout',
    components: {
    },
    computed: {
        ...mapGetters(['currentArticle'])
    }
};
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
    
}
</style>
