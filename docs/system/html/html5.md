# 前言

HTML5 是 HTML 的最新版本，由万维网联盟（W3C）在 2014 年 10 月完成标准制定。它旨在更好地支持多媒体内容，在移动设备上进行优化，并提供新的 API 和元素，以改善网络应用的性能和用户体验。

## HTML5 的新特性

### 语义元素

HTML5 引入了一系列新的语义元素，使得网页结构更加清晰，例如：

- `<header>`：表示页面或部分内容的头部。
- `<footer>`：表示页面或部分内容的底部。
- `<article>`：表示独立的内容区域。
- `<section>`：表示文档中的一个区段。
- `<nav>`：表示导航链接的部分。
- `<aside>`：表示与周围内容独立的部分，如侧边栏。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML5 示例</title>
  </head>
  <body>
    <header>
      <h1>网站的头部</h1>
    </header>
    <nav>
      <ul>
        <li><a href="#home">首页</a></li>
        <li><a href="#news">新闻</a></li>
      </ul>
    </nav>
    <section>
      <h2>内容区段</h2>
      <p>这是一个内容区段。</p>
    </section>
    <article>
      <h2>独立内容区域</h2>
      <p>这是一个独立的内容区域。</p>
    </article>
    <aside>
      <h2>侧边栏</h2>
      <p>这里是侧边栏信息。</p>
    </aside>
    <footer>
      <p>版权信息</p>
    </footer>
  </body>
</html>
```

### 表单控件

HTML5 提供了新的表单类型和属性，使得表单更加用户友好，例如：

- `type="email"`、`type="url"`、`type="number"`：指定输入字段的类型。
- `placeholder`：提供输入字段的提示信息。
- `required`：指定输入字段为必填。
- `autofocus`：页面加载时自动聚焦到指定的输入字段。

```html
<form>
  <input type="email" placeholder="请输入邮箱" required />
  <button type="submit">提交</button>
</form>
```

### 图形和多媒体

- `<canvas>`：允许在网页上进行图形绘制。
- `<svg>`：用于在网页上嵌入矢量图形。
- `<audio>`和`<video>`：使得在网页上嵌入音频和视频内容变得更加简单，无需依赖第三方插件。

```html
<!-- audio -->
<audio controls>
  <source src="music.mp3" type="audio/mpeg" />
  您的浏览器不支持 audio 元素。
</audio>
<!-- video -->
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.ogg" type="video/ogg" />
  您的浏览器不支持 video 标签。
</video>
<!-- canvas -->
<canvas id="myCanvas" width="200" height="100"></canvas>
<script>
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(0, 0, 150, 75);
</script>
```

### 本地存储

HTML5 提供了本地存储的解决方案，如：

- Web Storage（`localStorage`和`sessionStorage`）：允许网站存储数据在用户的本地系统上。
- IndexedDB：一个更强大的客户端存储 API。

```js
// localStorage：本地永久存储，即使关闭浏览器窗口，存储的数据也不会丢失。
localStorage.setItem('username', 'John');
console.log(localStorage.getItem('username'));
// sessionStorage：会话期间存储，当关闭浏览器窗口或标签页时，存储的数据会被清除。
sessionStorage.setItem('pageVisited', true);
console.log(sessionStorage.getItem('pageVisited'));
```

### 离线应用

通过 Application Cache（AppCache），网站可以在没有网络连接的情况下运行，提高了用户体验。

以下是如何实现 HTML5 离线应用的一些关键步骤和示例：

**1. 创建一个清单文件（Manifest）**

清单文件（通常是.appcache 扩展名）定义了应用程序所需的文件和资源，以及哪些文件需要在线访问，哪些文件是离线时的备用资源。

```
CACHE MANIFEST
# v1.0
CACHE:
index.html
styles.css
scripts/app.js

NETWORK:
api/

FALLBACK:
/ /offline.html
```

在这个配置中：

- CACHE 部分列出了需要缓存的文件。
- NETWORK 部分指定了需要在线访问的资源，例如 API 请求。
- FALLBACK 部分定义了当特定资源无法访问时的备用页面，如/offline.html 作为默认的离线页面。

**2. 在 HTML 中引用清单文件**

在 HTML 文档的`<html>`标签中添加 manifest 属性，指向清单文件。

```html
<!DOCTYPE html>
<html lang="en" manifest="app.manifest">
  <head>
    <meta charset="UTF-8" />
    <title>离线应用示例</title>
  </head>
  <body>
    <h1>这是一个离线应用</h1>
  </body>
</html>
```

**3. 使用 JavaScript 控制缓存更新**

可以通过 JavaScript 监听应用缓存事件，并在需要时更新缓存。

```js
var appCache = window.applicationCache;
appCache.update(); // 手动触发更新检查

appCache.addEventListener(
  'updateready',
  function (e) {
    if (appCache.status == appCache.UPDATEREADY) {
      appCache.swapCache(); // 交换缓存
    }
  },
  false
);
```

**4. 测试离线缓存**

将项目目录复制到没有互联网连接的测试服务器上，禁用网络连接，然后使用浏览器访问 HTML 文件，以测试离线缓存是否正确工作。

#### HTML5 离线应用的优缺点

**优点：**

- 离线访问：用户可以在没有网络连接的情况下使用应用。
- 加快加载速度：已缓存的资源加载更快。
- 减少服务器负载：浏览器只下载更新过的资源，减少服务器请求。

**缺点：**

- 缓存管理：需要手动更新缓存，否则用户可能会使用过期的资源。
- 兼容性问题：不同浏览器对 HTML5 的支持可能存在差异。
- 安全性：离线应用可能会暴露敏感信息或攻击目标系统。

#### 注意事项

- 缓存的资源必须在同一域名下。
- 一旦实现了 HTML5 离线缓存，缓存的文件在客户端将一直保留，除非手动清除浏览器缓存。
- 修改缓存清单文件会导致浏览器重新下载所有列出的文件。
- 确保要缓存的资源文件与清单文件中指向的 URL 完全匹配，包括子目录和查询字符串。
- 每个缓存在浏览器中的资源文件大小不能超过 50MB。
- 对于很少更新的文件，如图片或视频，使用离线缓存可以减少服务器访问次数。但对于经常变化的内容，离线缓存不太适用。

## HTML5 的新 API

HTML5 提供了许多新的 API，用于增强网页的功能和性能，例如：

### 拖拽 API

拖拽 API 允许用户拖动页面上的元素，并在拖动过程中进行自定义操作。这个 API 由一系列的事件组成，包括 ondragstart、ondrag、ondragend、ondragenter、ondragover、ondragleave 和 ondrop。

**示例：拖动图片到特定区域**

```html
<div id="dragArea" style="width:300px; height:200px; border:1px solid black;">
  拖动图片到这个区域
</div>
<img src="image.png" id="dragImg" draggable="true" />
<script>
  var dragImg = document.getElementById('dragImg');
  var dragArea = document.getElementById('dragArea');

  dragImg.ondragstart = function (e) {
    e.dataTransfer.setData('dragId', e.target.id);
  };

  dragArea.ondragover = function (e) {
    e.preventDefault(); // 必须阻止默认行为
  };

  dragArea.ondrop = function (e) {
    e.preventDefault();
    var dragId = e.dataTransfer.getData('dragId');
    var draggedElem = document.getElementById(dragId);
    dragArea.appendChild(draggedElem);
  };
</script>
```

### 地理定位 API（Geolocation API）

Geolocation API 允许网站获取用户的地理位置信息，如经纬度。

```html
<button onclick="getLocation()">获取位置</button>
<div id="location"></div>
<script>
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      document.getElementById('location').innerHTML =
        'Geolocation is not supported by this browser.';
    }
  }

  function showPosition(position) {
    document.getElementById('location').innerHTML =
      'Latitude: ' + position.coords.latitude + '<br>Longitude: ' + position.coords.longitude;
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        document.getElementById('location').innerHTML = 'User denied the request for Geolocation.';
        break;
      // 其他错误处理...
    }
  }
</script>
```

### 全屏 API

全屏 API 允许 Web 应用程序进入全屏模式。

```html
<button onclick="openFullscreen()">进入全屏</button>
<script>
  function openFullscreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      /* Firefox */
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      /* IE/Edge */
      document.documentElement.msRequestFullscreen();
    }
  }
</script>
```

### Web Workers

HTML5 支持 Web Workers，允许 JavaScript 在后台线程中运行，不阻塞主线程，提高了页面性能。

1. Worker：用于创建 web worker。
2. postMessage：用于向 web worker 发送消息。
3. onmessage：用于处理从 web worker 接收的消息。
4. terminate：用于停止 web worker。

```js
/* index.js */
// 创建 web worker
const worker = new Worker('worker.js');
worker.onmessage = function (event) {
  console.log(event.data);
};

/* worker.js */
// 发送消息
self.postMessage('Hello from worker!');
```

### WebSockets

WebSockets API 提供了一种在用户和服务器之间进行全双工通信的方式，适用于实时通信应用。

```js
var socket = new WebSocket('ws://example.com/socketserver');
socket.onopen = function (event) {
  socket.send('Hello Server!');
};
socket.onmessage = function (event) {
  console.log('Message from server ', event.data);
};
```

> 注：WebSockets API 需要服务器支持，如 Node.js 的 WebSocket 模块。

## 性能优化

HTML5 提供了多种性能优化的手段，如减少 HTTP 请求、使用 CDN、压缩资源等。例如：

**1. 图像和视频文件的大小优化**

图像和视频文件较大，可能会显著增加页面的大小。因此，需要尽量减少下载到用户设备的字节数。可以通过`srcset`提供不同分辨率的图像版本来优化性能。

```html
<!-- 使用srcset提供不同分辨率的图像 -->
<img
  srcset="image-small.jpg 500w, image-medium.jpg 1000w, image-large.jpg 1500w"
  sizes="(max-width: 500px) 500px,
            (max-width: 1000px) 1000px,
            1500px"
  src="image-medium.jpg"
  alt="可伸缩的图像" />
```

上面代码中，srcset 属性提供了不同分辨率的图像文件，而 sizes 属性定义了不同屏幕尺寸下的图像尺寸。浏览器会根据设备屏幕和分辨率选择最合适的图像。

**2. 嵌入内容的交付**

嵌入内容，如使用\<iframe>元素加载的内容，可能会显著影响性能。应仔细考虑是否真的需要嵌入内容。

```html
<iframe src="embed-content.html" loading="lazy" title="嵌入内容"></iframe>
```

上面代码中，loading="lazy"属性使得\<iframe>延迟加载，直到用户滚动到它的位置时才开始加载，从而改善了页面的感知性能。

**3. 资源加载顺序**

为了最大化感知性能和实际性能，HTML 应该首先按照在页面上出现的顺序加载。可以利用各种特性来影响资源加载顺序以获得更好的性能。

```html
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin />
```

上面代码中，使用\<link rel="preload">可以提前加载关键的字体资源，确保页面渲染时字体已经可用。

### 兼容性和支持

现代浏览器如 Chrome、Firefox、Safari 和 Edge 广泛支持 HTML5 特性。对于旧版本的浏览器，可能需要使用 polyfills 或者 shivs 来提供支持。

### 新的 API

HTML5 还提供了一系列新的 API，如：

- Geolocation API：获取用户的位置信息。
- File API：处理文件上传等。
- WebRTC API：用于实时通信。

## 总结

HTML5 相较 HTML4 提供了许多新的特性，如语义化、多媒体支持、本地存储等。同时，HTML5 也引入了一些新的 API 和 Web 标准，如 Web Workers、WebSockets。合理使用 HTML5 特性可以提高 Web 应用的性能和用户体验。
