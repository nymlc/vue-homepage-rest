<template>
    <div @mouseleave="mouseleave" class="sidebar-wrapper" :class="{'is-active': isActive}">
        <el-menu mode="vertical" :open-names="['1', '2', '3']" theme="light" class="sidebar-container" style="width: auto">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    类别
                </template>
                <div class="categorys-wrapper">
                    <el-tag @click.native="categoryClick(category, index)" v-for="(category, index) in categorys" :key="index" :type="category.isActive ? 'danger' : 'success'">{{ category.name }}</el-tag>
                </div>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-delete"></i>
                    标签
                </template>
                <div class="tags-wrapper">
                    <el-tag @click.native="tagClick(tag, index)" v-for="(tag, index) in tags" :key="index" :type="tag.isActive ? 'danger' : 'success'">{{ tag.name }}</el-tag>
                </div>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    Top文章
                </template>
                <div class="top-articles-wrapper">
                    <div class="article" v-for="(topArticle, index) in topArticles" :key="index">{{ topArticle.title }}</div>
                </div>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'sidebar',
    props: {
        isActive: {
            type: Boolean,
            default: false
        },
        categorys: {
            type: [Array],
            default: () => []
        },
        tags: {
            type: [Array],
            default: () => []
        },
        topArticles: {
            type: [Array],
            default: () => []
        }
    },
    methods: {
        mouseleave(event) {
            this.$emit('on-mouseleave', event);
        },
        categoryClick(category, index) {
            // 使用$set解决非响应
            this.$set(this.categorys[index], 'isActive', !this.categorys[index].isActive);
            this.$emit('on-category-click', category);
        },
        tagClick(tag, index) {
            this.$set(this.tags[index], 'isActive', !this.tags[index].isActive);
            this.$emit('on-tag-click', tag);
        }
    }
};
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
    width: 20vw;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    transition: all .28s ease-out;
    transform: translate(-20vw, 0);
}

.sidebar-container {
    transition: all .28s ease-out;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: -17px;
    overflow-y: scroll;
    transform: translate(132px, 0);
}

.is-active {
    &.sidebar-wrapper {
        transform: translate(0, 0);
        .sidebar-container {
            transform: translate(0, 0);
        }
    }
}

.top-articles-wrapper,
.categorys-wrapper,
.tags-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 2rem;
    justify-content: space-between;
}

.top-articles-wrapper {
    flex-direction: column;
    .article {
        padding: 0.3rem 0;
    }
}
</style>
