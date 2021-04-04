const cookieName = 'hit'
const cookieKey = 'BYYB_cookie_hit'
const BYYB = init()
const cookieVal = BYYB.getdata(cookieKey)
let times = 1

isSuccess()

function isSuccess(){
    BYYB.setdata('00',`state`)
    BYYB.log(`start: ${BYYB.getdata(`state`)}`)
    add()
}

//新增一个上报
function add() {
	let url = {
		url: `https://xg.hit.edu.cn/zhxy-xgzs/xg_mobile/xsMrsb/csh`,
		headers: {
		  Cookie: cookieVal
		}
	}
	url.headers['Origin'] = 'https://xg.hit.edu.cn'
	url.headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
	url.headers['Host'] = 'xg.hit.edu.cn'
	url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
	BYYB.post(url, (error, response, data) => {
		BYYB.log(`${cookieVal}, data: ${data}.    `)
          getToken()
   
    })
}

function getToken() {
    let url = {
		url: `https://xg.hit.edu.cn/zhxy-xgzs/xg_mobile/xs/getYqxxList`,
		headers: {
			Cookie: cookieVal
		}
    }
    url.headers['Origin'] = 'https://xg.hit.edu.cn'
    url.headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    url.headers['Host'] = 'xg.hit.edu.cn'
    url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'

    BYYB.post(url, (error, response, data) => {
		let tokens = JSON.parse(`${response.body}`)
		let token =`${tokens.module.data[0].id}`
		let state =`${tokens.module.data[0].zt}`
          BYYB.setdata(token,`token`)
          BYYB.setdata(state,`state`)
          //BYYB.setdata('00',`state`)
		//BYYB.log(`token: ${response.body}`)
		BYYB.log(`token: ${BYYB.getdata(`token`)}`)
          BYYB.log(`state: ${BYYB.getdata(`state`)}`)
          report()
    })
}
function report() {
    let url = {
		url: 'https://xg.hit.edu.cn/zhxy-xgzs/xg_mobile/xsMrsb/saveYqxx',
		headers: {
        Cookie: cookieVal
		},
		body: `info=%7B%22model%22%3A%7B%22id%22%3A%22${`${BYYB.getdata(`token`)}`}%22%2C%22dqszd%22%3A%2201%22%2C%22hwgj%22%3A%22%22%2C%22hwcs%22%3A%22%22%2C%22hwxxdz%22%3A%22%22%2C%22gnxxdz%22%3A%22%E9%BB%91%E9%BE%99%E6%B1%9F%E7%9C%81%E5%93%88%E5%B0%94%E6%BB%A8%E5%B8%82%E5%8D%97%E5%B2%97%E5%8C%BA%E6%95%99%E5%8C%96%E8%A1%975%E5%8F%B7%22%2C%22jtszdsfzgfx%22%3A%220%22%2C%22sjszdsfzgfx%22%3A%220%22%2C%22sjxxdz%22%3A%22%22%2C%22sftjwhjhb%22%3A%220%22%2C%22jrtw%22%3A%220%22%2C%22brfsgktt%22%3A%220%22%2C%22brsfjy%22%3A%220%22%2C%22brzdjlbz%22%3A%22%22%2C%22brsflt%22%3A%220%22%2C%22brsfmqjc%22%3A%220%22%2C%22brsfgl%22%3A%220%22%2C%22gllx%22%3A%22%22%2C%22glyy%22%3A%22%22%2C%22glyybz%22%3A%22%22%2C%22sftzrychbwhhl%22%3A%220%22%2C%22sfhsjc%22%3A%220%22%2C%22hsjcjg%22%3A%22%22%2C%22qtbgsx%22%3A%22%E6%97%A0%22%2C%22brsfqzbl%22%3A%220%22%2C%22brsfwzzbl%22%3A%220%22%7D%7D`
  }
    url.headers['Connection'] = 'keep-alive'
    url.headers['Accept-Encoding'] = 'gzip, deflate, br'
    url.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    url.headers['Origin'] = 'https://xg.hit.edu.cn'
    url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
    url.headers['Referer'] = 'https://webapp.csdn.net/'
    url.headers['Host'] = 'xg.hit.edu.cn'
    url.headers['Accept-Language'] = 'zh-CN,zh;q=0.9'
    url.headers['Accept'] = 'application/json, text/javascript, */*; q=0.01'
    let referer = `https://xg.hit.edu.cn/zhxy-xgzs/xg_mobile/xsMrsb/editMrsb?id=${`${BYYB.getdata(`token`)}`}&zt=00`
    url.headers['Referer'] = referer

    BYYB.post(url, (error, response, data) => {
		//BYYB.log(`statu: ${response.statusCode}`)
		//BYYB.log(`https://xg.hit.edu.cn/zhxy-xgzs/xg_mobile/xsMrsb/editMrsb?id=${`${BYYB.getdata(`token`)}`}&zt=00`)
          if(BYYB.getdata(`state`) == '01'){
              BYYB.log(`report: ${BYYB.getdata(`state`)}`)
              BYYB.msg(`上报成功!`)
              BYYB.done()
          }else{
              if(times == 5){
                  BYYB.msg(`上报失败!`)
                  BYYB.done()
              }else{
                  times++
                  BYYB.log(times)
                  add()
              }
          }
		//BYYB.log(`成功！: ${response.body}`)
		//BYYB.done()
    })
}

function init() {
	isSurge = () => {
		return undefined === this.$httpClient ? false : true
    }
    isQuanX = () => {
		return undefined === this.$task ? false : true
    }
	getdata = (key) => {
		if (isSurge()) return $persistentStore.read(key)
		if (isQuanX()) return $prefs.valueForKey(key)
	}
	setdata = (key, val) => {
		if (isSurge()) return $persistentStore.write(key, val)
		if (isQuanX()) return $prefs.setValueForKey(key, val)
	}
	msg = (title, subtitle, body) => {
		if (isSurge()) $notification.post(title, subtitle, body)
		if (isQuanX()) $notify(title, subtitle, body)
	}
	log = (message) => console.log(message)
	get = (url, cb) => {
		if (isSurge()) {
		    $httpClient.get(url, cb)
		}
		if (isQuanX()) {
		    url.method = 'GET'
		    $task.fetch(url).then((resp) => cb(null, resp, resp.body))
		}
	}
	post = (url, cb) => {
		if (isSurge()) {
		    $httpClient.post(url, cb)
		}
		  if (isQuanX()) {
		    url.method = 'POST'
		    $task.fetch(url).then((resp) => cb(null, resp, resp.body))
		}
	}
	done = (value = {}) => {
		$done(value)
	}
	return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
