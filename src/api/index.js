import axios from 'axios';
import {url,urlCy,urlMx} from '../config/url';


/*成语管理*/
//分页查成语
export const getIdiomList = (page,size) => axios.get(url+'/api/chengyu/findByPage?page='+page+'&size='+size);
//根据ID查成语
export const getIdiom = (id) => axios.get(url+'/api/chengyu/findById/'+id).then(res => res.data);
//更新成语
export const updateIdiom = parmas =>{return axios.post(url+'/api/chengyu/update',parmas).then(res =>res.data)};
//添加成语
export const addIdiom = (id,val,mean) => axios.post(url+'/api/chengyu/add',{id:id,value:val,mean:mean});
//删除成语
export const deleteIdiom = (id) => axios.post(url+'/api/chengyu/delete/'+id,{});
//上传成语图片
export const uploadimg = params => {return axios.post(urlCy+'/api/file/uploadImgForChengyu/'+params.id,params.fd).then(res => res.data)};
//查找未收录的成语
export const getNochengyu = (page,size) => axios.get(url+'/api/chengyu/findByNoMean?page='+page+'&size='+size).then(res => res.data);
/*管理员管理*/
//查所有的管理员
export const getManager = (page,size) => axios.get(url+'/api/manager/findAllManager?page='+page+'&size='+size);

/*订单管理*/
//查看订单 状态可选
export const getOrder = (state,page,size,createTime) => axios.get(url+'/api/order/findAllByPageAndState/'+state+'?page='+page+'&size='+size);
//查看某个用户的订单
export const getUserOrder = (state,id,page,size) => axios.get(url+'/api/order/findByUserId/'+state+'/'+id+'?page='+page+'&size='+size);

/*充值卡管理*/
//添加充值卡
export const addRefillCard = (money,gift) => axios.post(url+'/api/rechargeCard/add',{money:money,gift:gift});
//删除充值卡
export const deleteRefillCard = (id) => axios.post(url+'/api/rechargeCard/delete/'+id,{});
//查全部充值卡
export const getALLRefillCard = () => axios.get(url+'/api/rechargeCard/findAll');
//id查充值卡
export const getRefillCard = (id) => axios.get(url+'/api/rechargeCard/findById/'+id);

/*用户管理*/
//查所有用户 分页
export const getALLUser = (page,size) => axios.get(url+'/api/user/getUsers?page='+page+'&size='+size);
//电话查用户
export const findUserPhone = (phone) => axios.get(url+'/api/user/findByPhone/'+phone);
//id查用户
export const findUserId = (id) => axios.get(url+'/api/user/getUserById/'+id);
//修改用户的金币
export const changeUserCoin = (id,coin) => axios.post(url+'/api/pocket/updateGoldCoin/'+id+'/'+coin,{});

/*金币管理*/
//获取当前金币价格信息页面/api/price/getPassGoldCoin
export const getAllCoin = (page,size) => axios.get(url+'/api/goldCoinRecord/findByPage?page='+page+'&size='+size);
//获取金币模式
export const getCoinModel = params => {return axios.get(urlCy+'/api/price/getPassGoldCoin').then(res => res.data)};
//修改金币价格  答对奖励  提示扣除  分享可得
export const changeCoin = (passGoldCoin,cueGoldCoin,shareGoldCoin,giveGoldCoin ,startGoldCoin,clearanceGoldCoin) => axios.post(urlCy+'/api/price/setGoldCoinPrice',
{passGoldCoin:passGoldCoin,cueGoldCoin:cueGoldCoin,shareGoldCoin:shareGoldCoin,giveGoldCoin:giveGoldCoin,startGoldCoin:startGoldCoin,clearanceGoldCoin:clearanceGoldCoin});
//删除金币价格信息页面
export const delCoin = (id) => axios.post(url+ '/api/goldCoinRecord/delete/' + id,{});
//通过ID查找金币价格信息页面
export const getCoinID = (id) => axios.get(url + '/api/goldCoinRecord/findById/' + id);

/*拼音管理*/
//分页查拼音
export const getAllpinyin = (page,size) => axios.get(url+'/api/pinYinWord/findByPage?page='+page+'&size='+size).then(res => res.data);
//删除拼音
export const delPinyin = (id) => axios.post(url+'/api/pinYinWord/delete/'+id).then(res => res.data);
//增加拼音
export const addPinyin = params => {return axios.post(url+'/api/pinYinWord/add',params).then(res => res.data)};
//更新拼音信息
export const updatePinyin = parmas =>{return axios.post(url+'/api/pinYinWord/update',parmas).then(res =>res.data)};
//查找未收录的拼音
export const getNopinyin = (page,size) => axios.get(url+'/api/pinYinWord/findByNoMean?page='+page+'&size='+size).then(res => res.data);

/*明星管理*/
//分页查明星
export const getAllstar = (page,size) => axios.get(url + '/api/star/findByPage?page='+page+'&size='+size).then(res => res.data);
//上传明星图片
export const uploadStarPic = params =>{return axios.post(urlMx + '/api/file/uploadStarPic/'+params.id,params.fd).then(res => res.data)};
//增加明星
export const addStar = params => {return axios.post(url+'/api/star/add',params).then(res => res.data)};
//删除明星
export const delStar =  (id) => axios.post(url+'/api/star/delete/'+id).then(res => res.data)
//编辑明星
export const updateStar = parmas => {return axios.post(url+ '/api/star/update',parmas).then(res => res.data)};
//查找未收录的明星
export const getNoStar = (page,size) => axios.get(url+'/api/star/findByNoRemark?page='+page+'&size='+size).then(res => res.data);


/*错别字管理 */
//分页查错别字
export const getWrongWords = (page,size)=> axios.get(url + '/api/wrongWord/findByPage?page='+page+'&size='+size).then(res => res.data);
//增加错别字
export const addWrongWord = params => {return axios.post(url+'/api/wrongWord/add',params).then(res => res.data)};
//删除错别字
export const delWrongWord =  (id) => axios.post(url+'/api/wrongWord/delete/'+id).then(res => res.data)
//编辑错别字
export const updateWrongword = parmas => {return axios.post(url+ '/api/wrongWord/update',parmas).then(res => res.data)};
//查找未收录的错别字
export const getNoWrongWord = (page,size) => axios.get(url+'/api/wrongWord/findByNoMean?page='+page+'&size='+size).then(res => res.data);

