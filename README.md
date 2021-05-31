# 推薦餐廳清單 (restaurant menu)

一個用Node.js & Express & MongoDB 打造的餐廳清單網站

![登入](https://user-images.githubusercontent.com/82774991/120229024-dd55fd00-c27e-11eb-9f05-744114709106.PNG)
![註冊](https://user-images.githubusercontent.com/82774991/120229029-e0e98400-c27e-11eb-8496-3e8043224c8d.PNG)
![首頁](https://user-images.githubusercontent.com/82774991/120229056-f1016380-c27e-11eb-88db-2df3a5936d71.PNG)
![登出](https://user-images.githubusercontent.com/82774991/120229035-e47d0b00-c27e-11eb-99d3-b239b0323ca7.PNG)


## 功能描述 (features)
* 使用者可以註冊帳號
* 使用者也可以透過 Facebook Login 直接登入
* 使用者可以建立並管理專屬他的一個餐廳清單
* 使用者可新增喜愛的餐廳於清單中
* 使用者可於首頁點選任一餐廳，呈現類別、地址等資訊內容
* 使用者可於搜尋欄位輸入餐廳名稱或類別
* 使用者可編輯餐廳相關資訊
* 使用者可刪除餐廳

## 環境建置與需求 (prerequisites)
* Node.js: v10.15.0
* Visual Studio Code: version 1.56
* Express: ^4.17.1
* Express-handlebars: ^5.3.0
* handlebars-helpers: ^0.10.0
* body-parser: ^1.19.0
* mongoose: ^5.12.7
* method-override: ^3.0.0
* bcryptjs: ^2.4.3
* connect-flash: ^0.1.1
* dotenv: ^10.0.0
* express-session: ^1.17.2
* passport: ^0.4.1
* passport-facebook: ^3.0.0
* passport-local: ^1.0.0

## 安裝與執行步驟 (installation and execution)
1.開啟終端機並輸入以下指令
```
git clone https://github.com/a22627046/restaurant_menu-_-CRUD.git
```
2.安裝專案工具
```
cd restaurant_menu_CRUD  //切換該專案資料夾
```
```
npm install  //安裝相關套件
```
3.於終端機建立種子資料
```
npm run seed
```
4.於終端機開啟專案
```
npm run dev
```