document.addEventListener('DOMContentLoaded', () => {
    // Animación de las barras de habilidades
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });

    // Añadir botón
    const buttons = document.querySelectorAll('.chat-buttons button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Button clicked:', button.textContent);
        });
    });

});


document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    let currentIndex = 0;

    const slidesPerPage = 2;
    const totalPages = Math.ceil(slides.length / slidesPerPage);

    function moveCarousel() {
        currentIndex = (currentIndex + 1) % totalPages;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Mover el carrusel cada 5 segundos
    setInterval(moveCarousel, 5000);
});


// Modal del carrusel
const modalcarrusel = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeBtn = document.getElementsByClassName('close')[0];

// Abrir modal al hacer clic en una imagen
document.querySelectorAll('.carousel-image').forEach(img => {
    img.addEventListener('click', function() {
        modalcarrusel.style.display = 'block';
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        modalTitle.textContent = this.dataset.title;
        modalDescription.textContent = this.dataset.description;
    });
});

// Cerrar modal
closeBtn.onclick = function() {
    modalcarrusel.style.display = 'none';
}


// Accesibilidad: tecla Escape para cerrar el modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});






// CHAT
const chatContainer = document.getElementById('chat-container');
const optionsContainer = document.getElementById('options-container');
const messageTemplate = document.getElementById('message-template');
const modal = document.getElementById('chatmodal');
const modalImage = document.getElementById('modalchat-image');
const modalCaption = document.getElementById('modalchat-caption');

let messages = [];
let currentOptions = [];
let history = [];

const initialMessage = {
    text: "Hola! Me llamo Robny y soy la ayudante de María. Estoy aquí para enseñarte todo lo que quieras saber sobre su CV y Portfolio: sus estudios, prácticas, experiencia, diseños, ilustraciones y cualquier proyecto en el que haya participado. ¿qué te gustaría saber?",
    sender: 'bot'
};

function addMessage(message) {
    messages.push(message);
    const messageElement = messageTemplate.content.cloneNode(true);
    const bubble = messageElement.querySelector('.chat-bubble');
    const text = messageElement.querySelector('p');
    const img = messageElement.querySelector('img');

    bubble.classList.add(message.sender);
    text.textContent = message.text;

    if (message.image) {
        img.src = message.image;
        img.alt = message.imageTitle;
        img.style.display = 'block';
        img.addEventListener('click', () => openModal(message.image, message.imageTitle));
    }

    chatContainer.appendChild(messageElement);
    scrollToBottom();
}

function setOptions(options) {
    currentOptions = options;
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.addEventListener('click', () => handleOptionClick(option));
        optionsContainer.appendChild(button);
    });
}

function handleOptionClick(option) {
    addMessage({ text: option.text, sender: 'user' });
    history.push(currentOptions);

    let botResponse = { text: '', sender: 'bot' };

    switch(option.value) {
        case 'Diseño':
            botResponse = { 
                text: "Aquí tienes algunos proyectos de Diseño Gráfico de María:", 
                sender: 'bot',
                image: 'img/1Diseño.jpg?height=200&width=200',
                imageTitle: "Diseño de tríptico para la empresa de psicología Erain"
            };
            setOptions([
                { text: "¿Puedes mostrarme más proyectos?", value: "MasDiseño" },
                { text: "¿Qué herramientas usa para diseñar?", value: "HerramientasDiseño" }
            ]);
            break;
        case 'MasDiseño':
            botResponse = {
                text: "Claro, aquí tienes otro ejemplo de proyecto de Diseño Gráfico:",
                sender: 'bot',
                image: 'img/2Diseño.jpg?height=200&width=200',
                imageTitle: "Logotipo para el bar Meraki"
            };
            setOptions([
                { text: "¿Qué herramientas usa para diseñar?", value: "HerramientasDiseño" },
                { text: "Volver al inicio", value: "Inicio" }
            ]);
            break;
        case 'CV':
            botResponse = { 
                text: "Claro, aquí tienes un resumen del CV de María: María ha estudiado Creación y Diseño en la UPV/EHU, graduándose con doble especialidad en Diseño Gráfico e Ilustración. Ha realizado un Máster en 2d, 3d y web, un Máster de profesorado, y actualmente esta estudiando un Máster de Programación para Creativos. Ha llevado a cabo prácticas de trabajo en la empresa One Star, Bobysuh y Micolet. En esta última empresa fue contratada y estuvo trabajando durante 2 años. También ha realizado varios proyectos como autónoma.", 
                sender: 'bot' 
            };
            setOptions([
                { text: "¿Cuál es su experiencia laboral?", value: "Experiencia" },
                { text: "¿Qué estudios tiene?", value: "Estudios" }
            ]);
            break;
        case 'Ilustración':
            botResponse = { 
                text: "Sí, María tiene varios trabajos de ilustración. Aquí tienes un ejemplo:", 
                sender: 'bot',
                image: 'img/3Ilustracion.jpg?height=200&width=200',
                imageTitle: "Ilustración para la versión espacial de Caperucita Roja."
            };
            setOptions([
                { text: "¿Tiene más ejemplos de ilustraciones?", value: "MasIlustraciones" },
                { text: "Quiero ver proyectos de Diseño.", value: "Diseño" }
            ]);
            break;
        case 'MasIlustraciones':
            botResponse = {
                text: "Por supuesto, aquí tienes otro ejemplo de ilustración de María:",
                sender: 'bot',
                image: 'img/4Ilustracion.jpg?height=200&width=200',
                imageTitle: "Ilustración para vinilo decorativo para un cliente privado."
            };
            setOptions([
                { text: "Quiero ver proyectos de Diseño.", value: "Diseño" },
                { text: "Volver al inicio", value: "Inicio" }
            ]);
            break;
        case 'Experiencia':
            botResponse = {
                text: "María tiene experiencia en Diseño Gráfico, Ilustración y Desarrollo Web. Ha trabajado en proyectos para varias empresas como One Star, Bobysuh o Micolet, y también como freelance desarrollando proyectos privados.",
                sender: 'bot'
            };
            setOptions([
                { text: "Volver al inicio", value: "Inicio" },
                { text: "¿Tiene algo sobre Ilustración?", value: "Ilustración" }
            ]);
            break;
        case 'Estudios':
            botResponse = {
                text: "María comenzó sus estudios artísticos en el Bachiller de Artes de Laredo, más tarde se graduó en Creación y Diseño por la Universidad del País Vasco. En los siguientes años ha llevado a cabo 3 Másters en los que ha desarrollado sus habilidades de diseño, programación, ilustración y habilidades para la docencia.",
                sender: 'bot'
            };
            setOptions([
                { text: "Volver al inicio", value: "Inicio" },
                { text: "¿Tiene algo sobre Ilustración?", value: "Ilustración" }
            ]);
            break;
        case 'HerramientasDiseño':
            botResponse = {
                text: "Para la realización de sus diseños María utiliza programas de la Suite de Adobe, como Illustrator, Photoshop, Indesing o Premiere. También usa Visual Studio Code, Canvas o Figma, dependiendo de las necesidades del proyecto",
                sender: 'bot'
            };
            setOptions([
                { text: "Volver al inicio", value: "Inicio" },
                { text: "¿Qué estudios tiene?", value: "Estudios" }
            ]);
            break;
        case 'Inicio':
            return resetChat();
        default:
            botResponse = { 
                text: "Disculpa, no tengo información específica sobre eso. ¿Hay algo más en lo que pueda ayudarte?", 
                sender: 'bot' 
            };
            setOptions([
                { text: "Volver al inicio", value: "Inicio" },
                { text: "No, gracias", value: "Fin" }
            ]);
    }

    setTimeout(() => {
        addMessage(botResponse);
    }, 500);
}

function resetChat() {
    messages = [];
    history = [];
    chatContainer.innerHTML = '';
    addMessage(initialMessage);
    setOptions([
        { text: "Me gustaría comenzar por su CV.", value: "CV" },
        { text: "¿Tiene algo sobre Ilustración?", value: "Ilustración" },
        { text: "Quiero ver proyectos de Diseño.", value: "Diseño" }
    ]);
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function openModal(imageSrc, imageTitle) {
    modalImage.src = imageSrc;
    modalCaption.textContent = imageTitle;
    modal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Inicializar el chat
resetChat();






// Escritura del párrafo tipo máquina de escribir
document.addEventListener('DOMContentLoaded', function() {
    const textoCompleto = "Diseñadora Gráfica e Ilustradora,\n con experiencia en programación\n en HTML, CSS y JavaScript \n- Cantabria, España";
    const textoMostradoElement = document.getElementById('texto-mostrado');
    const textoContenedor = document.getElementById('texto-contenedor');
    let indice = 0;

    function establecerTamañoContenedor() {
        const tempElement = document.createElement('p');
        tempElement.className = 'maquina-escribir';
        tempElement.style.visibility = 'hidden';
        tempElement.style.position = 'absolute';
        tempElement.innerHTML = textoCompleto.replace(/\n/g, '<br>');
        document.body.appendChild(tempElement);

        const altura = tempElement.offsetHeight;
        const ancho = tempElement.offsetWidth;

        document.body.removeChild(tempElement);

        textoContenedor.style.height = `${altura}px`;
        textoContenedor.style.width = `${ancho}px`;
    }

    establecerTamañoContenedor();

    function escribirTexto() {
        if (indice < textoCompleto.length) {
            if (textoCompleto[indice] === '\n') {
                textoMostradoElement.innerHTML += '<br>';
            } else {
                textoMostradoElement.textContent += textoCompleto[indice];
            }
            indice++;
            setTimeout(escribirTexto, 70);
        }
    }

    escribirTexto();
});







// Puntero estético
const contePadre = document.querySelector('.parent')
const puntero = document.querySelector('.puntero')
const puntero2 = document.querySelector('.puntero2')
const ladoPuntero = 20

puntero.style.width = ladoPuntero + "px"
puntero.style.height = ladoPuntero + "px"
puntero.style.borderRadius = ladoPuntero + "px"
puntero2.style.borderRadius = ladoPuntero + "px"

contePadre.addEventListener('mousemove', (e) => {
    puntero.style.top = (e.pageY - (ladoPuntero/2))+ "px"
    puntero.style.left = (e.pageX - (ladoPuntero/2))+ "px"
})








// Fondo animado
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('animatedBackground');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 200; //Número de partículas
    const colors = ['#58E9E4', '#339592']; 

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.5, 
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 0.2 + 0.1, 
            angle: Math.random() * Math.PI * 2
        });
    }

    function drawParticle(particle) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
    }

    function updateParticle(particle) {
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;

        // Cambio dirección
        particle.angle += (Math.random() - 0.5) * 0.1;

        // Mantener partículas dentro del canvas
        if (particle.x < 0 || particle.x > canvas.width) particle.angle = Math.PI - particle.angle;
        if (particle.y < 0 || particle.y > canvas.height) particle.angle = -particle.angle;
    }

    function animate() {
        ctx.fillStyle = 'rgba(26, 36, 38, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            updateParticle(particle);
            drawParticle(particle);
        });

        requestAnimationFrame(animate);
    }

    animate();
});