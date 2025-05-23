/*
  Ejercicio 1: Reverse a String
  Escribe una función reverseString que tome una cadena como entrada y devuelva la cadena invertida.
*/

function reverseString(str) {

    reverseString = str.split('').reverse().join(''); // Divido el string en un array, lo invierto y lo vuelvo a unir
    return reverseString; // Devuelvo el string invertido
}

/*
  Ejercicio 2: Check for Palindrome
  Escribe una función isPalindrome que tome una cadena como entrada 
  y devuelva true si la cadena es un palíndromo, y false en caso contrario.
*/

function isPalindrome(str) {
  //Limpio el string para que tenga solo letras minusculas y numeros
  const stringLimpio = str.toLowerCase().replace(/[^a-z0-9]/g, '');

  //creo dos variables para guardar el inicio y el final del string
  let izquierda = 0;
  let derecha = stringLimpio.length - 1;

  //recorro el string desde el principio y el final
  while (izquierda < derecha) {
    if (stringLimpio[izquierda] !== stringLimpio[derecha]) {
      return false; // Si las letras no coinciden, no es un palíndromo y returna falso terminando el bucle
    }
    // Si las letras coinciden, sigo comparando
    izquierda++;
    derecha--;
    
  }
    return true; // Si todas las letras coinciden, es un palíndromo y returna verdadero
}

/*
  Ejercicio 3: Find the Nearest Pair
  Dado un array de números enteros, 
  encuentra el par de elementos cuya diferencia es mínima. 
  En otras palabras, encuentra dos números en el array que 
  estén más cerca el uno del otro en términos de valor absoluto.

  Ejemplo:

  Entrada: [4, 2, 1, 7, 9, 10]
  Salida: [1, 2]
*/

function closestPair(arr) {
    if (arr.length < 2) {
        return null; // Si el array tiene menos de 2 elementos, no hay pares y devuelve null
    }

    const arrayOrdenado = arr.sort((a,b) => a - b); // Ordeno el array de menor a mayor asegurando que los numeros cercanos esten juntos
    let diferenciaMinima = Infinity; // Inicializo la diferencia con un valor alto 
    let parCercano = []; // Inicializalo el array que guarda la solucion

    //Recorro el array ordenado y comparo la diferencia entre los elementos consecutivos
    for (let i = 0; i < arrayOrdenado.length -1; i++){

      // Calculo la diferencia entre el elemento actual y el siguiente
        const numeroActual = arrayOrdenado[i];
        const numeroSiguiente = arrayOrdenado[i + 1];

        const diferencia = numeroSiguiente - numeroActual; //Como esta ordenado, la diferencia va a ser positiva 

        if (diferencia < diferenciaMinima) {
          diferenciaMinima = diferencia; // Si la diferencia es menor a la minima, actualizo la minima
          parCercano = [numeroActual, numeroSiguiente]; // Actualizo el par cercano
        }
    }

    return parCercano; // Devuelvo el par cercano
}


/*
  Ejercicio 4: Calculadora - Programación Orientada a Objetos
  La calculadora debe ser capaz de realizar operaciones aritméticas básicas, 
  como suma, resta, multiplicación y división. 
  Además, debe mantener un registro del último resultado calculado 
  para que los usuarios puedan acceder a él si es necesario.

  La calculadora debe ser una clase llamada Calculator, que tenga los siguientes métodos:
  - add(a, b): Este método toma dos números como argumentos y devuelve la suma de los mismos. 
    Además, actualiza el último resultado calculado.

  - subtract(a, b): Este método toma dos números como argumentos y devuelve la resta del primero menos el segundo. 
    Además, actualiza el último resultado calculado.

  - multiply(a, b): Este método toma dos números como argumentos y devuelve el producto de los mismos. 
    Además, actualiza el último resultado calculado.

  - divide(a, b): Este método toma dos números como argumentos y devuelve el cociente del primero dividido por el segundo.
    Si el segundo número es cero, se debe lanzar un error indicando que la división por cero no está permitida. 
    Además, actualiza el último resultado calculado.

  - getLastResult(): Este método devuelve el último resultado calculado por la calculadora, simulando un historial.

  Además de estos métodos, debes agregar una función más compleja a la clase Calculator, 
  que calcule la potencia de un número. 
  Esta función debe ser asignada al prototipo de la clase y se llamará exponentiate(base, exponent). 
  Esta función toma dos argumentos: la base y el exponente, y devuelve la base elevada a la potencia del exponente. 
  La función debe manejar correctamente los casos donde el exponente es cero o negativo, lanzando un error en este último caso.
  Además, actualiza el último resultado calculado.

*/

class Calculator {
  constructor() {
    this.lastResult = null; // Inicializo el resultado en null
  }

  //suma
  add(a, b) {
    this.lastResult = a + b; // Actualizo el resultado
    return this.lastResult; // Devuelvo el resultado
  }

  //resta
  subtract(a, b) {
    this.lastResult = a - b; // Actualizo el resultado
    return this.lastResult; // Devuelvo el resultado
  }

  //multiplicacion
  multiply(a, b) {
    this.lastResult = a * b; // Actualizo el resultado
    return this.lastResult; // Devuelvo el resultado
  }

  //division
  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero is not allowed'); // Si el divisor es cero, lanzo un error
    }
    this.lastResult = a / b; // Actualizo el resultado
    return this.lastResult; // Devuelvo el resultado
  }

  //obtener el resultado de la ultima operacion
  getLastResult() {
    return this.lastResult; // Devuelvo el último resultado
  }
}

Calculator.prototype.exponentiate = function(base, exponent) {
  if (exponent < 0) {
    throw new Error('Exponentiation with negative exponent is not allowed'); // Si el exponente es negativo, lanzo un error
  }

  if (exponent === 0) {
    this.lastResult = 1; // Si el exponente es cero, el resultado es 1
  } else {
    this.lastResult = Math.pow(base, exponent); // Calculo la potencia
  }

  return this.lastResult; // Devuelvo el resultado
};



module.exports = {
  closestPair,
  isPalindrome,
  reverseString,
  Calculator,
}