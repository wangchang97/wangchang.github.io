// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 预加载动画
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('hide');
    }, 1500);

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTopButton.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            backToTopButton.classList.remove('show');
        }

        // 滚动动画
        const scrollAnimations = document.querySelectorAll('.scroll-animation');
        scrollAnimations.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('active');
            }
        });

        // 技能进度条动画
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            if (isElementInViewport(bar)) {
                const width = bar.style.width;
                bar.style.setProperty('--progress', width);
                bar.classList.add('animate');
            }
        });

        // 计数器动画
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            if (isElementInViewport(counter) && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 动画持续时间（毫秒）
                const step = Math.ceil(target / (duration / 20)); // 每20毫秒增加的数值
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current > target) {
                        current = target;
                        clearInterval(interval);
                    }
                    counter.textContent = current;
                };

                const interval = setInterval(updateCounter, 20);
            }
        });
    });

    // 返回顶部按钮
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

            // 切换汉堡菜单图标
            const bars = menuToggle.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('animate'));
        });

        // 点击菜单项关闭菜单
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                bars.forEach(bar => bar.classList.remove('animate'));
            });
        });
    }

    // 联系表单提交
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 这里可以添加表单验证和提交逻辑
            const formData = new FormData(contactForm);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // 模拟表单提交成功
            alert('消息已发送！我们会尽快回复您。');
            contactForm.reset();
        });
    }

    // 项目过滤功能（如果在项目页面有分类筛选）
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 移除所有按钮的active类
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // 给当前点击的按钮添加active类
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                projectItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // 添加页面过渡效果
    const pageLinks = document.querySelectorAll('a[href^="http"], a[href^="/"], a[href^="./"], a[href^="../"]');
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 排除锚点链接和下载链接
            if (this.getAttribute('href').startsWith('#') || this.getAttribute('download')) {
                return;
            }
            
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // 创建过渡元素
            const transition = document.createElement('div');
            transition.classList.add('page-transition');
            document.body.appendChild(transition);
            
            // 触发过渡动画
            setTimeout(() => {
                transition.classList.add('active');
            }, 10);
            
            // 页面跳转
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });

    // 检查元素是否在视口中
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0 &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.right >= 0
        );
    }

    // 初始化滚动动画
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});

// 页面加载完成后的处理
window.addEventListener('load', function() {
    // 图片加载完成后隐藏预加载动画
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('hide');
    }

    // 初始化AOS动画库（如果使用）
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
});