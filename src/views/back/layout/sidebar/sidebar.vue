<template>
    <menu mode="vertical" theme="dark" :active-name="$route.path">
        <sidebar-item :routes='permissionRouters'></sidebar-item>
    </menu>
</template>

<script>
import { mapGetters } from 'vuex';
// import { SidebarItem } from 'views/layout';
import SidebarItem from './sidebarItem';
export default {
    name: 'sidebar',
    components: { SidebarItem },
    computed: {
        ...mapGetters([
            'permissionRouters'
        ])
    }
};
</script>

<style lang="scss" scoped>
// .el-menu {
//     min-height: 100%;
// }
</style>
