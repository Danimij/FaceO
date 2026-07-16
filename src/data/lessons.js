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
