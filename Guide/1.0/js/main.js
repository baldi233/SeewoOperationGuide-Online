// js/main.js

// 1. 数据结构映射
const menuData = {
    '快速入门': {
        folder: 'QuickStart',
        subItems: [
            { name: '快速了解', file: 'Quick_Overview' },
            { name: '通道切换', file: 'Switch_Channel' },
            { name: 'USB接口', file: 'USB_Port' },
            { name: '连接电脑', file: 'Connect_PC' },
            { name: '正确关机', file: 'Shutdown_Device' }
        ]
    },
    '软件系统': {
        folder: 'Software-System',
        subItems: [
            { name: '小工具', file: 'Widgets' },
            { name: '快捷白板', file: 'Quick_Whiteboard' },
            { name: '文件浏览器', file: 'File_Explorer' },
            { name: '平板管家', file: 'Seewo_Manager' }
        ]
    },
    '硬件维护': {
        folder: 'Hardware-Maintenance',
        subItems: [
            { name: '系统还原', file: 'System_Recovery' },
            { name: '清洁设备', file: 'Clean_Device' }
        ]
    },
    '常见问题': {
        folder: 'FAQ',
        subItems: [
            { name: '开机问题', file: 'Startup' },
            { name: '软件问题', file: 'Software' },
            { name: '触摸问题', file: 'Touch' },
            { name: '声音问题', file: 'Sound' },
            { name: '网络问题', file: 'Network' },
            { name: '显示问题', file: 'Display' },
            { name: '产品咨询', file: 'Product_Enquiries' },
            { name: '其他问题', file: 'Other' },
            { name: '意见反馈', file: 'Feedback' }
        ]
    }
};

// 获取DOM元素
const topNavItems = document.querySelectorAll('.top-nav .nav-item');
const sidebarMenu = document.getElementById('sidebarMenu');
const contentCard = document.getElementById('contentCard');

// 当前选中的状态 (修改点：初始选中改为快速入门)
let currentTopKey = '快速入门';
let currentSubItem = null;

// 初始化渲染
function init() {
    // 默认选中快速入门的第一个子项
    currentSubItem = menuData[currentTopKey].subItems[0];
    renderSidebar(currentTopKey);
    loadContent(currentTopKey, currentSubItem);
    bindTopNavEvents();
}

// 渲染左侧边栏
function renderSidebar(topKey) {
    sidebarMenu.innerHTML = '';
    const subItems = menuData[topKey].subItems;
    
    subItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.name;
        li.dataset.file = item.file;
        
        if (currentSubItem && item.file === currentSubItem.file) {
            li.classList.add('active');
        }
        
        li.addEventListener('click', () => {
            document.querySelectorAll('.sidebar-menu li').forEach(el => el.classList.remove('active'));
            li.classList.add('active');
            
            currentSubItem = item;
            loadContent(currentTopKey, currentSubItem);
        });

        sidebarMenu.appendChild(li);
    });
}

// 动态加载内容 (修复点：补充了 folderName 变量)
async function loadContent(topKey, subItem) {
    // 核心修复：获取文件夹名称，之前缺失这一行导致 JS 报错
    const folderName = menuData[topKey].folder; 
    const filePath = `docs/${folderName}/${subItem.file}.html`;
    
    contentCard.innerHTML = '<div style="color:#888; text-align:center; margin-top:50px;">正在加载内容...</div>';

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`找不到文件：${filePath}`);
        const htmlText = await response.text();
        contentCard.innerHTML = htmlText;
    } catch (error) {
        contentCard.innerHTML = `
            <div style="padding: 20px; background: #fff3f3; border: 1px solid #ffcccc; color: #cc0000; border-radius: 4px;">
                <h3>页面加载失败</h3>
                <p>${error.message}</p>
                <p>请确保您使用了 Live Server 或本地服务器运行本项目。</p>
            </div>
        `;
    }
}

// 绑定顶部导航栏事件
function bindTopNavEvents() {
    topNavItems.forEach(item => {
        item.addEventListener('click', () => {
            topNavItems.forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            
            currentTopKey = item.dataset.key;
            
            // 切换到新的顶部导航时，默认选中该分类下的第一个子项
            currentSubItem = menuData[currentTopKey].subItems[0];
            
            renderSidebar(currentTopKey);
            loadContent(currentTopKey, currentSubItem);
        });
    });
}

// 启动程序
init();


// 将退出按钮的绑定放在 DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    const exitBtn = document.getElementById('exitBtn');
    
    // 防错检查
    if (exitBtn) {
        exitBtn.addEventListener('click', function() {
            console.log('点击了退出按钮，正在跳转回主页...');
            
            // 注意：因为当前页面在 Guide/1.0/ 目录下
            // 要跳转到根目录的 index.html，需要退回两级：../../index.html
            window.location.href = '../../index.html'; 
        });
    } else {
        console.error('未找到退出按钮，请检查 HTML 中是否包含 id="exitBtn"');
    }
});