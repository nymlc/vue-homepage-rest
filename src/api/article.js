import axios from 'utils/axios';

export async function getArticles(params) {
    return await axios({
        url: '/v1/articles',
        params
    });
}
// export async function getArticles1(params) {
//     console.log(params);
//     return await axios({
//         url: '/v1/article',
//         params
//     });
// }
export async function getTopArticles(fields, conds) {
    // console.log(fields, conds);
    return await axios({
        url: '/v1/articles',
        params: {
            fields,
            conds
        }
    });
}

export async function getArticleById(id) {
    return await axios({
        url: '/v1/articles/' + id
        // ,
        // params: {
        //     fields: 'content'
        // }
    });
}
