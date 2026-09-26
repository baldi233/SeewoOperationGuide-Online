// 使用 DOMContentLoaded 确保 DOM 加载完毕后再执行脚本
document.addEventListener('DOMContentLoaded', () => {
    // 1. 获取页面元素
    const guideSelect = document.getElementById('guideSelect');
    const dynamicText = document.getElementById('dynamicText');
    const displayImage = document.getElementById('displayImage');
    const startBtn = document.getElementById('startBtn');

    // 防错检查：如果在控制台看到此报错，说明 HTML 中的 ID 没写对
    if (!guideSelect || !dynamicText || !displayImage || !startBtn) {
        console.error('页面元素绑定失败，请检查 index.html 中的 id 是否与 js 中一致！');
        return;
    }

    // 2. 数据映射配置
    // 注意：这里的 key (0, 1.0, 1.1) 必须与 HTML <option value="..."> 中的值完全一致
    const dataMap = {
        '0': {
            text: '(点击上方选择一个版本进行阅读)',
            imgSrc: 'images/banner1.png' // 请确保这个路径下有这样的图片，或者您自己的图片名
        },
        '1.0': {
            text: '此版本内容源自 F86EA / S86EB 机型',
            imgSrc: 'images/banner1.png' // 请确保这个路径下有这样的图片，或者您自己的图片名
        },
        '1.1': {
            text: '这个版本还没有添加什么内容...',
            imgSrc: 'images/banner2.png' 
        }
    };

    // 3. 监听选择框的变化事件
    guideSelect.addEventListener('change', (event) => {
        const selectedValue = event.target.value; // 获取当前选中的 value (如 "1.0")
        const selectedData = dataMap[selectedValue];

        if (selectedData) {
            // 切换文字
            dynamicText.textContent = selectedData.text;
            
            // 切换图片 (如果图片路径不存在，会自动变为透明并显示 CSS 里的蓝色底色)
            displayImage.src = selectedData.imgSrc;
            
            // 可选：如果图片加载失败，捕获错误并显示一个提示
            displayImage.onerror = () => {
                console.warn(`图片加载失败: ${selectedData.imgSrc}`);
                displayImage.style.opacity = '0'; // 隐藏破损图片图标
            };
            displayImage.style.opacity = '1'; // 重置透明度
        }
    });

    // 4. 监听按钮的点击跳转事件（核心修复部分）
    startBtn.addEventListener('click', () => {
        const selectedVersion = guideSelect.value; // 获取版本号 "1.0"
        
        if (!selectedVersion) {
            alert('请先选择一个版本！');
            return;
        }

        // 拼接目标路径：当前在根目录，所以直接 ./Guide/1.0/index.html
        const targetUrl = `./Guide/${selectedVersion}/index.html`;
        
        console.log('正在跳转到:', targetUrl); // 在控制台打印一下，方便调试
        
        // 执行跳转
        window.location.href = targetUrl;
    });
});