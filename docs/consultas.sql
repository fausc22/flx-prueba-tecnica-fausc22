-- **Empleados ordenados alfabéticamente (Z...A):**  -- 

SELECT NOMBRES FROM empleados ORDER BY nombres DESC; 


-- **Empleados de Soporte:**  --
SELECT 
    E.NOMBRES,
    P.PUESTO,
    L.LOCALIDAD
FROM 
    empleados E
JOIN 
    puestos P ON E.PUESTO_ID = P.ID
JOIN 
    DEPARTAMENTOS D ON E.DEPARTAMENTO_ID = D.ID 
JOIN 
    LOCALIDADES L ON D.LOCALIDAD_ID = L.ID
WHERE 
    P.PUESTO = 'Soporte';

-- **Nombres que terminan con 'o':** --

SELECT NOMBRES FROM empleados WHERE NOMBRES LIKE '%o';

-- **Empleados en Carlos Paz:**  --

SELECT 
    E.NOMBRES,
    E.SUELDO,
    L.LOCALIDAD
FROM 
    empleados E 
JOIN 
    departamentos D ON E.DEPARTAMENTO_ID = D.ID FULL JOIN
JOIN 
    localidades L ON D.LOCALIDAD_ID = L.ID
WHERE 
    L.LOCALIDAD = 'Carlos Paz';

-- **Sueldos entre 10000 y 13000:**  --
SELECT 
    E.NOMBRES,
    E.SUELDO,
    L.LOCALIDAD
FROM
    empleados E
JOIN
    departamentos D ON E.DEPARTAMENTO_ID = D.ID FULL JOIN
JOIN 
    localidades L ON D.LOCALIDAD_ID = L.ID 
WHERE 
    E.SUELDO BETWEEN 10000 AND 13000;

-- **Departamentos con más de 5 empleados:**   --
SELECT
    D.DENOMICACION,
    COUNT (E.ID) AS TotalEmpleados
FROM
    departamentos D
JOIN 
    empleados E ON D.ID = E.DEPARTAMENTO_ID 
GROUP BY 
    D.DENOMICACION 
HAVING 
    COUNT (E.ID) > 5;


-- **Empleados en Córdoba con puesto de Analista o Programador:**  --
SELECT 
    E.NOMBRES 
FROM 
    empleados E 
JOIN 
    puestos P ON E.PUESTO_ID = P.ID
JOIN 
    departamentos D ON E.DEPARTAMENTO_ID = D.ID 
JOIN
    localidades L ON D.LOCALIDAD_ID = L.ID 
WHERE 
    L.LOCALIDAD = 'Cordoba'
    AND (P.PUESTO = 'Analista' OR P.PUESTO = 'Programador');

-- **Sueldo medio de todos los empleados:**  --
SELECT 
    AVG(SUELDO) AS SueldoMedio
FROM 
    empleados;

-- **Máximo sueldo en el departamento 10:**  --
SELECT 
    MAX(SUELDO) AS MaximoSueldoDepartamento
FROM
    empleados
WHERE 
    DEPARTAMENTO_ID = 10;

-- **Sueldo mínimo en el departamento Soporte:**  --
SELECT 
    MIN(E.SUELDO) AS SueldoMinimoSoporte
FROM 
    empleados E
JOIN 
    DEPARTAMENTOS D ON E.DEPARTAMENTO_ID = D.ID
WHERE  
    D.DENOMICACION = 'Soporte';

-- **Suma de sueldos por puesto:**  --
SELECT 
    P.PUESTO,
    SUM(E.SUELDO) AS SumaTotalSueldos
FROM 
    empleados E
JOIN
    puestos P ON E.PUESTO_ID = P.ID
GROUP BY
    P.PUESTO;