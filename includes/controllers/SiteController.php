<?php
/**
 * Site Controller
 * @author rainyjune <rainyjune@live.cn>
 */
class SiteController extends BaseController{
    protected   $_model;
    protected   $_verifyCode;
    
    public function  __construct(){
        global $db_url;
        if($db_url !='dummydb://username:password@localhost/databasename') {
            $this->_model=  YDB::factory($db_url);
        }
        $this->_verifyCode=new FLEA_Helper_ImgCode();
    }

    /**
     * Show the Index page.
     */
    public function actionIndex() {
        $this->render('index');
    }

    public function actionInstall(){
        $languages=get_all_langs();
        $language=(isset($_GET['l']) && in_array($_GET['l'],$languages))?$_GET['l']:'en';
        $installed=FALSE;
        $tips=array();
        if(!file_exists(CONFIGFILE)) {        // Check the configuration file permissions
            $tips[]=t('CONFIG_FILE_NOTEXISTS',array('{config_file}'=>CONFIGFILE),$language);
        } elseif(!is_writable(CONFIGFILE)) {
            $tips[]=t('CONFIG_FILE_NOTWRITABLE',array('{config_file}'=>CONFIGFILE),$language);
        }
        if(!is_writable(APPROOT.'/data/')) {
            $tips[]=t('DATADIR_NOT_WRITABLE', array(), $language);
        }
        if(isset($_POST['dbtype']))
        {
            if(!empty ($_POST['adminname']) && !empty($_POST['adminpass']) && !empty ($_POST['dbtype']) &&!empty ($_POST['dbusername']) && !empty ($_POST['dbname']) && !empty ($_POST['dbhost']) && strlen(trim($_POST['adminname']))>2 ){
                $adminname=maple_quotes($_POST['adminname']);
                $adminpass=maple_quotes($_POST['adminpass']);
                $dbname=  maple_quotes($_POST['dbname']);
                $tbprefix=$_POST['tbprefix'];
                $url=$_POST['dbtype'].'://'.$_POST['dbusername'].':'.$_POST['dbpwd'].'@'.$_POST['dbhost'].'/'.$_POST['dbname'];
                #$db=YDB::factory($url);
                $formError='';
                try{
                    $db=YDB::factory($url);
                }
                catch (Exception $e){
                    $formError=$e->getMessage();
                }
            }
            else
            {
                $formError=t('FILL_NOT_COMPLETE',array(),$language);
            }
            if(!$formError){
                $url_string="<?php\n\$db_url = '$url';\n\$db_prefix = '$tbprefix';\n?>";
                file_put_contents(CONFIGFILE, $url_string);
                $sql_file=APPROOT.DIRECTORY_SEPARATOR.'data'.DIRECTORY_SEPARATOR.$_POST['dbtype'].'.sql';
                $sql_array=file($sql_file);
                $translate=array('{time}'=>  time(),'{ip}'=>  getIP(),'{admin}'=>$adminname,'{adminpass}'=>$adminpass,'{lang}'=>$language,'<'=>$tbprefix,'>'=>'');
                foreach ($sql_array as $sql) {
                    $_sql=html_entity_decode(strtr(trim($sql),$translate),ENT_COMPAT,'UTF-8');
                    $db->query($_sql);
                }
                $installed=TRUE;
                $_SESSION['admin']=$_POST['adminname'];
                $_SESSION['token'] = getToken();
                setrawcookie('CSRF-TOKEN', $_SESSION['token']);
            }
        }
        if(file_exists(dirname(dirname(__FILE__)).'/install.php')){
            include dirname(dirname(__FILE__)).'/install.php';
        }  else {
            die ('Access denied!');
        }
    }
    
    /**
     * Show the Administration Control Panel.
     *
     */
    public function actionControl_panel(){
        $this->render('admin');
    }

    public function actionRSS(){
        $data=get_all_data(true, true);
        header('Content-Type: text/xml; charset=utf-8', true);
        $now = date("D, d M Y H:i:s T");
        $borad_name=ZFramework::app()->board_name;
        $output =<<<HERE
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
    <channel>
    <title>$borad_name</title>
    <link>{$_SERVER['HTTP_HOST']}{$_SERVER['PHP_SELF']}</link>
    <language>en</language>
    <pubDate>$now</pubDate>
    <lastBuildDate>$now</lastBuildDate>\n
HERE;
        foreach ($data as $m) {
            $output .= "\t<item><title>";
            if((int)$m['uid']>0) {
                $output.=htmlentities ($m['b_username']);
            } else {
                $output.=htmlentities ($m['uname']);
            }
            $output .= "</title><pubDate>".date("D, d M Y H:i:s T", $m['time'])."</pubDate><description><![CDATA[".$m['post_content'];
            if(@$m['reply_content']) {
                $output.="<br />".strip_tags (t('ADMIN_REPLIED',array('{admin_name}'=>ZFramework::app()->admin,'{reply_time}'=>date("D, d M Y H:i:s T",$m['reply_time']),'{reply_content}'=>$m['reply_content'])));
            }
            $output .="]]></description></item>\n";
        }
        $output.="\t</channel>\n</rss>";
        echo $output;
    }

    public  function actionCaptcha(){
        $this->_verifyCode->image(2,4,900,array('borderColor'=>'#66CCFF','bgcolor'=>'#FFCC33'));
    }
}
