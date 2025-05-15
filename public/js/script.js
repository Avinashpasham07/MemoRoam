(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  // sign in
  document.getElementById('password').addEventListener('input', function(e) {
    const password = e.target.value;
    const bars = document.querySelectorAll('.strength-bar');
    
    bars.forEach(bar => bar.style.background = '#e0e0e0');
    
    if (password.length > 0) bars[0].style.background = '#FF4D4D';
    if (password.length >= 6) bars[1].style.background = '#FFA500';
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      bars[2].style.background = '#4BB543';
    }
  });

    /* flash  */
      // Add smooth dismiss animation
    document.querySelectorAll('.btn-close-custom').forEach(button => {
        button.addEventListener('click', function() {
            const alert = this.closest('.alert');
            alert.style.transform = 'translateY(-20px)';
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.remove();
            }, 300);
        });
    });
    
    // Auto-dismiss after 5 seconds
    document.querySelectorAll('.alert').forEach(alert => {
        setTimeout(() => {
            alert.style.transform = 'translateY(-20px)';
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });
  // index
   // Enhanced tax toggle functionality with animation
    const taxSwitch = document.getElementById('switchCheckDefault');
    taxSwitch.addEventListener("change", function() {
        const taxInfoElements = document.querySelectorAll('.tax-info');
        
        if (this.checked) {
            taxInfoElements.forEach(el => {
                el.style.opacity = '1';
                el.style.maxHeight = '50px';
                el.style.marginLeft = '8px';
            });
        } else {
            taxInfoElements.forEach(el => {
                el.style.opacity = '0';
                el.style.maxHeight = '0';
                el.style.marginLeft = '0';
            });
        }
    });
    
    // Initialize tax info as hidden by default with smooth transition
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.tax-info').forEach(el => {
            el.style.transition = 'all 0.3s ease';
            el.style.opacity = '0';
            el.style.maxHeight = '0';
            el.style.overflow = 'hidden';
            el.style.display = 'inline-block';
        });
    });