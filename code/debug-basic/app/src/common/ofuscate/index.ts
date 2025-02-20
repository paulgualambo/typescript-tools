// Define las estrategias de ofuscación para cada tipo de dato sensible
const obfuscationStrategies: { [key: string]: (value: string) => string } = {
    telefono: (value: string) => {
      // Ejemplo: mostrar solo los últimos 4 dígitos
      if (value.length <= 4) return '*'.repeat(value.length);
      return '*'.repeat(value.length - 4) + value.slice(-4);
    },
    phone: (value: string) => {
      if (value.length <= 4) return '*'.repeat(value.length);
      return '*'.repeat(value.length - 4) + value.slice(-4);
    },
    email: (value: string) => {
        // Separa el email en local y dominio y ofusca el local
        const parts = value.split("@");
        if (parts.length !== 2) return value;
        const [local, domain] = parts;
        if (local.length <= 2) return '*'.repeat(local.length) + "@" + domain;
        return local[0] + '*'.repeat(local.length - 2) + local[local.length - 1] + "@" + domain;
      },
    correo: (value: string) => {
      // Separa el email en local y dominio y ofusca el local
      const parts = value.split("@");
      if (parts.length !== 2) return value;
      const [local, domain] = parts;
      if (local.length <= 2) return '*'.repeat(local.length) + "@" + domain;
      return local[0] + '*'.repeat(local.length - 2) + local[local.length - 1] + "@" + domain;
    },
    dni: (value: string) => {
      // Muestra solo el primer y último carácter
      if (value.length <= 2) return '*'.repeat(value.length);
      return value[0] + '*'.repeat(value.length - 2) + value[value.length - 1];
    },
    ssn: (value: string) => {
      // Estrategia similar a dni para números de seguridad social
      if (value.length <= 2) return '*'.repeat(value.length);
      return value[0] + '*'.repeat(value.length - 2) + value[value.length - 1];
    },
    nombre: (value: string) => {
      // Ejemplo: muestra solo la primera letra y oculta el resto
      if (value.length <= 1) return '*';
      return value[0] + '*'.repeat(value.length - 1);
    },
    nombres: (value: string) => {
      if (value.length <= 1) return '*';
      return value[0] + '*'.repeat(value.length - 1);
    },
    name: (value: string) => {
      if (value.length <= 1) return '*';
      return value[0] + '*'.repeat(value.length - 1);
    },
    names: (value: string) => {
      if (value.length <= 1) return '*';
      return value[0] + '*'.repeat(value.length - 1);
    },
    fullname: (value: string) => {
        if (value.length <= 1) return '*';
        return value[0] + '*'.repeat(value.length - 1);
      },
  };
  
  /**
   * Función recursiva que recorre el objeto y ofusca los valores sensibles
   * según la estrategia definida para cada clave.
   * 
   * @param obj Objeto a ofuscar.
   * @returns El mismo objeto con los valores sensibles ofuscados.
   */
  export function obfuscateSensitiveData(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(item => obfuscateSensitiveData(item));
    } else if (obj !== null && typeof obj === 'object') {
      const result: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const lowerKey = key.toLowerCase();
          if (obfuscationStrategies[lowerKey]) {
            // result[key] = typeof obj[key] === 'string'
            //   ? obfuscationStrategies[lowerKey](obj[key])
            //   : obfuscationStrategies[lowerKey](String(obj[key]));
              result[key] = obfuscationStrategies[lowerKey](obj[key])           
          } else {
            result[key] = obfuscateSensitiveData(obj[key]);
          }
        }
      }
      return result;
    }
    return obj;
  }
  
