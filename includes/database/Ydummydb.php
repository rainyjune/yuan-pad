<?php
/**
 * Dummydb
 *
 * @author rainyjune
 * @license MIT
 * @link https://github.com/rainyjune/yuan-pad 
 */
class Ydummydb extends YDBBase {
    public function query($sql){}
    public function queryAll($sql){}
    public function queryWithLimit($sql, $offset, $row_count){}
    public function insert_id(){}
    public function error(){}
    public function server_version(){}
    public function escape_string($item){}
    public function num_rows($result){}
    public function num_fields($result){}
    public function affected_rows(){}
    public function table_exists($table_name){}
    public function close(){}
}
