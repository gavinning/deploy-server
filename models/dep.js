var $ = require('co')
var Gre = require('gre')
var gre = Gre.create('[:time][:title][:git] :message')
var deploy = require('./deploy')


exports.deploy = deploy

exports.getTags = function(){
    return new Promise((res, rej) => {
        $(function *(){
            try{
                yield deploy.git.repo()
                var arr = []
                var tags = yield deploy.git.tags()
                for(let i=0, len=tags.length; i<len; i++){
                    let tag = yield deploy.git.repository.getTagByName(tags[i])
                    let obj = {
                        name: tag.name(),
                        message: tag.message()
                    }
                    arr.push(obj)
                }
                res(arr)
            }
            catch(err){
                rej(err)
            }
        })
    })
}
