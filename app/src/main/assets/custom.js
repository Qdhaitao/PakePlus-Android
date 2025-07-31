console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
    'color:orangered;font-weight:bolder'
)

// 设置最小字体大小
function setMinimumFontSize() {
    // 创建style元素
    const style = document.createElement('style');
    // 设置基础字体大小为最小（12px通常是浏览器能显示的最小字体）
    // 同时禁用文本大小调整
    style.textContent = `
        html {
            font-size: 15px !important;
            -webkit-text-size-adjust: none !important;
            text-size-adjust: none !important;
        }
        body {
            font-size: inherit !important;
        }
    `;
    // 将style元素添加到head
    document.head.appendChild(style);
    
    // 针对Android系统的额外处理
    if (/Android/i.test(navigator.userAgent)) {
        document.documentElement.style.fontSize = '12px';
    }
}

// 页面加载完成后设置最小字体
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setMinimumFontSize);
} else {
    setMinimumFontSize();
}

// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

