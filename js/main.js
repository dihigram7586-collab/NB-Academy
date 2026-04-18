document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and times (close)
            const icon = mobileBtn.querySelector('i');
            if(icon) {
                if(navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Navbar Scroll Effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Scroll Animations
    const animatedElements = document.querySelectorAll('.animate-fade-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // The element is already styled with animation, we just ensure it plays 
                // by adding a class if we were to trigger it dynamically.
                // Since it's CSS animation forwards, it will play once it's in the DOM.
                // If we want it to trigger only on scroll:
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused'; // Pause initially
        observer.observe(el);
    });

    // --- Admin Dashboard Logic ---
    const adminLogin = document.getElementById('admin-login');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    
    if (adminLogin && loginForm) {
        // Simple client-side simulation for demo purposes
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const pass = document.getElementById('admin-password').value;
            if (pass === 'admin123') {
                adminLogin.style.opacity = '0';
                setTimeout(() => { adminLogin.style.display = 'none'; }, 300);
            } else {
                loginError.style.display = 'block';
            }
        });
    }

    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const fileNameDisplay = document.getElementById('file-name-display');
    const uploadForm = document.getElementById('upload-form');
    const uploadSuccess = document.getElementById('upload-success');

    if (dropZone && fileInput) {
        // Handle drag events
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
        });

        dropZone.addEventListener('drop', (e) => {
            let dt = e.dataTransfer;
            let files = dt.files;
            handleFiles(files);
        });

        fileInput.addEventListener('change', function() {
            handleFiles(this.files);
        });

        function handleFiles(files) {
            if (files.length > 0) {
                fileNameDisplay.textContent = `Selected file: ${files[0].name}`;
                // Set the file input files property to the dropped files
                // This is slightly tricky programmatically due to security, but works for UI demo
            }
        }
    }

    if (uploadForm) {
        uploadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate file selection
            if (!fileInput.files.length && !fileNameDisplay.textContent) {
                alert("Please select a file to upload.");
                return;
            }
            
            const btn = document.getElementById('upload-btn');
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="margin-right: 0.5rem;"></i> Uploading...';
            btn.disabled = true;

            // Simulate upload delay
            setTimeout(() => {
                uploadSuccess.style.display = 'block';
                btn.innerHTML = '<i class="fa-solid fa-upload" style="margin-right: 0.5rem;"></i> Upload Material';
                btn.disabled = false;
                uploadForm.reset();
                fileNameDisplay.textContent = '';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    uploadSuccess.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
});
