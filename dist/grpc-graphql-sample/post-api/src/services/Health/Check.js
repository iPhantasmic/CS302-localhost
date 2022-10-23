export default async function (ctx) {
    console.info('Check health');
    ctx.res = { status: "SERVING" };
}
