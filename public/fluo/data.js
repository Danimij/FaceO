/* MOTRIZ — base de ejercicios.
 *
 * Enfoque: movilidad y control. La fuerza al servicio del movimiento.
 * Contenido original. El criterio anatómico (qué músculo hace qué y por qué)
 * está inspirado en el enfoque didáctico de plataformas como Muscle & Motion,
 * pero todo el texto es propio.
 *
 * Campos:
 *  cap   capacidad física: fuerza | movilidad | resistencia | potencia | control
 *  pat   patrón motor: empuje | traccion | rodilla | cadera | core | locomocion | rotacion
 *  mat   material necesario: none | maza | goma | peso   (none = solo cuerpo)
 *  lvl   1 inicial · 2 intermedio · 3 avanzado
 *  seg   duración en segundos (trabajo)
 */

const MAT = {
  none: { es: 'Sin material', icon: 'body' },
  maza: { es: 'Mazas / clubs', icon: 'club' },
  goma: { es: 'Gomas elásticas', icon: 'band' },
  peso: { es: 'Kettlebell / mancuernas', icon: 'weight' },
}

const CAPS = {
  fuerza:      { es: 'Fuerza',      color: '#ff6a1f' },
  movilidad:   { es: 'Movilidad',   color: '#2ee6c8' },
  resistencia: { es: 'Resistencia', color: '#c9f24d' },
  potencia:    { es: 'Potencia',    color: '#b07cff' },
  control:     { es: 'Control',     color: '#5ad2ff' },
}

const EX = [
  /* ── MOVILIDAD ───────────────────────────────────────────────── */
  {
    id: 'cat-cow', cap: 'movilidad', pat: 'core', mat: 'none', lvl: 1, seg: 60,
    n: 'Gato-camello',
    s: 'Despertar segmentario de la columna',
    why: 'Moviliza la columna vértebra a vértebra en flexión y extensión. No es un estiramiento: es enseñarle a tu espalda a moverse por partes en vez de en bloque, que es como se mueve cuando lleva horas sentada.',
    steps: ['A cuatro apoyos, manos bajo hombros y rodillas bajo caderas', 'Exhala redondeando la espalda, mete el coxis y hunde el esternón', 'Inhala invirtiendo: pecho adelante, coxis arriba, mirada al frente', 'Ve lento y busca mover cada vértebra, no solo la lumbar'],
    tip: 'Si solo notas la zona baja, estás moviendo la lumbar y dejando la dorsal quieta. Justo la dorsal es la que suele estar rígida.',
  },
  {
    id: 'hip-90-90', cap: 'movilidad', pat: 'cadera', mat: 'none', lvl: 2, seg: 90,
    n: 'Cadera 90-90',
    s: 'Rotación interna y externa de cadera',
    why: 'Trabaja las dos rotaciones de la cadera, que es donde más rango se pierde por estar sentado. Recuperar rotación de cadera descarga la lumbar, que suele compensar lo que la cadera no hace.',
    steps: ['Sentado, una pierna delante a 90° y la otra al lado a 90°', 'Espalda larga, crece desde la coronilla', 'Inclínate sobre la pierna delantera sin redondear', 'Cambia de lado girando por el suelo, sin usar las manos si puedes'],
    tip: 'El cambio de lado sin manos es el ejercicio de verdad. Ahí es donde se entrena el control, no solo el rango.',
  },
  {
    id: 'thoracic-rot', cap: 'movilidad', pat: 'rotacion', mat: 'none', lvl: 1, seg: 75,
    n: 'Rotación torácica',
    s: 'Devolver el giro a la espalda alta',
    why: 'La columna dorsal está hecha para rotar, pero la vida sentada la deja rígida. Cuando no rota, el giro lo asumen la lumbar y el hombro, que no están diseñados para ello. De ahí muchas molestias.',
    steps: ['A cuatro apoyos, una mano en la nuca', 'Lleva el codo hacia el suelo, girando la espalda alta', 'Abre el codo hacia el techo siguiendo con la mirada', 'Caderas quietas: el giro sale del pecho'],
    tip: 'Si las caderas se balancean, estás haciendo trampa con la lumbar. Bloquéalas y el rango real aparecerá, más pequeño y más honesto.',
  },
  {
    id: 'deep-squat', cap: 'movilidad', pat: 'rodilla', mat: 'none', lvl: 1, seg: 90,
    n: 'Sentadilla profunda mantenida',
    s: 'La postura de descanso que hemos perdido',
    why: 'Es una posición de descanso humana universal, que en Occidente se pierde por usar sillas. Mantenerla devuelve rango a tobillo, rodilla y cadera a la vez, y enseña a la columna a sostenerse sin respaldo.',
    steps: ['Pies a la anchura de hombros, puntas ligeramente abiertas', 'Baja todo lo que puedas manteniendo los talones en el suelo', 'Codos por dentro de las rodillas, empujando suave hacia fuera', 'Respira lento y relájate en la posición'],
    tip: 'Si se te levantan los talones, sujétate a algo o pon una cuña bajo ellos. Bajar bien apoyado vale más que bajar sin apoyo mal.',
  },
  {
    id: 'shoulder-cars', cap: 'movilidad', pat: 'empuje', mat: 'none', lvl: 2, seg: 75,
    n: 'Círculos de hombro controlados',
    s: 'Rango real, no rango prestado',
    why: 'Recorrer el rango máximo del hombro de forma lenta y activa enseña al sistema nervioso a controlar todo el arco. Un rango que no controlas no es tuyo: es donde aparecen las lesiones.',
    steps: ['De pie, un brazo extendido al frente', 'Sube en círculo lo más amplio posible, muy lento', 'Mantén el tronco quieto: solo se mueve el hombro', 'Un círculo completo debe durar unos 20 segundos'],
    tip: 'La lentitud es el ejercicio. Si vas rápido, usas inercia y te saltas justo los puntos donde no tienes control.',
  },
  {
    id: 'jefferson-curl', cap: 'movilidad', pat: 'cadera', mat: 'peso', lvl: 3, seg: 75,
    n: 'Enrollado de columna con peso',
    s: 'Flexibilidad con carga, la que se queda',
    why: 'Bajar vértebra a vértebra con un peso ligero entrena la cadena posterior en rango máximo bajo carga. El estiramiento pasivo da rango temporal; cargarlo es lo que hace que el cuerpo lo conserve.',
    steps: ['De pie sobre un escalón, peso LIGERO en las manos', 'Baja enrollando desde el cuello, vértebra a vértebra', 'Piernas casi rectas, deja que el peso te lleve despacio', 'Sube desenrollando en orden inverso, la cabeza al final'],
    tip: 'Empieza con muy poco peso, en serio. Aquí menos es más: el objetivo es el control del rango, no mover kilos.',
  },
  {
    id: 'ankle-rock', cap: 'movilidad', pat: 'rodilla', mat: 'none', lvl: 1, seg: 60,
    n: 'Movilidad de tobillo',
    s: 'La base de toda sentadilla',
    why: 'Si el tobillo no flexiona, la sentadilla se compensa arriba: talón que sube, espalda que se redondea, rodilla que se mete. Casi siempre el problema de sentadilla es un problema de tobillo.',
    steps: ['En zancada, rodilla adelantada sobre el pie', 'Empuja la rodilla hacia delante sin levantar el talón', 'Busca que la rodilla pase por fuera del dedo pequeño', 'Aguanta 2 s en el punto máximo y repite'],
    tip: 'Compara los dos tobillos. Casi todo el mundo tiene uno claramente peor, y ese pide más trabajo.',
  },

  /* ── FUERZA · peso corporal ──────────────────────────────────── */
  {
    id: 'pushup', sets: 3, reps: 10, cap: 'fuerza', pat: 'empuje', mat: 'none', lvl: 1, seg: 45,
    n: 'Flexiones',
    s: 'Empuje horizontal, el patrón base',
    why: 'Trabaja pectoral, deltoides anterior y tríceps, pero sobre todo enseña al core a mantener el cuerpo en bloque. Una flexión es una plancha que se mueve: si la cadera cae, has perdido el ejercicio.',
    steps: ['Manos algo más anchas que los hombros', 'Cuerpo en línea recta de talones a cabeza', 'Baja controlado hasta que el pecho roce el suelo', 'Codos a unos 45°, no abiertos del todo'],
    tip: 'Si no puedes con la forma buena, hazlas con las manos elevadas. Mejor 8 perfectas inclinadas que 3 malas en el suelo.',
  },
  {
    id: 'row-band', sets: 3, reps: 15, cap: 'fuerza', pat: 'traccion', mat: 'goma', lvl: 1, seg: 45,
    n: 'Remo con goma',
    s: 'El patrón que compensa tu postura',
    why: 'Trabaja dorsal, romboides y trapecio medio: exactamente los músculos que se apagan al estar encorvado. Por cada empuje que hagas deberías hacer al menos una tracción, o acentúas la postura que quieres corregir.',
    steps: ['Goma anclada a la altura del pecho', 'Tira llevando los codos atrás, pegados al cuerpo', 'Junta los omóplatos al final del recorrido', 'Vuelve despacio, resistiendo la goma'],
    tip: 'Inicia el movimiento con el omóplato, no con la mano. Si tiras solo con el brazo, el bíceps se lleva el trabajo que era para la espalda.',
  },
  {
    id: 'squat-bw', sets: 3, reps: 15, cap: 'fuerza', pat: 'rodilla', mat: 'none', lvl: 1, seg: 45,
    n: 'Sentadilla',
    s: 'El patrón más humano que existe',
    why: 'Cuádriceps, glúteo e isquios trabajando juntos, con el core estabilizando. Es el gesto de sentarse y levantarse: lo harás miles de veces al año, así que conviene hacerlo bien.',
    steps: ['Pies a la anchura de hombros, puntas algo abiertas', 'Baja llevando la cadera atrás y abajo a la vez', 'Rodillas siguiendo la dirección de los pies', 'Baja tanto como puedas sin redondear la lumbar'],
    tip: 'Si al final la lumbar se redondea (retroversión), ahí está tu límite hoy. Trabaja movilidad de tobillo y cadera y el rango llegará.',
  },
  {
    id: 'hinge', sets: 3, reps: 12, cap: 'fuerza', pat: 'cadera', mat: 'peso', lvl: 2, seg: 45,
    n: 'Bisagra de cadera',
    s: 'Aprender a usar las caderas, no la espalda',
    why: 'Es el patrón que protege tu espalda toda la vida: recoger algo del suelo. Trabaja glúteo e isquiotibiales. Quien no sabe hacer bisagra levanta pesos con la lumbar, y así es como se lesiona la gente.',
    steps: ['De pie, peso en las manos, rodillas ligeramente flexionadas', 'Lleva la cadera hacia atrás como si cerraras una puerta con el glúteo', 'Espalda recta todo el recorrido, el peso baja pegado a las piernas', 'Sube empujando el suelo y apretando el glúteo'],
    tip: 'La bisagra es cadera atrás, no rodillas abajo. Si notas cuádriceps, has hecho una sentadilla.',
  },
  {
    id: 'plank', cap: 'control', pat: 'core', mat: 'none', lvl: 1, seg: 45,
    n: 'Plancha',
    s: 'Antiextensión: el core de verdad',
    why: 'La función principal del core no es doblarse, es impedir que el cuerpo se doble. La plancha entrena esa resistencia. Bien hecha se nota en 20 segundos; mal hecha aguantas minutos sin trabajar nada.',
    steps: ['Antebrazos bajo los hombros, cuerpo en línea', 'Mete el coxis: quita el arco de la lumbar', 'Aprieta glúteos y abdomen a la vez', 'Empuja el suelo separando los omóplatos'],
    tip: 'Si aguantas 2 minutos cómodo, no estás apretando lo suficiente. Aprieta todo y verás que 30 s bastan.',
  },
  {
    id: 'lunge', sets: 3, reps: 10, cap: 'fuerza', pat: 'rodilla', mat: 'none', lvl: 2, seg: 60,
    n: 'Zancada',
    s: 'Fuerza a una pierna y equilibrio',
    why: 'La vida es unilateral: caminas y subes escaleras con una pierna cada vez. La zancada expone las diferencias entre lados, que la sentadilla esconde porque la pierna fuerte compensa.',
    steps: ['Da un paso largo hacia delante', 'Baja recto hasta que la rodilla trasera casi toque', 'Tronco erguido, peso repartido entre ambas piernas', 'Empuja con el talón delantero para volver'],
    tip: 'Fíjate en qué lado tiembla más o pierde el equilibrio. Ese lado necesita una serie extra.',
  },
  {
    id: 'hollow', cap: 'control', pat: 'core', mat: 'none', lvl: 2, seg: 40,
    n: 'Hollow body',
    s: 'La base de todo el trabajo gimnástico',
    why: 'Enseña a mantener la pelvis en retroversión con las costillas cerradas, que es la posición desde la que el cuerpo transmite fuerza sin fugas. Es el cimiento de casi todo movimiento avanzado.',
    steps: ['Tumbado boca arriba, lumbar pegada al suelo', 'Brazos y piernas extendidos, despegados del suelo', 'Costillas hacia dentro, sin arquear', 'Si la lumbar se despega, sube las piernas'],
    tip: 'La regla es simple: si puedes meter la mano bajo tu lumbar, has perdido la posición. Sube las piernas hasta recuperarla.',
  },
  {
    id: 'pullup', sets: 3, reps: 5, cap: 'fuerza', pat: 'traccion', mat: 'none', lvl: 3, seg: 45,
    n: 'Dominadas',
    s: 'Tracción vertical, el rey del tren superior',
    why: 'Dorsal ancho, bíceps y toda la musculatura escapular. Es el mejor indicador de fuerza relativa que existe: mueve tu propio peso contra la gravedad, sin ayudas.',
    steps: ['Agarre algo más ancho que los hombros', 'Empieza tirando de los omóplatos hacia abajo', 'Sube hasta pasar la barbilla, pecho hacia la barra', 'Baja controlado hasta extender del todo'],
    tip: 'Si aún no sale, haz solo la bajada: sube saltando y baja lo más lento posible. Es la vía más rápida para conseguir la primera.',
  },

  /* ── FUERZA · mazas ──────────────────────────────────────────── */
  {
    id: 'club-swing', sets: 3, reps: 10, cap: 'fuerza', pat: 'rotacion', mat: 'maza', lvl: 2, seg: 60,
    n: 'Balanceo frontal con maza',
    s: 'El movimiento base de las mazas',
    why: 'La maza tiene el peso lejos de la mano, así que crea una palanca larga que exige muchísimo a hombro, escápula y core. Es un tipo de fuerza que ninguna mancuerna reproduce: fuerza en rotación y con carga desplazada.',
    steps: ['Maza con las dos manos frente al cuerpo', 'Deja que caiga por detrás de la espalda, controlando', 'Costillas cerradas: no arquees la lumbar al pasar atrás', 'Sube trazando el círculo, sin tirones'],
    tip: 'Empieza con una maza mucho más ligera de la que crees. La palanca multiplica el peso real que siente tu hombro.',
  },
  {
    id: 'club-mill', cap: 'movilidad', pat: 'rotacion', mat: 'maza', lvl: 3, seg: 60,
    n: 'Molino con maza',
    s: 'Movilidad de hombro bajo carga',
    why: 'Recorre el rango completo del hombro con peso, que es la manera de que el rango se conserve. Trabaja el manguito rotador de forma funcional, en movimiento circular, no en aislamiento artificial.',
    steps: ['Maza vertical, agarre con las dos manos', 'Baja por un lado trazando un círculo amplio detrás', 'Pasa por detrás de la espalda y sube por el otro lado', 'Mantén el tronco estable: giran los hombros, no la cadera'],
    tip: 'Si la lumbar se arquea al pasar por detrás, la maza pesa demasiado o te falta movilidad dorsal. Baja peso.',
  },
  {
    id: 'club-shield', cap: 'control', pat: 'rotacion', mat: 'maza', lvl: 2, seg: 50,
    n: 'Shield cast',
    s: 'Control excéntrico del hombro',
    why: 'Frenar la maza al caer es trabajo excéntrico puro sobre el manguito rotador y la escápula. Es justo esa capacidad de frenar la que protege el hombro en deportes de lanzamiento y en la vida.',
    steps: ['Maza vertical delante del pecho, dos manos', 'Déjala caer hacia un hombro, frenándola', 'Detenla justo detrás del hombro, sin que golpee', 'Devuélvela a vertical con control'],
    tip: 'El ejercicio es el frenado, no el lanzamiento. Si oyes un golpe seco, no estás frenando, estás dejando caer.',
  },

  /* ── FUERZA · gomas y peso ───────────────────────────────────── */
  {
    id: 'band-pullapart', sets: 3, reps: 15, cap: 'fuerza', pat: 'traccion', mat: 'goma', lvl: 1, seg: 45,
    n: 'Aperturas con goma',
    s: 'El antídoto de la postura de pantalla',
    why: 'Activa trapecio medio, romboides y deltoides posterior, los tres apagados por estar encorvado. Es de los ejercicios con mejor relación esfuerzo-beneficio postural que existen.',
    steps: ['Goma con las dos manos, brazos al frente', 'Abre llevando las manos a los lados', 'Junta los omóplatos, sin encoger los hombros', 'Vuelve despacio resistiendo'],
    tip: 'Hombros lejos de las orejas todo el rato. Si se te suben, la goma es demasiado dura.',
  },
  {
    id: 'kb-swing', sets: 3, reps: 15, cap: 'potencia', pat: 'cadera', mat: 'peso', lvl: 2, seg: 45,
    n: 'Swing ruso',
    s: 'Potencia de cadera explosiva',
    why: 'Entrena la extensión explosiva de cadera, el motor de correr, saltar y golpear. El peso no se levanta con los brazos: lo lanza la cadera. Los brazos solo son cuerdas.',
    steps: ['Bisagra de cadera, peso entre las piernas', 'Lanza la cadera hacia delante con fuerza', 'El peso sube solo hasta la altura del pecho', 'Deja que caiga y encadena con la siguiente'],
    tip: 'Si notas los hombros haciendo el trabajo, estás levantando en vez de lanzar. La cadera manda, el brazo obedece.',
  },
  {
    id: 'turkish', cap: 'control', pat: 'core', mat: 'peso', lvl: 3, seg: 90,
    n: 'Levantada turca',
    s: 'Todo el cuerpo en un solo movimiento',
    why: 'Recorre todos los patrones en una secuencia: rodar, apoyar, puentear, arrodillarse y levantarse, con el hombro estable bajo carga todo el rato. Es un examen completo de control corporal.',
    steps: ['Tumbado, peso arriba con un brazo extendido', 'Rueda al codo, luego a la mano', 'Levanta la cadera y pasa la pierna atrás', 'Levántate manteniendo el peso siempre vertical'],
    tip: 'Apréndela primero sin peso, o con un zapato en la mano. Si el zapato se cae, aún no estás listo para el hierro.',
  },

  /* ── RESISTENCIA y POTENCIA ──────────────────────────────────── */
  {
    id: 'bear-crawl', cap: 'resistencia', pat: 'locomocion', mat: 'none', lvl: 2, seg: 45,
    n: 'Marcha del oso',
    s: 'Coordinación cruzada y core',
    why: 'Mover brazo y pierna contrarios activa las cadenas cruzadas del tronco, las mismas que usas al caminar y correr. Además pide muchísimo al core sin hacer un solo abdominal.',
    steps: ['A cuatro apoyos con las rodillas separadas del suelo', 'Avanza mano derecha y pie izquierdo a la vez', 'Cadera baja y estable: que no se balancee', 'Ve lento, con la espalda plana'],
    tip: 'Pon una botella en la espalda baja. Si se cae, te estás balanceando y el core no está haciendo su trabajo.',
  },
  {
    id: 'burpee', sets: 3, reps: 8, cap: 'resistencia', pat: 'locomocion', mat: 'none', lvl: 2, seg: 40,
    n: 'Burpee',
    s: 'Cuerpo entero, pulso alto',
    why: 'Combina bajada al suelo, empuje y salto: sube el pulso muy rápido con cero material. Es el ejercicio más eficiente para trabajar resistencia cuando no tienes nada.',
    steps: ['De pie, baja las manos al suelo', 'Salta o lleva los pies atrás a plancha', 'Flexión completa (opcional según nivel)', 'Vuelve y salta arriba con los brazos altos'],
    tip: 'Prioriza el ritmo sostenible sobre la velocidad. Un burpee lento y limpio mantiene el pulso mejor que ir a tope y pararse.',
  },
  {
    id: 'jump-squat', sets: 3, reps: 10, cap: 'potencia', pat: 'rodilla', mat: 'none', lvl: 2, seg: 35,
    n: 'Sentadilla con salto',
    s: 'Fuerza rápida del tren inferior',
    why: 'Entrena la capacidad de producir fuerza en poco tiempo, que es lo primero que se pierde con la edad. Y la caída, bien hecha, entrena la absorción de impacto: eso protege rodillas.',
    steps: ['Sentadilla hasta media altura', 'Sube explosivo, despegando del suelo', 'Cae suave, primero la punta y luego el talón', 'Encadena absorbiendo con las rodillas'],
    tip: 'La caída silenciosa es la señal de que absorbes bien. Si suena un golpe, estás cayendo rígido.',
  },
  {
    id: 'deadbug', sets: 3, reps: 10, cap: 'control', pat: 'core', mat: 'none', lvl: 1, seg: 50,
    n: 'Dead bug',
    s: 'Disociar extremidades del tronco',
    why: 'Enseña a mover brazos y piernas manteniendo la columna quieta, que es la función real del core. Es la base para que la fuerza no se te escape en cada movimiento.',
    steps: ['Boca arriba, brazos y rodillas a 90°', 'Lumbar pegada al suelo todo el rato', 'Baja brazo y pierna contrarios a la vez', 'Vuelve sin perder el contacto lumbar'],
    tip: 'Ve solo hasta donde la lumbar siga pegada. Ese es tu rango útil, y crecerá solo con las semanas.',
  },
  {
    id: 'hang', cap: 'movilidad', pat: 'traccion', mat: 'none', lvl: 1, seg: 45,
    n: 'Colgarse de una barra',
    s: 'Descomprimir y ganar hombro',
    why: 'Colgarse descomprime la columna, abre el hombro en flexión completa y fortalece el agarre. La fuerza de agarre, además, es uno de los marcadores de longevidad mejor documentados.',
    steps: ['Agarre a la anchura de los hombros', 'Deja el cuerpo relajado, colgando', 'Hombros activos: no te hundas del todo entre ellos', 'Respira lento y aguanta'],
    tip: 'Empieza con los pies apoyados quitando peso. Sumar segundos poco a poco vale más que aguantar una vez al límite.',
  },
]

// Sesiones sugeridas por si alguien no quiere generar nada.
const PRESETS = [
  { id: 'mov-am', n: 'Despertar articular', s: 'Movilidad de cabeza a pies', cap: 'movilidad', min: 8, mat: ['none'] },
  { id: 'fuerza-min', n: 'Fuerza sin material', s: 'Los patrones básicos', cap: 'fuerza', min: 15, mat: ['none'] },
  { id: 'maza-flow', n: 'Flujo de mazas', s: 'Hombro y rotación bajo carga', cap: 'fuerza', min: 12, mat: ['maza'] },
  { id: 'full', n: 'Cuerpo completo', s: 'Todas las capacidades', cap: 'mixto', min: 20, mat: ['none', 'goma'] },
]

/* ── Ejercicios de las progresiones ──────────────────────────── */
EX.push(
{id:'pushup-wall',sets:3,reps:15,cap:'fuerza',pat:'empuje',mat:'none',lvl:1,seg:45,prog:'Empuje',pl:1,
 n:'Flexión en pared',s:'Nivel 1 de empuje',
 why:'Mismo patrón que la flexión pero con una fracción del peso. Permite aprender la posición del cuerpo en línea y el recorrido del codo antes de que el peso sea un problema.',
 steps:['Manos en la pared a la altura del pecho','Retrasa los pies hasta notar tensión','Cuerpo en línea, glúteos apretados','Baja el pecho a la pared y empuja'],
 tip:'Cuanto más lejos los pies, más difícil. Ajusta la distancia hasta que 15 repeticiones te cuesten pero salgan limpias.'},
{id:'pushup-incline',sets:3,reps:12,cap:'fuerza',pat:'empuje',mat:'none',lvl:1,seg:45,prog:'Empuje',pl:2,
 n:'Flexión inclinada',s:'Nivel 2 de empuje',
 why:'Al elevar las manos reduces el porcentaje de peso que mueves. Es el escalón que la mayoría se salta, y por eso hacen flexiones con la cadera caída durante años.',
 steps:['Manos en un banco, mesa o escalón','Cuerpo en línea de talones a cabeza','Baja el pecho al borde del apoyo','Codos a unos 45 grados'],
 tip:'Baja la altura del apoyo poco a poco. Cada escalón hacia el suelo es una progresión real.'},
{id:'pushup-decline',sets:3,reps:8,cap:'fuerza',pat:'empuje',mat:'none',lvl:2,seg:45,prog:'Empuje',pl:4,
 n:'Flexión con pies elevados',s:'Nivel 4 de empuje',
 why:'Elevar los pies desplaza peso hacia los brazos y exige más al deltoides anterior y al core, que ahora tiene que evitar que la cadera se hunda con más palanca en contra.',
 steps:['Pies sobre un banco o silla','Manos algo más anchas que los hombros','Mantén la línea: no dejes caer la cadera','Baja hasta que el pecho roce el suelo'],
 tip:'Si la lumbar se arquea, baja la altura de los pies. La línea del cuerpo manda sobre la dificultad.'},
{id:'pushup-archer',sets:3,reps:5,cap:'fuerza',pat:'empuje',mat:'none',lvl:3,seg:50,prog:'Empuje',pl:5,
 n:'Flexión arquera',s:'Nivel 5 de empuje',
 why:'Carga casi todo el peso en un brazo mientras el otro solo acompaña. Es el puente honesto hacia la flexión a una mano, sin los riesgos de intentarla antes de tiempo.',
 steps:['Manos muy separadas','Baja hacia un lado doblando ese brazo','El otro brazo se mantiene casi recto','Empuja y alterna'],
 tip:'El brazo estirado ayuda solo lo justo. Si empujas con los dos por igual, es una flexión ancha, no una arquera.'},
{id:'row-inverted',sets:3,reps:12,cap:'fuerza',pat:'traccion',mat:'none',lvl:2,seg:45,prog:'Tracción',pl:2,
 n:'Remo invertido',s:'Nivel 2 de tracción',
 why:'Tracción horizontal con tu propio peso. Construye la fuerza de espalda y la conexión escapular que la dominada necesita, y se regula fácil cambiando el ángulo del cuerpo.',
 steps:['Bajo una mesa firme o barra baja','Cuerpo recto, talones apoyados','Tira llevando el pecho a la barra','Junta los omóplatos arriba'],
 tip:'Cuanto más horizontal el cuerpo, más difícil. Empieza inclinado y ve bajando semana a semana.'},
{id:'pullup-negative',sets:3,reps:5,cap:'fuerza',pat:'traccion',mat:'none',lvl:2,seg:45,prog:'Tracción',pl:3,
 n:'Negativas de dominada',s:'Nivel 3 de tracción',
 why:'La fase excéntrica soporta más carga que la concéntrica, así que puedes entrenarla antes de tener la dominada completa. Es la vía más rápida y demostrada para conseguir la primera.',
 steps:['Sube con salto o con una silla','Barbilla sobre la barra, pecho alto','Baja lo más lento que puedas, mínimo 5 segundos','Extiende del todo abajo'],
 tip:'Cuenta los segundos de bajada en voz alta. Cuando llegues a 8-10 s controlados, la dominada completa está cerca.'},
{id:'squat-box',sets:3,reps:15,cap:'fuerza',pat:'rodilla',mat:'none',lvl:1,seg:45,prog:'Sentadilla',pl:1,
 n:'Sentadilla a banco',s:'Nivel 1 de sentadilla',
 why:'El banco marca la profundidad y da seguridad, así que puedes concentrarte en el patrón: cadera atrás, rodillas alineadas, espalda neutra. Aprender esto bien vale más que mil sentadillas mediocres.',
 steps:['De pie frente a un banco o silla','Baja llevando la cadera atrás','Toca el banco sin dejarte caer','Levántate empujando el suelo'],
 tip:'Tocar, no sentarse. Si te dejas caer, pierdes la tensión y con ella el ejercicio.'},
{id:'squat-bulgarian',sets:3,reps:10,cap:'fuerza',pat:'rodilla',mat:'none',lvl:2,seg:60,prog:'Sentadilla',pl:3,
 n:'Sentadilla búlgara',s:'Nivel 3 de sentadilla',
 why:'Trabaja una pierna cargando mucho más que la zancada, y a la vez estira el psoas de la pierna de atrás. Es de los ejercicios más completos que existen para el tren inferior.',
 steps:['Pie de atrás elevado en un banco','Baja recto sobre la pierna delantera','Tronco ligeramente inclinado, sin redondear','Empuja con el talón delantero'],
 tip:'Separa bien el pie delantero del banco. Si lo pones muy cerca, la rodilla sufre y el glúteo no trabaja.'},
{id:'pistol-assisted',sets:3,reps:6,cap:'fuerza',pat:'rodilla',mat:'none',lvl:3,seg:60,prog:'Sentadilla',pl:4,
 n:'Sentadilla a una pierna asistida',s:'Nivel 4 de sentadilla',
 why:'Prepara el pistol trabajando fuerza y equilibrio a una pierna con la ayuda justa. También expone si te falta movilidad de tobillo, que es el motivo más común de no llegar abajo.',
 steps:['Sujétate a una puerta o anilla','Extiende una pierna al frente','Baja despacio sobre la pierna de apoyo','Usa las manos solo lo justo para no caer'],
 tip:'Reduce la ayuda cada semana. Cuando solo roces el apoyo con los dedos, ya casi tienes el pistol.'},
{id:'pistol',sets:3,reps:5,cap:'fuerza',pat:'rodilla',mat:'none',lvl:3,seg:60,prog:'Sentadilla',pl:5,
 n:'Pistol squat',s:'Nivel 5 de sentadilla',
 why:'Fuerza, equilibrio y movilidad a una pierna en un solo gesto. Es uno de los mejores indicadores de que tu tren inferior funciona de forma completa y simétrica.',
 steps:['De pie sobre una pierna, la otra al frente','Baja controlado manteniendo el talón en el suelo','Abajo, pecho adelante para equilibrar','Sube sin apoyar la otra pierna'],
 tip:'Casi siempre el límite es el tobillo, no la fuerza. Si te caes hacia atrás, trabaja movilidad de tobillo.'},
{id:'hinge-wall',sets:3,reps:15,cap:'movilidad',pat:'cadera',mat:'none',lvl:1,seg:45,prog:'Bisagra',pl:1,
 n:'Bisagra a la pared',s:'Nivel 1 de bisagra',
 why:'La pared te enseña el movimiento sin que puedas hacer trampa: si doblas rodillas en vez de llevar la cadera atrás, no la tocas. Es el mejor profesor de este patrón.',
 steps:['De espaldas, a un palmo de la pared','Lleva la cadera atrás hasta rozar la pared','Espalda recta, rodillas casi rectas','Vuelve apretando el glúteo'],
 tip:'Aléjate un poco más cada serie. Cuanta más distancia alcances con la espalda recta, mejor tu bisagra.'},
{id:'deadlift-single',sets:3,reps:8,cap:'control',pat:'cadera',mat:'peso',lvl:3,seg:60,prog:'Bisagra',pl:3,
 n:'Peso muerto a una pierna',s:'Nivel 3 de bisagra',
 why:'Bisagra, equilibrio y control antirrotación a la vez. Expone diferencias entre lados que el peso muerto normal esconde, y fortalece el glúteo medio, clave para la estabilidad de rodilla.',
 steps:['De pie sobre una pierna, peso en la mano contraria','Lleva la cadera atrás y la pierna libre atrás','Cadera cuadrada: no la abras hacia fuera','Sube apretando el glúteo de apoyo'],
 tip:'Imagina que llevas un vaso de agua en la cadera. Si se derrama, has rotado.'},
{id:'rollout',sets:3,reps:8,cap:'control',pat:'core',mat:'none',lvl:3,seg:45,prog:'Core',pl:4,
 n:'Rollout parcial',s:'Nivel 4 de core',
 why:'Antiextensión con palanca larga: el core tiene que impedir que la lumbar se arquee mientras los brazos se alejan. Es de los ejercicios de core más exigentes que existen.',
 steps:['De rodillas, manos en una toalla o rueda','Mete el coxis antes de empezar','Rueda hacia delante solo hasta donde controles','Vuelve tirando con el abdomen, no con los brazos'],
 tip:'El rango correcto es hasta justo antes de que la lumbar se arquee. Ni un centímetro más.'},
{id:'lsit',cap:'control',pat:'core',mat:'none',lvl:3,seg:35,prog:'Core',pl:5,
 n:'L-sit',s:'Nivel 5 de core',
 why:'Compresión activa de cadera con los hombros soportando el peso. Exige core, tríceps, hombro y flexibilidad de isquiotibiales a la vez: por eso cuesta tanto.',
 steps:['Sentado, manos en el suelo o en paralelas','Empuja los hombros hacia abajo, lejos de las orejas','Despega el culo y luego las piernas','Piernas rectas y juntas'],
 tip:'Empieza con las rodillas dobladas (tuck sit). Estira una pierna solo cuando aguantes 20 s con las dos dobladas.'},
{id:'bridge',cap:'movilidad',pat:'cadera',mat:'none',lvl:3,seg:45,prog:'Movilidad',pl:5,
 n:'Puente completo',s:'Nivel 5 de movilidad',
 why:'Extensión de toda la línea frontal a la vez: tobillo, cadera, abdomen, pecho y hombro. Es el antídoto más completo que existe contra la postura de estar sentado.',
 steps:['Tumbado, manos junto a las orejas','Empuja subiendo la cadera y luego el pecho','Extiende los brazos progresivamente','Reparte el arco: no cargues todo en la lumbar'],
 tip:'Si solo notas la lumbar, te falta hombro y dorsal. Trabaja primero movilidad torácica y de hombro.'}
)

/* ── PREHAB · lo que evita las lesiones típicas de triatlón ──────
 * risk: marca ejercicios que cargan una zona sensible, para poder filtrarlos.
 * fix:  marca ejercicios que TRATAN esa zona (se priorizan si la marcas).
 */
EX.push(
{id:'clamshell',cap:'control',pat:'cadera',mat:'goma',lvl:1,seg:60,sets:3,reps:15,fix:['cintilla'],
 n:'Almeja con goma',s:'Glúteo medio, el que falla en la cintilla',
 why:'El síndrome de la cintilla casi nunca es un problema de la cintilla: es que el glúteo medio no estabiliza la cadera y el fémur rota hacia dentro en cada zancada. Fortalecerlo ataca la causa, no el síntoma.',
 steps:['Tumbado de lado, rodillas dobladas a 90°','Goma por encima de las rodillas','Abre la rodilla de arriba sin girar la pelvis','Baja despacio y repite'],
 tip:'Si la cadera rota hacia atrás, estás usando la lumbar. Apoya la espalda en una pared para no hacer trampa.'},
{id:'monster-walk',cap:'control',pat:'cadera',mat:'goma',lvl:1,seg:60,sets:3,reps:12,fix:['cintilla'],
 n:'Paso lateral con goma',s:'Estabilidad de cadera en movimiento',
 why:'Entrena el glúteo medio en el gesto que importa: sostener la pelvis mientras el peso pasa de una pierna a otra. Es lo que ocurre en cada paso al correr.',
 steps:['Goma por encima de las rodillas o tobillos','Semiflexión de rodillas, pecho alto','Da pasos laterales sin juntar los pies','Mantén tensión en la goma todo el rato'],
 tip:'Que las rodillas no se metan hacia dentro. Si lo hacen, la goma es demasiado dura.'},
{id:'side-plank-lift',cap:'control',pat:'core',mat:'none',lvl:2,seg:45,fix:['cintilla'],
 n:'Plancha lateral con elevación',s:'Costado y glúteo medio a la vez',
 why:'Combina la estabilidad lateral del tronco con el trabajo del glúteo medio. Dos de los déficits que más se asocian a dolor de cintilla y de rodilla en corredores.',
 steps:['Plancha lateral sobre el antebrazo','Cadera alta, cuerpo en línea','Eleva la pierna de arriba sin dejar caer la cadera','Baja controlado'],
 tip:'La cadera no debe hundirse al elevar la pierna. Si se hunde, haz la plancha sin elevación hasta ganar fuerza.'},
{id:'scap-pull',cap:'control',pat:'traccion',mat:'none',lvl:1,seg:45,sets:3,reps:10,fix:['hombro'],
 n:'Retracción escapular colgado',s:'La base del hombro sano',
 why:'Enseña a mover el omóplato de forma independiente del brazo. Es el eslabón que falla en casi todo hombro dolorido: el brazo tira y la escápula no acompaña, y la articulación se pinza.',
 steps:['Cuelga de una barra con los brazos rectos','Sin doblar los codos, baja los hombros','Nota cómo el cuerpo sube unos centímetros','Aguanta 2 s y suelta'],
 tip:'Los codos no se doblan. Si se doblan, es una dominada y te has saltado el ejercicio.'},
{id:'ext-rotation',cap:'control',pat:'rotacion',mat:'goma',lvl:1,seg:50,sets:3,reps:15,fix:['hombro'],
 n:'Rotación externa con goma',s:'Manguito rotador',
 why:'Nadar y empujar trabajan sobre todo los rotadores internos. Sin equilibrar con rotación externa, la cabeza del húmero se desplaza y aparece el pinzamiento: el dolor de hombro típico del nadador.',
 steps:['Codo pegado al costado, doblado 90°','Goma en la mano, tensión hacia dentro','Gira el antebrazo hacia fuera sin separar el codo','Vuelve despacio resistiendo'],
 tip:'Pon una toalla enrollada entre el codo y el costado. Si se cae, estás separando el codo y usando el hombro entero.'},
{id:'wall-slide',cap:'movilidad',pat:'empuje',mat:'none',lvl:1,seg:50,fix:['hombro'],
 n:'Deslizamiento en pared',s:'Ritmo escápulo-humeral',
 why:'Reeduca la coordinación entre brazo y omóplato al elevar. Es de los mejores ejercicios para recuperar elevación sin dolor, y prepara el hombro para el volumen de natación.',
 steps:['De espaldas a la pared, lumbar pegada','Antebrazos y dorso de las manos en la pared','Desliza los brazos hacia arriba sin despegar nada','Baja lento hasta la posición inicial'],
 tip:'Si la lumbar se despega o las manos se separan, ese es tu tope real. Trabaja ahí, no más arriba.'},
{id:'calf-soleus',cap:'fuerza',pat:'rodilla',mat:'none',lvl:1,seg:60,sets:3,reps:15,fix:['cintilla'],
 n:'Elevación de talón con rodilla doblada',s:'Sóleo, el olvidado del corredor',
 why:'El sóleo absorbe hasta varias veces tu peso en cada zancada y es el que más se sobrecarga al correr. Se trabaja con la rodilla doblada, no recta: así se aísla del gemelo.',
 steps:['De pie, rodillas ligeramente dobladas','Sube el talón manteniendo la flexión de rodilla','Aguanta 1 s arriba','Baja despacio, controlando'],
 tip:'Con la rodilla recta trabajas el gemelo. Con ella doblada, el sóleo. La diferencia importa para correr.'}
)

// Ejercicios que cargan zonas sensibles (se filtran si marcas la molestia)
;(function(){
  var risky = { 'club-mill':['hombro'], 'club-swing':['hombro'], 'club-shield':['hombro'],
    'turkish':['hombro'], 'pushup-archer':['hombro'], 'pullup':['hombro'], 'pullup-negative':['hombro'],
    'jump-squat':['cintilla'], 'burpee':['cintilla'], 'lunge':['cintilla'], 'pistol':['cintilla'],
    'pistol-assisted':['cintilla'], 'squat-bulgarian':['cintilla'] };
  EX.forEach(function(e){ if(risky[e.id]) e.risk = risky[e.id]; });
})()

/* ── PLAN DE 3 MESES ─────────────────────────────────────────────
 * 12 semanas en tres bloques. Cada bloque tiene un objetivo distinto
 * porque el cuerpo no mejora haciendo siempre lo mismo: primero se
 * aprende el patrón, luego se carga, y al final se integra.
 * Premium.
 */

const PLAN = {
  weeks: 12,
  blocks: [
    {
      n: 1, name: 'Fundamentos', weeks: [1, 2, 3, 4],
      goal: 'Aprender los patrones y ganar rango',
      why: 'Antes de añadir carga hay que saber moverse. Este bloque prioriza técnica, rango articular y control. Si te saltas esta fase, cargarás sobre un patrón malo y ahí es donde aparecen las lesiones.',
      focus: ['movilidad', 'control'],
      sessions: 3, minutes: 20,
    },
    {
      n: 2, name: 'Fuerza y rango', weeks: [5, 6, 7, 8],
      goal: 'Cargar lo aprendido y ampliar el rango bajo tensión',
      why: 'Ahora sí se carga. La clave: el rango que ganaste en el bloque 1 hay que cargarlo para conservarlo. El estiramiento pasivo da rango temporal; la fuerza en rango largo lo hace permanente.',
      focus: ['fuerza', 'movilidad'],
      sessions: 4, minutes: 25,
    },
    {
      n: 3, name: 'Integración', weeks: [9, 10, 11, 12],
      goal: 'Juntarlo todo: fuerza, potencia y resistencia',
      why: 'El último bloque mezcla capacidades como lo hace la vida real: fuerza con potencia, movilidad bajo fatiga. Aquí es donde compruebas que lo de los dos bloques anteriores se ha convertido en capacidad de verdad.',
      focus: ['fuerza', 'potencia', 'resistencia'],
      sessions: 4, minutes: 30,
    },
  ],
  // Progresiones: cada patrón tiene niveles. Se avanza cuando el criterio se cumple.
  progressions: [
    {
      pat: 'Empuje', icon: 'push',
      levels: [
        { n: 'Flexión en pared', crit: '3 series de 15 limpias' },
        { n: 'Flexión inclinada (banco)', crit: '3 series de 12' },
        { n: 'Flexión en suelo', crit: '3 series de 10 con cuerpo en línea' },
        { n: 'Flexión con pies elevados', crit: '3 series de 8' },
        { n: 'Flexión arquera / a una mano asistida', crit: '3 de 5 por lado' },
      ],
    },
    {
      pat: 'Tracción', icon: 'pull',
      levels: [
        { n: 'Remo con goma', crit: '3 series de 15 con omóplatos activos' },
        { n: 'Remo invertido (mesa o barra baja)', crit: '3 series de 12' },
        { n: 'Negativas de dominada', crit: '3 series de 5 bajadas de 5 s' },
        { n: 'Dominada completa', crit: '3 series de 5' },
        { n: 'Dominada lastrada o arquera', crit: '3 series de 5' },
      ],
    },
    {
      pat: 'Sentadilla', icon: 'squat',
      levels: [
        { n: 'Sentadilla a un banco', crit: '3 series de 15 sin impulso' },
        { n: 'Sentadilla completa', crit: '3 series de 15 con talones en el suelo' },
        { n: 'Sentadilla búlgara', crit: '3 series de 10 por pierna' },
        { n: 'Sentadilla a una pierna asistida', crit: '3 series de 6 por pierna' },
        { n: 'Pistol squat', crit: '3 series de 5 por pierna' },
      ],
    },
    {
      pat: 'Bisagra', icon: 'hinge',
      levels: [
        { n: 'Bisagra sin peso frente a pared', crit: '3 series de 15 sin tocar la pared con la espalda' },
        { n: 'Peso muerto con peso ligero', crit: '3 series de 12 con espalda neutra' },
        { n: 'Peso muerto a una pierna', crit: '3 series de 8 por lado' },
        { n: 'Swing', crit: '3 series de 15 con cadera explosiva' },
        { n: 'Swing a una mano', crit: '3 series de 10 por lado' },
      ],
    },
    {
      pat: 'Core', icon: 'core',
      levels: [
        { n: 'Dead bug', crit: '3 series de 10 con lumbar pegada' },
        { n: 'Plancha', crit: '3 series de 40 s bien apretada' },
        { n: 'Hollow body', crit: '3 series de 30 s' },
        { n: 'Rueda / rollout parcial', crit: '3 series de 8' },
        { n: 'L-sit', crit: '3 series de 15 s' },
      ],
    },
    {
      pat: 'Movilidad', icon: 'mob',
      levels: [
        { n: 'Sentadilla profunda con apoyo', crit: '2 min acumulados' },
        { n: 'Sentadilla profunda libre', crit: '2 min seguidos cómodo' },
        { n: 'Cadera 90-90 con tronco erguido', crit: 'cambio de lado sin manos' },
        { n: 'Enrollado de columna con peso ligero', crit: '3 series de 6 controladas' },
        { n: 'Puente completo / arco', crit: '3 series de 20 s' },
      ],
    },
  ],
}

/* ── SESIONES DE RESISTENCIA ─────────────────────────────────────
 * Estructura basada en evidencia actual:
 *  · Distribución polarizada/piramidal: ~75-80% a baja intensidad,
 *    15-20% a alta. (Rev. sistemáticas en Sports 2024 y Sports Med 2024;
 *    en recreativos los resultados son comparables a otras distribuciones,
 *    así que no es dogma: es un punto de partida razonable.)
 *  · Entrenamiento concurrente: fuerza y resistencia separadas 6-8 h o en
 *    días distintos. Si coinciden, fuerza primero. El HIIT interfiere más
 *    que el continuo suave. (Rev. en Medicine 2024; NSCA SCJ 2022.)
 *  · fase: en qué fases del plan aplica (1 a 4).
 */

const ENDUR = [
  /* ── NATACIÓN ── */
  { id:'nat-tec', d:'nado', n:'Técnica', min:40, int:'baja', fase:[1,2,3,4],
    s:'Calidad de brazada, no volumen',
    why:'En nadadores el mayor factor de riesgo de hombro es el déficit de fuerza y resistencia del manguito y estabilizadores escapulares, no el volumen en sí. Trabajar técnica con series cortas permite acumular metros de calidad sin castigar el hombro.',
    steps:['400 m suave, respirando cada 3 brazadas',
           '6 × 50 m de ejercicio técnico (punto muerto, un brazo) con 20 s de descanso',
           '4 × 100 m a ritmo cómodo, contando brazadas por largo',
           '200 m suave de vuelta a la calma'],
    tip:'Si el número de brazadas por largo sube mucho al cansarte, para. Nadar cansado con técnica rota es lo que lesiona el hombro.' },
  { id:'nat-aer', d:'nado', n:'Aeróbico continuo', min:45, int:'baja', fase:[2,3,4],
    s:'Construir el 1.500 seguido',
    why:'La distancia olímpica exige nadar 1.500 m sin parar. El continuo a intensidad baja desarrolla la resistencia específica y la economía de nado, que en aguas abiertas importa más que la velocidad punta.',
    steps:['300 m de calentamiento progresivo',
           '3 × 400 m continuos con 45 s de descanso',
           'Ritmo: deberías poder mantenerlo el doble de tiempo',
           '200 m suave'],
    tip:'Nada los últimos 100 m de cada bloque igual de rápido que los primeros. Si bajas mucho, has salido demasiado fuerte.' },
  { id:'nat-umb', d:'nado', n:'Series de ritmo', min:45, int:'alta', fase:[3,4],
    s:'El 15-20% de alta intensidad',
    why:'Las series a ritmo de competición o algo por encima mejoran el VO2 y la tolerancia al esfuerzo. Son la parte "alta" de la distribución polarizada: pocas, pero de calidad.',
    steps:['400 m de calentamiento con 4 × 25 m progresivos',
           '8 × 100 m a ritmo de competición, 20 s de descanso',
           'Si la técnica se rompe, corta la serie',
           '200 m muy suave'],
    tip:'Una sola sesión de calidad por semana en nado es suficiente. Dos ya cargan demasiado el hombro.' },
  { id:'nat-abierta', d:'nado', n:'Aguas abiertas', min:50, int:'media', fase:[3,4],
    s:'Lo que la piscina no enseña',
    why:'Nadar sin línea del fondo, con oleaje y con gente alrededor es una habilidad distinta. Practicar la orientación (sighting) evita nadar de más el día de la prueba, que es el error más caro en triatlón.',
    steps:['Calentamiento 200 m cerca de la orilla',
           '3 × 8 min continuos, levantando la vista cada 6-8 brazadas',
           'Practica salida desde la orilla y giro en boya',
           'Vuelta a la calma suave'],
    tip:'Nunca solo. Y con gorro de color vivo: la seguridad en aguas abiertas no es negociable.' },

  /* ── BICI ── */
  { id:'bici-z2', d:'bici', n:'Zona 2 larga', min:90, int:'baja', fase:[1,2,3,4],
    s:'La base aeróbica, sin impacto',
    why:'El grueso del volumen debe ir a intensidad baja. En tu caso la bici es la vía preferente: acumulas carga aeróbica sin el impacto que irrita la cintilla, algo especialmente útil en las primeras fases.',
    steps:['15 min progresivos hasta zona 2',
           'Cuerpo principal a intensidad conversacional',
           'Cadencia 85-95 rpm, sin dejar caer el pedaleo',
           '10 min suaves finales'],
    tip:'Si no puedes mantener una conversación, vas demasiado fuerte. La zona 2 se siente casi aburrida: esa es la señal.' },
  { id:'bici-cad', d:'bici', n:'Cadencia y técnica', min:60, int:'baja', fase:[1,2],
    s:'Pedaleo redondo, rodilla protegida',
    why:'Una cadencia baja con desarrollo duro aumenta la carga por pedalada sobre la rodilla y la cintilla. Trabajar cadencias altas reduce la fuerza pico por ciclo y suele aliviar la sintomatología lateral de rodilla.',
    steps:['15 min de calentamiento',
           '6 × 3 min a 100-110 rpm con desarrollo suave, 2 min de recuperación',
           'Sin rebotar en el sillín: si rebotas, baja cadencia',
           '10 min suaves'],
    tip:'Revisa la altura del sillín. Demasiado alto obliga a extender en exceso y castiga la cintilla en cada pedalada.' },
  { id:'bici-umb', d:'bici', n:'Intervalos de umbral', min:75, int:'alta', fase:[2,3,4],
    s:'La calidad sobre la bici',
    why:'Los bloques largos cerca del umbral mejoran la potencia sostenible, que es lo que determina el segmento de bici. Van en bici y no corriendo porque generan adaptación sin impacto articular.',
    steps:['20 min de calentamiento progresivo',
           '3 × 10 min a esfuerzo controlado (7/10), 5 min suaves entre bloques',
           'Mantén cadencia y postura estables',
           '10 min de vuelta a la calma'],
    tip:'El primer bloque debe parecerte fácil. Si el tercero se te cae, saliste demasiado fuerte.' },

  /* ── CARRERA ── */
  { id:'run-z2', d:'carrera', n:'Rodaje suave', min:40, int:'baja', fase:[1,2,3,4],
    s:'Mantener el gesto, sin acumular daño',
    why:'Ya tienes base de maratón: no necesitas kilómetros, necesitas que la cadera aguante. El rodaje suave mantiene la economía de carrera mientras el trabajo de glúteo medio hace el trabajo de fondo.',
    steps:['5 min caminando o trotando muy suave',
           'Rodaje a ritmo conversacional',
           'Cadencia algo alta, zancada corta',
           'Estiramiento suave al terminar, sin forzar'],
    tip:'Si aparece dolor lateral de rodilla, para ese día. Correr con dolor de cintilla es lo que la cronifica.' },
  { id:'run-prog', d:'carrera', n:'Rodaje progresivo', min:50, int:'media', fase:[2,3],
    s:'Terminar más rápido de lo que empiezas',
    why:'Progresar el ritmo dentro de la sesión introduce intensidad de forma controlada y enseña a correr cansado, que es exactamente lo que pasa tras la bici en un triatlón.',
    steps:['15 min muy suaves',
           '20 min a ritmo cómodo',
           '10 min a ritmo algo exigente pero controlado',
           '5 min de vuelta a la calma'],
    tip:'Nunca termines a tope. El objetivo es acabar con sensación de "podría seguir".' },
  { id:'run-series', d:'carrera', n:'Series cortas', min:45, int:'alta', fase:[3,4],
    s:'Poca cantidad, mucha calidad',
    why:'Las series cortas mejoran economía y VO2 con menos volumen total de impacto que las series largas. Con antecedentes de cintilla, la dosis mínima eficaz es la estrategia correcta.',
    steps:['15 min de calentamiento con movilidad de cadera',
           '8 × 1 min a ritmo fuerte, 2 min trotando muy suave',
           'Corta la sesión si notas la cintilla',
           '10 min suaves'],
    tip:'Con historial de cintilla, una sola sesión de series por semana. Nunca dos.' },
  { id:'ladrillo', d:'carrera', n:'Ladrillo (bici + carrera)', min:80, int:'media', fase:[2,3,4],
    s:'Las piernas de triatleta se hacen aquí',
    why:'La transición cambia el patrón de carrera: la zancada se acorta y la cadera trabaja distinto durante los primeros minutos. Entrenar esa transición es lo que evita la sensación de piernas de madera en competición.',
    steps:['60 min de bici en zona 2, últimos 10 min algo más fuertes',
           'Transición rápida: zapatillas listas al lado',
           '15-20 min de carrera, empezando muy suave',
           'Cadencia alta y zancada corta los primeros 5 min'],
    tip:'No busques ritmo en la carrera del ladrillo. Busca que las piernas aprendan el cambio.' },
]
