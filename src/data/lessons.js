// Academia FACEO — contenido educativo original, informado por evidencia y honesto.
// Cada lección: { id, icon, es:{...}, en:{...} } con secciones y puntos clave.

export const lessons = [
  {
    id: 'mewing',
    icon: 'palate',
    es: {
      title: 'La lengua y el mewing',
      sub: 'Postura lingual y estructura facial',
      sections: [
        { h: 'Qué es', p: 'El mewing es mantener toda la lengua apoyada contra el paladar, con los labios juntos y los dientes en contacto ligero, respirando por la nariz. Es una postura, no un ejercicio puntual.' },
        { h: 'La ciencia', p: 'La lengua es un músculo potente. Una postura lingual correcta favorece el desarrollo del paladar en niños y adolescentes, cuando el hueso aún es maleable. En adultos el hueso ya no se remodela de forma significativa, pero mantener la lengua arriba mejora el tono muscular, la postura de la cabeza y el soporte del tercio medio facial, lo que puede notarse en la definición.' },
        { h: 'Cómo aplicarlo', p: 'Lengua entera al paladar (no solo la punta), labios sellados, respiración nasal, todo el día. Traga con la lengua contra el paladar. Sé constante: es un hábito de 24 h, no de 5 minutos.' },
      ],
      keys: ['Toda la lengua al paladar, no solo la punta', 'En adultos: tono y postura, no milagros óseos', 'Respiración nasal siempre acompaña al mewing', 'Es un hábito permanente, no un ejercicio'],
    },
    en: {
      title: 'The tongue & mewing',
      sub: 'Tongue posture and facial structure',
      sections: [
        { h: 'What it is', p: 'Mewing is resting the whole tongue against the palate, lips together, teeth lightly touching, breathing through the nose. It is a posture, not a one-off exercise.' },
        { h: 'The science', p: 'The tongue is a strong muscle. Correct tongue posture supports palate development in children and teens, while bone is still malleable. In adults bone no longer remodels much, but keeping the tongue up improves muscle tone, head posture and midface support, which can show in definition.' },
        { h: 'How to apply it', p: 'Whole tongue on the palate (not just the tip), lips sealed, nasal breathing, all day. Swallow with the tongue against the palate. Be consistent: it is a 24h habit, not a 5-minute drill.' },
      ],
      keys: ['Whole tongue on the palate, not just the tip', 'Adults: tone and posture, not bone miracles', 'Nasal breathing always goes with mewing', 'It is a permanent habit, not an exercise'],
    },
  },
  {
    id: 'masseter',
    icon: 'jaw',
    es: {
      title: 'El masetero y la mandíbula',
      sub: 'El músculo de la definición',
      sections: [
        { h: 'Qué es', p: 'El masetero es el músculo principal de la masticación. Es el que da anchura y definición al ángulo de la mandíbula.' },
        { h: 'La ciencia', p: 'Como cualquier músculo, responde al uso. Masticar alimentos duros y ejercitar la mandíbula puede aumentar su tono y su volumen. Ojo: el apretar por estrés (bruxismo) también lo agranda, pero acompañado de tensión, dolor y desgaste dental. El objetivo es activarlo con control, no vivir apretando.' },
        { h: 'Cómo aplicarlo', p: 'Mastica alimentos fibrosos y duros, reparte la masticación en ambos lados, y trabaja el apriete mandibular de forma controlada (como en los ejercicios de FACEO). Después, relaja y libera la fascia para evitar tensión.' },
      ],
      keys: ['Masticar duro y en ambos lados', 'Apretar por estrés agranda pero daña', 'Activar con control, luego relajar', 'Definición = tono + baja grasa facial'],
    },
    en: {
      title: 'The masseter & jaw',
      sub: 'The muscle of definition',
      sections: [
        { h: 'What it is', p: 'The masseter is the main chewing muscle. It gives width and definition to the jaw angle.' },
        { h: 'The science', p: 'Like any muscle, it responds to use. Chewing hard foods and training the jaw can raise its tone and volume. Note: stress clenching (bruxism) also enlarges it, but with tension, pain and tooth wear. The goal is to activate it with control, not to live clenching.' },
        { h: 'How to apply it', p: 'Chew fibrous, hard foods, split chewing between both sides, and train the jaw clench with control (as in the FACEO exercises). Afterwards, relax and release the fascia to avoid tension.' },
      ],
      keys: ['Chew hard and on both sides', 'Stress clenching enlarges but harms', 'Activate with control, then relax', 'Definition = tone + lower facial fat'],
    },
  },
  {
    id: 'nasal',
    icon: 'breathing',
    es: {
      title: 'Respiración nasal y la cara',
      sub: 'Cómo respiras moldea tu rostro',
      sections: [
        { h: 'Qué es', p: 'Respirar por la nariz de forma habitual, de día y de noche, en lugar de por la boca.' },
        { h: 'La ciencia', p: 'En el desarrollo, respirar crónicamente por la boca se asocia a un patrón facial más largo y estrecho y a una mandíbula retraída ("cara adenoidea"). En adultos ya no cambia el hueso, pero la respiración nasal mantiene la lengua en su sitio, mejora la postura de la cabeza, la oxigenación y el sueño, y reduce la hinchazón facial matutina que da la respiración bucal.' },
        { h: 'Cómo aplicarlo', p: 'Respira por la nariz siempre. De noche, si abres la boca al dormir, prueba la cinta bucal (mouth taping) tras descartar problemas respiratorios. Trabaja la tolerancia al CO₂ para respirar mejor.' },
      ],
      keys: ['Nariz de día y de noche', 'Boca abierta al dormir = peor cara al despertar', 'La lengua sube sola cuando respiras por la nariz', 'Cinta bucal solo sin problemas respiratorios'],
    },
    en: {
      title: 'Nasal breathing & the face',
      sub: 'How you breathe shapes your face',
      sections: [
        { h: 'What it is', p: 'Habitually breathing through the nose, day and night, instead of through the mouth.' },
        { h: 'The science', p: 'In development, chronic mouth breathing is linked to a longer, narrower face and a retruded jaw ("adenoid face"). In adults it no longer changes bone, but nasal breathing keeps the tongue in place, improves head posture, oxygenation and sleep, and reduces the morning facial puffiness mouth breathing causes.' },
        { h: 'How to apply it', p: 'Breathe through the nose always. At night, if your mouth opens during sleep, try mouth taping after ruling out breathing issues. Train CO₂ tolerance to breathe better.' },
      ],
      keys: ['Nose by day and by night', 'Open mouth asleep = worse face on waking', 'The tongue rises on its own with nasal breathing', 'Mouth tape only without breathing issues'],
    },
  },
  {
    id: 'fascia',
    icon: 'fascia',
    es: {
      title: 'La fascia facial',
      sub: 'La red que conecta cara, cuello y cráneo',
      sections: [
        { h: 'Qué es', p: 'La fascia es el tejido conectivo continuo que envuelve músculos y órganos. En la cabeza conecta cara, mandíbula, cuero cabelludo y cuello en una sola red.' },
        { h: 'La ciencia', p: 'La tensión no se queda donde nace: la fascia la transmite. Una mandíbula apretada tira del cuello y las sienes; una mala postura tira de la cara. Liberar la fascia (presión lenta y sostenida, no fricción rápida) reduce esa tensión acumulada y puede mejorar la simetría y la sensación de ligereza.' },
        { h: 'Cómo aplicarlo', p: 'Auto-masaje lento de masetero, sienes y base del cráneo. Usa una pelota de masaje para los puntos gatillo. Y recuerda: la cara no está aislada, trabaja también cuello, espalda y pies (cadenas fasciales).' },
      ],
      keys: ['La fascia transmite la tensión por todo el cuerpo', 'Presión lenta y sostenida, no fricción', 'Masetero, sienes y base del cráneo', 'Trabaja el cuerpo, no solo la cara'],
    },
    en: {
      title: 'The facial fascia',
      sub: 'The web linking face, neck and skull',
      sections: [
        { h: 'What it is', p: 'Fascia is the continuous connective tissue wrapping muscles and organs. In the head it links face, jaw, scalp and neck into one web.' },
        { h: 'The science', p: 'Tension does not stay where it starts: fascia transmits it. A clenched jaw pulls on the neck and temples; poor posture pulls on the face. Releasing fascia (slow, sustained pressure, not fast friction) reduces built-up tension and can improve symmetry and a sense of lightness.' },
        { h: 'How to apply it', p: 'Slow self-massage of masseter, temples and skull base. Use a massage ball for trigger points. And remember: the face is not isolated — work the neck, back and feet too (fascial chains).' },
      ],
      keys: ['Fascia transmits tension through the whole body', 'Slow, sustained pressure, not friction', 'Masseter, temples and skull base', 'Work the body, not just the face'],
    },
  },
  {
    id: 'posture',
    icon: 'posture',
    es: {
      title: 'Postura y el rostro',
      sub: 'El cuello adelantado te cambia la cara',
      sections: [
        { h: 'Qué es', p: 'La postura de la cabeza y el cuello afecta directamente a la línea mandibular y al perfil.' },
        { h: 'La ciencia', p: 'La cabeza adelantada ("tech neck") por móviles y pantallas acorta la nuca, tensa el cuello y difumina la línea de la mandíbula, además de crear papada aparente. Cada 2-3 cm que la cabeza avanza, el cuello soporta varios kilos extra. Corregir la postura recoloca la mandíbula y estiliza el perfil al instante.' },
        { h: 'Cómo aplicarlo', p: 'Chin tucks (retracción de barbilla), pantalla a la altura de los ojos, hombros atrás y abajo, y fortalece la parte alta de la espalda. La postura es un hábito de todo el día, no un ejercicio suelto.' },
      ],
      keys: ['Cabeza adelantada = mandíbula difusa y papada', 'Chin tucks para recolocar la cabeza', 'Pantalla a la altura de los ojos', 'La postura estiliza el perfil al instante'],
    },
    en: {
      title: 'Posture & the face',
      sub: 'Forward neck changes your face',
      sections: [
        { h: 'What it is', p: 'Head and neck posture directly affects the jawline and profile.' },
        { h: 'The science', p: 'Forward head ("tech neck") from phones and screens shortens the nape, tightens the neck and blurs the jawline, plus creates apparent double chin. For every 2-3 cm the head moves forward, the neck bears several extra kilos. Fixing posture repositions the jaw and sharpens the profile instantly.' },
        { h: 'How to apply it', p: 'Chin tucks, screen at eye level, shoulders back and down, and strengthen the upper back. Posture is an all-day habit, not a single exercise.' },
      ],
      keys: ['Forward head = blurred jaw and double chin', 'Chin tucks to reposition the head', 'Screen at eye level', 'Posture sharpens the profile instantly'],
    },
  },
  {
    id: 'faceyoga',
    icon: 'face',
    es: {
      title: 'Yoga facial y músculos',
      sub: 'Entrenar los más de 40 músculos de la cara',
      sections: [
        { h: 'Qué es', p: 'La cara tiene más de 40 músculos. El yoga facial los ejercita para mejorar tono y firmeza, igual que el cuerpo responde al entreno.' },
        { h: 'La ciencia', p: 'Un estudio de Northwestern (2018) encontró que 20 semanas de ejercicios faciales hicieron que voluntarias de mediana edad se percibieran unos 3 años más jóvenes, por mayor volumen y firmeza muscular. No es magia ni sustituye a la genética o al cuidado de la piel, pero el músculo entrenado sostiene mejor los tejidos.' },
        { h: 'Cómo aplicarlo', p: 'Trabaja mejillas, ojos, frente y cuello con control, sin crear arrugas de expresión forzadas. Constancia varias veces por semana. Combínalo con liberación fascial para no acumular tensión.' },
      ],
      keys: ['Más de 40 músculos que responden al entreno', 'Northwestern 2018: ~3 años más jóvenes en 20 sem', 'Con control, sin forzar arrugas', 'Complementa, no sustituye piel y genética'],
    },
    en: {
      title: 'Face yoga & muscles',
      sub: 'Training the 40+ muscles of the face',
      sections: [
        { h: 'What it is', p: 'The face has over 40 muscles. Face yoga trains them to improve tone and firmness, just as the body responds to training.' },
        { h: 'The science', p: 'A Northwestern study (2018) found that 20 weeks of facial exercises made middle-aged volunteers look about 3 years younger, from greater muscle volume and firmness. It is not magic and does not replace genetics or skincare, but a trained muscle supports the tissues better.' },
        { h: 'How to apply it', p: 'Work cheeks, eyes, forehead and neck with control, without forcing expression lines. Consistency several times a week. Pair it with fascia release to avoid building tension.' },
      ],
      keys: ['40+ muscles that respond to training', 'Northwestern 2018: ~3 years younger in 20 wks', 'With control, without forcing wrinkles', 'Complements, not replaces skin and genetics'],
    },
  },
  {
    id: 'skin',
    icon: 'face',
    es: {
      title: 'Piel, sueño y estrés',
      sub: 'La cara refleja tu recuperación',
      sections: [
        { h: 'Qué es', p: 'La calidad de tu piel y tu aspecto facial dependen tanto de dentro (sueño, estrés, hidratación) como de fuera.' },
        { h: 'La ciencia', p: 'El cortisol crónico (estrés) degrada el colágeno y favorece la inflamación y el acné. Dormir poco reduce la reparación de la piel y da un tono apagado y ojeras. La hidratación y la luz solar (con protección) regulan la piel. La piel es un espejo de tu recuperación.' },
        { h: 'Cómo aplicarlo', p: 'Prioriza el sueño (pilar nº1), gestiona el estrés con respiración y meditación, hidrátate bien, y cuida lo básico de la piel: limpieza suave, protección solar, y no tocarte ni apoyar la cara en las manos.' },
      ],
      keys: ['El estrés crónico degrada el colágeno', 'Dormir mal = tono apagado y ojeras', 'La piel es el espejo de tu recuperación', 'Sueño, respiración e hidratación primero'],
    },
    en: {
      title: 'Skin, sleep & stress',
      sub: 'The face reflects your recovery',
      sections: [
        { h: 'What it is', p: 'Your skin quality and facial appearance depend as much on the inside (sleep, stress, hydration) as the outside.' },
        { h: 'The science', p: 'Chronic cortisol (stress) degrades collagen and drives inflammation and acne. Poor sleep reduces skin repair and gives a dull tone and dark circles. Hydration and sunlight (with protection) regulate the skin. The skin mirrors your recovery.' },
        { h: 'How to apply it', p: 'Prioritise sleep (pillar #1), manage stress with breathing and meditation, hydrate well, and keep skin basics: gentle cleansing, sun protection, and do not touch or rest your face on your hands.' },
      ],
      keys: ['Chronic stress degrades collagen', 'Poor sleep = dull tone and dark circles', 'The skin mirrors your recovery', 'Sleep, breathing and hydration first'],
    },
  },
  {
    id: 'habits',
    icon: 'posture',
    es: {
      title: 'Simetría y hábitos',
      sub: 'Los pequeños gestos que moldean tu cara',
      sections: [
        { h: 'Qué es', p: 'La cara se moldea con miles de repeticiones diarias. Los hábitos importan tanto como los ejercicios.' },
        { h: 'La ciencia', p: 'Masticar siempre del mismo lado crea asimetría del masetero. Dormir siempre boca abajo o del mismo lado aplasta y arruga un lado de la cara. Apoyar la cara en la mano tensa y deforma. El sol sin protección envejece la piel más que casi nada.' },
        { h: 'Cómo aplicarlo', p: 'Mastica repartido en ambos lados. Duerme boca arriba siempre que puedas. No te apoyes la cara en las manos. Protección solar diaria. Estos pequeños cambios, sostenidos, valen más que cualquier truco.' },
      ],
      keys: ['Mastica en ambos lados para la simetría', 'Duerme boca arriba, no aplastes la cara', 'No apoyes la cara en las manos', 'Protección solar: lo que más envejece es el sol'],
    },
    en: {
      title: 'Symmetry & habits',
      sub: 'The small gestures that shape your face',
      sections: [
        { h: 'What it is', p: 'The face is shaped by thousands of daily repetitions. Habits matter as much as exercises.' },
        { h: 'The science', p: 'Always chewing on the same side creates masseter asymmetry. Always sleeping face down or on the same side flattens and creases one side of the face. Resting your face on your hand tenses and deforms it. Unprotected sun ages skin more than almost anything.' },
        { h: 'How to apply it', p: 'Chew evenly on both sides. Sleep on your back when you can. Do not rest your face on your hands. Daily sun protection. These small, sustained changes beat any trick.' },
      ],
      keys: ['Chew both sides for symmetry', 'Sleep on your back, do not crush your face', 'Do not rest your face on your hands', 'Sun protection: sun ages skin the most'],
    },
  },
]

// ── CADENAS MIOFASCIALES ────────────────────────────────────────────────────
// Contenido original. Referencias: Thomas Myers (Anatomy Trains) para el
// modelo de líneas; Leandro Ferreira (método Free Fascia, Univ. Católica de
// Valencia) para el enfoque de cadenas con evidencia; y los libros de Rubens
// García sobre movimiento natural y liberación del pie como lectura afín.

lessons.push(
  {
    id: 'chains-intro',
    icon: 'fascia',
    es: {
      title: 'Las cadenas miofasciales',
      sub: 'Tu cuerpo no está hecho de piezas sueltas',
      sections: [
        { h: 'Qué son', p: 'La anatomía clásica corta el cuerpo en músculos separados, como si fueran piezas independientes. Pero al diseccionar respetando la fascia aparece otra cosa: los músculos están enlazados en líneas continuas que recorren el cuerpo entero. Eso es una cadena miofascial.' },
        { h: 'Por qué te importa a ti', p: 'Porque explica por qué te duele el cuello y el origen está en la cadera. O por qué tienes la mandíbula tensa y la causa es que pasas nueve horas sentado. La tensión no se queda donde nace: viaja por la cadena. Tratar solo el punto que duele es tratar el síntoma.' },
        { h: 'El modelo', p: 'Thomas Myers popularizó el mapa de estas líneas en "Anatomy Trains". En el ámbito hispano, Leandro Ferreira (doctor en Ciencias de la Actividad Física y profesor en la Universidad Católica de Valencia) desarrolla el método Free Fascia, que trabaja con cadenas miofasciales identificadas desde una perspectiva anatómica y motora. Son mapas útiles, no dogmas: la investigación sobre continuidad fascial sigue abierta.' },
        { h: 'Las cuatro que trabajamos', p: 'Posterior: de la planta del pie a la ceja, por detrás. Anterior: del empeine al cráneo, por delante. Laterales: los dos costados, que te equilibran. Y la Frontal Profunda: el núcleo, que conecta la lengua y la mandíbula con el diafragma, el psoas y el pie. Esa última es la que hace que tu cara y tus pies estén en la misma línea.' },
        { h: 'La regla de oro', p: 'Libera de abajo arriba. Si la cadena tira desde el pie o la cadera, trabajar solo la cara es remar contra una cuerda tensa. Por eso el generador de rutinas ordena los ejercicios de los pies hacia la cabeza.' },
      ],
      keys: ['La tensión viaja, no se queda donde nace', 'Cuatro líneas: posterior, anterior, laterales y profunda', 'La cara y el pie están en la misma cadena', 'Libera de abajo arriba, siempre'],
    },
    en: {
      title: 'The myofascial chains',
      sub: 'Your body is not made of loose parts',
      sections: [
        { h: 'What they are', p: 'Classical anatomy cuts the body into separate muscles, as if they were independent parts. But dissecting while respecting the fascia reveals something else: muscles are linked into continuous lines running through the whole body. That is a myofascial chain.' },
        { h: 'Why it matters to you', p: 'Because it explains why your neck hurts when the origin is your hip. Or why your jaw is tight because you sit for nine hours. Tension does not stay where it starts: it travels along the chain. Treating only the painful spot is treating the symptom.' },
        { h: 'The model', p: 'Thomas Myers popularised the map of these lines in "Anatomy Trains". In the Spanish-speaking world, Leandro Ferreira (PhD in Physical Activity and Sport Sciences, professor at the Catholic University of Valencia) developed the Free Fascia method, working with myofascial chains identified from an anatomical and motor perspective. These are useful maps, not dogma: research on fascial continuity is still open.' },
        { h: 'The four we train', p: 'Posterior: from the sole of the foot to the eyebrow, up the back. Anterior: from the instep to the skull, up the front. Lateral: both side bodies, which balance you. And the Deep Front: the core, linking tongue and jaw to diaphragm, psoas and foot. That last one is why your face and your feet are on the same line.' },
        { h: 'The golden rule', p: 'Release from the bottom up. If the chain is pulling from the foot or the hip, working only the face is rowing against a taut rope. That is why the routine generator orders exercises from feet to head.' },
      ],
      keys: ['Tension travels, it does not stay where it starts', 'Four lines: posterior, anterior, lateral and deep front', 'Face and foot are on the same chain', 'Always release from the bottom up'],
    },
  },
  {
    id: 'chain-posterior',
    icon: 'posture',
    es: {
      title: 'La cadena posterior',
      sub: 'De la planta del pie a la ceja',
      sections: [
        { h: 'El recorrido', p: 'Empieza bajo los dedos del pie, recorre la fascia plantar, sube por el tendón de Aquiles y los gemelos, sigue por los isquiotibiales, cruza el sacro, asciende por los erectores de la columna y termina en la fascia del cráneo, sobre la ceja. Es una sola línea continua de arriba abajo.' },
        { h: 'Qué le hace a tu cara', p: 'Cuando esta cadena está acortada, tira de la base del cráneo hacia atrás y abajo. El cuerpo compensa adelantando la cabeza. Y la cabeza adelantada es lo que más difumina la línea mandibular y crea papada aparente. Tu perfil depende, literalmente, de lo tensos que tengas los isquiotibiales.' },
        { h: 'La prueba que lo demuestra', p: 'Haz esto: intenta tocarte los pies y fíjate hasta dónde llegas. Ahora rueda una pelota bajo la planta de UN solo pie durante 60 segundos. Vuelve a intentarlo. Ese lado baja más. No has estirado el isquiotibial: has liberado la cadena.' },
        { h: 'Cómo trabajarla', p: 'Liberación plantar con pelota, flexión de pie hacia delante dejando colgar la cabeza, y liberación suboccipital en la base del cráneo. Empieza siempre por el pie. Aquí el orden importa más que la intensidad.' },
      ],
      keys: ['Va del pie a la ceja, sin interrupción', 'Acortada = cabeza adelantada = mandíbula difusa', 'Rueda un pie y compara: la prueba es inmediata', 'Empieza por el pie, no por el cuello'],
    },
    en: {
      title: 'The posterior chain',
      sub: 'From the sole of the foot to the eyebrow',
      sections: [
        { h: 'The route', p: 'It starts under the toes, runs through the plantar fascia, up the Achilles tendon and calves, continues through the hamstrings, crosses the sacrum, ascends the spinal erectors and ends in the fascia of the skull, above the eyebrow. One continuous line from bottom to top.' },
        { h: 'What it does to your face', p: 'When this chain is short, it pulls the base of the skull back and down. The body compensates by pushing the head forward. And forward head is what most blurs the jawline and creates apparent double chin. Your profile depends, literally, on how tight your hamstrings are.' },
        { h: 'The test that proves it', p: 'Try this: reach for your toes and note how far you get. Now roll a ball under the sole of ONE foot for 60 seconds. Try again. That side goes further. You did not stretch the hamstring: you released the chain.' },
        { h: 'How to train it', p: 'Plantar release with a ball, standing forward fold letting the head hang, and suboccipital release at the base of the skull. Always start at the foot. Here the order matters more than the intensity.' },
      ],
      keys: ['Runs foot to eyebrow, uninterrupted', 'Short chain = forward head = blurred jaw', 'Roll one foot and compare: instant proof', 'Start at the foot, not the neck'],
    },
  },
  {
    id: 'chain-anterior',
    icon: 'posture',
    es: {
      title: 'La cadena anterior',
      sub: 'La que te encorva delante de la pantalla',
      sections: [
        { h: 'El recorrido', p: 'Sube desde el empeine y la parte delantera de la tibia, atraviesa el cuádriceps, continúa por el recto abdominal, cruza el esternón y llega al esternocleidomastoideo, ese músculo del cuello que gira la cabeza y termina detrás de la oreja.' },
        { h: 'El problema moderno', p: 'Pasamos la vida en flexión: sentados, mirando el móvil, conduciendo, con los brazos por delante. Esa postura acorta toda la línea frontal. El pecho se cierra, los hombros ruedan hacia dentro y el cuello se adelanta para compensar. Es el "tech neck", y no empieza en el cuello: empieza en el pecho y en la cadera.' },
        { h: 'Por qué se te nota en la cara', p: 'El esternocleidomastoideo es el eslabón final de esta cadena y se inserta justo detrás de la mandíbula. Cuando está acortado, tira de la zona mandibular y del cuello hacia abajo. Muchas veces lo que interpretas como "flacidez" es tracción de una cadena frontal acortada.' },
        { h: 'Cómo trabajarla', p: 'Apertura de pecho entrelazando las manos por detrás, estiramiento de psoas y flexores de cadera en zancada, y movilidad torácica en extensión. Ojo: no eches la cabeza atrás para estirar la garganta, eso comprime la nuca. Alarga primero el cuello y luego abre.' },
      ],
      keys: ['Del empeine al cuello, por delante', 'La vida sentada la acorta entera', 'Su último eslabón tira de tu mandíbula', 'Abre pecho y cadera, no fuerces el cuello'],
    },
    en: {
      title: 'The anterior chain',
      sub: 'The one that hunches you at the screen',
      sections: [
        { h: 'The route', p: 'It runs up from the instep and the front of the shin, through the quadriceps, continues along the rectus abdominis, crosses the sternum and reaches the sternocleidomastoid, the neck muscle that turns the head and ends behind the ear.' },
        { h: 'The modern problem', p: 'We spend life in flexion: sitting, looking at phones, driving, arms in front. That posture shortens the whole front line. The chest closes, shoulders roll in and the neck moves forward to compensate. That is "tech neck", and it does not start in the neck: it starts in the chest and the hip.' },
        { h: 'Why it shows in your face', p: 'The sternocleidomastoid is the final link of this chain and attaches just behind the jaw. When it is short, it pulls the jaw area and neck downward. What you often read as "sagging" is traction from a shortened front chain.' },
        { h: 'How to train it', p: 'Chest opening with hands interlaced behind the back, psoas and hip flexor lunge stretch, and thoracic mobility in extension. Careful: do not throw your head back to stretch the throat, that compresses the nape. Lengthen the neck first, then open.' },
      ],
      keys: ['Instep to neck, up the front', 'Sitting shortens the whole line', 'Its last link pulls on your jaw', 'Open chest and hip, do not force the neck'],
    },
  },
  {
    id: 'chain-lateral',
    icon: 'fascia',
    es: {
      title: 'Las cadenas laterales',
      sub: 'El costado que decide tu simetría',
      sections: [
        { h: 'El recorrido', p: 'Hay una a cada lado. Arrancan en el borde externo del pie, suben por el peroneo y la banda iliotibial, cruzan el costado en zigzag por los oblicuos y los intercostales, y terminan en el cuello y detrás de la oreja.' },
        { h: 'Para qué sirven', p: 'Son las estabilizadoras. Cada vez que te apoyas en una pierna al caminar, son ellas las que evitan que te caigas de lado. Trabajan todo el día sin que te enteres.' },
        { h: 'La conexión con la asimetría facial', p: 'Casi nadie tiene los dos costados iguales. Llevar siempre el bolso del mismo hombro, dormir del mismo lado, apoyar el peso en la misma pierna. Con los años, un costado queda más corto. Y como estas cadenas terminan en el cuello y detrás de la oreja, esa diferencia sube: un hombro más alto, la cabeza ligeramente inclinada y una mandíbula que no parece simétrica.' },
        { h: 'Cómo trabajarlas', p: 'Estiramiento lateral de pie, alargando el costado y empujando la cadera hacia fuera. Compara los dos lados: casi siempre hay uno más corto. Y aquí va lo importante: trabaja más el lado corto, no el que te resulta cómodo. Corregir la asimetría del costado suele mejorar también la de la cara.' },
      ],
      keys: ['Una a cada lado, del pie a la oreja', 'Son las que te estabilizan al caminar', 'Un costado corto sube hasta la mandíbula', 'Trabaja el lado difícil, no el fácil'],
    },
    en: {
      title: 'The lateral chains',
      sub: 'The side body that decides your symmetry',
      sections: [
        { h: 'The route', p: 'There is one on each side. They start at the outer edge of the foot, run up the peroneals and the iliotibial band, cross the side body in a zigzag through the obliques and intercostals, and end at the neck and behind the ear.' },
        { h: 'What they do', p: 'They are the stabilisers. Every time you stand on one leg while walking, they stop you falling sideways. They work all day without you noticing.' },
        { h: 'The link to facial asymmetry', p: 'Almost nobody has two identical sides. Always carrying the bag on the same shoulder, sleeping on the same side, resting weight on the same leg. Over years, one side gets shorter. And since these chains end at the neck and behind the ear, that difference travels up: one shoulder higher, head slightly tilted, and a jaw that does not look symmetrical.' },
        { h: 'How to train them', p: 'Standing side bend, lengthening the side body and pushing the hip outward. Compare both sides: there is almost always a shorter one. And here is the key: work the short side more, not the comfortable one. Evening out side-body asymmetry often improves facial asymmetry too.' },
      ],
      keys: ['One per side, foot to ear', 'They stabilise you when walking', 'A short side travels up to the jaw', 'Work the hard side, not the easy one'],
    },
  },
  {
    id: 'chain-deepfront',
    icon: 'breathing',
    es: {
      title: 'La cadena frontal profunda',
      sub: 'La que une tu lengua con tus pies',
      sections: [
        { h: 'La más importante para ti', p: 'Si solo entiendes una cadena, que sea esta. Es el núcleo profundo del cuerpo y la única que conecta directamente la boca con el pie. Es la razón anatómica por la que una app de cara tiene que hablarte de caderas.' },
        { h: 'El recorrido', p: 'Arranca en la planta profunda del pie, sube por dentro de la pierna (tibial posterior y aductores), pasa por el suelo pélvico, continúa por el psoas, atraviesa el diafragma, sube por delante de la columna, cruza la garganta y termina en el suelo de la boca, la mandíbula y la lengua.' },
        { h: 'Lo que esto significa en la práctica', p: 'La lengua está en la misma cadena que el psoas y el diafragma. Por eso el mewing funciona mejor cuando respiras bien y tienes la cadera abierta, y por eso alguien que pasa el día sentado, con el psoas acortado y respirando alto con el cuello, tiene más difícil sostener la lengua en el paladar. No es falta de constancia: es una cadena tirando en contra.' },
        { h: 'El diafragma es la bisagra', p: 'El diafragma está justo en el centro de esta cadena y comparte inserciones con el psoas. Si respiras con el pecho y el cuello en vez de con el diafragma, activas de más los músculos accesorios del cuello, y esa tensión acaba subiendo a la mandíbula. Respirar bien no es solo oxígeno: es postura.' },
        { h: 'Cómo trabajarla', p: 'En orden: liberación plantar, estiramiento de psoas en zancada, liberación de diafragma y borde costal, respiración nasal diafragmática y, al final, mewing. De abajo arriba, siempre.' },
      ],
      keys: ['Conecta lengua, diafragma, psoas y pie', 'El mewing depende de tu cadera y tu respiración', 'El diafragma es la bisagra de la cadena', 'Trabájala en orden: pie → psoas → diafragma → lengua'],
    },
    en: {
      title: 'The deep front chain',
      sub: 'The one linking your tongue to your feet',
      sections: [
        { h: 'The most important one for you', p: 'If you only understand one chain, make it this one. It is the deep core of the body and the only one directly connecting mouth to foot. It is the anatomical reason a face app has to talk to you about hips.' },
        { h: 'The route', p: 'It starts in the deep sole of the foot, runs up the inside of the leg (tibialis posterior and adductors), passes through the pelvic floor, continues along the psoas, crosses the diaphragm, rises in front of the spine, crosses the throat and ends at the floor of the mouth, the jaw and the tongue.' },
        { h: 'What this means in practice', p: 'The tongue is on the same chain as the psoas and diaphragm. That is why mewing works better when you breathe well and have open hips, and why someone who sits all day with a short psoas, breathing high with the neck, finds it harder to hold the tongue on the palate. It is not lack of consistency: it is a chain pulling against you.' },
        { h: 'The diaphragm is the hinge', p: 'The diaphragm sits right at the centre of this chain and shares attachments with the psoas. If you breathe with chest and neck instead of the diaphragm, you overuse the accessory neck muscles, and that tension travels up to the jaw. Breathing well is not just oxygen: it is posture.' },
        { h: 'How to train it', p: 'In order: plantar release, psoas lunge stretch, diaphragm and rib border release, diaphragmatic nasal breathing and, last, mewing. Bottom-up, always.' },
      ],
      keys: ['Links tongue, diaphragm, psoas and foot', 'Mewing depends on your hips and your breathing', 'The diaphragm is the hinge of the chain', 'Train in order: foot → psoas → diaphragm → tongue'],
    },
  },
  {
    id: 'chains-reading',
    icon: 'fascia',
    es: {
      title: 'Para seguir aprendiendo',
      sub: 'Fuentes y lecturas recomendadas',
      sections: [
        { h: 'El mapa de las líneas', p: 'Thomas Myers, "Anatomy Trains". Es la obra que popularizó el modelo de líneas miofasciales continuas y de donde vienen los nombres que usamos (línea posterior superficial, frontal superficial, lateral, frontal profunda).' },
        { h: 'Cadenas con enfoque de movimiento', p: 'Leandro Ferreira, método Free Fascia. Doctor en Ciencias de la Actividad Física y del Deporte y profesor en la Universidad Católica de Valencia. Su método trabaja las cadenas miofasciales desde una perspectiva anatómica y motora, con protocolos de valoración y ejercicios de movilización del tejido.' },
        { h: 'Movimiento natural y pies libres', p: 'Rubens García (@rmotioncoach), "La revolución del movimiento" (Bruguera Tendencias): sobre liberar los pies y la conexión pie-fascia como base del movimiento funcional. Y su continuación, "El cuerpo es el mensaje", sobre movimiento natural y lo que las tensiones acumuladas dicen de ti. Encajan con el enfoque de esta app: empezar por el pie y entender el cuerpo como un todo.' },
        { h: 'Una nota honesta', p: 'El modelo de cadenas es una herramienta muy útil para entender y tratar el cuerpo, y la continuidad del tejido conectivo está bien documentada. Pero cuánta fuerza se transmite exactamente por cada línea sigue siendo objeto de investigación. Úsalo como mapa, no como verdad cerrada. Si tienes dolor persistente, consulta a un fisioterapeuta.' },
      ],
      keys: ['Myers · Anatomy Trains: el mapa de las líneas', 'Leandro Ferreira · Free Fascia: cadenas en movimiento', 'Rubens García: pies libres y movimiento natural', 'Es un mapa útil, no un dogma cerrado'],
    },
    en: {
      title: 'To keep learning',
      sub: 'Sources and recommended reading',
      sections: [
        { h: 'The map of the lines', p: 'Thomas Myers, "Anatomy Trains". The work that popularised the model of continuous myofascial lines and the source of the names we use (superficial back line, superficial front line, lateral line, deep front line).' },
        { h: 'Chains with a movement focus', p: 'Leandro Ferreira, Free Fascia method. PhD in Physical Activity and Sport Sciences and professor at the Catholic University of Valencia. His method works the myofascial chains from an anatomical and motor perspective, with assessment protocols and tissue mobilisation exercises.' },
        { h: 'Natural movement and free feet', p: 'Rubens García (@rmotioncoach), "La revolución del movimiento" (Bruguera Tendencias): on freeing the feet and the foot-fascia connection as the basis of functional movement. And its follow-up, "El cuerpo es el mensaje", on natural movement and what accumulated tension says about you. Both fit this app’s approach: start at the foot and understand the body as a whole.' },
        { h: 'An honest note', p: 'The chain model is a very useful tool for understanding and treating the body, and connective tissue continuity is well documented. But exactly how much force is transmitted along each line is still under investigation. Use it as a map, not as settled truth. If you have persistent pain, see a physiotherapist.' },
      ],
      keys: ['Myers · Anatomy Trains: the map of the lines', 'Leandro Ferreira · Free Fascia: chains in movement', 'Rubens García: free feet and natural movement', 'A useful map, not closed dogma'],
    },
  },
)
