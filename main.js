// アプリケーション作成用のモジュールを読み込み
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
  
const path = require('path');
const url = require('url');
  
// メインウィンドウ
let mainWindow;

function createWindow () {
  // メインウィンドウを作成します
  mainWindow = new BrowserWindow({width: 1200, height: 800, icon:  __dirname + '/public/alphaDemo.ico'});
  mainWindow.setMenu(null)
  // メインウィンドウに表示するURLを指定します
  // （今回はmain.jsと同じディレクトリのindex.html）
  mainWindow.loadURL("file://" + __dirname + "/public/index.html");
  //mainWindow.loadURL('http://localhost:3000');
  //mainWindow.webContents.openDevTools()
  // メインウィンドウが閉じられたときの処理
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
//  初期化が完了した時の処理
app.on('ready', createWindow);
  
// 全てのウィンドウが閉じたときの処理
app.on('window-all-closed', function () {
  // macOSのとき以外はアプリケーションを終了させます
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
app.on('activate', function () {
  /// メインウィンドウが消えている場合は再度メインウィンドウを作成する
  if (mainWindow === null) {
    createWindow();
  }
});

var shouldQuit = app.makeSingleInstance((argv, workingDirectory) => {
})
if (shouldQuit) app.quit()