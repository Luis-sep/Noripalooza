// Contenido del festival. Los retos y las notas viven aquí, en el servidor,
// y solo se envían al navegador cuando el sobre de ese día ya está desbloqueado.

export const CAPSULE_DATE = '2027-12-01';
export const PASSES = 2;
export const AMIGOS_DATE = '2026-12-01'; // Nori ve los mensajes de sus amigos en su cumpleaños
export const MOODS = ['Radiante', 'Inspirada', 'Tranquila', 'Cansada', 'Removida'];
export const CUMPLIO = ['Sí', 'Más de lo esperado', 'No tanto', 'Fue distinto'];

export const DAYS = [
  { k: 'd27', date: '2026-11-27', dow: 'Vie', n: '27', m: 'nov', t: 'La previa', s: 'Bienvenida, tu primer sobre y noche de series.',
    r: '¿Quién eras cuando más brillabas? Escribe qué hacías, qué te gustaba y cómo te vestías.',
    carta: 'Bienvenida a tu festival. Esta semana es toda tuya, para que te acuerdes de lo increíble que eres.',
    c: "Hedwig's Theme", a: 'John Williams' },
  { k: 'd28', date: '2026-11-28', dow: 'Sáb', n: '28', m: 'nov', t: 'Trekking', s: 'Naturaleza y amigas en Huilo Huilo.',
    r: 'Recoge un objeto que te represente hoy y fotografía algo que te llame la atención.',
    carta: 'Hoy camina sin apuro. El bosque crece a su ritmo, y tú también tienes el tuyo.',
    c: 'Gracias a la vida', a: 'Violeta Parra' },
  { k: 'd29', date: '2026-11-29', dow: 'Dom', n: '29', m: 'nov', t: 'Día de amigas', s: 'Compartir con la gente que viene de Santiago.',
    r: 'Pregúntale a cada una qué ven en ti que tú no ves. Anótalo sin discutirlo.',
    carta: 'Qué lindo verte rodeada de tu gente. Escucha bien lo que te digan: tienen razón.',
    c: 'Girls Just Want to Have Fun', a: 'Cyndi Lauper' },
  { k: 'd30', date: '2026-11-30', dow: 'Lun', n: '30', m: 'nov', t: 'Crear sin juicio', s: 'Una hora para hacer algo con las manos.',
    r: 'Tienes una hora para hacer algo con las manos. Lo único prohibido: que quede perfecto.',
    carta: 'Hoy no tiene que quedar bonito, tiene que quedar tuyo. Me encanta verte crear.',
    c: 'Dog Days Are Over', a: 'Florence + The Machine' },
  { k: 'd01', date: '2026-12-01', dow: 'Mar', n: '1', m: 'dic', t: '¡Feliz cumpleaños!', s: 'Desayuno sorpresa, regalo y cena especial.',
    r: 'Escríbele una carta a tu yo de 10 años y otra a tu yo de un año más.',
    carta: '¡Feliz cumpleaños, mi amor! Gracias por compartir tu vida conmigo. Hoy celebramos todo lo que eres. Te amo.',
    c: 'Where You Lead', a: 'Carole King' },
  { k: 'd02', date: '2026-12-02', dow: 'Mié', n: '2', m: 'dic', t: 'Cita contigo', s: 'Dos horas solo para ti.',
    r: 'Dos horas sola en un lugar que te dé curiosidad. Sin celular, si te atreves.',
    carta: 'Hoy te toca a ti. Ve donde te lleve la curiosidad; yo te espero con ganas de que me cuentes.',
    c: 'Flowers', a: 'Miley Cyrus' },
  { k: 'd03', date: '2026-12-03', dow: 'Jue', n: '3', m: 'dic', t: 'Lo que te mueve', s: 'Volver a lo que te hacía perder la noción del tiempo.',
    r: 'Haz una lista de 10 cosas que te hacían perder la noción del tiempo. Encierra en un círculo las que extrañas.',
    carta: 'Lo que te hacía brillar antes sigue ahí. Solo hay que ir a buscarlo, y aquí estoy para acompañarte.',
    c: 'Here Comes the Sun', a: 'The Beatles' },
  { k: 'd04', date: '2026-12-04', dow: 'Vie', n: '4', m: 'dic', t: 'En familia', s: 'Parrilla en Victoria.',
    r: 'Hoy observa: ¿en qué momento del día te sentiste más tú?',
    carta: 'Gracias por ser parte de mi familia. Verte en la mesa con los míos me hace muy feliz.',
    c: 'Tren al sur', a: 'Los Prisioneros' },
  { k: 'd05', date: '2026-12-05', dow: 'Sáb', n: '5', m: 'dic', t: 'Gratitud', s: 'Un día tranquilo en Victoria.',
    r: 'Escribe 10 momentos de esta semana que quieres recordar siempre.',
    carta: 'De todo lo de esta semana, lo que más voy a recordar es tu sonrisa.',
    c: 'What a Wonderful World', a: 'Louis Armstrong' },
  { k: 'd06', date: '2026-12-06', dow: 'Dom', n: '6', m: 'dic', t: 'Gran cierre', s: 'Mira todo lo que creaste.',
    r: 'Relee todo lo que escribiste. Elige una cosa para retomar en diciembre y escribe tu primer paso.',
    carta: 'Gracias por jugar este juego conmigo. Lo que descubriste estos días es tuyo para siempre. Cuenta conmigo para tu próximo paso.',
    c: "I'll Be There for You", a: 'The Rembrandts' },
];
