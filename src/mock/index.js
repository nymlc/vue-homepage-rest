import Mock from 'mockjs';
import loginAPI from './login';
import article from './article';
import category from './category';
import tag from './tag';
Mock.setup({
    timeout: '1000-2000' // 表示响应时间介于 1000 和 2000 毫秒之间，默认值是'10-100'。
});
Mock.mock(/\/login\/loginbyun/, 'post', loginAPI.loginByUsername);
Mock.mock(/\/user\/info/, 'get', loginAPI.getUserInfo);
Mock.mock(/\/v1\/articles\/\w/, 'get', article.getArticleById);
Mock.mock(/\/v1\/articles/, 'get', article.getArticles);
Mock.mock(/\/v1\/categorys/, 'get', category.getCategorys);
Mock.mock(/\/v1\/tags/, 'get', tag.getTags);

export default Mock;
