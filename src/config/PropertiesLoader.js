const yaml = require('yamljs');

module.exports = ()=>{
    return yaml.load('./conf/app.yml');
};

