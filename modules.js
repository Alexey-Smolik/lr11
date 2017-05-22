var promise = require('bluebird');
var needle = promise.promisifyAll(require('needle'));

exports.reposByName = function(name){
    return new Promise((resolve, reject)=>{
            needle.getAsync('https://api.github.com/users/'+name+'/repos?per_page=10').then((obj)=>{
            var info = [];
    obj.body.forEach(function(element) {
        info.push({
            id: element.id , name: element.name, url: element.url
        });
    }, this);
    console.log(info);
    resolve(info);
});
});
}

exports.reposByStr = function(q){
    return new Promise((resolve, reject)=>{
            needle.getAsync('https://api.github.com/search/repositories?q='+q+'&per_page=10').then((obj)=>{
            var info = [];
    obj.body.items.forEach(function(element) {
        info.push({
            id: element.id , name: element.name, owner: element.owner, url: element.url
        });
    }, this);
                console.log(info);
    resolve(info);
});
});
}

exports.commitsByRepo = function(repo){
    return new Promise((resolve, reject)=>{
            needle.getAsync('https://api.github.com/repos/'+repo.owner.login+'/'+repo.name+'/commits?per_page=10').then((obj)=>{
            var info = [];
    obj.body.forEach(function(element) {
        info.push({
            sha: element.sha, author: element.author, message: element.message, date: element.date
        });
    }, this);
                console.log(info);
    resolve(info);
});
});
}