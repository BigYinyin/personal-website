document.addEventListener('DOMContentLoaded', function() {
    // 主题切换功能
    const themeToggle = document.getElementById('theme-toggle');
    
    // 检查本地存储中的主题偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // 主题切换按钮点击事件
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // 保存主题偏好到本地存储
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetStr = entry.target.getAttribute('data-target');
                const target = parseFloat(targetStr) || 0;
                animateNumber(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateNumber(element, target) {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                // 根据不同的统计项显示不同的内容
                const nextElement = element.nextElementSibling;
                let statLabel = nextElement.textContent;
                // 检查是否有stat-sub-label
                if (nextElement.classList.contains('stat-sub-label')) {
                    statLabel = nextElement.nextElementSibling.textContent;
                }
                if (statLabel === '临床试验项目') {
                    element.textContent = '10+';
                } else if (statLabel === '医学成果') {
                    element.textContent = '8+';
                } else if (statLabel === '从业年限') {
                    element.textContent = '1.5';
                } else {
                    element.textContent = target + '+';
                }
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }

    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });

    const skillCards = document.querySelectorAll('.skill-card');
    const projectCards = document.querySelectorAll('.project-card');
    const achievementCards = document.querySelectorAll('.achievement-card');

    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(card);
    });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(card);
    });

    achievementCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(card);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.2
    });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });

    const aboutText = document.querySelector('.about-text');
    
    const aboutObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.3
    });

    if (aboutText) {
        aboutText.style.opacity = '0';
        aboutText.style.transform = 'translateX(-30px)';
        aboutText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        aboutObserver.observe(aboutText);
    }

    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.animation = 'fadeInUp 1s ease forwards';

    // 模态框功能
    const modal = document.getElementById('modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const modalIframe = document.querySelector('.modal-iframe');
    const modalTitle = document.querySelector('.modal-title');

    // 获取所有站内文件链接
    const internalLinks = document.querySelectorAll('a[href^="文件/"]');

    // 获取加载动画元素
    const modalLoading = document.querySelector('.modal-loading');

    // 为站内文件链接添加点击事件
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // 清空模态框标题
            modalTitle.textContent = '';
            
            // 显示加载动画
            modalLoading.classList.remove('hidden');
            modalIframe.classList.remove('loaded');
            
            // 显示模态框
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // 防止背景滚动
            
            // 设置iframe源
            modalIframe.src = href;
        });
    });

    // 为iframe添加加载完成事件
    modalIframe.addEventListener('load', function() {
        // 隐藏加载动画，显示内容
        modalLoading.classList.add('hidden');
        modalIframe.classList.add('loaded');
    });

    // 关闭模态框的函数
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // 恢复背景滚动
        // 清空iframe源，防止内存泄漏
        setTimeout(() => {
            modalIframe.src = '';
            // 重置加载动画状态
            modalLoading.classList.remove('hidden');
            modalIframe.classList.remove('loaded');
        }, 300);
    }

    // 为关闭按钮添加点击事件
    modalClose.addEventListener('click', closeModal);

    // 为遮罩层添加点击事件
    modalOverlay.addEventListener('click', closeModal);

    // 为模态框内容添加点击事件，防止点击内容时关闭模态框
    document.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // 为ESC键添加事件监听器，按下ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // 添加点击复制到剪贴板功能
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.style.position = 'relative';
        
        item.addEventListener('click', function() {
            const contactValue = this.querySelector('.contact-value');
            if (contactValue) {
                let textToCopy = contactValue.textContent;
                
                // 处理电话号码，移除连字符
                if (textToCopy.includes('-')) {
                    textToCopy = textToCopy.replace(/-/g, '');
                }
                
                // 复制到剪贴板
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        // 添加复制成功的视觉反馈
                        const originalText = contactValue.textContent;
                        contactValue.textContent = '已复制!';
                        contactValue.style.color = '#4ade80';
                        
                        // 2秒后恢复原始文本和颜色
                        setTimeout(() => {
                            contactValue.textContent = originalText;
                            contactValue.style.color = '';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('复制失败:', err);
                    });
            }
        });
        
        // 添加悬停效果，提示可点击
        item.style.cursor = 'pointer';
        item.style.transition = 'transform 0.2s ease';
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});