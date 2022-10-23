import Post from '../../models/Post';
export default async function (ctx) {
    const limit = ctx.req.limit || 10;
    const page = ctx.req.page || 1;
    console.log('listPost');
    const query = Post.find({})
        .limit(limit)
        .skip(limit * (page - 1));
    ctx.res = {
        limit,
        page,
        count: await Post.countDocuments(query.getQuery()),
        nodes: await query.lean()
    };
}
