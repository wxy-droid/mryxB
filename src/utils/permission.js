// 根据角色权限来判断对应的路由名称
const roleToRouter = {
    "customer": [
        {
            name: 'Product'
        },
        {
            name: 'ProductList'
        },
        {
            name: 'ProductAdd'
        },
        {
            name: 'ProductEdit'
        }
    ],
    "admin": [
        {
            name: 'Product'
        },
        {
            name: 'ProductList'
        },
        {
            name: 'ProductAdd'
        },
        {
            name: 'Category'
        },
        {
            name: 'ProductEdit'
        }
    ]
};

// 已经登录进入到首页 然后判断对应权限
// routes 所有的路由名字
// role 角色
export default function getMenuRouter(routes, role) {
    const allowRoutesName = roleToRouter[role].map(item => item.name);
    const results = routes.filter(item => {
        if (allowRoutesName.indexOf(item.name) !== -1) {
            const children = item.children;
            item.children = children.filter(it => allowRoutesName.indexOf(it.name) !== -1);
            return true;
        }
        else {
            return false;
        }
    })
    return results;
}