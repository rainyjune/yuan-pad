<?php
/**
 * FLEA_Helper_ImgCode Class
 *
 * @copyright Copyright (c) 2005 - 2008 QeeYuan China Inc. (http://www.qeeyuan.com)
 * @author www.qeeyuan.com
 * @version $Id$
 */
class FLEA_Helper_ImgCode
{
    var $_code;
    var $_expired;
    var $imagetype = 'jpeg';
    var $keepCode = false;

    function __construct()
    {
        @session_start();

        $this->_code = isset($_SESSION['IMGCODE']) ?
                $_SESSION['IMGCODE'] : '';
        $this->_expired = isset($_SESSION['IMGCODE_EXPIRED']) ?
                $_SESSION['IMGCODE_EXPIRED'] : 0;
    }

    function check($code)
    {
        $time = time();
        if ($time >= $this->_expired || @strtoupper($code) != @strtoupper($this->_code)) {
            return false;
       }
        return true;
    }

    function checkCaseSensitive($code)
    {
        $time = time();
        if ($time >= $this->_expired || $code != $this->_code) {
            return false;
        }
        return true;
    }

    function clear()
    {
        unset($_SESSION['IMGCODE']);
        unset($_SESSION['IMGCODE_EXPIRED']);
    }

    function image($type = 0, $length = 4, $lefttime = 900, $options = null)
    {
        if ($this->keepCode && $this->_code != '') {
            $code = $this->_code;
        } else {
            switch ($type) {
            case 0:
                $seed = '0123456789';
                break;
            case 1:
                $seed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                break;
            default:
                $seed = '346789ABCDEFGHJKLMNPQRTUVWXYabcdefghjklmnpqrtuvwxy';
            }
            if ($length <= 0) { $length = 4; }
            $code = '';
            list($usec, $sec) = explode(" ", microtime());
            @srand($sec + $usec * 100000);
            $len = strlen($seed) - 1;
            for ($i = 0; $i < $length; $i++) {
                $code .= substr($seed, rand(0, $len), 1);
            }
            $_SESSION['IMGCODE'] = $code;
        }
        $_SESSION['IMGCODE_EXPIRED'] = time() + $lefttime;

        $paddingLeft = isset($options['paddingLeft']) ?
                (int)$options['paddingLeft'] : 3;
        $paddingRight = isset($options['paddingRight']) ?
                (int)$options['paddingRight'] : 3;
        $paddingTop = isset($options['paddingTop']) ?
                (int)$options['paddingTop'] : 2;
        $paddingBottom = isset($options['paddingBottom']) ?
                (int)$options['paddingBottom'] : 2;
        $color = isset($options['color']) ? $options['color'] : '0xffffff';
        $bgcolor = isset($options['bgcolor']) ? $options['bgcolor'] : '0x666666';
        $border = isset($options['border']) ? (int)$options['border'] : 1;
        $bdColor = isset($options['borderColor']) ? $options['borderColor'] : '0x000000';

        if (!isset($options['font'])) {
            $font = 5;
        } else if (is_int($options['font'])) {
            $font = (int)$options['font'];
            if ($font < 0 || $font > 5) { $font = 5; }
        } else {
            $font = imageloadfont($options['font']);
        }

        $fontWidth = imagefontwidth($font);
        $fontHeight = imagefontheight($font);

        $width = $fontWidth * strlen($code) + $paddingLeft + $paddingRight +
                $border * 2 + 1;
        $height = $fontHeight + $paddingTop + $paddingBottom + $border * 2 + 1;

        $img = imagecreate($width, $height);

        if ($border) {
            list($r, $g, $b) = $this->_hex2rgb($bdColor);
            $borderColor = imagecolorallocate($img, $r, $g, $b);
            imagefilledrectangle($img, 0, 0, $width, $height, $borderColor);
        }

        list($r, $g, $b) = $this->_hex2rgb($bgcolor);
        $backgroundColor = imagecolorallocate($img, $r, $g, $b);
        imagefilledrectangle($img, $border, $border,
                $width - $border - 1, $height - $border - 1, $backgroundColor);

        list($r, $g, $b) = $this->_hex2rgb($color);
        $textColor = imagecolorallocate($img, $r, $g, $b);
        imagestring($img, $font, $paddingLeft + $border, $paddingTop + $border,
                $code, $textColor);

        switch (strtolower($this->imagetype)) {
        case 'png':
            header("Content-type: " . image_type_to_mime_type(IMAGETYPE_PNG));
            imagepng($img);
            break;
        case 'gif':
            header("Content-type: " . image_type_to_mime_type(IMAGETYPE_GIF));
            imagegif($img);
            break;
        case 'jpg':
        default:
            header("Content-type: " . image_type_to_mime_type(IMAGETYPE_JPEG));
            imagejpeg($img);
        }

        imagedestroy($img);
        unset($img);
    }

    function _hex2rgb($color, $defualt = 'ffffff')
    {
        $color = strtolower($color);
        if (substr($color, 0, 2) == '0x') {
            $color = substr($color, 2);
        } elseif (substr($color, 0, 1) == '#') {
            $color = substr($color, 1);
        }
        $l = strlen($color);
        if ($l == 3) {
            $r = hexdec(substr($color, 0, 1));
            $g = hexdec(substr($color, 1, 1));
            $b = hexdec(substr($color, 2, 1));
            return array($r, $g, $b);
        } elseif ($l != 6) {
            $color = $defualt;
        }

        $r = hexdec(substr($color, 0, 2));
        $g = hexdec(substr($color, 2, 2));
        $b = hexdec(substr($color, 4, 2));
        return array($r, $g, $b);
    }
}
