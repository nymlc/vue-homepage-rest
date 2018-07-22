<template>
    <div>
        <template v-for="(item, index) in routes">
            <router-link :key="index" v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
                <el-menu-item :name="item.path+'/'+item.children[0].path">
                    <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.children[0].name}}
                </el-menu-item>
            </router-link>
             <el-submenu :key="index" :index="item.name" v-if="!item.noDropdown&&!item.hidden">
                <template slot="title">
                    <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{$t(item.name)}}
                </template>
                <template v-for="(child, subIndex) in item.children" v-if='!child.hidden'>
                    <sidebar-item :key="subIndex" class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
                    <router-link :key="subIndex" v-else class="menu-indent" :to="item.path+'/'+child.path">
                        <Menu-item :name="item.path+'/'+child.path">
                            {{child.name}}
                        </Menu-item>
                    </router-link>
                </template>
            </el-submenu> 
        </template>
    </div>
</template>

<script>
export default {
    name: 'sidebarItem',
    props: {
        routes: {
            type: Array
        }
    }
};
</script>

<style lang="scss" scoped>
.svg-icon {
    margin-right: 10px;
}

.hideSidebar .menu-indent {
    display: block;
    text-indent: 10px;
}
</style>

