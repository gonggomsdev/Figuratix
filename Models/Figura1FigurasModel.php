<?php
class Datos
{
    // Obtiene datos de la base (SELECT)
    public function getData1($sql, $typeParameters = "", ...$parameters)
    {
        $mysqli = Conex1::con1();
        $stmt = $mysqli->prepare($sql);
        if (!empty($typeParameters) && !empty($parameters)) {
            $stmt->bind_param($typeParameters, ...$parameters);
        }
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();
        $stmt->close();
        $mysqli->close();
        return $data;
    }

    // Ejecuta INSERT, UPDATE, DELETE
    public function executeQuery($sql, $typeParameters = "", ...$parameters)
    {
        $mysqli = Conex1::con1();
        $stmt = $mysqli->prepare($sql);
        if (!empty($typeParameters) && !empty($parameters)) {
            $stmt->bind_param($typeParameters, ...$parameters);
        }
        $success = $stmt->execute();
        $stmt->close();
        $mysqli->close();
        return $success;
    }
}
?>
