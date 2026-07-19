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
  fuerza:      { es: 'Fuerza',      color: '#c96a4a' },
  movilidad:   { es: 'Movilidad',   color: '#4a9ac9' },
  resistencia: { es: 'Resistencia', color: '#c9a54a' },
  potencia:    { es: 'Potencia',    color: '#a44ac9' },
  control:     { es: 'Control',     color: '#4ac98a' },
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
    id: 'pushup', cap: 'fuerza', pat: 'empuje', mat: 'none', lvl: 1, seg: 45,
    n: 'Flexiones',
    s: 'Empuje horizontal, el patrón base',
    why: 'Trabaja pectoral, deltoides anterior y tríceps, pero sobre todo enseña al core a mantener el cuerpo en bloque. Una flexión es una plancha que se mueve: si la cadera cae, has perdido el ejercicio.',
    steps: ['Manos algo más anchas que los hombros', 'Cuerpo en línea recta de talones a cabeza', 'Baja controlado hasta que el pecho roce el suelo', 'Codos a unos 45°, no abiertos del todo'],
    tip: 'Si no puedes con la forma buena, hazlas con las manos elevadas. Mejor 8 perfectas inclinadas que 3 malas en el suelo.',
  },
  {
    id: 'row-band', cap: 'fuerza', pat: 'traccion', mat: 'goma', lvl: 1, seg: 45,
    n: 'Remo con goma',
    s: 'El patrón que compensa tu postura',
    why: 'Trabaja dorsal, romboides y trapecio medio: exactamente los músculos que se apagan al estar encorvado. Por cada empuje que hagas deberías hacer al menos una tracción, o acentúas la postura que quieres corregir.',
    steps: ['Goma anclada a la altura del pecho', 'Tira llevando los codos atrás, pegados al cuerpo', 'Junta los omóplatos al final del recorrido', 'Vuelve despacio, resistiendo la goma'],
    tip: 'Inicia el movimiento con el omóplato, no con la mano. Si tiras solo con el brazo, el bíceps se lleva el trabajo que era para la espalda.',
  },
  {
    id: 'squat-bw', cap: 'fuerza', pat: 'rodilla', mat: 'none', lvl: 1, seg: 45,
    n: 'Sentadilla',
    s: 'El patrón más humano que existe',
    why: 'Cuádriceps, glúteo e isquios trabajando juntos, con el core estabilizando. Es el gesto de sentarse y levantarse: lo harás miles de veces al año, así que conviene hacerlo bien.',
    steps: ['Pies a la anchura de hombros, puntas algo abiertas', 'Baja llevando la cadera atrás y abajo a la vez', 'Rodillas siguiendo la dirección de los pies', 'Baja tanto como puedas sin redondear la lumbar'],
    tip: 'Si al final la lumbar se redondea (retroversión), ahí está tu límite hoy. Trabaja movilidad de tobillo y cadera y el rango llegará.',
  },
  {
    id: 'hinge', cap: 'fuerza', pat: 'cadera', mat: 'peso', lvl: 2, seg: 45,
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
    id: 'lunge', cap: 'fuerza', pat: 'rodilla', mat: 'none', lvl: 2, seg: 60,
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
    id: 'pullup', cap: 'fuerza', pat: 'traccion', mat: 'none', lvl: 3, seg: 45,
    n: 'Dominadas',
    s: 'Tracción vertical, el rey del tren superior',
    why: 'Dorsal ancho, bíceps y toda la musculatura escapular. Es el mejor indicador de fuerza relativa que existe: mueve tu propio peso contra la gravedad, sin ayudas.',
    steps: ['Agarre algo más ancho que los hombros', 'Empieza tirando de los omóplatos hacia abajo', 'Sube hasta pasar la barbilla, pecho hacia la barra', 'Baja controlado hasta extender del todo'],
    tip: 'Si aún no sale, haz solo la bajada: sube saltando y baja lo más lento posible. Es la vía más rápida para conseguir la primera.',
  },

  /* ── FUERZA · mazas ──────────────────────────────────────────── */
  {
    id: 'club-swing', cap: 'fuerza', pat: 'rotacion', mat: 'maza', lvl: 2, seg: 60,
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
    id: 'band-pullapart', cap: 'fuerza', pat: 'traccion', mat: 'goma', lvl: 1, seg: 45,
    n: 'Aperturas con goma',
    s: 'El antídoto de la postura de pantalla',
    why: 'Activa trapecio medio, romboides y deltoides posterior, los tres apagados por estar encorvado. Es de los ejercicios con mejor relación esfuerzo-beneficio postural que existen.',
    steps: ['Goma con las dos manos, brazos al frente', 'Abre llevando las manos a los lados', 'Junta los omóplatos, sin encoger los hombros', 'Vuelve despacio resistiendo'],
    tip: 'Hombros lejos de las orejas todo el rato. Si se te suben, la goma es demasiado dura.',
  },
  {
    id: 'kb-swing', cap: 'potencia', pat: 'cadera', mat: 'peso', lvl: 2, seg: 45,
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
    id: 'burpee', cap: 'resistencia', pat: 'locomocion', mat: 'none', lvl: 2, seg: 40,
    n: 'Burpee',
    s: 'Cuerpo entero, pulso alto',
    why: 'Combina bajada al suelo, empuje y salto: sube el pulso muy rápido con cero material. Es el ejercicio más eficiente para trabajar resistencia cuando no tienes nada.',
    steps: ['De pie, baja las manos al suelo', 'Salta o lleva los pies atrás a plancha', 'Flexión completa (opcional según nivel)', 'Vuelve y salta arriba con los brazos altos'],
    tip: 'Prioriza el ritmo sostenible sobre la velocidad. Un burpee lento y limpio mantiene el pulso mejor que ir a tope y pararse.',
  },
  {
    id: 'jump-squat', cap: 'potencia', pat: 'rodilla', mat: 'none', lvl: 2, seg: 35,
    n: 'Sentadilla con salto',
    s: 'Fuerza rápida del tren inferior',
    why: 'Entrena la capacidad de producir fuerza en poco tiempo, que es lo primero que se pierde con la edad. Y la caída, bien hecha, entrena la absorción de impacto: eso protege rodillas.',
    steps: ['Sentadilla hasta media altura', 'Sube explosivo, despegando del suelo', 'Cae suave, primero la punta y luego el talón', 'Encadena absorbiendo con las rodillas'],
    tip: 'La caída silenciosa es la señal de que absorbes bien. Si suena un golpe, estás cayendo rígido.',
  },
  {
    id: 'deadbug', cap: 'control', pat: 'core', mat: 'none', lvl: 1, seg: 50,
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
