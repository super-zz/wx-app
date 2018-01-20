//验证码手机号
var verifyTel = function(tel){
	var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
    return (myreg.test(tel));
};
module.exports = {
	verifyTel : verifyTel
}