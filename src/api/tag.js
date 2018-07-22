import axios from 'utils/axios';

export async function getTags(fields, conds) {
    // console.log(fields, conds);
    return await axios({
        url: '/v1/tags',
        params: {
            fields,
            conds
        }
    });
}
