import { param2Obj } from 'utils';
import { articles } from './database';

const getTopArticles = () => articles.sort((a, b) => a.updated_at > b.updated_at ? -1 : 1).slice(0, 5);
// 根据类别获取文章
const getArticlesByCategorys = categorys => {
    // if (categorys.length > 0) {
    const res = new Set();
    articles.forEach(article => {
        let i = 0;
        categorys.forEach(category => {
            if (article.categorys.some(e => e._id === +category)) {
                i++;
            }
        });
        if (i === categorys.length) {
            res.add(article);
        }
    });
    return Array.from(res).sort((a, b) => a.updated_at > b.updated_at ? -1 : 1);
    // } else {
    //     return articles.sort((a, b) => a.updated_at > b.updated_at ? -1 : 1);
    // }
};
// 根据标签获取文章
const getArticlesByTags = tags => {
    const res = new Set();
    articles.forEach(article => {
        let i = 0;
        tags.forEach(tag => {
            if (article.tags.some(e => e._id === +tag)) {
                i++;
            }
        });
        if (i === tags.length) {
            res.add(article);
        }
    });
    return Array.from(res).sort((a, b) => a.updated_at > b.updated_at ? -1 : 1);
};
// 根据标签和类别获取文章
const getArticlesByCategorysTags = (categorys, tags) => {
    const res1 = new Set();
    articles.forEach(article => {
        let i = 0;
        categorys.forEach(category => {
            if (article.categorys.some(e => e._id === +category)) {
                i++;
            }
        });
        if (i === categorys.length) {
            res1.add(article);
        }
    });
    const res = new Set();
    Array.from(res1).forEach(article => {
        tags.forEach(tag => {
            let i = 0;
            tags.forEach(tag => {
                if (article.tags.some(e => e._id === +tag)) {
                    i++;
                }
            });
            if (i === tags.length) {
                res.add(article);
            }
        });
    });
    return Array.from(res).sort((a, b) => a.updated_at > b.updated_at ? -1 : 1);
};
// 根据文章id获取文章内容
const getArticleById = config => {
    let res = '';
    articles.forEach(article => {
        if (article._id === +config.url.split('?')[0].split('/').slice(-1)) {
            res = article;
        }
    });
    return res;
};

// 获取文章列表
const getArticles = config => {
    // console.log(`config:${config}`);
    const { categorys, tags } = param2Obj(config.url);
    let res;
    if (categorys && tags) {
        res = getArticlesByCategorysTags(categorys.split(','), tags.split(','));
    } else if (categorys) {
        res = getArticlesByCategorys(categorys.split(','));
    } else if (tags) {
        res = getArticlesByTags(tags.split(','));
    } else {
        // 返回-1则a排在b前面
        res = articles.sort((a, b) => a.updated_at > b.updated_at ? -1 : 1);
    }
    return res;
};
export default {
    getArticles, getTopArticles, getArticlesByCategorys, getArticlesByTags, getArticleById
};
