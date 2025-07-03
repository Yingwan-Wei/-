document.addEventListener('DOMContentLoaded', function() {
    // 获取所有导航链接和章节
    const navLinks = document.querySelectorAll('.nav-link');
    const chapters = document.querySelectorAll('.chapter');
    const navHeaders = document.querySelectorAll('.nav-header');

    // 为每个导航链接添加点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            chapters.forEach(c => c.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            
            // 显示对应的章节
            const targetId = this.getAttribute('href').substring(1);
            const targetChapter = document.getElementById(targetId);
            if (targetChapter) {
                targetChapter.classList.add('active');
            }
            
            // 如果是子菜单项，展开对应的父菜单
            if (this.classList.contains('sub-link')) {
                const parentItem = this.closest('.nav-item');
                const parentHeader = parentItem.querySelector('.nav-header');
                const subMenu = parentItem.querySelector('.sub-menu');
                
                // 展开父菜单
                parentHeader.classList.add('expanded');
                subMenu.classList.add('expanded');
            }
            
            // 平滑滚动到顶部（移动端）
            if (window.innerWidth <= 768) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 为可展开的目录标题添加点击事件
    navHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const navItem = this.closest('.nav-item');
            const subMenu = navItem.querySelector('.sub-menu');
            
            // 切换展开状态
            this.classList.toggle('expanded');
            subMenu.classList.toggle('expanded');
        });
    });

    // 根据URL哈希值设置初始章节
    function setInitialChapter() {
        const hash = window.location.hash;
        if (hash) {
            const targetLink = document.querySelector(`a[href="${hash}"]`);
            if (targetLink) {
                targetLink.click();
            }
        }
    }

    // 监听URL哈希变化
    window.addEventListener('hashchange', setInitialChapter);
    
    // 页面加载时设置初始章节
    setInitialChapter();

    // 添加键盘快捷键支持
    document.addEventListener('keydown', function(e) {
        const activeLink = document.querySelector('.nav-link.active');
        if (!activeLink) return;
        
        const currentIndex = Array.from(navLinks).indexOf(activeLink);
        
        if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            navLinks[currentIndex - 1].click();
        } else if (e.key === 'ArrowDown' && currentIndex < navLinks.length - 1) {
            e.preventDefault();
            navLinks[currentIndex + 1].click();
        }
    });

    // 优化移动端体验
    if ('ontouchstart' in window) {
        navLinks.forEach(link => {
            link.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            link.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
});