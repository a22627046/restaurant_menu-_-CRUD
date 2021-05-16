# 推薦餐廳清單 (restaurant menu)

此專案主要是搜尋推薦餐廳及餐廳的詳細資訊。

 ![image](https://user-images.githubusercontent.com/82774991/118403178-c79de080-b69f-11eb-8915-a586b2f61e08.PNG)


## 功能描述 (features)
* 於首頁點選任一餐廳，呈現類別、地址等資訊內容
* 餐廳資訊地址旁的箭頭圖示點選後可連結 Google Map
* 可於搜尋欄位輸入餐廳名稱或類別
* 可新增喜愛的餐廳於清單中
* 可編輯餐廳相關資訊
* 可刪除餐廳

## 環境建置與需求 (prerequisites)
* Node.js
* Visual Studio Code
* Express
* Express-handlebars
* body-parser
* mongoose
* method-override

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