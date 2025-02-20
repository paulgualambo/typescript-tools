// obfuscateSensitiveData.spec.ts
import { obfuscateSensitiveData } from "../../src/common/ofuscate"; // Ajusta la ruta según corresponda

describe("obfuscateSensitiveData", () => {
  it("should return primitive values unchanged", () => {
    expect(obfuscateSensitiveData("test")).toBe("test");
    expect(obfuscateSensitiveData(42)).toBe(42);
    expect(obfuscateSensitiveData(true)).toBe(true);
  });

  it("should obfuscate 'telefono' and 'phone'", () => {
    const input = {
      telefono: "1234567890", // 10 caracteres: '*'*6 + '7890'
      phone: "0987654321"     // '*'*6 + '4321'
    };
    const expected = {
      telefono: "******7890",
      phone: "******4321"
    };
    expect(obfuscateSensitiveData(input)).toEqual(expected);
  });

  it("should obfuscate 'email' and 'correo'", () => {
    const input = {
      email: "example@test.com",  // local: "example" (7 letras) -> "e*****e@test.com"
      correo: "user@test.com"       // local: "user" (4 letras) -> "u**r@test.com"
    };
    const expected = {
      email: "e*****e@test.com",
      correo: "u**r@test.com"
    };
    expect(obfuscateSensitiveData(input)).toEqual(expected);
  });

  it("should obfuscate 'dni' and 'ssn' (covering lines 35-36)", () => {
    const input = {
      dni: "12345678",    // 8 caracteres: "1******8"
      ssn: "987654321"    // 9 caracteres: "9*******1" (estrategia en líneas 35-36)
    };
    const expected = {
      dni: "1******8",
      ssn: "9*******1"
    };
    expect(obfuscateSensitiveData(input)).toEqual(expected);
  });

  it("should obfuscate 'nombre', 'nombres', 'name', 'names' and 'fullname' (covering lines 44-49 and 56-57)", () => {
    const input = {
      nombre: "Ana",       // "A" + "**" = "A**"
      nombres: "Luis",     // "L" + "***" = "L***"  (líneas 44-45)
      name: "Maria",       // "M" + "****" = "M****" (líneas 47-49)
      names: "Jose",       // "J" + "***" = "J***"
      fullname: "Carlos"   // "C" + "*****" = "C*****" (líneas 56-57, para 6 caracteres)
    };
    const expected = {
      nombre: "A**",
      nombres: "L***",
      name: "M****",
      names: "J***",
      fullname: "C*****"
    };
    expect(obfuscateSensitiveData(input)).toEqual(expected);
  });

  it("should process arrays recursively", () => {
    const input = [
      { email: "test1@example.com" },
      { telefono: "1112223333" }
    ];
    const expected = [
      { email: "t***1@example.com" },  // "test1" → "t***1@example.com"
      { telefono: "******3333" }         // 10 caracteres → "******3333"
    ];
    expect(obfuscateSensitiveData(input)).toEqual(expected);
  });

  it("should process nested objects recursively", () => {
    const input = {
      user: {
        correo: "john.doe@example.com", // local: "john.doe" (8 caracteres) → "j******e@example.com"
        ssn: "123456789",               // → "1*******9"
        details: {
          nombres: "Luis"               // → "L***"
        }
      }
    };
    const expected = {
      user: {
        correo: "j******e@example.com",
        ssn: "1*******9",
        details: {
          nombres: "L***"
        }
      }
    };
    expect(obfuscateSensitiveData(input)).toEqual(expected);
  });
});

describe("obfuscateSensitiveData", () => {
    it("should recursively obfuscate sensitive fields in an object (covering lines 5-56)", () => {
      const input = {
        telefono: "123",    // 10 caracteres → "******7890"
        phone:"789",
        email: "example@test.com", // local "example" (7 letras) → "e*****e@test.com"
        dni: "12345678",           // 8 caracteres → "1******8"
        nombre: "Ana"              // → "A**"
      };
      const expected = {
        telefono: "***",
        phone:"***",
        email: "e*****e@test.com",
        dni: "1******8",
        nombre: "A**"
      };
      expect(obfuscateSensitiveData(input)).toEqual(expected);
    });
  
    it("should return non-object values unchanged (covering line 77)", () => {
      // Estos casos cubren el retorno directo (línea 77) para tipos primitivos
      expect(obfuscateSensitiveData("simple string")).toBe("simple string");
      expect(obfuscateSensitiveData(12345)).toBe(12345);
      expect(obfuscateSensitiveData(false)).toBe(false);
    });

    it("should obfuscate 'email' and 'correo' coverage 15 17", () => {
      let input = {
        email: "example@te@st.com",
        correo: "us@ertest.com",
        dni: "12"
        ,ssn: "12"
        ,nombres:"p"
        ,nombre:"p"
        ,name:"p"
        ,names:"p"
        ,fullname:"p"
      };
      let expected = {
        email: "example@te@st.com",
        correo: "**@ertest.com",
        dni: "**"
        ,ssn: "**"
        ,nombres:"*"
        ,nombre:"*"
        ,name:"*"
        ,names:"*"
        ,fullname:"*"
      };

      expect(obfuscateSensitiveData(input)).toEqual(expected);

      input = {
        ... input,
        email: "us@ertest.com",  // local: "example" (7 letras) -> "e*****e@test.com"
        correo: "user@tes@t.com"       // local: "user" (4 letras) -> "u**r@test.com"
      };
      expected = {
        ... expected,
        email: "**@ertest.com",
        correo: "user@tes@t.com"
      };

      expect(obfuscateSensitiveData(input)).toEqual(expected);
    });
  });