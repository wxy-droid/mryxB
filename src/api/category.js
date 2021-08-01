// 类名接口
import instance from "./axios";

export default {
    // 类目列表
    categoryList(params) {
        return instance.get('/category/all', { params });
    },
    // 类目新增
    categoryAdders(params) {
        return instance.get('/category/add', { params })
    },
    // 类目编辑
    categoryEdit(params) {
        return instance.put('/category/edit', params);
    },
    // 类目删除
    categoryRemove(id) {
        return instance.delete('/category/' + id);
    }
}