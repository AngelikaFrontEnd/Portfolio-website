document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('.navbar')
    const navLink=document.querySelectorAll('.nav-link')
    const navList=document.querySelector('.navbar-collapse')
    
    function addShadow() {
        if (window.scrollY >= 50) {
            nav.classList.add('shadow-bg')
        } else {
            nav.classList.remove('shadow-bg')
        }
    }
    
navLink.forEach(link=>link.addEventListener('click',()=> navList.classList.remove('show')))
    window.addEventListener('scroll', addShadow)
})


document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // PokaĹź spinner i zmieĹ tekst przycisku
    document.getElementById('spinner').classList.remove('d-none');
    document.getElementById('submitText').textContent = 'Sending...';
    
    // WyĹÄcz przycisk podczas wysyĹania
    e.target.querySelector('button[type="submit"]').disabled = true;
    
    // Pobierz dane formularza
    const formData = new FormData(this);
    
    // WyĹlij dane przez Fetch API
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Sukces - pokaĹź komunikat
            showAlert('Message sent successfully!', 'success');
            // WyczyĹÄ formularz
            this.reset();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        // BĹÄd - pokaĹź komunikat
        showAlert('There was a problem sending your message. Please try again.', 'danger');
        console.error('Error:', error);
    })
    .finally(() => {
        // Ukryj spinner, przywrĂłÄ tekst i aktywuj przycisk
        document.getElementById('spinner').classList.add('d-none');
        document.getElementById('submitText').textContent = 'Send Message';
        e.target.querySelector('button[type="submit"]').disabled = false;
    });
});

function showAlert(message, type) {
    const alertDiv = document.getElementById('formAlert');
    alertDiv.textContent = message;
    alertDiv.className = `alert mt-3 alert-${type}`;
    alertDiv.classList.remove('d-none');
    
    // Ukryj alert po 5 sekundach
    setTimeout(() => {
        alertDiv.classList.add('d-none');
    }, 5000);
}