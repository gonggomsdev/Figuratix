<?php

class Datos
{

    // Devuelve Datos (select)
    // Independientemente con cualquier núemero de parámetros y de campos a extraer en la tabla
    public function getData1($sql, $typeParameters, ...$parameters)
    {
        // Conexión
        $mysqli = Conex1::con1();
        // Sentencia
        $statement = $mysqli->prepare($sql);
        // Parámetros (ejemplo: si = string integer)
        $statement->bind_param($typeParameters, ...$parameters);
        // Ejecución de la sentencia
        $statement->execute();
        // Obtención del resultado
        $result = $statement->get_result();
        // Carga de todas las filas como asociación (campo=>valor) en la colección $data, sin indicar el nombre de los campos
        $data = $result->fetch_all(MYSQLI_ASSOC);
        // Liberación del conjunto de resultados
        $result->free();
        // Cierre de la declaración
        $statement->close();
        // Cierre de la conexión
        $mysqli->close();
        // Devolución del resultado
        return $data;
    }

}

?>