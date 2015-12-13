<?php
class Ymssql extends YDBBase {
    protected $lnk;
    protected $stmt;

    // Tested 1
    public function Ymssql($url) {
        $url = parse_url($url);
        
        // Check if SQLSRV support is present in PHP
        if (!function_exists('sqlsrv_connect')) {
            die('Unable to use the Microsoft SQL Server database because the SQLSRV extension for PHP is not installed. Check your <code>php.ini</code> to see how you can enable it.');
        }
        
        // Decode url-encoded information in the db connection string
        $url['user'] = urldecode($url['user']);
        // Test if database url has a password.
        $url['pass'] = isset($url['pass']) ? urldecode($url['pass']) : '';
        $url['host'] = urldecode($url['host']);
        $url['path'] = urldecode($url['path']);
        
        // Allow for non-standard port.
        if (isset($url['port'])) {
            $url['host'] = $url['host'] .', '. $url['port'];
        }
        
        $connectionInfo = array( "Database"=>substr($url['path'], 1), "UID"=>$url['user'], "PWD"=>$url['pass']);
        $connection = @sqlsrv_connect($url['host'], $connectionInfo);
        if (!$connection) {
            // Show error screen otherwise
            throw new Exception(print_r( sqlsrv_errors(), true));
        }
        $this->lnk=$connection;
    }
    // Tested 1
    // @TODO escape table name to void use SQL Server reserved keywords.
    public function query($sql){
        if($this->lnk){
            if(stripos($sql,'UPDATE') !== FALSE || stripos($sql,'INSERT') !== FALSE || stripos($sql,'DELETE') !== FALSE) {
                $query_result = sqlsrv_query($this->lnk, $sql, null, array());
            } else {
                $query_result = sqlsrv_query($this->lnk, $sql, array(), array( "Scrollable" => SQLSRV_CURSOR_KEYSET ));
            }
            $this->stmt = $query_result;
            return $query_result;
        }
        return false;
    }
    // Tested 1
    public function queryAll($sql){
        $query_result = $this->query($sql);
        if(is_resource($query_result)){
            if(sqlsrv_num_rows($query_result)>0) {
                $result_array = array();
                while($line = sqlsrv_fetch_array($query_result, SQLSRV_FETCH_ASSOC)){
                    $result_array[] = $line;
                }
                return $result_array;
            }
        }
        return array();
    }


    // TODO
    public function queryWithLimit($sql, $offset, $row_count) {

    }

    // Tested 1
    public function insert_id(){
        if($this->lnk){
            $result = sqlsrv_fetch_array(sqlsrv_query($this->lnk, "select @@IDENTITY as id"), SQLSRV_FETCH_ASSOC);
            return $result['id'];
        }
        return false;
    }
    // Tested 1
    public function error(){
        return sqlsrv_errors();
    }
    // Tested 1
    public function server_version(){
        if ($this->lnk) {
            $info = sqlsrv_server_info($this->lnk); 
            return $info['SQLServerVersion'];
        }
        return false;
    }
    // Tested 1
    public function escape_string($item){
        if(get_magic_quotes_gpc()) {
            $item= stripslashes($item);
        }
        return str_replace("'", "''", $item);
    }
    // Tested 1
    public function num_rows($result){
        return sqlsrv_num_rows($result);
    }
    // Tested 1
    public function num_fields($result){
        return sqlsrv_num_fields($result);
    }
    // Tested 1
    public function affected_rows(){
        if ($this->stmt) {
            $stmt = $this->stmt;
            return sqlsrv_rows_affected($stmt);
        }
        return 0;
    }
    // Tested 1
    public function table_exists($table_name){
        $sql = "SELECT count(1) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '{$table_name}'";
        $result=$this->query($sql);
        if($result){
             $row = sqlsrv_fetch_array( $result, SQLSRV_FETCH_NUMERIC);
             return $row[0] == 1;
        }
        return false;
    }
    // Tested 1
    public function close(){
        return sqlsrv_close($this->lnk);
    }
}