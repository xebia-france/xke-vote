var slots = require('./../conf/slots.json');

module.exports = function () {
    return {
    	list : function () {
        return slots;
    	}
    };
};