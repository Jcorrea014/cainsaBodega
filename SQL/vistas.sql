

SELECT u.id , u.fecha, u.cantidad, m.nombre from uso u inner join materiales m on m.codigoMaterial = u.codigoMaterial