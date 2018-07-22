import { getRandomArray } from 'utils';
import Mock from 'mockjs';

const coverMap = ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507457009232&di=6902e746b953a6ab67d8ea49c9915694&imgtype=0&src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1212%2F2239%2F2239-ntk36472.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507457009229&di=4fa2d5a9262925d99ea61c6edc010f57&imgtype=0&src=http%3A%2F%2Ff3.topit.me%2F3%2F9c%2Fbc%2F1133861393232bc9c3o.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508521724&di=f1f67331fb10b9f58671b6a6056c6a43&imgtype=jpg&er=1&src=http%3A%2F%2Fres.silver.org.cn%2FUploads%2FPicture%2F2017-07-04%2F595bb8ba38d6b.jpeg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507927008370&di=05e28eaaee801bcbb43f1212f636020c&imgtype=0&src=http%3A%2F%2Fwww.3dmgame.com%2Fuploads%2Fallimg%2F140110%2F153_140110160156_4.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507927008369&di=07d42b82018c597c92f20a32f54ffd66&imgtype=0&src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1208%2F2033%2Fntk-2033-4469.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507927008358&di=af02ad5053f0c3bdff832d2f0d78f7a0&imgtype=0&src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1212%2F2214%2F2214-ntk36035.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507927008356&di=838d3fab00002e89f731947f4bde01d7&imgtype=0&src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1207%2F1015%2Fntk123675.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507927008356&di=e009e6ee4acb68c79d6e5ab28f40e2ba&imgtype=0&src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1208%2F1910%2Fntk-1910-28555.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507927008353&di=48ae779513b739164b4cd8b3797ba51c&imgtype=0&src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1208%2F1459%2Fntk-1459-4782.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507457009222&di=55fbd0af6bf7735d378d5c6fe74456a1&imgtype=0&src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F130126%2F52%2F52-niutuku.com-1499.jpg'];

const articles = [];
const categorys = [];
const tags = [];

for (let i = 0; i < 10; i++) {
    categorys.push(Mock.mock({
        _id: '@increment',
        name: '@name'
    }));
}
for (let i = 0; i < 10; i++) {
    tags.push(Mock.mock({
        _id: '@increment',
        name: '@name'
    }));
}
for (let i = 0; i < 10; i++) {
    articles.push(Mock.mock({
        _id: '@increment',
        title: '@ctitle',
        title_color: '@color',
        author: '@cname',
        created_at: '@date("yyyy/MM/dd")',
        updated_at: '@date("yyyy/MM/dd")',
        'views|30-80': 40,
        'praises|30-40': 36,
        'comments|3-18': 6,
        'cover|1': coverMap,
        content: '@cparagraph@cparagraph@cparagraph@cparagraph@cparagraph@cparagraph@cparagraph@cparagraph@cparagraph@cparagraph@cparagraph@cparagraph@cparagraph@cparagraph@cparagraph',
        categorys: getRandomArray(categorys),
        tags: getRandomArray(tags)
    }));
}
export {
    articles, categorys, tags
};
