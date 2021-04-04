# HIT-reporter

> 基于Quantumult X的HIT每日上报脚本

> 2020.4.4 不确定Cookie可用时长，后面可能会更新


## 配置 (QuanX)

```properties
[MITM]
xg.hit.edu.cn

[rewrite_local]
//Cookie获取js
^https:\/\/xg\.hit\.edu\.cn\/zhxy-xgzs\/xg_mobile\/xsHome$ url script-request-header https://raw.githubusercontent.com/7k7k163/HIT-reporter/main/hit.cookie.js

[task_local]
//每日上报js
2 0 * * * https://raw.githubusercontent.com/7k7k163/HIT-reporter/main/hit.js, tag=hit, img-url=https://raw.githubusercontent.com/7k7k163/HIT-reporter/main/hit.png, enabled=true
```

## 说明

1. 先把`xg.hit.edu.cn`加到`[MITM]`
2. 再添加相应配置:
   - QuanX: 按上述配置添加
3. 关闭VPN，打开浏览器访问: https://xg.hit.edu.cn/zhxy-xgzs/xg_mobile/shsj/loginChange 登陆
4. 成功后打开VPN，刷新网页：https://xg.hit.edu.cn/zhxy-xgzs/xg_mobile/xsHome
5. 系统提示: `获取Cookie: 成功`

> 第 1 条脚本是用来获取 cookie 的, 用浏览器访问一次获取 cookie 成功后就可以删掉或注释掉了（不确定Cookie存活时长）, 但请确保在`登录成功`后再获取 cookie.

> 第 2 条脚本是签到脚本, 每天`00:00:02`执行一次.

## 常见问题

1. 无法写入 Cookie

   - 请确认重写已打开且已添加MITM
   - 如果你用的是 Safari, 请尝试在浏览地址栏`手动输入网址`(不要用复制粘贴)

2. 写入 Cookie 成功, 但签到不成功

   - 在不同网络下的Cookie会改变，请重新获取一次Cookie

3. 为什么有时成功有时失败

   - 很正常，网络问题，上报也可能有检测机制
   - 暂时不考虑代码级的重试机制，但咱有配置级的（暴力美学）：

   - `QuanX`配置:

     ```properties
     [task_local]
     2 0 * * * xxx.js # 每天00:02执行一次
     4 0 * * * xxx.js # 每天00:04执行一次
     6 0 * * * xxx.js # 每天00:06执行一次

     */60 * * * * xxx.js # 每60分执行一次
     ```
## 关于Quantumult X
>相应教程请查看[Quantumult X 不完全教程](https://www.notion.so/Quantumult-X-1d32ddc6e61c4892ad2ec5ea47f00917)

## 感谢

[@chavyleung](https://github.com/chavyleung)
