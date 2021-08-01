// 商品接口
import instance from "./axios";

export default {
    // 产品列表
    productsAll(params) {
        return instance.get('/products/all', { params });
    },
    // 新增产品
    productsAdd(params) {
        return instance.post('/products/add', params);
    },
    // 编辑产品
    productsEdit(params) {
        return instance.put('/products/edit', params);
    },
    // 查询商品详情
    productsXian(id) {
        return instance.get('/products/' + id);
    },
    // 删除商品
    productsRemove(params) {
        return instance.delete('/products/' + params.id);
    }

}