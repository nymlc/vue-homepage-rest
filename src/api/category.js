import axios from 'utils/axios';

export async function getCategorys(fields, conds) {
    // console.log(fields, conds);
    return await axios({
        url: '/v1/categorys',
        params: {
            fields,
            conds
        }
    });
}
