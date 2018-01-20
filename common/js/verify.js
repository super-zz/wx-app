function phone(phone) {
    if (phone == null || phone.length != 11) {
        wx.showToast({
            title: '手机号错误',
            icon: 'success',
            duration: 2000
        })
        return false;
    }
    else {
        return true;
    }
}

function phoneCode(code) {
    if (code == null || code.length != 6) {
        wx.showToast({
            title: '验证码格式错误',
            icon: 'loding',
            duration: 2000
        })
        return false;
    }
    else {
        return true;
    }
}

function name(name) {
    var msg = '';
    if (name == null || name == '') {
        msg = '名字不能为空'
    }
    else if (name.length >= 10 || name.length < 2) {
        msg = '名字格式错误'
    }
    else {
        return true;
    }
    wx.showToast({
        title: msg,
        icon: 'loding',
        duration: 2000
    })
    return false;
}

function birthday(birthday) {
    if (birthday == null || birthday.length == 0 || birthday.split('-').length < 2) {
        wx.showToast({
            title: '生日格式错误',
            icon: 'loding',
            duration: 2000
        })
        return false;
    }
    else {
        return true;
    }
}

function jobTag(id) {
    if (id == null || id.length == 0) {
        wx.showToast({
            title: '未选职位',
            icon: 'loding',
            duration: 2000
        })
        return false;
    }
    else {
        return true;
    }
}

function salary(id) {
    if (id == null || id.length == 0) {
        wx.showToast({
            title: '未选薪资',
            icon: 'loding',
            duration: 2000
        })
        return false;
    }
    else {
        return true;
    }
}
function city(id) {
    if (id == null || id.length == 0) {
        wx.showToast({
            title: '未选城市',
            icon: 'loding',
            duration: 2000
        })
        return false;
    }
    else {
        return true;
    }
}

function district(id) {
    if (id == null || id.length == 0) {
        wx.showToast({
            title: '未选区域',
            icon: 'loding',
            duration: 2000
        })
        return false;
    }
    else {
        return true;
    }
}

function degree(id) {
    if (id == null || id.length == 0) {
        wx.showToast({
            title: '未选学历',
            icon: 'loding',
            duration: 2000
        })
        return false;
    }
    else {
        return true;
    }
}




module.exports = {
    phone: phone,
    phoneCode: phoneCode,
    name: name,
    birthday: birthday,
    degree: degree,
    jobTag: jobTag,
    salary: salary,
    city: city,
    district: district
}