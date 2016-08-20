var $ = require('co')
var Gre = require('gre')
var gre = Gre.create('[:time][:title][:git] :message')
var deploy = require('./deploy')


exports.getTags = function(){
    return Promise((res, rej) => {
        $(function *(){
            try{
                yield deploy.git.repo()
                var tags = yield deploy.git.tags()
                res(tags)
            }
            catch(err){
                rej(err)
            }
        })
    })
}
