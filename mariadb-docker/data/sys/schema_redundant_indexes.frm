TYPE=VIEW
query=select `redundant_keys`.`table_schema` AS `table_schema`,`redundant_keys`.`table_name` AS `table_name`,`redundant_keys`.`index_name` AS `redundant_index_name`,`redundant_keys`.`index_columns` AS `redundant_index_columns`,`redundant_keys`.`non_unique` AS `redundant_index_non_unique`,`dominant_keys`.`index_name` AS `dominant_index_name`,`dominant_keys`.`index_columns` AS `dominant_index_columns`,`dominant_keys`.`non_unique` AS `dominant_index_non_unique`,if(`redundant_keys`.`subpart_exists` <> 0 or `dominant_keys`.`subpart_exists` <> 0,1,0) AS `subpart_exists`,concat(\'ALTER TABLE `\',`redundant_keys`.`table_schema`,\'`.`\',`redundant_keys`.`table_name`,\'` DROP INDEX `\',`redundant_keys`.`index_name`,\'`\') AS `sql_drop_index` from (`sys`.`x$schema_flattened_keys` `redundant_keys` join `sys`.`x$schema_flattened_keys` `dominant_keys` on(`redundant_keys`.`table_schema` = `dominant_keys`.`table_schema` and `redundant_keys`.`table_name` = `dominant_keys`.`table_name`)) where `redundant_keys`.`index_name` <> `dominant_keys`.`index_name` and (`redundant_keys`.`index_columns` = `dominant_keys`.`index_columns` and (`redundant_keys`.`non_unique` > `dominant_keys`.`non_unique` or `redundant_keys`.`non_unique` = `dominant_keys`.`non_unique` and if(`redundant_keys`.`index_name` = \'PRIMARY\',\'\',`redundant_keys`.`index_name`) > if(`dominant_keys`.`index_name` = \'PRIMARY\',\'\',`dominant_keys`.`index_name`)) or locate(concat(`redundant_keys`.`index_columns`,\',\'),`dominant_keys`.`index_columns`) = 1 and `redundant_keys`.`non_unique` = 1 or locate(concat(`dominant_keys`.`index_columns`,\',\'),`redundant_keys`.`index_columns`) = 1 and `dominant_keys`.`non_unique` = 0)
md5=b7dc42e5df448cf4a08d3059e8ecf40f
updatable=0
algorithm=2
definer_user=mariadb.sys
definer_host=localhost
suid=0
with_check_option=0
timestamp=0001723300698570722
create-version=2
source=SELECT\n    redundant_keys.table_schema,\n    redundant_keys.table_name,\n    redundant_keys.index_name AS redundant_index_name,\n    redundant_keys.index_columns AS redundant_index_columns,\n    redundant_keys.non_unique AS redundant_index_non_unique,\n    dominant_keys.index_name AS dominant_index_name,\n    dominant_keys.index_columns AS dominant_index_columns,\n    dominant_keys.non_unique AS dominant_index_non_unique,\n    IF(redundant_keys.subpart_exists OR dominant_keys.subpart_exists, 1 ,0) AS subpart_exists,\n    CONCAT(\n      \'ALTER TABLE `\', redundant_keys.table_schema, \'`.`\', redundant_keys.table_name, \'` DROP INDEX `\', redundant_keys.index_name, \'`\'\n      ) AS sql_drop_index\n  FROM\n    x$schema_flattened_keys AS redundant_keys\n    INNER JOIN x$schema_flattened_keys AS dominant_keys\n    USING (TABLE_SCHEMA, TABLE_NAME)\n  WHERE\n    redundant_keys.index_name != dominant_keys.index_name\n    AND (\n      (\n        /* Identical columns */\n        (redundant_keys.index_columns = dominant_keys.index_columns)\n        AND (\n          (redundant_keys.non_unique > dominant_keys.non_unique)\n          OR (redundant_keys.non_unique = dominant_keys.non_unique\n          	AND IF(redundant_keys.index_name=\'PRIMARY\', \'\', redundant_keys.index_name) > IF(dominant_keys.index_name=\'PRIMARY\', \'\', dominant_keys.index_name)\n          )\n        )\n      )\n      OR\n      (\n        /* Non-unique prefix columns */\n        LOCATE(CONCAT(redundant_keys.index_columns, \',\'), dominant_keys.index_columns) = 1\n        AND redundant_keys.non_unique = 1\n      )\n      OR\n      (\n        /* Unique prefix columns */\n        LOCATE(CONCAT(dominant_keys.index_columns, \',\'), redundant_keys.index_columns) = 1\n        AND dominant_keys.non_unique = 0\n      )\n    );
client_cs_name=utf8mb3
connection_cl_name=utf8mb3_general_ci
view_body_utf8=select `redundant_keys`.`table_schema` AS `table_schema`,`redundant_keys`.`table_name` AS `table_name`,`redundant_keys`.`index_name` AS `redundant_index_name`,`redundant_keys`.`index_columns` AS `redundant_index_columns`,`redundant_keys`.`non_unique` AS `redundant_index_non_unique`,`dominant_keys`.`index_name` AS `dominant_index_name`,`dominant_keys`.`index_columns` AS `dominant_index_columns`,`dominant_keys`.`non_unique` AS `dominant_index_non_unique`,if(`redundant_keys`.`subpart_exists` <> 0 or `dominant_keys`.`subpart_exists` <> 0,1,0) AS `subpart_exists`,concat(\'ALTER TABLE `\',`redundant_keys`.`table_schema`,\'`.`\',`redundant_keys`.`table_name`,\'` DROP INDEX `\',`redundant_keys`.`index_name`,\'`\') AS `sql_drop_index` from (`sys`.`x$schema_flattened_keys` `redundant_keys` join `sys`.`x$schema_flattened_keys` `dominant_keys` on(`redundant_keys`.`table_schema` = `dominant_keys`.`table_schema` and `redundant_keys`.`table_name` = `dominant_keys`.`table_name`)) where `redundant_keys`.`index_name` <> `dominant_keys`.`index_name` and (`redundant_keys`.`index_columns` = `dominant_keys`.`index_columns` and (`redundant_keys`.`non_unique` > `dominant_keys`.`non_unique` or `redundant_keys`.`non_unique` = `dominant_keys`.`non_unique` and if(`redundant_keys`.`index_name` = \'PRIMARY\',\'\',`redundant_keys`.`index_name`) > if(`dominant_keys`.`index_name` = \'PRIMARY\',\'\',`dominant_keys`.`index_name`)) or locate(concat(`redundant_keys`.`index_columns`,\',\'),`dominant_keys`.`index_columns`) = 1 and `redundant_keys`.`non_unique` = 1 or locate(concat(`dominant_keys`.`index_columns`,\',\'),`redundant_keys`.`index_columns`) = 1 and `dominant_keys`.`non_unique` = 0)
mariadb-version=110402
