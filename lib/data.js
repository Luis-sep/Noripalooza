// Contenido del festival. Los retos y las notas viven aquí, en el servidor,
// y solo se envían al navegador cuando el sobre de ese día ya está desbloqueado.

export const CAPSULE_DATE = '2027-12-01';
export const PASSES = 2;
export const AMIGOS_DATE = '2026-12-01';
export const DESAFIOS_DATE = '2026-11-27'; // los desafíos de los amigos se ven desde que parte el festival // Nori ve los mensajes de sus amigos en su cumpleaños
export const MOODS = ['Radiante', 'Inspirada', 'Tranquila', 'Cansada', 'Removida'];
export const CUMPLIO = ['Sí', 'Más de lo esperado', 'No tanto', 'Fue distinto'];

export const DAYS = [
  { k: 'd27', date: '2026-11-27', dow: 'Vie', n: '27', m: 'nov', t: 'La previa', s: 'Bienvenida, tu primer sobre y noche de series.',
    r: '¿Quién eras cuando más brillabas? Escribe qué hacías, qué te gustaba y cómo te vestías.',
    carta: 'Bienvenida a tu festival. Esta semana es toda tuya, para que te acuerdes de lo increíble que eres.',
    c: "Brand New Day", a: "Forty Foot Echo", sp: 'track:3pf2ULNiXoh1alJDbOORUS', f: "Brillar no es algo que se aprende: es algo que se recuerda." },
  { k: 'd28', date: '2026-11-28', dow: 'Sáb', n: '28', m: 'nov', t: 'Trekking', s: 'Naturaleza y amigos en Huilo Huilo.',
    r: 'Recoge un objeto que te represente hoy y fotografía algo que te llame la atención.',
    carta: 'Hoy camina sin apuro. El bosque crece a su ritmo, y tú también tienes el tuyo.',
    c: "Movimiento", a: "Jorge Drexler", sp: 'track:7pBoi7yWCPzn3UjeMsGKg6', f: "Cada paso que das también es una forma de crear." },
  { k: 'd29', date: '2026-11-29', dow: 'Dom', n: '29', m: 'nov', t: 'Día de amigos', s: 'Parrilla y sobremesa en la casa.',
    r: 'Pregúntale a cada uno qué ven en ti que tú no ves. Anótalo sin discutirlo.',
    carta: 'Qué lindo verte rodeada de tu gente. Escucha bien lo que te digan: tienen razón.',
    c: "Shiny Happy People", a: "R.E.M.", sp: 'track:1v2zyAJrChw5JnfafSkwkJ', f: "La gente que te quiere es un espejo donde te ves más bonita." },
  { k: 'd30', date: '2026-11-30', dow: 'Lun', n: '30', m: 'nov', t: 'Crear sin juicio', s: 'Una hora para hacer algo con las manos.',
    r: 'Tienes una hora para hacer algo con las manos. Lo único prohibido: que quede perfecto.',
    carta: 'Hoy no tiene que quedar bonito, tiene que quedar tuyo. Me encanta verte crear.',
    c: "Divenire", a: "Ludovico Einaudi", sp: 'track:6KpO4neDXxGdiEgsivZieY', f: "Lo imperfecto también es arte. Sobre todo lo imperfecto." },
  { k: 'd01', date: '2026-12-01', dow: 'Mar', n: '1', m: 'dic', t: '¡Feliz cumpleaños!', s: 'Desayuno sorpresa, regalo y cena especial.',
    r: 'Escríbele una carta a tu yo de 10 años y otra a tu yo de un año más.',
    carta: '¡Feliz cumpleaños, mi amor! Gracias por compartir tu vida conmigo. Hoy celebramos todo lo que eres. Te amo.',
    c: "Playlist Venezolano", a: "Spotify", sp: 'playlist:0a8iLYgDFOWI2bgoGIYktC', f: "Hoy empieza un año nuevo para crear la vida que quieres." },
  { k: 'd02', date: '2026-12-02', dow: 'Mié', n: '2', m: 'dic', t: 'Cita contigo', s: 'Dos horas solo para ti.',
    r: 'Dos horas sola en un lugar que te dé curiosidad. Sin celular, si te atreves.',
    carta: 'Hoy te toca a ti. Ve donde te lleve la curiosidad; yo te espero con ganas de que me cuentes.',
    c: "Live in the Moment", a: "Portugal. The Man", sp: 'track:60eOMEt3WNVX1m1jmApmnX', f: "La curiosidad es el mapa: déjate guiar por ella." },
  { k: 'd03', date: '2026-12-03', dow: 'Jue', n: '3', m: 'dic', t: 'Lo que te mueve', s: 'Volver a lo que te hacía perder la noción del tiempo.',
    r: 'Haz una lista de 10 cosas que te hacían perder la noción del tiempo. Encierra en un círculo las que extrañas.',
    carta: 'Lo que te hacía brillar antes sigue ahí. Solo hay que ir a buscarlo, y aquí estoy para acompañarte.',
    c: "The Greatest", a: "Sia", sp: 'track:6bLopGnirdrilrpdVB6Um1', f: "Lo que te hacía perder la noción del tiempo sigue esperándote." },
  { k: 'd04', date: '2026-12-04', dow: 'Vie', n: '4', m: 'dic', t: 'Tú y yo', s: 'Un reto para hacer juntos.',
    r: 'Enséñale a Luis algo que te apasione, aunque sea por 15 minutos. Después, él te enseña algo a ti.',
    carta: 'De todo lo de esta semana, lo que más voy a recordar es tu sonrisa.',
    c: "Tus Ojos", a: "Los Cafres", sp: 'track:6yyrsrci6u2nreFlhXSy3J', f: "Enseñar lo que amas es otra manera de crearlo de nuevo." },
  { k: 'd05', date: '2026-12-05', dow: 'Sáb', n: '5', m: 'dic', t: 'En familia', s: 'Parrilla en Victoria con la familia de Luis.',
    r: 'Hoy observa: ¿en qué momento del día te sentiste más tú?',
    carta: 'Gracias por ser parte de mi familia. Verte en la mesa con los míos me hace muy feliz.',
    c: "Bonito", a: "Jarabe De Palo", sp: 'track:5FiB1uNoGZE4PenzZd7Imu', f: "Las raíces también se crean: con cariño, mesa y tiempo." },
  { k: 'd06', date: '2026-12-06', dow: 'Dom', n: '6', m: 'dic', t: 'Gran cierre', s: 'Mira todo lo que creaste.',
    r: 'Relee todo lo que escribiste. Elige una cosa para retomar en diciembre y escribe tu primer paso.',
    carta: 'Gracias por jugar este juego conmigo. Lo que descubriste estos días es tuyo para siempre. Cuenta conmigo para tu próximo paso.',
    c: "Tres mil millones de latidos", a: "Jorge Drexler", sp: 'track:3uXkVGwMiAvcoyNIOyuX4O', f: "Creer en ti es el primer paso de todo lo que vas a crear." },
];

// Quiz para los amigos.
export const QUIZ = [
  { q: "Nori llega sola a una ciudad nueva. ¿Qué pasa en los primeros 10 minutos?", o: ["Encuentra todo a la primera", "Se pierde. Obvio.", "Pregunta y llega perfecto", "Sigue el GPS al pie de la letra"] },
  { q: "¿Cuál es la gran debilidad de Nori?", o: ["Las papas fritas", "Las hamburguesas", "El sushi", "La pizza"] },
  { q: "Le llega un millón de pesos sorpresa. ¿En qué se lo gasta?", o: ["En un viaje, sin pensarlo dos veces", "Lo ahorra, muy responsable", "Ropa nueva", "Un mueble para la casa"] },
  { q: "¿Cómo se llama su perrito?", o: ["Toby", "Pancho", "Rocky", "Lucas"] },
  { q: "¿Qué saga no puede faltar en una noche de películas con Nori?", o: ["Pokémon", "Crepúsculo", "Harry Potter", "Los juegos del hambre"] },
];
export const QUIZ_CLAVE = [1, 2, 0, 3, 2]; // respuestas correctas (Luis puede cambiarlas en su panel)

export const TITULOS = ['Fan número uno del misterio', 'Amistad con mucho por descubrir', 'Compañía de aventuras', 'Amistad de confianza', 'Mejor amistad oficial', 'Alma gemela certificada'];

// Texto del sobre secreto si Luis no escribe otro en su panel.
export const SECRETO_DEFAULT = `¡Lo lograste, Nori! Completaste los 10 retos de tu Noripalooza, y este sobre trae tu premio:

VALE POR UN VIAJE
Una escapada a los géiseres de Alpehue en febrero, solos tú y yo, para hacer ese trekking que esta vez no pudimos.

Tú eliges la fecha; yo me encargo de todo lo demás.

Válido durante el verano 2027.
Con amor, Luis`;
