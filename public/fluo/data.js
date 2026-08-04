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
  inercial: { es: 'Polea isoinercial', icon: 'flywheel' },
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

/* ── PIE Y PROPIOCEPCIÓN ─────────────────────────────────────────
 * Enfoque integrador (psicomotor): el pie no es solo músculo, es el
 * órgano sensorial que informa al sistema nervioso de dónde estás.
 * Por eso se trabaja descalzo, despacio y con atención.
 * Lectura afín: Jesús Serrano, "La salud a tus pies" (HarperCollins, 2024).
 */
EX.push(
{id:'toe-splay',cap:'movilidad',pat:'core',mat:'none',lvl:1,seg:60,fix:['pie'],
 n:'Apertura de dedos',s:'Recuperar el abanico que el zapato quitó',
 why:'Décadas de calzado estrecho juntan los dedos y desactivan la musculatura intrínseca del pie. Recuperar la separación devuelve base de apoyo y mejora la información sensorial que llega al sistema nervioso en cada paso.',
 steps:['Sentado o de pie, pies descalzos apoyados','Separa los cinco dedos sin levantarlos','Mantén 5 s y relaja','Repite 10 veces por pie'],
 tip:'Al principio casi no se moverán, y es normal: llevan años sin usarse. La mejora es lenta pero llega.'},
{id:'toe-yoga',cap:'control',pat:'core',mat:'none',lvl:2,seg:60,fix:['pie'],
 n:'Yoga de dedos',s:'Disociar el dedo gordo del resto',
 why:'Poder mover el primer dedo independientemente indica control motor real del pie. Es la base del despegue en la marcha y de la estabilidad del arco: sin él, el pie colapsa hacia dentro al apoyar.',
 steps:['De pie, peso repartido','Levanta solo el dedo gordo, resto en el suelo','Ahora al revés: gordo abajo, los otros cuatro arriba','10 alternancias lentas'],
 tip:'Si no puedes separarlos, ayúdate con la mano al principio. El cerebro necesita reaprender el mapa del pie.'},
{id:'short-foot',cap:'control',pat:'core',mat:'none',lvl:2,seg:60,fix:['pie'],
 n:'Pie corto (arco activo)',s:'El músculo del arco, no la plantilla',
 why:'Activa la musculatura intrínseca que sostiene el arco de forma activa. Es la alternativa a delegar el soporte en una plantilla: el arco se sostiene con músculo entrenado, no con material.',
 steps:['Sentado, pie apoyado plano','Acerca la base del dedo gordo al talón sin doblar los dedos','El arco se eleva ligeramente','Mantén 8 s, 8 repeticiones'],
 tip:'Los dedos no se agarran ni se doblan. Si se doblan, estás usando los flexores largos en vez del arco.'},
{id:'balance-1leg',cap:'control',pat:'core',mat:'none',lvl:1,seg:60,fix:['pie','cintilla'],
 n:'Equilibrio monopodal',s:'Propiocepción pura',
 why:'Sostenerte sobre un pie obliga al sistema nervioso a integrar información del pie, la vista y el oído interno. Es de los ejercicios con mejor relación coste-beneficio para tobillo, rodilla y cadera.',
 steps:['Descalzo, sobre una pierna','Reparte el peso entre talón y base de los dedos','Mantén 30 s por lado','Progresión: cierra los ojos'],
 tip:'Cerrar los ojos multiplica la dificultad porque quitas la vista y obligas al pie a informar. Ahí está el entrenamiento real.'},
{id:'calf-eccentric',cap:'fuerza',pat:'rodilla',mat:'none',lvl:2,seg:75,sets:3,reps:12,fix:['pie'],
 n:'Excéntrico de gemelo en escalón',s:'Tendón de Aquiles y fascia',
 why:'El trabajo excéntrico lento con carga progresiva es la base del tratamiento de tendinopatías de Aquiles. La clave es la lentitud en la bajada y la progresión gradual, no la intensidad.',
 steps:['De pie en un escalón, talones fuera','Sube con las dos piernas','Baja con UNA sola, muy lento (4 s)','Deja caer el talón por debajo del escalón'],
 tip:'Molestia leve durante el ejercicio es aceptable en tendinopatía. Dolor agudo o que empeora al día siguiente, no: para y consulta.'},
{id:'foot-roll',cap:'movilidad',pat:'core',mat:'none',lvl:1,seg:60,fix:['pie'],
 n:'Rodar la planta',s:'Liberar la fascia plantar',
 why:'La fascia plantar es el primer eslabón de la línea posterior, que sube hasta la nuca. Liberarla mejora la flexibilidad de toda esa cadena, no solo del pie.',
 steps:['De pie, pelota bajo la planta','Rueda lento de talón a dedos, 60 s por pie','Detente 10 s en los puntos sensibles','Nota si ese lado queda más largo al terminar'],
 tip:'Si tienes fascitis en fase aguda, empieza con una pelota blanda y poca presión. Machacar una fascia inflamada la empeora.'},
{id:'walk-barefoot',cap:'movilidad',pat:'locomocion',mat:'none',lvl:1,seg:120,fix:['pie'],
 n:'Marcha descalza consciente',s:'Reaprender a caminar',
 why:'Caminar descalzo sobre superficies variadas devuelve al sistema nervioso el flujo de información que el calzado amortigua. La variedad de texturas es el estímulo: suelo liso, hierba, arena, grava.',
 steps:['Camina descalzo en superficie segura','Apoya de forma consciente: talón, borde externo, dedos','Pisada silenciosa: si suena, aterrizas duro','Empieza con 5 min y sube poco a poco'],
 tip:'La progresión es lo que evita lesiones. Pasar de golpe a caminar descalzo todo el día es la mejor forma de acabar con una fascitis.'},
{id:'heel-toe-walk',cap:'control',pat:'locomocion',mat:'none',lvl:1,seg:60,fix:['pie'],
 n:'Marcha de talones y puntas',s:'Activar los dos extremos',
 why:'Caminar solo de talones activa el tibial anterior, y solo de puntas el tríceps sural. Equilibrar ambos protege el tobillo y mejora la absorción de impacto al correr.',
 steps:['20 pasos caminando solo sobre los talones','20 pasos caminando solo de puntillas','Descansa y repite 2 veces','Descalzo y despacio'],
 tip:'Si al ir de talones te cuesta mantener el pie arriba, tienes el tibial anterior débil. Es muy común en corredores.'}
)

EX.push(
{id:'psoas-lunge',cap:'movilidad',pat:'cadera',mat:'none',lvl:1,seg:80,fix:['lumbar'],
 n:'Estiramiento de psoas',s:'El flexor que acorta la bici y la silla',
 why:'El psoas se acorta con las horas sentado y sobre la bici, y al acortarse aumenta la báscula pélvica anterior y la tensión lumbar. Comparte inserciones con el diafragma, así que respirar profundo mientras lo estiras ayuda.',
 steps:['Una rodilla en el suelo, el otro pie delante en zancada','Mete el coxis hacia dentro sin arquear la lumbar','Empuja la cadera hacia delante 40 s por lado','Respira hondo hacia el abdomen'],
 tip:'Si notas pinzamiento lumbar, has arqueado la espalda. Retroversión primero, empuje después.'}
)

/* ── READAPTACIÓN ────────────────────────────────────────────────
 * Progresión por fases con criterio de paso. Orientación educativa,
 * NO diagnóstico ni sustituto de un fisioterapeuta.
 * Principio común (evidencia en tendinopatía y dolor femoropatelar):
 * carga progresiva > reposo absoluto. El tejido se adapta cargándolo.
 */
const REHAB = [
  { id:'cintilla', n:'Cintilla / rodilla lateral', s:'Dolor en la cara externa de la rodilla al correr',
    causa:'Rara vez es la cintilla en sí. Lo habitual es un déficit de estabilidad de cadera: el glúteo medio no sostiene la pelvis y el fémur rota hacia dentro en cada apoyo. El fortalecimiento del glúteo medio reduce el dolor de forma consistente en 2-8 semanas.',
    red:'Bloqueo de la rodilla, inestabilidad real (se te va), hinchazón importante o dolor tras un traumatismo.',
    fases:[
      { n:'1 · Calmar', dur:'1-2 semanas', ex:['clamshell','foot-roll','balance-1leg'],
        hacer:'Quita lo que provoca el dolor: para de correr y baja cuestas. Mantén bici con cadencia alta y sillín no demasiado alto.',
        crit:'Caminar 30 min sin dolor' },
      { n:'2 · Fortalecer', dur:'2-4 semanas', ex:['clamshell','monster-walk','side-plank-lift','calf-soleus'],
        hacer:'Trabajo de glúteo medio 3-4 veces por semana. Nado y bici sin restricción.',
        crit:'10 plancha lateral con elevación por lado sin molestia' },
      { n:'3 · Reintroducir carrera', dur:'2-4 semanas', ex:['monster-walk','side-plank-lift','balance-1leg'],
        hacer:'Vuelve corriendo/caminando: 1 min corriendo, 2 caminando, 20 min total. Sube muy poco a poco. Cadencia alta y zancada corta.',
        crit:'20 min continuos sin dolor durante ni al día siguiente' },
      { n:'4 · Volver', dur:'continuo', ex:['monster-walk','side-plank-lift','calf-soleus'],
        hacer:'Sube volumen máximo un 10% semanal. Mantén el trabajo de cadera 2 veces por semana para siempre.',
        crit:'Es mantenimiento: no lo abandones cuando deje de doler' },
    ]},
  { id:'hombro', n:'Hombro (nadador)', s:'Molestia al nadar o al elevar el brazo',
    causa:'Nadar son miles de rotaciones internas. Sin equilibrar, los rotadores externos y estabilizadores escapulares se quedan cortos y aparece pinzamiento. El déficit de fuerza y resistencia del manguito y la escápula es el factor de riesgo más señalado.',
    red:'Pérdida de fuerza clara, dolor nocturno que te despierta, sensación de luxación o dolor tras caída.',
    fases:[
      { n:'1 · Calmar', dur:'1-2 semanas', ex:['wall-slide','ext-rotation'],
        hacer:'Reduce volumen de nado. Fuera palas y fuera trabajo por encima de la cabeza. Nada suave con técnica.',
        crit:'Elevar el brazo sin dolor hasta la horizontal' },
      { n:'2 · Estabilizar', dur:'2-4 semanas', ex:['ext-rotation','scap-pull','wall-slide','band-pullapart'],
        hacer:'Rotación externa y control escapular 3 veces por semana. Vuelve a nadar de forma progresiva.',
        crit:'3×15 rotación externa sin molestia al día siguiente' },
      { n:'3 · Cargar', dur:'3-4 semanas', ex:['scap-pull','row-inverted','band-pullapart','pushup-incline'],
        hacer:'Introduce tracción y empuje con rango controlado. Aumenta metros en el agua poco a poco.',
        crit:'Nadar tu volumen habitual sin molestia posterior' },
      { n:'4 · Volver', dur:'continuo', ex:['ext-rotation','scap-pull','row-inverted'],
        hacer:'Reintroduce trabajo por encima de la cabeza (mazas, dominadas) de forma gradual. Mantén el preventivo.',
        crit:'El preventivo se queda: 2 sesiones por semana de por vida' },
    ]},
  { id:'aquiles', n:'Aquiles / fascia plantar', s:'Dolor en el tendón o en la planta al primer paso',
    causa:'Sobrecarga por progresión demasiado rápida. El tejido no tuvo tiempo de adaptarse al volumen o al cambio de calzado. La carga excéntrica lenta y progresiva es el pilar del tratamiento.',
    red:'Dolor súbito con chasquido (posible rotura), imposibilidad de ponerse de puntillas, hinchazón marcada.',
    fases:[
      { n:'1 · Calmar', dur:'1-2 semanas', ex:['foot-roll','toe-splay','short-foot'],
        hacer:'Baja el volumen de impacto. Nada y pedalea. Evita descalzo duro y superficies muy irregulares de momento.',
        crit:'Primeros pasos de la mañana con molestia leve' },
      { n:'2 · Cargar despacio', dur:'3-6 semanas', ex:['calf-eccentric','calf-soleus','short-foot'],
        hacer:'Excéntricos lentos a diario o en días alternos. Molestia leve durante el ejercicio es aceptable; que empeore al día siguiente, no.',
        crit:'3×12 excéntricos a una pierna sin dolor al día siguiente' },
      { n:'3 · Reintroducir impacto', dur:'2-4 semanas', ex:['calf-eccentric','heel-toe-walk','balance-1leg'],
        hacer:'Vuelve a correr alternando con caminata. Superficies blandas al principio.',
        crit:'20 min de carrera continua sin reacción' },
      { n:'4 · Volver', dur:'continuo', ex:['calf-eccentric','short-foot','walk-barefoot'],
        hacer:'Progresa volumen despacio. Mantén excéntricos 2 veces por semana.',
        crit:'Mantenimiento indefinido: es el tejido más lento en adaptarse' },
    ]},
  { id:'lumbar', n:'Lumbar', s:'Molestia baja de espalda al cargar o tras estar sentado',
    causa:'Casi siempre falta de tolerancia a la carga y déficit de control, no una estructura rota. La evidencia actual desaconseja el reposo: el movimiento gradual es el tratamiento.',
    red:'Dolor irradiado por debajo de la rodilla, pérdida de fuerza o sensibilidad, problemas de control de esfínteres (urgencia médica).',
    fases:[
      { n:'1 · Mover sin miedo', dur:'1-2 semanas', ex:['cat-cow','deadbug','hip-90-90'],
        hacer:'Sigue moviéndote. Camina a diario. Evita el reposo en cama, que empeora el pronóstico.',
        crit:'Caminar 30 min cómodo' },
      { n:'2 · Control', dur:'2-4 semanas', ex:['deadbug','plank','side-plank-lift','hinge-wall'],
        hacer:'Core antiextensión y aprender la bisagra de cadera sin carga.',
        crit:'Plancha 40 s y bisagra a la pared limpia' },
      { n:'3 · Cargar', dur:'3-6 semanas', ex:['hinge','deadlift-single','psoas-lunge','thoracic-rot'],
        hacer:'Introduce bisagra con peso ligero y progresa. La espalda necesita cargar para tolerar carga.',
        crit:'Peso muerto ligero 3×12 sin reacción posterior' },
      { n:'4 · Volver', dur:'continuo', ex:['hinge','deadbug','thoracic-rot'],
        hacer:'Progresa carga con paciencia. Muévete a menudo durante el día: lo peor para la lumbar es no cambiar de postura.',
        crit:'Mantenimiento' },
    ]},
  { id:'rodilla-ant', n:'Rodilla anterior', s:'Dolor delante o alrededor de la rótula',
    causa:'Dolor femoropatelar: desajuste entre la carga que recibe la articulación y la que tolera. Suele mejorar combinando fuerza de cadera y de cuádriceps, mejor que solo una de las dos.',
    red:'Bloqueo, inestabilidad, hinchazón inmediata tras traumatismo.',
    fases:[
      { n:'1 · Calmar', dur:'1-2 semanas', ex:['clamshell','balance-1leg','foot-roll'],
        hacer:'Reduce sentadilla profunda, escaleras y cuestas. Mantén actividad sin dolor.',
        crit:'Subir un tramo de escaleras sin molestia' },
      { n:'2 · Cadera y cuádriceps', dur:'3-4 semanas', ex:['clamshell','monster-walk','squat-box','calf-soleus'],
        hacer:'Fuerza de glúteo y cuádriceps en rango sin dolor. La sentadilla a banco controla la profundidad.',
        crit:'3×15 sentadilla a banco sin dolor' },
      { n:'3 · Rango completo', dur:'3-4 semanas', ex:['squat-bw','lunge','deadlift-single','balance-1leg'],
        hacer:'Amplía rango y añade trabajo a una pierna.',
        crit:'Sentadilla completa y zancadas sin molestia' },
      { n:'4 · Volver', dur:'continuo', ex:['squat-bw','monster-walk','calf-soleus'],
        hacer:'Vuelve a impacto de forma progresiva.',
        crit:'Mantenimiento de fuerza de cadera' },
    ]},
]

/* ── TRANSICIÓN AL BAREFOOT ──────────────────────────────────────
 * Autoevaluación observacional: la persona observa y responde.
 * La app orienta y entrena. NO diagnostica.
 */
const FOOTCHECK = [
  { q:'¿Puedes separar los cinco dedos sin ayuda?', a:['Sí, claramente','Un poco','Nada'],
    read:['Buena movilidad intrínseca.','Movilidad reducida, típica de calzado estrecho.','Musculatura intrínseca muy poco activa.'] },
  { q:'Mira tu dedo gordo: ¿apunta recto o se desvía hacia los otros?', a:['Recto','Desviación leve','Desviación marcada'],
    read:['Sin signos de desviación.','Desviación incipiente: la horma estrecha es el sospechoso habitual.','Desviación marcada. Merece valoración de un podólogo, y el calzado ancho es prioritario.'] },
  { q:'Huella en mojado: pisa con el pie húmedo sobre cartón. ¿Qué ves?', a:['Arco marcado','Huella media','Huella casi completa'],
    read:['Arco alto: suele necesitar más trabajo de amortiguación activa y movilidad.','Huella dentro de lo común.','Arco bajo al apoyar: prioriza el trabajo de arco activo (pie corto).'] },
  { q:'¿Puedes levantar solo el dedo gordo dejando los otros en el suelo?', a:['Sí','Con dificultad','No'],
    read:['Buen control motor del pie.','Control parcial: mejorable con práctica.','Sin disociación. Es el punto donde más se nota la mejora al entrenar.'] },
  { q:'Equilibrio sobre un pie descalzo con ojos cerrados', a:['Más de 20 s','Entre 10 y 20 s','Menos de 10 s'],
    read:['Propiocepción buena.','Propiocepción mejorable.','Propiocepción baja: el equilibrio monopodal debe ser tu prioridad.'] },
  { q:'¿Tienes durezas o callos? ¿Dónde?', a:['No tengo','Bajo los metatarsos','En el talón o borde'],
    read:['Sin señales de sobrecarga localizada.','Sugiere sobrecarga en el antepié. Revisa que el calzado no comprima ni tenga tacón.','Reparto de carga desigual. La marcha consciente ayuda.'] },
  { q:'¿Cuánto tiempo pasas descalzo al día?', a:['Varias horas','Un rato en casa','Prácticamente nada'],
    read:['Buena base para progresar rápido.','Base intermedia: progresa con calma.','Empieza muy despacio: tus pies llevan años protegidos.'] },
  { q:'¿Has tenido fascitis, dolor de Aquiles o metatarsalgia en el último año?', a:['No','Sí, ya resuelto','Sí, actualmente'],
    read:['Sin antecedentes: transición estándar.','Antecedente reciente: progresa a la mitad de velocidad.','Con dolor activo NO es momento de transicionar. Ve a la sección de Readaptación y consulta a un profesional.'] },
]

const BAREFOOT = [
  { n:'Fase 1 · Despertar', sem:'Semanas 1-4',
    obj:'Devolver movilidad y sensibilidad al pie antes de cambiar de calzado',
    ex:['toe-splay','foot-roll','short-foot','balance-1leg'],
    hacer:'Descalzo en casa a diario. Calzado normal fuera todavía. 10 min de trabajo de pie al día.',
    crit:'Separar los dedos con claridad y aguantar 30 s a la pata coja' },
  { n:'Fase 2 · Activar', sem:'Semanas 5-8',
    obj:'Fuerza intrínseca y control motor',
    ex:['short-foot','toe-yoga','heel-toe-walk','balance-1leg'],
    hacer:'Introduce calzado minimalista para caminar poco rato (30-60 min al día). Sigue descalzo en casa.',
    crit:'Disociar el dedo gordo y caminar 1 h con minimalista sin molestias' },
  { n:'Fase 3 · Caminar', sem:'Semanas 9-16',
    obj:'Adaptar el tejido al nuevo reparto de cargas',
    ex:['walk-barefoot','calf-eccentric','short-foot','toe-yoga'],
    hacer:'Minimalista como calzado principal para caminar. Camina descalzo en superficies variadas.',
    crit:'Día completo con minimalista sin dolor de gemelo, Aquiles ni planta' },
  { n:'Fase 4 · Correr', sem:'Semana 17 en adelante',
    obj:'Trasladar la adaptación a la carrera',
    ex:['calf-eccentric','walk-barefoot','balance-1leg','heel-toe-walk'],
    hacer:'Empieza con 5-10 min de carrera con minimalista, alternando con tu calzado habitual. Sube un 10% semanal como MÁXIMO.',
    crit:'Aquí no hay meta: la progresión lenta es permanente. La mayoría de lesiones del barefoot vienen de correr demasiado pronto.' },
]

/* ── AMPLIACIÓN POR MATERIAL ─────────────────────────────────── */
EX.push(
/* MAZAS · el peso lejos de la mano crea palanca: por eso exige tanto */
{id:'club-360',cap:'movilidad',pat:'rotacion',mat:'maza',lvl:3,seg:60,
 n:'360 con maza',s:'El círculo completo alrededor del cuerpo',
 why:'Recorre el rango completo del hombro con carga en un patrón circular continuo. Es el movimiento que más moviliza la articulación glenohumeral y la escápula a la vez, algo que ninguna máquina reproduce.',
 steps:['Maza vertical delante del pecho, dos manos','Déjala caer por un lado hacia la espalda','Rodea la cabeza sin tocarla y sube por el otro lado','Ritmo constante, sin tirones'],
 tip:'Empieza con maza muy ligera y ve despacio. Si la maza te lleva a ti en vez de tú a ella, pesa demasiado.'},
{id:'club-inside',cap:'control',pat:'rotacion',mat:'maza',lvl:2,seg:55,
 n:'Circular interior',s:'Control fino del hombro',
 why:'El círculo interior obliga a controlar el momento angular en un radio corto. Trabaja el manguito rotador de forma específica en un patrón cerrado, ideal como puente antes de los círculos amplios.',
 steps:['Maza en una mano, codo cerca del cuerpo','Traza un círculo pequeño junto al hombro','Muñeca firme, el movimiento sale del hombro','10 círculos por sentido y lado'],
 tip:'Si la muñeca se dobla, la maza pesa demasiado o el círculo es muy grande. Reduce antes de progresar.'},
{id:'club-pendulum',cap:'movilidad',pat:'rotacion',mat:'maza',lvl:1,seg:50,
 n:'Péndulo con maza',s:'La entrada al mundo de las mazas',
 why:'Es el patrón más simple: balanceo controlado en un solo plano. Enseña a gestionar el peso desplazado sin exigir movilidad de hombro completa, así que es la puerta de entrada correcta.',
 steps:['Maza con las dos manos, brazos extendidos','Balancea de un lado a otro como un péndulo','Deja que el peso marque el ritmo','Costillas cerradas, sin arquear la lumbar'],
 tip:'Este es el primer ejercicio de mazas que deberías dominar. No pases a los círculos hasta que salga fluido.'},
{id:'club-front',cap:'fuerza',pat:'empuje',mat:'maza',lvl:2,seg:55,sets:3,reps:10,
 n:'Extensión frontal',s:'Hombro y core en cadena',
 why:'Extender la maza al frente multiplica la palanca sobre el hombro y obliga al core a impedir que el cuerpo se venza. Es fuerza isométrica de core disfrazada de ejercicio de brazo.',
 steps:['Maza vertical junto al pecho, dos manos','Extiende los brazos al frente lentamente','Mantén 2 s con la maza horizontal','Vuelve controlado'],
 tip:'Si la lumbar se arquea al extender, has perdido el core. Mete el coxis y reduce el recorrido.'},
{id:'club-squat',cap:'fuerza',pat:'rodilla',mat:'maza',lvl:2,seg:60,sets:3,reps:12,
 n:'Sentadilla con maza',s:'Contrapeso que mejora la técnica',
 why:'Sujetar la maza al frente actúa de contrapeso y permite bajar más erguido, lo que enseña la posición correcta de sentadilla. Además el core trabaja en anti-flexión todo el rato.',
 steps:['Maza sujeta al pecho con las dos manos','Baja la sentadilla manteniendo el pecho alto','Codos por dentro de las rodillas abajo','Sube empujando el suelo'],
 tip:'Notarás que bajas más que sin maza. El contrapeso es un truco clásico para aprender la sentadilla profunda.'},

/* GOMAS · resistencia variable, barato y muy versátil */
{id:'band-facepull',cap:'fuerza',pat:'traccion',mat:'goma',lvl:1,seg:50,sets:3,reps:15,fix:['hombro'],
 n:'Face pull',s:'El mejor ejercicio postural que existe',
 why:'Trabaja rotadores externos, deltoides posterior y trapecio medio a la vez. Es de los ejercicios con mejor retorno para la salud del hombro y para contrarrestar la postura adelantada.',
 steps:['Goma anclada a la altura de la cara','Tira llevando las manos hacia las orejas','Codos altos y separados','Rota las manos hacia atrás al final'],
 tip:'La clave es la rotación externa al final. Sin ella es un remo alto, y pierdes el beneficio para el manguito.'},
{id:'band-press',cap:'fuerza',pat:'empuje',mat:'goma',lvl:1,seg:50,sets:3,reps:12,
 n:'Press de pecho con goma',s:'Empuje con resistencia progresiva',
 why:'La goma aumenta la resistencia según se estira, así que la parte final del recorrido (donde eres más fuerte) recibe más carga. Es un perfil de resistencia distinto al del peso libre y complementario.',
 steps:['Goma por detrás de la espalda, a la altura del pecho','Empuja al frente extendiendo los brazos','Junta las manos al final','Vuelve resistiendo la goma'],
 tip:'No sueltes de golpe. La fase de vuelta, controlada, es donde está buena parte del estímulo.'},
{id:'band-goodmorning',cap:'fuerza',pat:'cadera',mat:'goma',lvl:2,seg:55,sets:3,reps:15,fix:['lumbar'],
 n:'Buenos días con goma',s:'Bisagra con carga ligera',
 why:'Enseña el patrón de bisagra con una resistencia que crece al final, justo donde el glúteo debe apretar. Es una forma segura de cargar la cadena posterior sin material pesado.',
 steps:['Goma bajo los pies y sobre la nuca','Bisagra: cadera atrás, espalda recta','Baja hasta notar tensión en isquios','Sube apretando el glúteo'],
 tip:'Espalda recta siempre. Si se redondea, acorta el recorrido: es preferible poco rango bien hecho.'},
{id:'band-pullthrough',cap:'fuerza',pat:'cadera',mat:'goma',lvl:1,seg:50,sets:3,reps:15,
 n:'Pull through',s:'Aprender a usar el glúteo',
 why:'La dirección de la resistencia (horizontal) hace que el glúteo tenga que trabajar en toda la extensión de cadera. Es el mejor ejercicio para quien no siente el glúteo en la sentadilla.',
 steps:['Goma anclada baja, por detrás y entre las piernas','Bisagra de cadera cogiendo la goma','Extiende la cadera apretando el glúteo','No arquees la lumbar al final'],
 tip:'El movimiento termina cuando la cadera está extendida, no cuando la espalda se arquea. Aprieta glúteo, no lumbar.'},
{id:'band-lateral',cap:'control',pat:'rodilla',mat:'goma',lvl:1,seg:50,sets:3,reps:12,fix:['cintilla','rodilla'],
 n:'Sentadilla con goma en rodillas',s:'Activar glúteo medio bajo carga',
 why:'La goma tira de las rodillas hacia dentro y obliga al glúteo medio a resistir. Corrige el valgo (rodilla hacia dentro) que está detrás de muchos dolores de rodilla y cintilla.',
 steps:['Goma por encima de las rodillas','Sentadilla empujando activamente las rodillas hacia fuera','Baja controlado sin dejar que se metan','Sube manteniendo la separación'],
 tip:'Si las rodillas se meten hacia dentro, la goma es demasiado dura o falta fuerza. Baja resistencia antes que técnica.'},

/* PESO · kettlebell y mancuernas */
{id:'kb-goblet',cap:'fuerza',pat:'rodilla',mat:'peso',lvl:1,seg:55,sets:3,reps:12,
 n:'Sentadilla goblet',s:'La mejor sentadilla para aprender',
 why:'El peso al pecho actúa de contrapeso y permite mantener el tronco erguido, lo que facilita la profundidad y protege la lumbar. Es la forma más segura de cargar la sentadilla.',
 steps:['Peso sujeto al pecho con las dos manos','Baja manteniendo el pecho alto','Codos por dentro de las rodillas abajo','Sube empujando el suelo con todo el pie'],
 tip:'Si los talones se levantan, te falta movilidad de tobillo. Trabájala: es la causa, no la sentadilla.'},
{id:'kb-press',cap:'fuerza',pat:'empuje',mat:'peso',lvl:2,seg:55,sets:3,reps:8,
 n:'Press militar',s:'Empuje vertical y estabilidad de core',
 why:'Elevar peso por encima de la cabeza exige movilidad de hombro, estabilidad escapular y un core que impida arquear la lumbar. Es un examen de todo el tren superior en un solo gesto.',
 steps:['Peso a la altura del hombro, codo debajo','Aprieta glúteo y abdomen antes de empujar','Empuja arriba hasta extender el codo','Baja controlado a la posición inicial'],
 tip:'Si tienes que arquear la espalda para subir, te falta movilidad de hombro. Trabaja el deslizamiento en pared primero.'},
{id:'kb-row',cap:'fuerza',pat:'traccion',mat:'peso',lvl:1,seg:55,sets:3,reps:12,
 n:'Remo a una mano',s:'Espalda y antirrotación',
 why:'Además de trabajar dorsal y romboides, obliga al core a impedir que el tronco rote. Dos estímulos en uno, y expone diferencias entre lados que los ejercicios bilaterales esconden.',
 steps:['Apoya una mano y una rodilla en un banco','Espalda plana y paralela al suelo','Tira del peso llevando el codo atrás','Sin girar el tronco: caderas cuadradas'],
 tip:'Inicia con el omóplato, no con la mano. Si el tronco rota, baja el peso.'},
{id:'kb-carry',cap:'control',pat:'locomocion',mat:'peso',lvl:1,seg:60,
 n:'Paseo del granjero',s:'Lo más funcional que existe',
 why:'Caminar cargando peso trabaja agarre, core, hombro y postura a la vez, en el patrón más cotidiano que hay. Además la fuerza de agarre es uno de los marcadores de longevidad mejor documentados.',
 steps:['Un peso en cada mano (o uno solo para versión desigual)','Hombros atrás y abajo, pecho alto','Camina con pasos cortos y controlados','60 s manteniendo la postura'],
 tip:'Con un solo peso el core trabaja el doble para no inclinarte. Es una progresión excelente.'},
{id:'kb-clean',cap:'potencia',pat:'cadera',mat:'peso',lvl:3,seg:50,sets:3,reps:8,
 n:'Cargada',s:'Potencia y coordinación',
 why:'Transfiere la potencia de la cadera al tren superior en un gesto coordinado. Entrena la capacidad de producir fuerza rápida en cadena, que es como el cuerpo se mueve en la vida real.',
 steps:['Bisagra de cadera con el peso entre las piernas','Lanza la cadera y guía el peso pegado al cuerpo','Recíbelo en el hombro, codo abajo','Baja con control repitiendo la bisagra'],
 tip:'Si el peso te golpea la muñeca, lo estás lanzando en arco. Debe subir pegado al cuerpo, casi rozando.'},
{id:'kb-tgu-half',cap:'control',pat:'core',mat:'peso',lvl:2,seg:70,
 n:'Media levantada turca',s:'La turca, por partes',
 why:'La primera mitad de la levantada turca contiene lo esencial: estabilidad de hombro bajo carga y control de tronco al rodar. Aprenderla por separado es cómo se enseña bien la turca completa.',
 steps:['Tumbado, peso arriba con un brazo extendido','Rueda al codo y luego a la mano','Eleva la cadera formando un puente','Vuelve deshaciendo el camino'],
 tip:'Mira el peso todo el rato. La vista fija en la carga es lo que mantiene el hombro estable.'},

/* POTENCIA y RESISTENCIA · estaban muy escasas */
{id:'broad-jump',cap:'potencia',pat:'cadera',mat:'none',lvl:2,seg:40,sets:3,reps:6,
 n:'Salto horizontal',s:'Potencia en el plano de avance',
 why:'El salto horizontal expresa la potencia de cadera en la dirección en la que corres, a diferencia del salto vertical. Y la caída entrena la absorción de impacto, que protege rodillas.',
 steps:['De pie, pies a la anchura de las caderas','Bisagra rápida y salta hacia delante','Cae con las dos piernas, rodillas flexionadas','Absorbe el impacto en silencio'],
 tip:'Prioriza la caída sobre la distancia. Un salto corto bien absorbido vale más que uno largo aterrizando rígido.'},
{id:'pogo',cap:'potencia',pat:'locomocion',mat:'none',lvl:1,seg:40,
 n:'Saltos de tobillo',s:'Rigidez elástica para correr',
 why:'Entrena la capacidad elástica del tendón de Aquiles y el pie, que es lo que devuelve energía en cada zancada. Mejora la economía de carrera sin acumular volumen de kilómetros.',
 steps:['Saltos pequeños y rápidos en el sitio','Rodillas casi rectas: el rebote sale del tobillo','Contacto con el suelo muy breve','30 s continuos'],
 tip:'Piensa en rebotar, no en saltar. Cuanto menos tiempo en el suelo, mejor el estímulo elástico.'},
{id:'mountain-climber',cap:'resistencia',pat:'core',mat:'none',lvl:1,seg:45,
 n:'Escalador',s:'Pulso alto y core',
 why:'Combina posición de plancha con movimiento rápido de cadera. Sube el pulso enseguida y a la vez exige al core que impida que la cadera se hunda o rebote.',
 steps:['Posición de plancha alta, manos bajo hombros','Lleva una rodilla al pecho y alterna','Cadera baja y estable, sin subir el culo','Ritmo sostenible, no máximo'],
 tip:'Si la cadera sube y baja, has perdido el core. Baja el ritmo hasta que se mantenga quieta.'},
{id:'skater',cap:'potencia',pat:'rodilla',mat:'none',lvl:2,seg:45,
 n:'Saltos de patinador',s:'Potencia lateral y estabilidad',
 why:'Casi todo el entrenamiento va hacia delante y atrás. El plano lateral queda olvidado, y es donde se lesionan tobillos y rodillas. Este salto entrena precisamente esa dirección.',
 steps:['Salta lateralmente de un pie al otro','Aterriza sobre una pierna y estabiliza','Rodilla alineada con el pie al caer','Alterna con ritmo controlado'],
 tip:'Aguanta un instante en cada aterrizaje. La estabilidad al caer es el objetivo, no la velocidad.'},
{id:'jump-rope',cap:'resistencia',pat:'locomocion',mat:'none',lvl:1,seg:60,
 n:'Comba (o simulada)',s:'Cardio y coordinación',
 why:'Trabaja la elasticidad del pie y el tobillo mientras sube el pulso, con muy poco impacto por salto. Si no tienes comba, el gesto simulado da buena parte del beneficio.',
 steps:['Saltos pequeños sobre la punta de los pies','Muñecas hacen girar, no los brazos','Rodillas ligeramente flexionadas','60 s continuos'],
 tip:'Salta lo justo para pasar la cuerda. Saltar alto cansa antes y castiga más las articulaciones.'},
{id:'squat-hold',cap:'resistencia',pat:'rodilla',mat:'none',lvl:1,seg:60,
 n:'Sentadilla isométrica',s:'Resistencia de cuádriceps',
 why:'El trabajo isométrico construye resistencia local y tolerancia al esfuerzo sostenido, y suele tolerarse bien cuando el movimiento dinámico molesta. Útil también en dolor de rodilla anterior.',
 steps:['Espalda apoyada en la pared, muslos paralelos al suelo','Rodillas a 90 grados, sobre los tobillos','Respira con normalidad, no aguantes el aire','Mantén 45-60 s'],
 tip:'Si tiembla, es normal. Si duele la rótula, sube un poco la posición hasta que no moleste.'}
)

/* ── Ejercicios de apoyo para las nuevas zonas ───────────────── */
EX.push(
{id:'neck-iso',cap:'control',pat:'core',mat:'none',lvl:1,seg:50,fix:['cervical'],
 n:'Isométricos de cuello',s:'Fuerza cervical sin movimiento',
 why:'El cuello responde bien a la carga isométrica cuando el movimiento molesta. Fortalecer la musculatura cervical profunda reduce la recurrencia del dolor de cuello mejor que solo estirar.',
 steps:['Mano en la frente, empuja la cabeza contra ella','Sin que la cabeza se mueva, 10 s','Repite en los laterales y en la nuca','2 rondas por dirección'],
 tip:'La cabeza no se mueve: es fuerza contra resistencia. Sin dolor: si duele, reduce la presión.'},
{id:'chin-tuck-neck',cap:'movilidad',pat:'core',mat:'none',lvl:1,seg:45,sets:3,reps:10,fix:['cervical'],
 n:'Retracción cervical',s:'Deshacer el cuello adelantado',
 why:'Activa los flexores cervicales profundos, que se apagan con la postura de pantalla. Es el ejercicio base para el dolor cervical de origen postural.',
 steps:['Sentado o de pie, mirada al frente','Lleva la barbilla hacia dentro (doble mentón)','Sin bajar la cabeza ni mirar abajo','Mantén 5 s y suelta'],
 tip:'No es bajar la barbilla al pecho: es desplazarla hacia atrás en horizontal. Imagina que te empujan la frente.'},
{id:'wrist-mob',cap:'movilidad',pat:'empuje',mat:'none',lvl:1,seg:50,fix:['muneca','codo'],
 n:'Movilidad de muñeca',s:'Preparar el apoyo de manos',
 why:'La muñeca soporta el peso en plancha, flexión y muchos ejercicios de suelo. Sin preparación, es la primera que se queja. Cargarla progresivamente es lo que la hace tolerante.',
 steps:['A cuatro apoyos, palmas en el suelo','Balancea el peso adelante y atrás despacio','Gira las manos: dedos hacia fuera, hacia dentro, hacia ti','30 s en cada posición'],
 tip:'Si duele mucho, hazlo con los puños cerrados o sobre los nudillos hasta ganar tolerancia.'},
{id:'wrist-ecc',cap:'fuerza',pat:'empuje',mat:'goma',lvl:2,seg:55,sets:3,reps:15,fix:['codo','muneca'],
 n:'Excéntrico de antebrazo',s:'Para epicondilitis',
 why:'El trabajo excéntrico lento del antebrazo es la base del tratamiento de la epicondilitis (codo de tenista). Es el mismo principio que en el Aquiles: carga progresiva sobre el tendón.',
 steps:['Antebrazo apoyado, muñeca fuera del borde','Sube la muñeca con ayuda de la otra mano','Baja SOLO con la mano afectada, muy lento (4 s)','15 repeticiones lentas'],
 tip:'La bajada lenta es el ejercicio. Molestia leve es aceptable; dolor que crece al día siguiente, no.'},
{id:'ankle-alphabet',cap:'movilidad',pat:'rodilla',mat:'none',lvl:1,seg:50,fix:['tobillo'],
 n:'Abecedario con el tobillo',s:'Movilidad en todos los planos',
 why:'Tras un esguince el tobillo pierde rango y, sobre todo, propiocepción. Moverlo en todas las direcciones restaura el mapa articular antes de volver a cargarlo.',
 steps:['Sentado, pierna extendida y pie en el aire','Dibuja el abecedario con el dedo gordo','Movimiento amplio pero sin dolor','Una vuelta completa por pie'],
 tip:'Sin dolor. Si una letra molesta, reduce el tamaño del recorrido en esa dirección.'},
{id:'ankle-balance-eyes',cap:'control',pat:'core',mat:'none',lvl:2,seg:60,fix:['tobillo','cintilla'],
 n:'Equilibrio con perturbación',s:'Propiocepción avanzada de tobillo',
 why:'El déficit propioceptivo tras un esguince es lo que hace que se repita. Entrenar el equilibrio con perturbaciones reduce de forma consistente la tasa de recaída.',
 steps:['De pie sobre una pierna, descalzo','Mueve el otro brazo y pierna en el aire','Progresión: cierra los ojos','30 s por lado'],
 tip:'El objetivo no es no moverse: es corregir rápido cuando te desequilibras. Esa corrección es el entrenamiento.'},
{id:'hip-airplane',cap:'control',pat:'cadera',mat:'none',lvl:3,seg:60,fix:['cadera','cintilla'],
 n:'Avión de cadera',s:'Rotación controlada en apoyo',
 why:'Entrena la rotación interna y externa de cadera en carga, sobre una sola pierna. Es de los mejores ejercicios para la estabilidad de cadera y para el pinzamiento femoroacetabular leve.',
 steps:['Bisagra sobre una pierna, tronco paralelo al suelo','Abre la cadera rotando hacia el techo','Cierra rotando hacia dentro','Lento y controlado, 8 por lado'],
 tip:'Difícil de entrada. Apóyate en una pared con una mano hasta que salga limpio.'},
{id:'copenhagen',cap:'fuerza',pat:'cadera',mat:'none',lvl:3,seg:50,fix:['aductor'],
 n:'Plancha de aductores',s:'Prevención de pubalgia',
 why:'El ejercicio Copenhagen es de los pocos con evidencia sólida en prevención de lesión de aductores, muy común en deportes de cambio de dirección. Fortalece el aductor en rango largo.',
 steps:['Tumbado de lado, pierna de arriba apoyada en un banco','Eleva la cadera formando línea con el cuerpo','Empieza con la rodilla apoyada (versión corta)','15-20 s por lado'],
 tip:'Empieza con la versión de rodilla. La de pie extendido es muy exigente y provoca agujetas fuertes.'},
{id:'nordic-curl',cap:'fuerza',pat:'cadera',mat:'none',lvl:3,seg:50,fix:['isquios'],
 n:'Curl nórdico',s:'Prevención de rotura de isquios',
 why:'El curl nórdico es la intervención con más evidencia para reducir lesiones de isquiotibiales, con reducciones muy notables en revisiones. Trabaja el isquio en excéntrico a alta demanda.',
 steps:['De rodillas con los tobillos sujetos','Baja el tronco despacio, cuerpo recto','Frena todo lo que puedas con los isquios','Amortigua con las manos y vuelve'],
 tip:'Al principio bajarás poco antes de caer, es normal. Progresa el control, no la profundidad.'},
{id:'glute-bridge',cap:'fuerza',pat:'cadera',mat:'none',lvl:1,seg:50,sets:3,reps:15,fix:['lumbar','isquios','rodilla'],
 n:'Puente de glúteo',s:'La base de la extensión de cadera',
 why:'Activa el glúteo mayor en un patrón seguro y sin carga axial. Es el punto de partida cuando la lumbar o la rodilla no toleran cargas mayores, y la base para progresar.',
 steps:['Boca arriba, rodillas flexionadas, pies apoyados','Mete el coxis y eleva la cadera','Aprieta el glúteo arriba 2 s','Baja controlado sin apoyar del todo'],
 tip:'Si notas los isquios acalambrarse, acerca los pies al glúteo y aprieta más el abdomen.'},
{id:'scap-pushup',cap:'control',pat:'empuje',mat:'none',lvl:1,seg:50,sets:3,reps:12,fix:['hombro','escapula'],
 n:'Flexión escapular',s:'Control del omóplato',
 why:'Aísla el movimiento de la escápula (protracción y retracción) sin doblar los codos. Fortalece el serrato anterior, clave para que el hombro se mueva sin pinzarse.',
 steps:['Posición de plancha alta, brazos rectos','Sin doblar codos, junta los omóplatos','Ahora sepáralos empujando el suelo','12 repeticiones lentas'],
 tip:'El recorrido es pequeño: unos centímetros. Si doblas los codos, ya es una flexión normal.'}
)

/* ── READAPTACIÓN: cuerpo completo ──────────────────────────── */
REHAB.push(
{ id:'cervical', n:'Cuello / cervicales', s:'Tensión o dolor cervical, típico de pantalla',
  causa:'Casi siempre postural y por falta de resistencia de la musculatura cervical profunda, no por una estructura dañada. La postura mantenida es el factor, y el remedio es moverse más y fortalecer.',
  red:'Dolor tras traumatismo, hormigueo o pérdida de fuerza en el brazo, mareo intenso, dolor de cabeza brusco y distinto a lo habitual.',
  fases:[
    { n:'1 · Calmar', dur:'1-2 semanas', ex:['chin-tuck-neck','thoracic-rot','cat-cow'],
      hacer:'Muévete a menudo: lo peor es la postura mantenida. Pantalla a la altura de los ojos. Evita cargar por encima de la cabeza de momento.',
      crit:'Girar la cabeza a ambos lados sin molestia' },
    { n:'2 · Fortalecer', dur:'2-4 semanas', ex:['neck-iso','chin-tuck-neck','scap-pushup','band-facepull'],
      hacer:'Isométricos de cuello y trabajo escapular 3-4 veces por semana.',
      crit:'Isométricos 10 s en las 4 direcciones sin dolor' },
    { n:'3 · Integrar', dur:'2-4 semanas', ex:['band-facepull','scap-pull','thoracic-rot','row-inverted'],
      hacer:'Añade tracción y trabajo de espalda alta. Reintroduce press por encima de la cabeza progresivamente.',
      crit:'Remo y face pull sin reacción al día siguiente' },
    { n:'4 · Mantener', dur:'continuo', ex:['band-facepull','chin-tuck-neck','thoracic-rot'],
      hacer:'2 sesiones por semana de por vida si trabajas con pantallas.',
      crit:'Mantenimiento' } ]},
{ id:'hombro-general', n:'Hombro (general)', s:'Molestia al elevar, cargar o dormir del lado',
  causa:'Lo más común es una sobrecarga del manguito rotador junto a un control escapular deficiente. El hombro tolera mucha carga si la escápula acompaña; cuando no lo hace, aparece el pinzamiento.',
  red:'Pérdida de fuerza marcada, dolor nocturno que despierta, incapacidad de elevar el brazo, dolor tras caída.',
  fases:[
    { n:'1 · Calmar', dur:'1-2 semanas', ex:['wall-slide','ext-rotation','scap-pushup'],
      hacer:'Evita lo que reproduce el dolor, sobre todo por encima de la cabeza. Sigue moviendo en rango sin dolor.',
      crit:'Elevar hasta la horizontal sin dolor' },
    { n:'2 · Estabilizar', dur:'2-4 semanas', ex:['ext-rotation','band-facepull','scap-pull','scap-pushup'],
      hacer:'Rotación externa y control escapular, 3 veces por semana.',
      crit:'3×15 rotación externa sin reacción posterior' },
    { n:'3 · Cargar', dur:'3-4 semanas', ex:['row-inverted','band-press','kb-row','pushup-incline'],
      hacer:'Empuje y tracción con rango controlado, progresando carga.',
      crit:'Flexión inclinada y remo sin molestia' },
    { n:'4 · Volver', dur:'continuo', ex:['kb-press','club-pendulum','band-facepull'],
      hacer:'Reintroduce trabajo por encima de la cabeza y mazas de forma gradual.',
      crit:'Mantén el preventivo 2 veces por semana' } ]},
{ id:'codo', n:'Codo / antebrazo', s:'Dolor en la cara externa o interna del codo',
  causa:'Tendinopatía por sobreuso (epicondilitis). El tendón no se ha adaptado a la carga acumulada. Como en todo tendón, la respuesta es carga progresiva, no reposo.',
  red:'Dolor tras traumatismo, hinchazón marcada, bloqueo articular, hormigueo en los dedos.',
  fases:[
    { n:'1 · Calmar', dur:'1-2 semanas', ex:['wrist-mob','scap-pushup'],
      hacer:'Reduce lo que provoca el dolor (agarres sostenidos, movimientos repetidos de muñeca). No pares del todo.',
      crit:'Coger objetos cotidianos sin dolor agudo' },
    { n:'2 · Cargar el tendón', dur:'4-6 semanas', ex:['wrist-ecc','wrist-mob','band-facepull'],
      hacer:'Excéntricos de antebrazo a diario o en días alternos. Es lento: cuenta en semanas, no días.',
      crit:'3×15 excéntricos sin dolor al día siguiente' },
    { n:'3 · Reintroducir', dur:'2-4 semanas', ex:['wrist-ecc','row-inverted','kb-carry'],
      hacer:'Añade agarre y tracción progresivamente. El paseo del granjero es excelente aquí.',
      crit:'Cargar peso en la mano sin reacción' },
    { n:'4 · Mantener', dur:'continuo', ex:['wrist-ecc','kb-carry','wrist-mob'],
      hacer:'Mantén excéntricos 2 veces por semana. Los tendones tardan en olvidar.',
      crit:'Mantenimiento' } ]},
{ id:'muneca', n:'Muñeca', s:'Molestia al apoyar las manos en el suelo',
  causa:'Suele ser falta de tolerancia a la carga en extensión, no lesión. La muñeca no está acostumbrada a soportar peso, y en calistenia se le pide de golpe.',
  red:'Dolor tras caída (descartar fractura), hormigueo persistente en los dedos, hinchazón.',
  fases:[
    { n:'1 · Preparar', dur:'1-2 semanas', ex:['wrist-mob'],
      hacer:'Apoya sobre los puños o usa paralelas para quitar la extensión mientras ganas tolerancia.',
      crit:'Apoyar las palmas 30 s sin molestia' },
    { n:'2 · Cargar', dur:'2-4 semanas', ex:['wrist-mob','wrist-ecc','scap-pushup'],
      hacer:'Aumenta el tiempo en apoyo progresivamente. Añade excéntricos de antebrazo.',
      crit:'Plancha alta 45 s cómodo' },
    { n:'3 · Volver', dur:'2-3 semanas', ex:['pushup-incline','plank','kb-carry'],
      hacer:'Reintroduce flexiones y trabajo en el suelo.',
      crit:'Flexiones sin molestia en la muñeca' },
    { n:'4 · Mantener', dur:'continuo', ex:['wrist-mob','kb-carry'],
      hacer:'Calienta siempre la muñeca antes de trabajo de suelo.',
      crit:'Mantenimiento' } ]},
{ id:'cadera', n:'Cadera / ingle', s:'Pinzamiento o molestia profunda en la ingle',
  causa:'Puede ser déficit de control rotacional, falta de fuerza de aductores o un pinzamiento femoroacetabular. El trabajo de fuerza en rangos tolerables suele mejorar los síntomas.',
  red:'Dolor que irradia, bloqueo, chasquido doloroso, dolor nocturno constante, cojera.',
  fases:[
    { n:'1 · Calmar', dur:'1-2 semanas', ex:['glute-bridge','psoas-lunge','hip-90-90'],
      hacer:'Evita rangos que pincen (sentadilla muy profunda). Trabaja en rango cómodo.',
      crit:'Caminar y subir escaleras sin molestia' },
    { n:'2 · Fortalecer', dur:'3-4 semanas', ex:['clamshell','glute-bridge','copenhagen','monster-walk'],
      hacer:'Glúteo y aductores. El Copenhagen empieza en versión corta.',
      crit:'Copenhagen 15 s por lado sin dolor' },
    { n:'3 · Control', dur:'3-4 semanas', ex:['hip-airplane','deadlift-single','squat-box','band-lateral'],
      hacer:'Control rotacional y fuerza a una pierna.',
      crit:'Avión de cadera 8 por lado controlado' },
    { n:'4 · Volver', dur:'continuo', ex:['copenhagen','hip-airplane','glute-bridge'],
      hacer:'Progresa rango y carga con paciencia.',
      crit:'Mantenimiento' } ]},
{ id:'isquios', n:'Isquiotibiales', s:'Tirón o molestia en la parte posterior del muslo',
  causa:'Suele ser una sobrecarga o rotura de bajo grado por esfuerzo a alta velocidad, o una tendinopatía proximal por compresión. El trabajo excéntrico es el pilar del tratamiento y de la prevención.',
  red:'Dolor súbito con chasquido, hematoma extenso, imposibilidad de caminar, dolor al sentarse muy localizado en el isquion.',
  fases:[
    { n:'1 · Calmar', dur:'1-2 semanas', ex:['glute-bridge','cat-cow','psoas-lunge'],
      hacer:'Nada de sprints ni estiramientos agresivos: estirar un isquio irritado lo empeora. Camina y pedalea suave.',
      crit:'Caminar rápido sin molestia' },
    { n:'2 · Cargar', dur:'3-4 semanas', ex:['glute-bridge','band-goodmorning','deadlift-single'],
      hacer:'Fuerza progresiva en rango corto, sin buscar estiramiento.',
      crit:'Peso muerto a una pierna 3×8 sin reacción' },
    { n:'3 · Excéntrico', dur:'3-4 semanas', ex:['nordic-curl','deadlift-single','hinge'],
      hacer:'Introduce el curl nórdico. Empieza con muy poco recorrido.',
      crit:'Nórdicos con control sin dolor posterior' },
    { n:'4 · Velocidad', dur:'continuo', ex:['nordic-curl','broad-jump','glute-bridge'],
      hacer:'Reintroduce carrera rápida de forma progresiva. Mantén nórdicos: es lo que evita la recaída.',
      crit:'Mantén nórdicos 1-2 veces por semana siempre' } ]},
{ id:'tobillo', n:'Tobillo', s:'Tras un esguince o inestabilidad al pisar',
  causa:'El esguince daña los ligamentos, pero lo que hace que se repita es el déficit propioceptivo que queda. Sin reentrenar el equilibrio, la tasa de recaída es alta.',
  red:'Imposibilidad de apoyar el pie, deformidad, dolor óseo puntual (descartar fractura), hinchazón que no baja.',
  fases:[
    { n:'1 · Movilidad', dur:'1-2 semanas', ex:['ankle-alphabet','foot-roll','toe-splay'],
      hacer:'Recupera rango sin dolor. Camina lo que toleres.',
      crit:'Rango completo sin dolor' },
    { n:'2 · Propiocepción', dur:'2-4 semanas', ex:['balance-1leg','ankle-balance-eyes','short-foot','calf-soleus'],
      hacer:'Equilibrio a diario. Es la parte que más previene la recaída.',
      crit:'30 s a la pata coja con ojos cerrados' },
    { n:'3 · Fuerza e impacto', dur:'2-4 semanas', ex:['calf-eccentric','pogo','heel-toe-walk','skater'],
      hacer:'Añade fuerza de gemelo y saltos suaves. El lateral es clave aquí.',
      crit:'Saltos de patinador estables sin dolor' },
    { n:'4 · Volver', dur:'continuo', ex:['ankle-balance-eyes','calf-eccentric','skater'],
      hacer:'Vuelve al deporte progresivamente. Mantén el equilibrio como rutina.',
      crit:'Mantenimiento' } ]},
{ id:'dorsal', n:'Espalda alta / dorsal', s:'Rigidez o molestia entre los omóplatos',
  causa:'Rigidez en flexión por postura mantenida y falta de fuerza en la musculatura escapular. La columna dorsal está hecha para rotar y extenderse, y pasa el día sin hacer ninguna de las dos.',
  red:'Dolor irradiado en cinturón, dolor que no cambia con la postura ni el movimiento, síntomas generales acompañantes.',
  fases:[
    { n:'1 · Movilizar', dur:'1-2 semanas', ex:['thoracic-rot','cat-cow','wall-slide'],
      hacer:'Movilidad dorsal a diario. Levántate cada media hora.',
      crit:'Rotar el tronco cómodo a ambos lados' },
    { n:'2 · Fortalecer', dur:'2-4 semanas', ex:['band-facepull','scap-pushup','row-inverted','band-pullapart'],
      hacer:'Trabajo escapular y de tracción 3 veces por semana.',
      crit:'3×12 remo invertido con control escapular' },
    { n:'3 · Cargar', dur:'3-4 semanas', ex:['kb-row','pullup-negative','kb-carry'],
      hacer:'Progresa carga en tracción.',
      crit:'Remo con peso sin molestia' },
    { n:'4 · Mantener', dur:'continuo', ex:['thoracic-rot','band-facepull','kb-row'],
      hacer:'Por cada empuje, una tracción. Regla permanente.',
      crit:'Mantenimiento' } ]}
)

/* ── OBJETIVOS ───────────────────────────────────────────────────
 * Cada objetivo define una periodización propia: fases por meses,
 * foco de cada fase y prioridades cuando no llegas a todo.
 */
const GOALS = [
  { id:'general', n:'Ponerme en forma', s:'Mejorar todas las capacidades', meses:6,
    intro:'Un plan equilibrado que toca fuerza, movilidad, control y resistencia. Sin especializar: mejor en todo.',
    prior:['Fuerza 2-3 veces por semana','Movilidad casi a diario, aunque sean 8 min','Algo de cardio suave 2 veces por semana','Descanso: sin él no hay adaptación'],
    fases:[
      {n:1,name:'Fundamentos',meses:'1-2',focus:['movilidad','control'],min:20,ses:3,
       why:'Primero el patrón y el rango. Cargar sobre un movimiento mal hecho es cómo aparecen las lesiones.'},
      {n:2,name:'Construcción',meses:'3-4',focus:['fuerza','movilidad'],min:30,ses:4,
       why:'Ahora se carga. El rango ganado hay que cargarlo para conservarlo.'},
      {n:3,name:'Integración',meses:'5-6',focus:['fuerza','potencia','resistencia'],min:35,ses:4,
       why:'Se mezclan capacidades como en la vida real: fuerza con potencia, movilidad bajo fatiga.'} ]},
  { id:'fuerza', n:'Ganar fuerza', s:'Progresiones hasta dominada y pistol', meses:6,
    intro:'Prioridad a la fuerza relativa: mover tu propio cuerpo. Movilidad como soporte, no como protagonista.',
    prior:['Fuerza 3-4 veces por semana','Progresar los 5 patrones básicos','Movilidad como calentamiento','Comer y dormir suficiente: sin eso no hay músculo'],
    fases:[
      {n:1,name:'Base y técnica',meses:'1-2',focus:['fuerza','control'],min:25,ses:3,
       why:'Aprender los patrones con volumen moderado y técnica limpia antes de buscar intensidad.'},
      {n:2,name:'Volumen',meses:'3-4',focus:['fuerza','control'],min:35,ses:4,
       why:'Más series y repeticiones. El volumen es el principal motor de la hipertrofia y de la fuerza inicial.'},
      {n:3,name:'Intensidad',meses:'5-6',focus:['fuerza','potencia'],min:35,ses:4,
       why:'Menos repeticiones y más dificultad: progresiones avanzadas y trabajo explosivo.'} ]},
  { id:'movilidad', n:'Ganar movilidad', s:'Recuperar rango perdido', meses:4,
    intro:'Para quien está rígido de años de silla. Rango primero, y luego fuerza en ese rango para que se quede.',
    prior:['Movilidad a diario, aunque sean 10 min','Fuerza en rangos largos 2 veces por semana','Paciencia: el tejido conectivo tarda meses','Constancia por encima de intensidad'],
    fases:[
      {n:1,name:'Desbloquear',meses:'1-2',focus:['movilidad'],min:20,ses:5,
       why:'Frecuencia alta y baja intensidad. La movilidad responde a la repetición diaria, no a sesiones épicas.'},
      {n:2,name:'Cargar el rango',meses:'3-4',focus:['movilidad','fuerza','control'],min:30,ses:4,
       why:'El estiramiento pasivo da rango temporal; cargarlo es lo que hace que el cuerpo lo conserve.'} ]},
  { id:'triatlon', n:'Triatlón', s:'Fuerza y prevención para las 3 disciplinas', meses:11,
    intro:'La fuerza al servicio del rendimiento y, sobre todo, de no lesionarte. La app cubre fuerza, movilidad y prevención; nado, bici y carrera los registras tú.',
    prior:['Una sesión de fuerza es lo primero que se abandona y lo que más protege','Bici: volumen aeróbico sin impacto','Natación: técnica antes que volumen','Correr: lo último si vienes con base de carrera'],
    fases:[
      {n:1,name:'Cimientos',meses:'1-3',focus:['movilidad','control'],min:20,ses:3,
       why:'Arreglar déficits antes de subir volumen. Aquí es donde se previene la lesión de toda la temporada.'},
      {n:2,name:'Construcción',meses:'4-6',focus:['fuerza','movilidad'],min:25,ses:4,
       why:'Cargar sobre una base ya sólida, y empezar los ladrillos (bici + carrera seguidos).'},
      {n:3,name:'Específico',meses:'7-9',focus:['fuerza','potencia'],min:25,ses:3,
       why:'La fuerza pasa a mantenimiento: el protagonismo se lo llevan las tres disciplinas.'},
      {n:4,name:'Afinar',meses:'10-11',focus:['movilidad','control'],min:20,ses:2,
       why:'Llegar fresco, no llegar fuerte. En las últimas semanas se gana descansando.'} ]},
  { id:'correr', n:'Correr mejor', s:'Maratón, media o 10k sin lesionarme', meses:6,
    intro:'El corredor se lesiona por falta de fuerza, no por falta de kilómetros. Esto es el complemento que casi nadie hace.',
    prior:['Fuerza 2 veces por semana, innegociable','Glúteo medio y sóleo: los dos grandes olvidados','Movilidad de cadera y tobillo','No subir volumen más de un 10% semanal'],
    fases:[
      {n:1,name:'Estructura',meses:'1-2',focus:['control','movilidad'],min:20,ses:3,
       why:'Estabilidad de cadera y tobillo antes de añadir kilómetros. Es lo que evita cintilla y rodilla.'},
      {n:2,name:'Fuerza',meses:'3-4',focus:['fuerza','control'],min:25,ses:3,
       why:'Fuerza de piernas y core. Mejora la economía de carrera y la tolerancia al impacto.'},
      {n:3,name:'Elasticidad',meses:'5-6',focus:['potencia','fuerza'],min:25,ses:3,
       why:'Trabajo elástico y pliométrico: devuelve energía en cada zancada y mejora la economía.'} ]},
  { id:'volver', n:'Volver a entrenar', s:'Retomar tras mucho tiempo parado', meses:3,
    intro:'Progresión muy suave. El error clásico al volver es empezar donde lo dejaste, y acabar lesionado en dos semanas.',
    prior:['Empezar por debajo de lo que crees que puedes','Constancia antes que intensidad','Movilidad diaria, fuerza 2 veces por semana','Si dudas entre hacer más o menos: menos'],
    fases:[
      {n:1,name:'Reactivar',meses:'1',focus:['movilidad','control'],min:15,ses:3,
       why:'Volver a moverse sin agujetas incapacitantes. El objetivo es crear el hábito, no el estímulo.'},
      {n:2,name:'Construir',meses:'2',focus:['fuerza','movilidad','control'],min:20,ses:3,
       why:'Introducir carga de forma gradual, ya con el hábito instalado.'},
      {n:3,name:'Consolidar',meses:'3',focus:['fuerza','control','resistencia'],min:25,ses:4,
       why:'Subir volumen y variedad. A partir de aquí puedes elegir otro objetivo.'} ]},
]

/* ── Ejercicios específicos por deporte ─────────────────────── */
EX.push(
{id:'split-squat-heavy',cap:'fuerza',pat:'rodilla',mat:'peso',lvl:2,seg:60,sets:4,reps:8,
 n:'Zancada búlgara con peso',s:'Fuerza unilateral para pedalear',
 why:'El pedaleo es unilateral y alterno. Cargar cada pierna por separado corrige asimetrías y desarrolla la fuerza que se traduce en eficiencia de pedaleo, uno de los efectos demostrados del entrenamiento de fuerza pesado en ciclistas.',
 steps:['Pie de atrás elevado, peso en las manos','Baja recto sobre la pierna delantera','Tronco ligeramente inclinado','Empuja con el talón para subir'],
 tip:'Cargas altas y pocas repeticiones: el objetivo es fuerza, no fatiga. Descansa 2-3 min entre series.'},
{id:'step-up',cap:'fuerza',pat:'rodilla',mat:'peso',lvl:1,seg:55,sets:3,reps:10,
 n:'Subida a cajón',s:'Extensión de cadera con transferencia',
 why:'Replica el gesto de empujar el pedal en la fase de potencia y el de subir escalones o cuestas. Fuerza unilateral con muy poca carga axial sobre la columna.',
 steps:['Cajón o banco a la altura de la rodilla','Sube apoyando todo el pie, sin impulso del pie de atrás','Extiende la cadera arriba','Baja controlado, sin dejarte caer'],
 tip:'Si te impulsas con la pierna de abajo, has hecho trampa. El trabajo lo hace la pierna de arriba.'},
{id:'calf-raise-heavy',cap:'fuerza',pat:'rodilla',mat:'peso',lvl:2,seg:55,sets:4,reps:12,
 n:'Elevación de talón con carga',s:'Transferencia en el pedal y la zancada',
 why:'El gemelo y el sóleo transmiten la fuerza al pedal y absorben el impacto al correr. Es de los grupos que más se sobrecargan y menos se entrenan de forma específica.',
 steps:['De pie sobre un escalón, peso en las manos','Talones por debajo del nivel del escalón','Sube al máximo y aguanta 1 s','Baja lento hasta el estiramiento'],
 tip:'Haz una serie con la rodilla recta (gemelo) y otra doblada (sóleo). Trabajan a rangos distintos.'},
{id:'pallof',cap:'control',pat:'core',mat:'goma',lvl:2,seg:55,sets:3,reps:10,
 n:'Press Pallof',s:'Antirrotación pura',
 why:'El core de un ciclista o nadador debe impedir que el tronco rote mientras las piernas o los brazos trabajan alternos. Es exactamente lo que entrena este ejercicio.',
 steps:['Goma anclada al lado, a la altura del pecho','De pie perpendicular, manos en el centro','Extiende los brazos al frente resistiendo la rotación','Aguanta 3 s y vuelve'],
 tip:'Cuanto más lejos extiendes, más palanca. Si el tronco gira, acerca las manos al pecho.'},
{id:'lat-pulldown-band',cap:'fuerza',pat:'traccion',mat:'goma',lvl:1,seg:55,sets:3,reps:15,
 n:'Jalón con goma',s:'El gesto de la brazada',
 why:'Reproduce la fase propulsiva de la brazada de crol: dorsal ancho tirando desde arriba. La goma da resistencia creciente, similar al agarre progresivo en el agua.',
 steps:['Goma anclada arriba, de rodillas o de pie','Tira llevando los codos abajo y atrás','Inicia con el omóplato, no con la mano','Vuelve despacio resistiendo'],
 tip:'El codo va alto al inicio y baja pegado al cuerpo: es el patrón del agarre en el agua.'},
{id:'streamline-hold',cap:'control',pat:'core',mat:'none',lvl:1,seg:50,
 n:'Posición hidrodinámica',s:'La postura que reduce resistencia',
 why:'La posición de deslizamiento requiere elevación de hombro completa con el core apretado. Practicarla en seco mejora la posición en el agua, que importa más que la fuerza para nadar rápido.',
 steps:['Tumbado boca abajo, brazos extendidos y juntos','Una mano sobre la otra, brazos pegados a las orejas','Aprieta glúteos y abdomen, cuerpo en línea','Mantén 20-30 s'],
 tip:'Si no puedes juntar los brazos con las orejas sin arquear la lumbar, te falta movilidad de hombro y dorsal.'},
{id:'hip-thrust',cap:'fuerza',pat:'cadera',mat:'peso',lvl:2,seg:60,sets:4,reps:10,
 n:'Empuje de cadera',s:'Extensión de cadera con carga',
 why:'Es el ejercicio que más carga permite en extensión horizontal de cadera. Transferencia directa a esprint, sentadilla y aceleración, con poca demanda sobre la lumbar comparado con el peso muerto.',
 steps:['Espalda apoyada en un banco, peso sobre la cadera','Pies apoyados, rodillas a 90 grados arriba','Empuja la cadera arriba apretando el glúteo','Barbilla al pecho: no arquees la lumbar'],
 tip:'La mirada acompaña a la cadera. Si miras al techo arqueando el cuello, la lumbar se arquea también.'},
{id:'bear-hold',cap:'control',pat:'core',mat:'none',lvl:1,seg:45,
 n:'Posición de oso',s:'Core en cuadrupedia',
 why:'Mantener las rodillas a un centímetro del suelo activa todo el core en posición neutra. Es una plancha más exigente y con mejor transferencia a los deportes en flexión de cadera.',
 steps:['A cuatro apoyos, manos bajo hombros, rodillas bajo caderas','Despega las rodillas un centímetro','Espalda plana, sin subir el culo','Respira con normalidad 30 s'],
 tip:'Pon algo en la espalda baja: si se cae, has perdido la posición neutra.'},
{id:'sled-push-sim',cap:'resistencia',pat:'rodilla',mat:'none',lvl:2,seg:45,
 n:'Empuje isométrico en pared',s:'Fuerza-resistencia de piernas',
 why:'Simula el empuje sostenido de una subida larga o un esprint. Genera tensión alta sin material y sin impacto, útil para acumular trabajo de piernas cuando no puedes cargar peso.',
 steps:['Manos en la pared, cuerpo inclinado','Una pierna atrás extendida, la otra flexionada','Empuja la pared con fuerza sostenida 20 s','Cambia de pierna'],
 tip:'Empuja como si quisieras mover la pared. La tensión debe notarse en glúteo y gemelo.'}
)

/* ── PLANES POR DEPORTE ──────────────────────────────────────── */
GOALS.push(
{ id:'ciclismo', n:'Ciclismo (carretera)', s:'Fuerza para pedalear más y mejor', meses:6,
  intro:'La fuerza pesada mejora la eficiencia de pedaleo y la potencia anaeróbica en ciclistas entrenados, sin penalizar el VO2máx. Esto es el complemento de gimnasio; las horas de bici las pones tú.',
  prior:['Fuerza 2 veces por semana en pretemporada, 1 en temporada','Cargas altas y pocas repeticiones: buscas fuerza, no fatiga','Separa fuerza y bici 6-8 h, o en días distintos','Movilidad de cadera y dorsal: la posición aerodinámica la castiga'],
  fases:[
    {n:1,name:'Adaptación',meses:'1-2',focus:['movilidad','control'],min:25,ses:3,
     why:'La postura sobre la bici acorta flexores de cadera y cierra el pecho. Antes de cargar hay que devolver rango y estabilizar el core.'},
    {n:2,name:'Fuerza máxima',meses:'3-4',focus:['fuerza'],min:35,ses:2,
     why:'Cargas altas y pocas repeticiones. Es la fase que mejora la eficiencia de pedaleo, y va en pretemporada porque genera fatiga.'},
    {n:3,name:'Transferencia',meses:'5-6',focus:['fuerza','potencia'],min:30,ses:2,
     why:'Menos volumen de gimnasio y más explosividad. La fuerza pasa a mantenimiento mientras la bici manda.'} ]},
{ id:'btt', n:'BTT / Montaña', s:'Fuerza, control y tren superior', meses:6,
  intro:'El BTT no es ciclismo de carretera con barro: exige tren superior, core y capacidad de absorber impactos. El plan añade control y potencia que la carretera no necesita.',
  prior:['Core y tren superior: en BTT sujetas la bici, no solo pedaleas','Fuerza de agarre: se agota antes que las piernas en descensos largos','Trabajo unilateral y de equilibrio para el terreno irregular','Movilidad de muñeca y hombro por las vibraciones'],
  fases:[
    {n:1,name:'Base y control',meses:'1-2',focus:['control','movilidad'],min:25,ses:3,
     why:'Estabilidad de core y hombro, y movilidad de muñeca. El terreno irregular exige un cuerpo que corrija rápido.'},
    {n:2,name:'Fuerza global',meses:'3-4',focus:['fuerza','control'],min:35,ses:3,
     why:'Piernas, espalda y agarre. En BTT el tren superior trabaja tanto como el inferior.'},
    {n:3,name:'Potencia y absorción',meses:'5-6',focus:['potencia','fuerza'],min:30,ses:3,
     why:'Arrancadas explosivas y capacidad de absorber impactos en las caídas de rueda.'} ]},
{ id:'natacion', n:'Natación', s:'Trabajo en seco para nadar mejor',  meses:6,
  intro:'El hombro es la zona de lesión número uno del nadador. Este plan combina propulsión (dorsal y core) con prevención de hombro, que es lo que sostiene toda la temporada.',
  prior:['Prevención de hombro SIEMPRE, no solo cuando duele','Core: la posición en el agua importa más que la fuerza bruta','Movilidad dorsal y de hombro para la posición hidrodinámica','Equilibra: por cada empuje, dos tracciones'],
  fases:[
    {n:1,name:'Hombro sano',meses:'1-2',focus:['control','movilidad'],min:25,ses:3,
     why:'Control escapular y rotadores externos antes de nada. Nadar carga rotación interna: sin equilibrar, aparece el pinzamiento.'},
    {n:2,name:'Propulsión',meses:'3-4',focus:['fuerza','control'],min:30,ses:3,
     why:'Dorsal, core y cadena posterior: lo que genera propulsión y mantiene la línea del cuerpo.'},
    {n:3,name:'Potencia',meses:'5-6',focus:['potencia','fuerza'],min:30,ses:3,
     why:'Salidas y virajes son actos de potencia. Aquí se entrena la explosividad que ahorra décimas.'} ]},
{ id:'trail', n:'Trail / Montaña a pie', s:'Bajadas, tobillos y desnivel', meses:6,
  intro:'El trail castiga distinto: bajadas excéntricas, terreno irregular y tobillos. El plan prioriza absorción de impacto y estabilidad, no solo motor aeróbico.',
  prior:['Excéntrico de cuádriceps: las bajadas son lo que destroza','Propiocepción de tobillo, a diario si puedes','Core para la estabilidad en terreno técnico','Sube desnivel progresivamente, no de golpe'],
  fases:[
    {n:1,name:'Tobillo y base',meses:'1-2',focus:['control','movilidad'],min:25,ses:3,
     why:'El tobillo es lo primero que falla en terreno irregular. Propiocepción antes que fuerza.'},
    {n:2,name:'Fuerza excéntrica',meses:'3-4',focus:['fuerza','control'],min:30,ses:3,
     why:'Bajar castiga más que subir. La fuerza excéntrica de cuádriceps es lo que permite bajar sin destrozarse.'},
    {n:3,name:'Terreno',meses:'5-6',focus:['potencia','fuerza'],min:30,ses:3,
     why:'Saltos, cambios de dirección y absorción: lo que pide el terreno técnico real.'} ]},
{ id:'equipo', n:'Deportes de equipo', s:'Fútbol, baloncesto, pádel…', meses:6,
  intro:'Cambios de dirección, aceleraciones y frenadas. La lesión más común es la de isquiotibiales, y es de las más prevenibles que existen con el trabajo adecuado.',
  prior:['Curl nórdico: la intervención con más evidencia contra la lesión de isquios','Trabajo lateral y de cambio de dirección','Aductores (Copenhagen) para prevenir pubalgia','Aterrizajes: saber caer previene rodilla y tobillo'],
  fases:[
    {n:1,name:'Base',meses:'1-2',focus:['control','movilidad'],min:25,ses:3,
     why:'Estabilidad de cadera, rodilla y tobillo antes de meter velocidad y cambios de dirección.'},
    {n:2,name:'Fuerza y prevención',meses:'3-4',focus:['fuerza','control'],min:30,ses:3,
     why:'Nórdicos, aductores y fuerza unilateral: el paquete preventivo con mejor evidencia.'},
    {n:3,name:'Potencia y agilidad',meses:'5-6',focus:['potencia','fuerza'],min:30,ses:3,
     why:'Saltos, aterrizajes y trabajo lateral, que es donde ocurre la lesión sin contacto.'} ]},
{ id:'escalada', n:'Escalada', s:'Agarre, tracción y hombro sano', meses:6,
  intro:'La escalada crea un desequilibrio brutal: mucha tracción y nada de empuje. Este plan compensa para que el hombro y el codo aguanten los años.',
  prior:['Compensa: por cada tracción de escalada, empuje en el plan','Prevención de codo: la epicondilitis es casi un rito de paso','Movilidad de muñeca y hombro','Core antiextensión para las placas desplomadas'],
  fases:[
    {n:1,name:'Compensar',meses:'1-2',focus:['control','movilidad'],min:25,ses:3,
     why:'Rotadores externos, empuje y movilidad. Contrarrestar el patrón de tracción antes de añadir más.'},
    {n:2,name:'Fuerza',meses:'3-4',focus:['fuerza','control'],min:30,ses:3,
     why:'Fuerza global y de core. Escalar ya te da tracción: aquí se trabaja lo que falta.'},
    {n:3,name:'Potencia',meses:'5-6',focus:['potencia','fuerza'],min:30,ses:3,
     why:'Trabajo explosivo para lanzamientos y bloques.'} ]}
)

// Agrupación para que 12 objetivos no abrumen en pantalla
const GOAL_GROUPS = [
  { n:'Salud y forma física', ids:['general','fuerza','movilidad','volver'] },
  { n:'Resistencia',          ids:['correr','ciclismo','natacion','triatlon'] },
  { n:'Deporte específico',   ids:['btt','trail','equipo','escalada'] },
]

/* ── ACONDICIONAMIENTO ───────────────────────────────────────────
 * Sistema completo: aeróbico, umbral, VO2máx, anaeróbico y potencia.
 * Cada bloque estimula un sistema energético distinto.
 *
 * Referencias del enfoque:
 *  · 4x4 noruego (NTNU, Helgerud 2007): ~7-9% de VO2máx en 8 semanas.
 *    Intervalos largos mantienen más tiempo cerca del VO2máx que los cortos.
 *  · 40/20 de Rønnestad y 4x8 de Seiler: alternativas con respaldo que
 *    igualan o superan al 4x4 según el trabajo. Variar el estímulo evita
 *    el estancamiento; ninguno es "el mejor" para siempre.
 *  · Para SUBIR VO2máx: 2 sesiones duras/semana (nunca en días seguidos),
 *    sobre una base amplia de zona 2. Rota el protocolo cada 3-4 semanas
 *    y mete una semana suave de cada cuatro. La mejora vive en la
 *    recuperación, no en acumular sesiones duras.
 *  · Distribución polarizada: ~80% del volumen en baja intensidad.
 *  · Anaeróbico: descansos largos, series cortas. Si no descansas, no es anaeróbico.
 *
 * modo: 'libre' = corre, pedalea, nada o rema, lo que prefieras.
 */
const COND = [
  /* ── NIVEL INICIAL ── */
  { id:'nivel-inicial', sis:'aerobico', n:'Nivel inicial · tu primer día', min:20, int:1, modo:'libre',
    s:'Para quien no entrena nada. Empieza por moverte',
    why:'Si llevas tiempo parado, el error es empezar demasiado fuerte y abandonar en una semana. Tu nivel inicial no es correr rápido: es moverte de forma cómoda y repetible. La forma llega sola cuando el hábito ya está. No busques agotarte, busca volver mañana.',
    steps:['5 min de caminar o pedalear suave, soltando el cuerpo','10 min a un ritmo cómodo en el que puedas hablar sin ahogarte','Si te falta el aire para hablar, baja: vas demasiado fuerte','5 min bajando el ritmo hasta pararte','Termina con la sensación de "podría haber hecho más". Esa es la clave para repetir'],
    tip:'El objetivo de las primeras semanas no es la forma física, es crear el hábito. Mejor 20 min fáciles cuatro días que 1 hora dura que no repites. Cuando esto te sepa a poco, sube al Nivel siguiente (Zona 2 continua).' },
  /* ── AERÓBICO BASE ── */
  { id:'z2-base', sis:'aerobico', n:'Zona 2 continua', min:60, int:1, modo:'libre',
    s:'El pilar del 80% del volumen',
    why:'La intensidad baja y sostenida desarrolla densidad mitocondrial, capilarización y capacidad de usar grasa como combustible. Es aburrido y es lo que más importa: la mayoría entrena demasiado fuerte los días fáciles y demasiado flojo los días duros.',
    steps:['10 min progresivos hasta llegar a zona 2','Mantén una intensidad conversacional: puedes hablar en frases completas','Si te falta el aire para hablar, vas demasiado fuerte','5-10 min de vuelta a la calma'],
    tip:'La prueba de la conversación es más fiable que cualquier pulsómetro. Si no puedes charlar, no es zona 2.' },
  { id:'z2-long', sis:'aerobico', n:'Salida larga', min:120, int:1, modo:'libre',
    s:'Resistencia de base y eficiencia grasa',
    why:'Las sesiones largas a baja intensidad mejoran la oxidación de grasas y la resistencia a la fatiga. Son el cimiento sobre el que se apoya todo lo demás: sin base aeróbica, la intensidad no cunde.',
    steps:['Empieza muy suave, más de lo que crees necesario','Mantén intensidad conversacional todo el rato','Come e hidrátate si pasas de 90 min','Termina sintiendo que podrías seguir'],
    tip:'Si terminas destrozado, no era una salida larga: era una carrera. El objetivo es acumular tiempo, no sufrir.' },
  { id:'z2-fasted', sis:'aerobico', n:'Aeróbico en ayunas', min:45, int:1, modo:'libre',
    s:'Flexibilidad metabólica',
    why:'Entrenar suave con las reservas bajas potencia la señalización para usar grasa como sustrato. Es una herramienta puntual, no una norma: hecho a diario compromete la recuperación y la calidad de las sesiones duras.',
    steps:['Por la mañana, antes de desayunar','Intensidad muy baja: conversacional cómoda','Máximo 45-60 min','Desayuna con proteína al terminar'],
    tip:'Nunca hagas sesiones de intensidad en ayunas. Para eso necesitas glucógeno, y forzarlo solo trae sesiones malas.' },

  /* ── UMBRAL ── */
  { id:'tempo', sis:'umbral', n:'Tempo continuo', min:50, int:3, modo:'libre',
    s:'Ritmo cómodamente duro',
    why:'El trabajo sostenido cerca del umbral mejora la capacidad de mantener intensidades altas durante más tiempo. Es la intensidad que más se parece a una prueba de media distancia.',
    steps:['15 min de calentamiento progresivo','20-30 min a ritmo "cómodamente duro"','Puedes decir frases cortas, no conversar','10 min de vuelta a la calma'],
    tip:'El error clásico es ir demasiado fuerte. El tempo debe dejarte con la sensación de poder haber seguido 10 min más.' },
  { id:'threshold-int', sis:'umbral', n:'Intervalos de umbral', min:60, int:3, modo:'libre',
    s:'Bloques largos cerca del umbral',
    why:'Fraccionar el trabajo de umbral permite acumular más tiempo total a esa intensidad que en continuo. Mejora la potencia sostenible, que es lo que determina el rendimiento en pruebas de 20-60 min.',
    steps:['20 min de calentamiento','3 × 10 min a ritmo de umbral, 3 min suaves entre bloques','Mantén la misma intensidad en los tres','10 min de vuelta a la calma'],
    tip:'Si el tercer bloque se te cae, saliste demasiado fuerte. Todos deben ser iguales: esa es la señal de haberlo hecho bien.' },
  { id:'sweet-spot', sis:'umbral', n:'Sweet spot', min:55, int:3, modo:'libre',
    s:'Justo por debajo del umbral',
    why:'Trabajar ligeramente por debajo del umbral permite acumular mucho volumen de calidad con menos fatiga que en el umbral estricto. Es la zona con mejor relación estímulo/recuperación cuando el tiempo escasea.',
    steps:['15 min de calentamiento','2 × 15 min a intensidad justo por debajo de umbral','5 min suaves entre bloques','10 min de vuelta a la calma'],
    tip:'Debe costar, pero terminar cada bloque sin agonía. Si acabas reventado, era umbral, no sweet spot.' },

  /* ── VO2 MÁX ── */
  { id:'4x4', sis:'vo2', n:'4x4 noruego', min:40, int:5, modo:'libre',
    s:'El protocolo más estudiado para VO2máx',
    why:'Desarrollado en la universidad noruega NTNU, es el protocolo de intervalos con más respaldo para elevar el VO2máx: en torno a un 7-9% de mejora en 8 semanas haciéndolo 3 veces por semana. Los 4 minutos son clave: obligan al corazón a sostener el volumen sistólico máximo, algo que los sprints de 30 s no consiguen.',
    steps:['10 min de calentamiento progresivo','4 × 4 min a intensidad muy alta (no máxima: debes completar los cuatro)','3 min de recuperación activa entre series','5 min de vuelta a la calma'],
    tip:'El primer intervalo debe parecer casi fácil. Si el cuarto no lo terminas, empezaste demasiado fuerte: el objetivo es completar los cuatro iguales.' },
  { id:'5x3', sis:'vo2', n:'5 × 3 minutos', min:38, int:5, modo:'libre',
    s:'Variante algo más intensa',
    why:'Intervalos algo más cortos permiten una intensidad ligeramente superior manteniendo un tiempo total elevado cerca del VO2máx. Buena alternativa al 4x4 para variar el estímulo.',
    steps:['12 min de calentamiento','5 × 3 min a intensidad muy alta','2:30 de recuperación entre series','8 min suaves'],
    tip:'Alterna esta sesión con el 4x4 en semanas distintas. Variar el estímulo evita el estancamiento.' },
  { id:'30-30', sis:'vo2', n:'30-30 (Billat)', min:35, int:4, modo:'libre',
    s:'Mucho tiempo a alta intensidad, más llevadero',
    why:'Alternar 30 s fuertes y 30 s suaves permite acumular mucho tiempo cerca del VO2máx con una percepción de esfuerzo menor que los intervalos largos. Muy útil para quien no tolera bien los bloques de 4 min.',
    steps:['15 min de calentamiento','2 bloques de 10 × (30 s fuerte / 30 s suave)','5 min entre bloques','10 min de vuelta a la calma'],
    tip:'Los 30 s suaves son trote o pedaleo ligero, no parada. La recuperación activa mantiene el pulso alto, que es la gracia.' },
  { id:'40-20', sis:'vo2', n:'40-20 (Rønnestad)', min:42, int:5, modo:'libre',
    s:'Intervalos cortos que baten al 4x4 en algunos estudios',
    why:'Estudiados por Rønnestad en ciclistas: 3 bloques de 13 repeticiones de 40 s fuerte / 20 s suave. En varios trabajos igualan o superan al 4x4 en ganancia de VO2máx y potencia, porque el estímulo se reparte y permite mantener más potencia media en cada intervalo. La recuperación de solo 20 s mantiene el consumo de oxígeno alto sin dejarte caer.',
    steps:['15 min de calentamiento progresivo','3 bloques de 13 × (40 s fuerte / 20 s suave)','3 min de recuperación entre bloques','10 min de vuelta a la calma'],
    tip:'El "fuerte" no es sprint: es la mayor intensidad que puedas repetir 13 veces sin desplomarte. Ajusta por el primer bloque, no por el primer intervalo.' },
  { id:'4x8', sis:'vo2', n:'4 × 8 minutos (Seiler)', min:55, int:4, modo:'libre',
    s:'Intervalos largos, intensidad algo menor, gran volumen de calidad',
    why:'Seiler comparó 4×4, 4×8 y 4×16 y el 4×8 salió como el que mejor equilibrio ofrecía entre intensidad y volumen tolerable. Ocho minutos obligan a una intensidad algo por debajo del 4x4 pero acumulas mucho más tiempo total en la zona alta. Excelente cuando ya tienes base y quieres progresar sin destrozarte.',
    steps:['15 min de calentamiento','4 × 8 min a ritmo "duro sostenible" (algo por debajo del 4x4)','2 min de recuperación entre series','10 min de vuelta a la calma'],
    tip:'Regula para terminar los cuatro al mismo ritmo. Si el primero va muy por encima de los demás, empezaste demasiado fuerte.' },

  /* ── ANAERÓBICO ── */
  { id:'sprints', sis:'anaerobico', n:'Sprints máximos', min:35, int:5, modo:'libre',
    s:'Potencia y capacidad anaeróbica',
    why:'Los esfuerzos máximos y breves con descanso completo entrenan la vía anaeróbica y la potencia neuromuscular. La clave es el descanso largo: si no te recuperas, bajas la intensidad y dejas de entrenar lo que querías.',
    steps:['15 min de calentamiento con progresiones','6-8 × 15-20 s a intensidad MÁXIMA','2-3 min de recuperación completa entre sprints','10 min muy suaves'],
    tip:'Si el último sprint es mucho más lento que el primero, descansa más o haz menos repeticiones. La calidad manda.' },
  { id:'lactic', sis:'anaerobico', n:'Tolerancia al lactato', min:40, int:5, modo:'libre',
    s:'Aguantar con las piernas ardiendo',
    why:'Series de 60-90 s a intensidad muy alta con recuperación incompleta entrenan la capacidad de tamponar y tolerar la acidosis. Es una sesión dura: máximo una por semana y nunca en fase de descarga.',
    steps:['15 min de calentamiento completo','5 × 90 s muy fuerte','90 s de recuperación (incompleta a propósito)','10-15 min de vuelta a la calma larga'],
    tip:'Esta sesión deja fatiga. No la pongas el día antes de algo importante ni dos veces en la misma semana.' },
  { id:'hill-sprints', sis:'anaerobico', n:'Cuestas cortas', min:35, int:5, modo:'libre',
    s:'Potencia con menos impacto',
    why:'La cuesta limita la velocidad y por tanto reduce el impacto y el riesgo de tirón, mientras exige potencia máxima. Es la forma más segura de introducir trabajo de velocidad en corredores.',
    steps:['15 min de calentamiento','8 × 10-15 s subiendo a tope','Baja caminando: esa es la recuperación','10 min suaves al terminar'],
    tip:'Ideal si vuelves de una lesión de isquios: la cuesta protege porque no puedes alcanzar velocidad máxima.' },

  /* ── POTENCIA / CIRCUITOS ── */
  { id:'emom', sis:'potencia', n:'EMOM de fuerza-resistencia', min:20, int:4, modo:'casa',
    s:'Cada minuto en punto',
    why:'Formato de densidad: haces un número fijo de repeticiones al inicio de cada minuto y descansas el resto. Mantiene la calidad técnica mientras sube la carga cardiovascular, y controla la fatiga mejor que un AMRAP.',
    steps:['Elige 2 ejercicios y alterna cada minuto','Ejemplo: minuto 1, 10 sentadillas; minuto 2, 8 flexiones','Haz las repeticiones y descansa lo que sobre del minuto','20 minutos en total'],
    tip:'Si no te sobran al menos 15 s de descanso, has elegido demasiadas repeticiones. Baja el número.' },
  { id:'circuit', sis:'potencia', n:'Circuito metabólico', min:25, int:4, modo:'casa',
    s:'Fuerza y cardio a la vez',
    why:'Encadenar ejercicios con poco descanso mantiene el pulso alto mientras se trabaja la musculatura. Es eficiente cuando hay poco tiempo, aunque no sustituye ni al trabajo de fuerza pesada ni al aeróbico específico.',
    steps:['5 ejercicios seguidos, 40 s de trabajo y 20 s de transición','Alterna tren superior e inferior para repartir la fatiga','Descansa 2 min al terminar la vuelta','3-4 vueltas'],
    tip:'Alternar arriba y abajo permite mantener la intensidad sin que un grupo muscular se convierta en el limitante.' },
  { id:'tabata', sis:'potencia', n:'Tabata', min:15, int:5, modo:'casa',
    s:'4 minutos que duelen',
    why:'20 s a intensidad máxima y 10 s de descanso, ocho veces. Es un protocolo muy intenso y muy breve: útil como estímulo puntual, pero no como base de un plan. Su fama excede lo que aporta si se abusa.',
    steps:['10 min de calentamiento serio: es intenso desde el segundo uno','8 × (20 s máximo / 10 s descanso) = 4 min','Elige un ejercicio cíclico: bici, remo, burpees','5 min de vuelta a la calma'],
    tip:'Un Tabata bien hecho basta como sesión de intensidad. Encadenar varios es una forma de acumular fatiga sin más beneficio.' },
  { id:'active-recovery', sis:'aerobico', n:'Recuperación activa', min:30, int:1, modo:'libre',
    s:'El día después de la sesión dura',
    why:'El movimiento muy suave favorece el flujo sanguíneo sin añadir carga. No es entrenamiento: es facilitar la recuperación, y es lo que permite entrenar con calidad al día siguiente.',
    steps:['Intensidad muy baja: debes poder cantar, no solo hablar','20-30 min','Termina con movilidad suave','Si dudas, ve más flojo'],
    tip:'La tentación es acelerar porque te sientes bien. Resístela: convertir la recuperación en entrenamiento medio es el error más común.' },
]

const SISTEMAS = {
  aerobico:   { n:'Aeróbico',    c:'#2ee6c8', d:'Base: el 80% de tu volumen debería estar aquí' },
  umbral:     { n:'Umbral',      c:'#c9f24d', d:'Ritmo sostenible: mejora tu velocidad de crucero' },
  vo2:        { n:'VO2 máx',     c:'#ff6a1f', d:'Intervalos largos: el mayor estímulo cardíaco' },
  anaerobico: { n:'Anaeróbico',  c:'#b07cff', d:'Esfuerzos cortos y máximos con descanso largo' },
  potencia:   { n:'Circuitos',   c:'#5ad2ff', d:'Fuerza y cardio combinados, sin material' },
}

/* ── ZONAS Y RITMOS ──────────────────────────────────────────────
 * Calcula ritmos de entrenamiento a partir de una marca reciente,
 * al estilo de las tablas clásicas (Daniels/Jack Tupper) simplificadas.
 *
 * REGLA IMPORTANTE: se calcula sobre lo que corres HOY, no sobre tu
 * mejor marca histórica. Entrenar con ritmos de hace años es la vía
 * rápida a la lesión al volver.
 */

// Factores sobre el ritmo umbral (min/km). Umbral ≈ ritmo sostenible ~1 h.
const PACE_F = {
  facil:    [1.28, 1.42],  // zona 2 conversacional
  maraton:  [1.10, 1.14],
  umbral:   [1.00, 1.03],
  vo2:      [0.90, 0.94],
  series:   [0.84, 0.89],
}

// Distancias de referencia -> factor para estimar ritmo umbral desde ese ritmo
const RACE_TO_THRESHOLD = { '5k':1.06, '10k':1.02, 'media':0.97, 'maraton':0.93 }

function mmss(sec){
  sec=Math.round(sec);
  var m=Math.floor(sec/60), s=sec%60;
  return m+':'+(s<10?'0':'')+s;
}
function parsePace(txt){            // "4:15" -> 255
  if(!txt) return null;
  var p=String(txt).split(':');
  if(p.length!==2) return null;
  var m=parseInt(p[0],10), s=parseInt(p[1],10);
  if(isNaN(m)||isNaN(s)) return null;
  return m*60+s;
}
// Devuelve las zonas de carrera en seg/km a partir de una marca
function runZones(racePaceSec, dist){
  var thr = racePaceSec * (RACE_TO_THRESHOLD[dist]||1);
  var z={};
  Object.keys(PACE_F).forEach(function(k){
    z[k]=[Math.round(thr*PACE_F[k][0]), Math.round(thr*PACE_F[k][1])];
  });
  z.umbralSec=Math.round(thr);
  return z;
}
// Zonas de potencia en bici a partir del FTP
function bikeZones(ftp){
  return {
    facil:[Math.round(ftp*0.55), Math.round(ftp*0.75)],
    tempo:[Math.round(ftp*0.76), Math.round(ftp*0.87)],
    umbral:[Math.round(ftp*0.88), Math.round(ftp*1.04)],
    vo2:[Math.round(ftp*1.05), Math.round(ftp*1.20)],
    anaerobico:[Math.round(ftp*1.21), Math.round(ftp*1.50)],
  }
}
// Zonas de natación: ritmo por 100 m desde un test de 400 m
function swimZones(t400sec){
  var per100 = t400sec/4;
  var thr = per100*1.03;
  return {
    facil:[Math.round(thr*1.12), Math.round(thr*1.20)],
    aerobico:[Math.round(thr*1.05), Math.round(thr*1.11)],
    umbral:[Math.round(thr*0.99), Math.round(thr*1.04)],
    vo2:[Math.round(thr*0.93), Math.round(thr*0.98)],
    sprint:[Math.round(thr*0.85), Math.round(thr*0.92)],
  }
}
// Zonas de pulso desde FC máxima
function hrZones(fcmax){
  return {
    z1:[Math.round(fcmax*0.50), Math.round(fcmax*0.60)],
    z2:[Math.round(fcmax*0.60), Math.round(fcmax*0.70)],
    z3:[Math.round(fcmax*0.70), Math.round(fcmax*0.80)],
    z4:[Math.round(fcmax*0.80), Math.round(fcmax*0.90)],
    z5:[Math.round(fcmax*0.90), Math.round(fcmax*1.00)],
  }
}

/* ── PLANES POR DISTANCIA ───────────────────────────────────────
 * Sesiones tipo Garmin: estructura fija, intensidad calculada.
 * z: clave de zona · reps/dist/rec en metros o segundos.
 */
const RACE_PLANS = [
  { id:'run5k', dep:'carrera', n:'5K', s:'Velocidad y umbral', sem:8,
    intro:'El 5K exige un porcentaje alto de VO2máx. El plan combina series cortas rápidas con trabajo de umbral, sobre una base aeróbica.',
    ses:[
      { n:'Rodaje fácil', tipo:'continuo', min:40, z:'facil', d:'Base aeróbica conversacional' },
      { n:'Series 400', tipo:'series', reps:8, dist:400, rec:'90 s trote', z:'series', d:'Velocidad específica' },
      { n:'Series 1000', tipo:'series', reps:5, dist:1000, rec:'2 min trote', z:'vo2', d:'Potencia aeróbica' },
      { n:'Tempo 20 min', tipo:'continuo', min:20, z:'umbral', d:'Umbral continuo, con 15 min de calentamiento' },
      { n:'Tirada larga', tipo:'continuo', min:70, z:'facil', d:'Volumen aeróbico' },
    ]},
  { id:'run10k', dep:'carrera', n:'10K', s:'Umbral y resistencia', sem:10,
    intro:'El 10K se corre justo por encima del umbral. El grueso del trabajo específico va ahí, con VO2máx para elevar el techo.',
    ses:[
      { n:'Rodaje fácil', tipo:'continuo', min:50, z:'facil', d:'Base aeróbica' },
      { n:'Series 1000', tipo:'series', reps:6, dist:1000, rec:'2 min trote', z:'vo2', d:'Potencia aeróbica' },
      { n:'Intervalos umbral', tipo:'series', reps:4, dist:2000, rec:'90 s trote', z:'umbral', d:'Ritmo específico de 10K' },
      { n:'Tempo 30 min', tipo:'continuo', min:30, z:'umbral', d:'Umbral sostenido' },
      { n:'Tirada larga', tipo:'continuo', min:80, z:'facil', d:'Resistencia aeróbica' },
    ]},
  { id:'runhalf', dep:'carrera', n:'Media maratón', s:'Resistencia al umbral', sem:12,
    intro:'La media se corre ligeramente por debajo del umbral. Prioridad al volumen aeróbico y a bloques largos a ritmo objetivo.',
    ses:[
      { n:'Rodaje fácil', tipo:'continuo', min:55, z:'facil', d:'Base aeróbica' },
      { n:'Bloques de umbral', tipo:'series', reps:3, dist:3000, rec:'3 min trote', z:'umbral', d:'Resistencia al umbral' },
      { n:'Ritmo objetivo', tipo:'continuo', min:40, z:'maraton', d:'Ritmo de carrera sostenido' },
      { n:'Series 1000', tipo:'series', reps:5, dist:1000, rec:'2 min', z:'vo2', d:'Mantener el techo aeróbico' },
      { n:'Tirada larga', tipo:'continuo', min:110, z:'facil', d:'Hasta 18-20 km progresivos' },
    ]},
  { id:'runmara', dep:'carrera', n:'Maratón', s:'Volumen y ritmo objetivo', sem:16,
    intro:'El maratón lo decide la base aeróbica y la eficiencia. Mucho volumen fácil, tiradas largas y bloques a ritmo objetivo.',
    ses:[
      { n:'Rodaje fácil', tipo:'continuo', min:60, z:'facil', d:'La mayoría de tus kilómetros' },
      { n:'Ritmo maratón', tipo:'continuo', min:50, z:'maraton', d:'Ritmo objetivo sostenido' },
      { n:'Bloques de umbral', tipo:'series', reps:3, dist:3000, rec:'3 min', z:'umbral', d:'Elevar el umbral' },
      { n:'Tirada larga', tipo:'continuo', min:150, z:'facil', d:'Hasta 30-32 km' },
      { n:'Larga con ritmo', tipo:'continuo', min:120, z:'maraton', d:'Últimos 30 min a ritmo objetivo' },
    ]},
  { id:'bike40', dep:'bici', n:'40 km / triatlón olímpico', s:'Potencia sostenida', sem:10,
    intro:'El segmento de bici se corre cerca del umbral. Trabajo específico de potencia sostenible y capacidad de repetir esfuerzos.',
    ses:[
      { n:'Salida en Z2', tipo:'continuo', min:90, z:'facil', d:'Base aeróbica, cadencia 85-95' },
      { n:'Sweet spot', tipo:'series', reps:3, dist:0, min:12, rec:'5 min suave', z:'tempo', d:'Volumen de calidad' },
      { n:'Intervalos umbral', tipo:'series', reps:3, min:10, rec:'5 min', z:'umbral', d:'Potencia sostenible' },
      { n:'VO2 4x4', tipo:'series', reps:4, min:4, rec:'3 min', z:'vo2', d:'Elevar el techo' },
      { n:'Salida larga', tipo:'continuo', min:150, z:'facil', d:'Resistencia' },
    ]},
  { id:'bikegran', dep:'bici', n:'Marcha larga / gran fondo', s:'Resistencia y subidas', sem:12,
    intro:'Las marchas largas exigen tolerar horas en zona baja-media y responder en los puertos. Volumen alto y trabajo específico de subida.',
    ses:[
      { n:'Salida larga', tipo:'continuo', min:210, z:'facil', d:'Progresa hasta 4-5 h' },
      { n:'Subidas largas', tipo:'series', reps:4, min:8, rec:'bajada', z:'umbral', d:'Específico de puerto' },
      { n:'Sweet spot', tipo:'series', reps:4, min:12, rec:'4 min', z:'tempo', d:'Calidad sostenida' },
      { n:'Rodaje suave', tipo:'continuo', min:75, z:'facil', d:'Recuperación activa' },
      { n:'Fuerza-resistencia', tipo:'series', reps:5, min:5, rec:'5 min', z:'tempo', d:'Cadencia baja 50-60 rpm en llano' },
    ]},
  { id:'swim1500', dep:'nado', n:'1500 m / aguas abiertas', s:'Ritmo continuo', sem:10,
    intro:'Nadar 1500 m seguidos exige ritmo sostenible y economía. El plan combina técnica, series de umbral y continuos progresivos.',
    ses:[
      { n:'Técnica', tipo:'series', reps:8, dist:50, rec:'20 s', z:'facil', d:'Ejercicios de técnica, calidad sobre velocidad' },
      { n:'Series 100', tipo:'series', reps:10, dist:100, rec:'20 s', z:'umbral', d:'Ritmo específico' },
      { n:'Series 200', tipo:'series', reps:6, dist:200, rec:'30 s', z:'aerobico', d:'Resistencia aeróbica' },
      { n:'Continuo', tipo:'continuo', dist:1500, z:'aerobico', d:'Simulacro de distancia' },
      { n:'Velocidad', tipo:'series', reps:12, dist:25, rec:'30 s', z:'sprint', d:'Potencia y técnica a velocidad' },
    ]},
  { id:'swim400', dep:'nado', n:'400-800 m', s:'Velocidad y umbral', sem:8,
    intro:'Distancias cortas con alto componente de umbral y VO2. Series más intensas y descansos más cortos.',
    ses:[
      { n:'Técnica', tipo:'series', reps:8, dist:50, rec:'20 s', z:'facil', d:'Base técnica' },
      { n:'Series 50', tipo:'series', reps:16, dist:50, rec:'15 s', z:'vo2', d:'Potencia aeróbica' },
      { n:'Series 100', tipo:'series', reps:8, dist:100, rec:'15 s', z:'umbral', d:'Umbral con poca recuperación' },
      { n:'Series 200', tipo:'series', reps:4, dist:200, rec:'30 s', z:'umbral', d:'Resistencia al ritmo' },
      { n:'Sprints', tipo:'series', reps:10, dist:25, rec:'45 s', z:'sprint', d:'Velocidad máxima' },
    ]},
]

// Ejercicios que cargan zonas sensibles (se filtran si marcas la molestia)
;(function(){
  var risky = {
    // Hombro: todo lo que carga por encima de la cabeza o con palanca larga
    'club-mill':['hombro'], 'club-swing':['hombro'], 'club-shield':['hombro'], 'club-360':['hombro'],
    'club-inside':['hombro'], 'club-front':['hombro'], 'turkish':['hombro'], 'kb-tgu-half':['hombro'],
    'pushup-archer':['hombro'], 'pullup':['hombro'], 'pullup-negative':['hombro'], 'kb-press':['hombro'],
    'lsit':['hombro','muneca'],
    // Cintilla y rodilla: impacto, saltos y flexión profunda a una pierna
    'jump-squat':['cintilla','rodilla'], 'burpee':['cintilla','rodilla'], 'lunge':['cintilla','rodilla'],
    'pistol':['cintilla','rodilla'], 'pistol-assisted':['cintilla','rodilla'], 'squat-bulgarian':['cintilla','rodilla'],
    'broad-jump':['cintilla','rodilla','tobillo'], 'skater':['cintilla','rodilla','tobillo'],
    'jump-rope':['tobillo','aquiles'], 'pogo':['tobillo','aquiles'], 'mountain-climber':['muneca'],
    'split-squat-heavy':['cintilla','rodilla'], 'step-up':['rodilla'],
    // Lumbar: carga axial y flexión con peso
    'hinge':['lumbar'], 'deadlift-single':['lumbar'], 'kb-swing':['lumbar'], 'kb-clean':['lumbar'],
    'jefferson-curl':['lumbar'], 'band-goodmorning':['lumbar'], 'hip-thrust':['lumbar'],
    'bridge':['lumbar','hombro'], 'rollout':['lumbar','hombro'],
    // Muñeca: apoyo de manos en el suelo
    'plank':['muneca'], 'pushup':['muneca'], 'pushup-decline':['muneca'], 'bear-crawl':['muneca'],
    'scap-pushup':['muneca'], 'bear-hold':['muneca'], 'wrist-mob':[],
    // Codo: tracción intensa y agarre sostenido
    'row-inverted':['codo'], 'kb-row':['codo'], 'hang':['codo','hombro'], 'scap-pull':['hombro'],
    // Cadera e isquios
    'copenhagen':['aductor','cadera'], 'nordic-curl':['isquios'], 'hip-airplane':['cadera'],
    'psoas-lunge':['cadera'], 'adductor-deep':['aductor'],
    // Cervical
    'neck-iso':[], 'wall-slide':[],
    // Aquiles y pie
    'calf-eccentric':[], 'calf-raise-heavy':['aquiles'], 'walk-barefoot':['aquiles','pie'],
    'heel-toe-walk':['aquiles'], 'squat-hold':['rodilla'], 'sled-push-sim':['rodilla'],
    'ankle-balance-eyes':[], 'balance-1leg':[],
    'deep-squat':['rodilla','tobillo'], 'squat-bw':['rodilla'], 'squat-box':[], 'kb-goblet':['rodilla'],
    'club-squat':['rodilla'], 'nordic-curl':['isquios','rodilla'], 'copenhagen':['aductor','cadera'],
    'hip-airplane':['cadera'], 'hip-90-90':['cadera'], 'psoas-lunge':['cadera'],
    'band-lateral':[], 'monster-walk':[], 'clamshell':[],
  };
  EX.forEach(function(e){ if(risky[e.id] && risky[e.id].length) e.risk = risky[e.id]; });
})()

/* ── POLEA ISOINERCIAL (Handy Gym y similares) ───────────────────
 * La resistencia la genera un volante de inercia: no hay peso fijo.
 * Tú aceleras en la fase concéntrica y el disco te devuelve esa energía
 * en la excéntrica, donde puedes recibir MÁS carga de la que generaste.
 * Ese sobrepeso excéntrico es su ventaja real frente al peso libre.
 */
EX.push(
{id:'iner-row',cap:'fuerza',pat:'traccion',mat:'inercial',lvl:2,seg:55,sets:4,reps:8,
 n:'Remo isoinercial',s:'Tracción con sobrecarga excéntrica',
 why:'Tiras con fuerza y el volante devuelve la energía: recibes más carga al ceder que al tirar. Ese sobrepeso excéntrico es difícil de conseguir con peso libre sin ayuda, y es un estímulo potente para la espalda.',
 steps:['Ancla la polea baja, de pie o en bisagra','Tira con fuerza llevando los codos atrás','Resiste la vuelta: NO dejes que el cable te lleve','Frena progresivamente hasta el final del recorrido'],
 tip:'El primer tirón carga el disco: hazlo fuerte. Si tiras flojo, no habrá excéntrico que resistir.'},
{id:'iner-squat',cap:'fuerza',pat:'rodilla',mat:'inercial',lvl:2,seg:60,sets:4,reps:8,
 n:'Sentadilla isoinercial',s:'Piernas sin carga axial',
 why:'Permite cargar mucho el cuádriceps y el glúteo sin comprimir la columna, porque la resistencia viene del cable y no de un peso sobre los hombros. Muy útil si tienes molestias lumbares.',
 steps:['Polea anclada baja, cable entre las piernas o al pecho','Sube extendiendo con fuerza','Deja que el cable te baje resistiendo','Controla especialmente el último tercio de la bajada'],
 tip:'La clave está en frenar abajo, no arriba. Ahí es donde el volante devuelve toda la energía.'},
{id:'iner-hinge',cap:'fuerza',pat:'cadera',mat:'inercial',lvl:2,seg:60,sets:4,reps:8,
 n:'Bisagra isoinercial',s:'Cadena posterior en excéntrico',
 why:'El excéntrico con sobrecarga es el estímulo con más evidencia para prevenir lesiones de isquiotibiales. La polea inercial lo permite de forma segura y con más carga que el peso libre.',
 steps:['Polea anclada al frente, a la altura de la cadera','Bisagra: cadera atrás con espalda recta','Extiende la cadera con fuerza apretando el glúteo','Resiste la vuelta hasta el estiramiento'],
 tip:'No pierdas la espalda recta al ceder. Si se redondea, acorta el recorrido: la lumbar manda sobre la carga.'},
{id:'iner-press',cap:'fuerza',pat:'empuje',mat:'inercial',lvl:2,seg:55,sets:4,reps:8,
 n:'Press isoinercial',s:'Empuje con freno excéntrico',
 why:'Empuja fuerte y resiste la vuelta. El hombro se beneficia especialmente del control excéntrico, que es lo que le da capacidad de frenar y lo protege en gestos de lanzamiento y natación.',
 steps:['Polea anclada detrás, cable a la altura del pecho','Empuja al frente extendiendo los brazos','Resiste activamente la vuelta','Codos algo cerrados, no abiertos del todo'],
 tip:'Si el cable te gana y vuelve solo, has soltado. El ejercicio es frenarlo, no dejarlo ir.'},
{id:'iner-rot',cap:'potencia',pat:'rotacion',mat:'inercial',lvl:3,seg:55,sets:3,reps:10,
 n:'Rotación isoinercial',s:'Potencia rotacional específica',
 why:'Reproduce el gesto de lanzar, golpear o girar bajo carga, algo casi imposible de cargar bien con peso libre. Muy transferible a pádel, tenis, golf y deportes de raqueta.',
 steps:['Polea anclada al lado, a la altura del pecho','Gira el tronco con fuerza alejando las manos','El giro sale de la cadera, no de los brazos','Resiste la vuelta controlando la rotación'],
 tip:'Los pies pivotan: si los mantienes clavados, la rotación se la come la lumbar en vez de la cadera.'},
{id:'iner-lunge',cap:'fuerza',pat:'rodilla',mat:'inercial',lvl:3,seg:60,sets:3,reps:8,
 n:'Zancada isoinercial',s:'Unilateral con sobrecarga',
 why:'Combina trabajo a una pierna con sobrecarga excéntrica: expone asimetrías y carga la fase de frenado, que es donde se lesiona la rodilla al cambiar de dirección.',
 steps:['Polea anclada baja al frente','Da un paso atrás bajando controlado','Empuja con fuerza para volver','Resiste la bajada del siguiente ciclo'],
 tip:'Compara lados. La diferencia entre piernas se nota mucho más aquí que en la sentadilla.'}
)

;(function(){
  var r={ 'iner-hinge':['lumbar'], 'iner-squat':['rodilla'], 'iner-lunge':['rodilla','cintilla'],
          'iner-press':['hombro'], 'iner-rot':['lumbar'] };
  EX.forEach(function(e){ if(r[e.id]) e.risk=r[e.id]; });
})()
