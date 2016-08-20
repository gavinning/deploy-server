var Deploy = require('aimee-deploy')
var deploy = new Deploy({
    git: {
        // 远程Git仓库地址
        url: 'https://github.com/Baiyangzuo/rong.git',
        // 本地目标地址
        target: '/Users/gavinning/Desktop/rong'
    },
    pm: {
        // 应用名称
        name: 'rong',
        exec_mode : 'cluster',
        instances : 1,
        max_memory_restart : '100M'
    }
})

module.exports = deploy
