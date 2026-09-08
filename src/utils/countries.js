export const COUNTRY_CODES = ['bo', 'ar', 've', 'co', 'mx', 'pe', 'cl', 'uy'];

export const COUNTRIES = {
  bo: {
    code: 'bo',
    iso3: 'BOL',
    name: 'Bolivia',
    demonym: 'boliviano',
    currency: 'BOB',
    currencyName: 'Boliviano',
    symbol: 'Bs',
    locale: 'es-BO',
    decimals: 2,
    timezone: 'America/La_Paz',
    hasParallel: true,
    fallbackProfile: {
      capital: 'Sucre (constitucional), La Paz (sede de gobierno)',
      region: 'América del Sur',
      languages: 'Español, quechua, aymara, guaraní',
      population: 12200000,
      area: 1098581
    },
    context:
      'El tipo de cambio oficial del boliviano lo fija el Banco Central y no se mueve solo. Cuando conseguir dólares en ventanilla se vuelve difícil, aparece un mercado paralelo con su propio precio, y ese precio no lo publica ninguna entidad oficial.',
    variantsNote:
      'No existe fuente oficial del dólar paralelo en Bolivia. La referencia que ves aquí sale de operaciones de intercambio digital entre personas y sirve para orientarse, nunca para liquidar una obligación.'
  },
  ar: {
    code: 'ar',
    iso3: 'ARG',
    name: 'Argentina',
    demonym: 'argentino',
    currency: 'ARS',
    currencyName: 'Peso argentino',
    symbol: '$',
    locale: 'es-AR',
    decimals: 2,
    timezone: 'America/Argentina/Buenos_Aires',
    hasParallel: true,
    fallbackProfile: {
      capital: 'Buenos Aires',
      region: 'América del Sur',
      languages: 'Español',
      population: 45800000,
      area: 2780400
    },
    context:
      'Argentina convive con varios dólares a la vez. El oficial rige las operaciones bancarias reguladas, el blue se pacta en el mercado informal y las cotizaciones financieras salen de comprar y vender activos. La brecha entre ellos es el número que todos miran.',
    variantsNote:
      'El dólar tarjeta incluye los impuestos que se cobran al consumo en el exterior, por eso siempre queda por encima del oficial.'
  },
  ve: {
    code: 've',
    iso3: 'VEN',
    name: 'Venezuela',
    demonym: 'venezolano',
    currency: 'VES',
    currencyName: 'Bolívar',
    symbol: 'Bs',
    locale: 'es-VE',
    decimals: 2,
    timezone: 'America/Caracas',
    hasParallel: true,
    fallbackProfile: {
      capital: 'Caracas',
      region: 'América del Sur',
      languages: 'Español',
      population: 28400000,
      area: 916445
    },
    context:
      'En Venezuela conviven la tasa oficial del Banco Central y una tasa paralela que se forma en el mercado informal. Buena parte de los precios del día a día se calculan mirando el paralelo, aunque las operaciones bancarias usen la oficial.',
    variantsNote:
      'La tasa paralela venezolana no tiene respaldo institucional: es un promedio de operaciones entre particulares y puede moverse varias veces en un mismo día.'
  },
  co: {
    code: 'co',
    iso3: 'COL',
    name: 'Colombia',
    demonym: 'colombiano',
    currency: 'COP',
    currencyName: 'Peso colombiano',
    symbol: '$',
    locale: 'es-CO',
    decimals: 0,
    timezone: 'America/Bogota',
    hasParallel: false,
    fallbackProfile: {
      capital: 'Bogotá',
      region: 'América del Sur',
      languages: 'Español',
      population: 52200000,
      area: 1141748
    },
    context:
      'La referencia oficial en Colombia es la TRM, la tasa representativa del mercado que calcula la Superintendencia Financiera con las operaciones del día anterior. Las casas de cambio y las plataformas digitales trabajan alrededor de ese valor.',
    variantsNote:
      'La TRM del día ya queda fijada cuando abre la jornada, mientras el mercado spot sigue moviéndose durante toda la sesión.'
  },
  mx: {
    code: 'mx',
    iso3: 'MEX',
    name: 'México',
    demonym: 'mexicano',
    currency: 'MXN',
    currencyName: 'Peso mexicano',
    symbol: '$',
    locale: 'es-MX',
    decimals: 2,
    timezone: 'America/Mexico_City',
    hasParallel: false,
    fallbackProfile: {
      capital: 'Ciudad de México',
      region: 'América del Norte',
      languages: 'Español',
      population: 128500000,
      area: 1964375
    },
    context:
      'El peso mexicano es una de las monedas emergentes más operadas del mundo y cotiza las veinticuatro horas. El Banco de México publica un tipo de cambio FIX que sirve para liquidar obligaciones en dólares dentro del país.',
    variantsNote:
      'El FIX se publica un día hábil antes de la fecha en que surte efecto, por eso casi nunca coincide con el precio del momento.'
  },
  pe: {
    code: 'pe',
    iso3: 'PER',
    name: 'Perú',
    demonym: 'peruano',
    currency: 'PEN',
    currencyName: 'Sol peruano',
    symbol: 'S/',
    locale: 'es-PE',
    decimals: 3,
    timezone: 'America/Lima',
    hasParallel: false,
    fallbackProfile: {
      capital: 'Lima',
      region: 'América del Sur',
      languages: 'Español, quechua, aymara',
      population: 34000000,
      area: 1285216
    },
    context:
      'El sol es de las monedas más estables de la región. El Banco Central de Reserva interviene cuando la volatilidad se dispara, lo que mantiene el rango de cotización bastante estrecho durante meses.',
    variantsNote:
      'En Perú la diferencia entre el tipo bancario y el de una casa de cambio de la calle suele ser mayor que la variación diaria del propio dólar.'
  },
  cl: {
    code: 'cl',
    iso3: 'CHL',
    name: 'Chile',
    demonym: 'chileno',
    currency: 'CLP',
    currencyName: 'Peso chileno',
    symbol: '$',
    locale: 'es-CL',
    decimals: 0,
    timezone: 'America/Santiago',
    hasParallel: false,
    fallbackProfile: {
      capital: 'Santiago',
      region: 'América del Sur',
      languages: 'Español',
      population: 19600000,
      area: 756102
    },
    context:
      'El peso chileno flota libremente y su valor responde con fuerza al precio internacional del cobre, la principal exportación del país. No hay mercado paralelo relevante: la cotización que ves es la del mercado formal.',
    variantsNote:
      'El dólar observado que publica el Banco Central es un promedio del día hábil anterior, así que puede diferir de lo que pagas hoy en una casa de cambio.'
  },
  uy: {
    code: 'uy',
    iso3: 'URY',
    name: 'Uruguay',
    demonym: 'uruguayo',
    currency: 'UYU',
    currencyName: 'Peso uruguayo',
    symbol: '$',
    locale: 'es-UY',
    decimals: 2,
    timezone: 'America/Montevideo',
    hasParallel: false,
    fallbackProfile: {
      capital: 'Montevideo',
      region: 'América del Sur',
      languages: 'Español',
      population: 3400000,
      area: 181034
    },
    context:
      'En Uruguay el dólar circula con naturalidad: se usa para comprar inmuebles, para ahorrar y para muchos precios grandes. El mercado es formal y la brecha entre compra y venta en cambios suele ser amplia.',
    variantsNote:
      'La diferencia entre lo que una casa de cambio uruguaya paga y lo que cobra es de las más anchas de la región, así que conviene comparar antes de operar.'
  }
};

export const countryList = () => COUNTRY_CODES.map((code) => COUNTRIES[code]);

export const getCountry = (code) => COUNTRIES[String(code || '').toLowerCase()] || null;
