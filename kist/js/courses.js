// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Course Category Tabs
const categoryTabs = document.querySelectorAll('.category-tab');
const courseGrids = document.querySelectorAll('.courses-grid');

categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        courseGrids.forEach(grid => grid.classList.remove('active'));
        
        const tabId = tab.getAttribute('data-tab');
        if (tabId === 'all') {
            document.getElementById('all-courses').classList.add('active');
        }
        // Add other tab cases as needed
    });
});

// Schedule Tabs
const scheduleTabs = document.querySelectorAll('.schedule-tab');
const scheduleGrids = document.querySelectorAll('.schedule-grid');

scheduleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        scheduleTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        scheduleGrids.forEach(grid => grid.classList.remove('active'));
        const scheduleId = tab.getAttribute('data-schedule') + '-schedule';
        document.getElementById(scheduleId).classList.add('active');
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    item.addEventListener('click', () => {
        faqItems.forEach(faq => {
            if (faq !== item) {
                faq.classList.remove('active');
            }
        });
        item.classList.toggle('active');
    });
});

// Course Filter
document.getElementById('courseFilter').addEventListener('change', function() {
    const filter = this.value;
    
    if (filter === 'all') {
        document.querySelector('[data-tab="all"]').click();
    } else if (filter === 'diploma') {
        document.querySelector('[data-tab="science"]').click();
    } else if (filter === 'business') {
        document.querySelector('[data-tab="business"]').click();
    } else if (filter === 'btech' || filter === 'mtech' || filter === 'mba') {
        document.querySelector('[data-tab="engineering"]').click();
    }
});

// Search functionality
document.getElementById('courseSearch').addEventListener('keyup', function() {
    const searchTerm = this.value.toLowerCase();
    const activeGrid = document.querySelector('.courses-grid.active');
    if (!activeGrid) return;
    
    const courseCards = activeGrid.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        const title = card.querySelector('.course-title')?.textContent.toLowerCase() || '';
        const parent = card.closest('.col-lg-4, .col-md-6');
        
        if (title.includes(searchTerm)) {
            parent.style.display = 'block';
        } else {
            parent.style.display = 'none';
        }
    });
});

// Counter animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

counters.forEach(counter => {
    const animate = () => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText.replace('+', '');
        
        if (current < target) {
            const increment = Math.ceil(target / speed);
            counter.innerText = Math.min(current + increment, target) + '+';
            setTimeout(animate, 10);
        } else {
            counter.innerText = target + '+';
        }
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(counter);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'var(--dark-green)';
        header.style.boxShadow = 'var(--shadow-lg)';
    } else {
        header.style.background = 'var(--primary-green)';
        header.style.boxShadow = 'var(--shadow-sm)';
    }
});

// Price hover effect
const prices = document.querySelectorAll('.course-price');
prices.forEach(price => {
    price.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    price.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--gold);
            color: var(--dark-green);
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: var(--shadow-gold);
            z-index: 9999;
            animation: slideIn 0.5s ease;
        ">
            <i class="bi bi-check-circle-fill me-2"></i>
            ${message}
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Download button functionality
const downloadBtn = document.querySelector('.btn-outline-light');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Preparing brochure for download...');
        
        setTimeout(() => {
            showNotification('Brochure downloaded successfully!');
        }, 2000);
    });
}
