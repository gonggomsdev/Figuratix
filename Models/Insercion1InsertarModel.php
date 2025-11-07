<?php

class Datos
{
    public function InsertarData1($sql, $typeParameters, ...$parameters)
    {
        // Conexión
        $mysqli = Conex1::con1();

        // Preparar sentencia
        $statement = $mysqli->prepare($sql);
        if (!$statement) {
            throw new Exception("Error al preparar la consulta: " . $mysqli->error);
        }

        // Vincular parámetros
        $statement->bind_param($typeParameters, ...$parameters);

        // Ejecutar
        $statement->execute();

        // Obtener ID insertado
        $insertId = $mysqli->insert_id;

        // Cerrar todo
        $statement->close();
        $mysqli->close();

        return $insertId;
    }
}
?>