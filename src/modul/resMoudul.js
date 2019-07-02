class baseModul {
    constructor(data,message) {
        if(typeof data == 'String') {
            this.data = message
            data = null
            message = null
        }
        if(data) {
            this.data = data
        }
        if(message) {
            this.message = message
        }
    }
}

class successModul extends baseModul {
    constructor(data,message) {
        super(data,message);
        this.code = 0
    }
}

class errorModul extends baseModul {
    constructor(data,message) {
        super(data,message);
        this.code = -1
    }
}

module.exports = {
    successModul,
    errorModul
}