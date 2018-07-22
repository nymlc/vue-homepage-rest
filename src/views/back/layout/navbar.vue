<template>
    <el-menu mode="horizontal" class="navbar">
        <hamburger class="hamburger-container" :toggleClick="toggleClick" :isActive="sidebar.opened"></hamburger>
        <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
                <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'" />
            </div>
            <el-dropdown slot="list">
                <el-dropdown-item>
                    <span @click="logout">{{ $t('login.logout') }}</span>
                </el-dropdown-item>
            </el-dropdown>
        </el-dropdown>
    </el-menu>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Hamburger from 'components/hamburger';
export default {
    components: {
        Hamburger
    },
    computed: {
        ...mapGetters(['sidebar', 'avatar'])
    },
    methods: {
        ...mapActions(['ToggleSideBar', 'LogOut']),
        toggleClick() {
            this.ToggleSideBar();
        },
        logout() {
            this.LogOut();
            location.reload(); // 为了重新实例化vue-router对象 避免bug
        }
    }
};
</script>
<style lang="scss">
.navbar {
    height: 60px;
    line-height: 60px;
    .hamburger-container {
        padding: 0 10px;
    }

    .avatar-container {
        height: 60px;
        display: inline-block;
        position: absolute;
        right: 35px;
        .avatar-wrapper {
            cursor: pointer;
            margin-top: 5px;
            position: relative;
            .user-avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            .el-icon-caret-bottom {
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }
}
</style>
