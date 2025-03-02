import axios from 'axios'
import { db } from '@/utils/db/db_neodb';

/**
 * 获取分页数据和状态统计
 * @param {string} token - 认证令牌
 * @param {string} category - 内容类型（如 game, book 等）
 * @param {string} type - 状态（progress, wishlist, complete）
 * @param {number} page - 当前页码
 * @returns {Promise<{data: Array, total: number}>}
 */
export async function fetchNeodbData(token, category, type, page = 1) {
    // 尝试从缓存获取数据
    const cachedData = await db[category].where({
        type: type,
        page: page
    }).first();

    if (cachedData) {
        console.log('Using cached data');
        return resp2data(cachedData.response);
    }
    const config = {
        timeout: 10000,
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://neodb.social/api/me/shelf/${type}?category=${category}&page=${page}`,
        headers: { 
            'Authorization': `Bearer ${token}`
        },
        proxy: {
            protocol: 'http',
            host: '127.0.0.1',
            port: 7897,
        },
    }

    try {
        const response = await axios.request(config)

        // 缓存数据
        await db[category].put({
            type,
            page,
            response: response.data,
            timestamp: new Date().getTime()
        })

        return resp2data(response.data);
    } catch (error) {
        console.error('Failed to fetch data:', error)
        return {
            data: [],
            total: 0,
            pages: 0
        }
    }
}

function resp2data(response) {
    const { count, pages, data } = response;

    // 处理返回的数据
    const formattedData = data.map(el => ({
        title: el.item.title,
        alt: "https://neodb.social" + el.item.url,
        image: el.item.cover_image_url,
        meta: el.item.brief,
        rating: el.rating_grade,
        created_time: el.created_time.split('T')[0],
        comment: el.comment_text
    }));

    const responseData = {
        data: formattedData,
        total: count,
        pages: pages
    };
    return responseData;
}

export async function fetchAllData(token, category, timeout = 10000) {
    const types = ['wishlist', 'progress', 'complete'];
    const result = {};

    for (const type of types) {
        const data = [];
        const firstPageData = await fetchNeodbData(token, category, type, 1);
        data.push(...firstPageData.data);

        for (let page = 2; page <= firstPageData.pages; page++) {
            const pageData = await fetchNeodbData(token, category, type, page);
            data.push(...pageData.data);
        }

        result[type] = data;
    }

    return result;
}
