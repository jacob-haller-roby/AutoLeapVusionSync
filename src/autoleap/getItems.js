export const getItems = async (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);

    const JWT_TOKEN = process.env.JWT_TOKEN;
    const COMPANY_ID = process.env.COMPANY_ID;

    const items = [];
    let page = 1;

    while (true) {
        const query = new URLSearchParams({
            companyId: COMPANY_ID,
            updatedDateStart: start.toISOString(), // replace `yesterday` with `lastWeek` or `lastMonth` as needed
            updatedDateEnd: end.toISOString(),
            page
        }).toString();

        const resp = await fetch(
            `https://partnerapi.myautoleap.com/v2/items?${query}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${JWT_TOKEN}`,
                }
            }
        );

        const data = await resp.text();
        items.push(...data.content);
        if (data.last) break;
        page++;
    }
    return items;
}
