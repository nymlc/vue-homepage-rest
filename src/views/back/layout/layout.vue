<template>
    <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
        <div class="sidebar-wrapper">
            <sidebar class="sidebar-container" style="width: auto"></sidebar>
        </div>
        <div class="main-container">
             <navbar></navbar>  
            <app-main></app-main>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Sidebar, AppMain, Navbar } from './index';

export default {
    name: 'layout',
    components: {
        Sidebar,
        AppMain,
        Navbar
    },
    computed: {
        ...mapGetters(['sidebar'])
    }
};
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
    @include clearfix;
    &.hideSidebar {
        .sidebar-wrapper {
            transform: translate(-140px, 0);
            .sidebar-container {
                transform: translate(132px, 0);
            }
            &:hover {
                transform: translate(0, 0);
                .sidebar-container {
                    transform: translate(0, 0);
                }
            }
        }
        .main-container {
            margin-left: 40px;
        }
    }
    .sidebar-wrapper {
        width: 180px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
        transition: all .28s ease-out;
    }
    .sidebar-container {
        transition: all .28s ease-out;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: -17px;
        overflow-y: scroll;
    }
    .main-container {
        min-height: 100%;
        transition: all .28s ease-out;
        margin-left: 180px;
    }
}
</style>
