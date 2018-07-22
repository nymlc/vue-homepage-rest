<template>
    <v-touch class="app-touch-wrapper" @swipeleft="onSwipeLeft" @swiperight="onSwipeRight">
        <div class="app-wrapper" @wheel="mousewheel" v-if="totalPage">
            <sidebar :isActive="sidebarShow" :categorys="categorys" :tags="tags" :topArticles="topArticles" @on-mouseleave="showSidebar" @on-category-click="categoryClick" @on-tag-click="tagClick"></sidebar>
            <div class="app-header-wrapper">
                <icon-svg-click class="hamburger-container" icon-class="mianbaoxiedaohangxiaokuai" :click="showSidebar"></icon-svg-click>
                <span class="logo">泠青</span>
                <icon-svg icon-class="search" class="play-btn"></icon-svg>
            </div>
            <div class="article-cover-wrapper">
                <transition name="cover">
                    <div class="article-cover" v-if="on" key="on" :style="coverImgStyle[0]"></div>
                    <div class="article-cover" v-else="" key="off" :style="coverImgStyle[1]"></div>
                </transition>
            </div>
            <div class="article-wrapper">
                <header>
                    <span class="logo">泠青</span>
                    <icon-svg-click class="hamburger-container" icon-class="mianbaoxiedaohangxiaokuai" :click="showSidebar"></icon-svg-click>
                    <search-box></search-box>
                </header>
                <section class="article-info">
                    <div class="fw-ber">
                        <transition name="title" mode="out-in">
                            <div v-if="on" key="on">{{articles[upIndex].title}}</div>
                            <div v-else="" key="off">{{articles[downIndex].title}}</div>
                        </transition>

                        <transition name="title-special" mode="out-in">
                            <div v-if="on" key="on" class="title-special" :style="specialStyle[0]">
                                <span>{{titleSpecial[0]}}</span>
                                <div class="specialLine" :style="gradientSpecialStyle[0]"></div>
                            </div>
                            <div v-else="" key="0ff" class="title-special" :style="specialStyle[1]">
                                <span>{{titleSpecial[1]}}</span>
                                <div class="specialLine" :style="gradientSpecialStyle[1]"></div>
                            </div>
                        </transition>
                    </div>
                    <transition name="written" mode="out-in">
                        <label v-if="on" key="on">Written by</label>
                        <label v-else="" key="0ff">Written by</label>
                    </transition>
                    <transition name="belong" mode="out-in">
                        <div v-if="on" key="on" class="fw-ber">
                            <span>{{articles[upIndex].author}}</span>
                            <span>{{articles[upIndex].updated_at}}</span>
                        </div>
                        <div v-else="" key="0ff" class="fw-ber">
                            <span>{{articles[downIndex].author}}</span>
                            <span>{{articles[downIndex].updated_at}}</span>
                        </div>
                    </transition>
                    <transition name="play" mode="out-in">
                        <icon-svg-click v-if="on" key="on" :click="enterArticle" icon-class="bofang" class="play-btn" :style="specialStyle[0]"></icon-svg-click>
                        <icon-svg-click v-else="" key="0ff" :click="enterArticle" icon-class="bofang" class="play-btn" :style="specialStyle[1]"></icon-svg-click>
                    </transition>
                </section>
                <footer>
                    <transition name="pagination" mode="out-in">
                        <div v-if="on" key="on" class="pagination">
                            <span class="pr05">{{wheelCurl}}</span>of
                            <span class="plr05">{{totalPage}}</span>
                            <icon-svg icon-class="jiantou"></icon-svg>
                        </div>
                        <div v-else="" key="off" class="pagination">
                            <span class="pr05">{{wheelCurl}}</span>of
                            <span class="plr05">{{totalPage}}</span>
                            <icon-svg icon-class="jiantou"></icon-svg>
                        </div>
                    </transition>
                    <transition name="viewer" mode="out-in">
                        <div v-if="on" key="on" class="viewer">
                            <icon-svg icon-class="xin"></icon-svg>
                            <span class="plr1">{{articles[upIndex].praises}}</span>
                            <icon-svg icon-class="wangjimima-copy"></icon-svg>
                            <span class="plr1">{{articles[upIndex].views}}</span>
                            <icon-svg icon-class="pinglun"></icon-svg>
                            <span class="plr1">{{articles[upIndex].comments}}</span>
                        </div>
                        <div v-else="" key="off" class="viewer">
                            <icon-svg icon-class="xin"></icon-svg>
                            <span class="plr1">{{articles[downIndex].praises}}</span>
                            <icon-svg icon-class="wangjimima-copy"></icon-svg>
                            <span class="plr1">{{articles[downIndex].views}}</span>
                            <icon-svg icon-class="pinglun"></icon-svg>
                            <span class="plr1">{{articles[downIndex].comments}}</span>
                        </div>
                    </transition>
                </footer>
            </div>
            <div class="app-contact"></div>
        </div>
    </v-touch>
</template>
<script>
import Hamburger from 'components/hamburger';
import SearchBox from 'components/search-box';
import Sidebar from './sidebar';
import { getArticles, getTopArticles } from 'api/article';
import { getTags } from 'api/tag';
import { getCategorys } from 'api/category';
import { hasScrolled, deepClone } from 'utils';
import { mapActions, mapGetters } from 'vuex';
import lodash from 'lodash';
export default {
    components: {
        Sidebar,
        Hamburger,
        SearchBox
    },
    methods: {
        ...mapActions(['SetCurrentArticle']),
        showSidebar(event) {
            this.sidebarShow = !this.sidebarShow;
        },
        enterArticle() {
            this.$router.push({ path: `/articles/${this.articles[this.wheelCurl - 1]._id}` });
        },
        nextArticle(isNext) {
            console.log(isNext);
            if (isNext) {
                if (this.upIndex === this.downIndex && this.upIndex !== 0) {
                    //
                } else {
                    // 滚轮游标最多等于总页数
                    if (this.wheelCurl < this.totalPage) {
                        this.wheelCurl++;
                    }
                    if (this.wheelCurl % 2) {
                        this.upIndex = this.wheelCurl - 1;
                        if (this.wheelCurl <= this.totalPage - 1) {
                            this.downIndex = this.wheelCurl;
                        } else {
                            this.downIndex = this.upIndex;
                        }
                    } else {
                        this.downIndex = this.wheelCurl - 1;
                        if (this.wheelCurl <= this.totalPage - 1) {
                            this.upIndex = this.wheelCurl;
                        } else {
                            this.upIndex = this.downIndex;
                        }
                    }
                }
            } else {
                if (this.upIndex === this.downIndex && this.upIndex === 0) {
                    //
                } else {
                    // 游标最小等于1
                    if (this.wheelCurl > 1) {
                        this.wheelCurl--;
                    }
                    if (this.wheelCurl % 2) {
                        this.upIndex = this.wheelCurl - 1;
                        if (this.wheelCurl > 1) {
                            this.downIndex = this.wheelCurl;
                        } else {
                            this.downIndex = this.upIndex;
                        }
                    } else {
                        this.downIndex = this.wheelCurl - 1;
                        if (this.wheelCurl > 1) {
                            this.upIndex = this.wheelCurl;
                        } else {
                            this.upIndex = this.downIndex;
                        }
                    }
                }
            }
            // console.log(this.upIndex, this.downIndex, this.wheelCurl, this.totalPage);
            this.on = this.wheelCurl % 2;
            // 设置当前显示文章于vuex
            this.SetCurrentArticle(this.articles[this.wheelCurl - 1]);
        },
        categoryClick(category) {
            if (category.isActive) {
                this.selectedCategorys.add(category._id);
            } else {
                this.selectedCategorys.delete(category._id);
            }
            const params = {
                tags: Array.from(this.selectedTags).toString(),
                categorys: Array.from(this.selectedCategorys).toString()
            };
            // 克隆除了''的值
            this.getArticlesByParams(deepClone(params, ['']));
        },
        tagClick(tag) {
            if (tag.isActive) {
                this.selectedTags.add(tag._id);
            } else {
                this.selectedTags.delete(tag._id);
            }
            const params = {
                tags: Array.from(this.selectedTags).toString(),
                categorys: Array.from(this.selectedCategorys).toString()
            };
            // 克隆除了''的值
            this.getArticlesByParams(deepClone(params, ['']));
        },
        async getArticlesByParams(params) {
            const articles = await getArticles(params);
            this.articles = articles.data;
            this.totalPage = this.articles.length;
            this.upIndex = 0;
            this.downIndex = 0;
            this.wheelCurl = 1;
            // 设置当前显示文章于vuex
            this.SetCurrentArticle(this.articles[this.wheelCurl - 1]);
        },
        mousewheel(e) {
            let isNext;
            if (!hasScrolled(document.body)) {
                if (e.deltaY > 0) {
                    isNext = true;
                } else {
                    isNext = false;
                }
                this.nextArticle(isNext);
            }
        },
        onSwipeLeft() {
            this.nextArticle(true);
        },
        onSwipeRight() {
            this.nextArticle(false);
        }
    },
    mounted() {
        /* func (Function): 要防抖动的函数。
        [wait=0] (number): 需要延迟的毫秒数。
        [options={}] (Object): 选项对象。
        [options.leading=false] (boolean): 指定在延迟开始前调用。
        [options.maxWait] (number): 设置 func 允许被延迟的最大值。
        [options.trailing=true] (boolean): 指定在延迟结束后调用。 */
        this.mousewheel = lodash.debounce(this.mousewheel, 50, {
            leading: true,
            trailing: false
        });
    },
    async beforeMount() {
        // 判断当前是否有选中标签
        if (this.selectedTag._id) {
            this.selectedTags.add(this.selectedTag._id);
        }
        const params = {
            tags: Array.from(this.selectedTags).toString()
        };
        // 克隆除了''的值
        this.getArticlesByParams(deepClone(params, ['']));
        // 获取置顶文章
        const topArticles = await getTopArticles();
        this.topArticles = topArticles.data;
        // 获取类别
        const categorys = await getCategorys();
        this.categorys = categorys.data;
        // 获取标签
        const tags = await getTags();
        this.tags = tags.data;
        // 标色当前选中的tag
        if (this.selectedTag._id) {
            this.tags.forEach((tag, index) => {
                if (tag._id === this.selectedTag._id) {
                    this.tags[index].isActive = true;
                }
            });
        }
        // 设置当前显示文章于vuex
        this.SetCurrentArticle(this.articles[this.wheelCurl - 1]);
    },
    data() {
        return {
            wheelCurl: 1,
            articles: [],
            topArticles: [],
            categorys: [],
            selectedCategorys: new Set(),
            selectedTags: new Set(),
            tags: [],
            upIndex: 0,
            downIndex: 0,
            totalPage: 0,
            on: true,
            sidebarShow: false,
            lodash
        };
    },
    computed: {
        ...mapGetters(['selectedTag']),
        titleSpecial() {
            // let _currentTitle = this.articles[this.upIndex].title;

            return [this.articles[this.upIndex].title.slice(-1), this.articles[this.downIndex].title.slice(-1)];
        },
        coverImgStyle() {
            return [
                {
                    backgroundImage: `url(${this.articles[this.upIndex].cover})`
                },
                {
                    backgroundImage: `url(${this.articles[this.downIndex].cover})`
                }
            ];
        },
        specialStyle() {
            return [{
                color: this.articles[this.upIndex].title_color
            }, {
                color: this.articles[this.downIndex].title_color
            }];
        },
        gradientSpecialStyle() {
            return [{
                background: `linear-gradient(to right, ${this.articles[this.upIndex].title_color}, white)`
            }, {
                background: `linear-gradient(to right, ${this.articles[this.downIndex].title_color}, white)`
            }];
        }
    }
};
</script>
<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-touch-wrapper {
    height: 100%;
}

.app-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.app-header-wrapper {
    height: 8.59375%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .logo {
        font-family: "logofont";
        font-size: 1.2rem;
    }
}

.article-cover-wrapper {
    height: 36.132812%;
    overflow: hidden;
    div.article-cover {
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 100%;
    }
}

.article-wrapper {
    height: 55.273438%;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    header {
        display: none;
        .logo {
            font-family: "logofont";
            font-size: 1.2rem;
        }
    }
    .article-info {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        font-size: 1.2rem;
        .title-special {
            display: flex;
            align-items: center;
        }
        .specialLine {
            height: 2px;
            width: 210px;
            margin-left: 1rem;
            display: inline-block;
        }
        .play-btn {
            width: 4.4rem;
            height: 4.4rem;
            position: absolute;
            right: 3.5rem;
            top: calc(44.726562vh - 2.2rem);
        }
    }
    footer {
        height: 29.328622%;
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-around;
        .pagination {
            align-self: flex-end;
        }
    }
}

.app-contact {
    display: none;
}

@media (min-width: 40rem) {
    .app-header-wrapper {
        .logo {
            font-size: 1.5rem;
        }
    }
    .article-wrapper {
        header {
            .logo {
                font-size: 1.5rem;
            }
        }
        .article-info {
            font-size: 1.5rem;
        }
    }
}

@media (min-width: 70rem) {
    .app-wrapper {
        flex-direction: row-reverse;
        height: 100%;
    }

    .app-header-wrapper {
        display: none;
    }
    .app-contact {
        display: block;
        width: 2.08333333%;
    }
    .article-cover-wrapper {
        width: 52.083333%;
        height: 100%;
        div.article-cover {
            background-position: center;
            background-size: cover;
            width: 100%;
            height: 100%;
        }
    }

    .article-wrapper {
        height: 100%;
        width: 45.833333%;
        padding: 2rem 4rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        header {
            width: 80%;
            display: flex;
            align-items: center;
            .hamburger-container {
                margin: 0 2rem;
            }
        }
        .article-info {
            display: flex;
            flex: 0 1 auto;
            flex-direction: column;
            justify-content: center;
            margin: auto;
            .specialLine {
                height: 2px;
                width: 210px;
                display: inline-block;
            }
            .play-btn {
                position: static;
                margin-top: 2.2rem;
            }
        }
        footer {
            height: auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .pagination {
                align-self: center;
            }
        }
    }
}

@include slideup(cover);
@include slideup(title, 1s, 1.5s, 10vh, 0, 0, -50vh);
@include slideup(title-special, 1.2s, 1.8s, 10vh, 0, 0, -50vh);
@include slideup(written, 1.4s, 2s, 10vh, 0, 0, -50vh);
@include slideup(belong, 1.6s, 2.2s, 10vh, 0, 0, -50vh);
@include slideup(play, 2s, 2.4s, 10vh, 0, 0, -50vh);
@include slideup(viewer, 1.2s, 1s, 10vh, 0, 0, -20vh);
@include slideleft(pagination, 1.2s, 1.8s, -10vw, 0, 0, 8vw);
</style>
