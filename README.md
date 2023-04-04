<p align="center">
    <img src=https://avatars.githubusercontent.com/u/10271434?v=4 width=138/>
</p>
<h1 align="center">SSTF</h1>
<p align="center"><strong>基于minitouch和minicap的安卓web投屏工具</strong></p>


## 特征

- 目前支持安卓9-30。
- 目前测试基于雷电模拟器
- 支持鼠标点击web中图像，并将坐标实时传递给模拟器
- 无需安装RethinkDB,CMAke,ZeroMQ等中间件，只需NodeJs环境
- 已为您编译好所需的bin及so文件，完善STF官网缺失的monitouch示例。


## 前提条件

- adb工具包
- nodejs环境

## 快速开始


```sh
# 安装依赖
npm i

# 启动项目
nodejs app.js

```

## 开始体验

- 打开雷电模拟器
- 打开浏览器访问：http://localhost:9002


  ![image](https://raw.githubusercontent.com/weixiaojie/SSTF/main/sstf.gif)


## 待完善

- 监测屏幕方向变化