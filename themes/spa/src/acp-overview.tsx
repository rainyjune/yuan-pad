import React from "react";

let ACPOverview = (props: any) => {
  let lang = props.lang,
      sysInfo = props.systemInformation;
  return (
    <div className={props.activeTab === "overview" ? "selectTag" : ""}>
      <h1>{lang.WELCOME_SYS}</h1>
      {lang.THANKS}
      <table className="table">
        <tbody>
          <tr>
            <td colSpan={2}><b>{lang.STATS_INFO}</b></td>
          </tr>
          <tr>
            <td>{lang.NUM_POSTS}:</td><td align="right">{sysInfo.commentsTotal}</td>
          </tr>
          <tr>
            <td>{lang.NUM_REPLY}:</td><td align="right">{sysInfo.repliesTotal}</td>
          </tr>
          <tr>
            <td>{lang.MP_VERSION}:</td><td align="right">{sysInfo.appVersion}</td>
          </tr>
          <tr>
            <td colSpan={2}><b>{lang.SYS_INFO}</b></td>
          </tr>
          <tr>
            <td>{lang.PHP_VERSION}:</td><td align="right">{sysInfo.phpVersion}</td>
          </tr>
          <tr>
            <td>{lang.GD_VERSION}: </td><td align="right">{sysInfo.gdVersion}</td>
          </tr>
          <tr>
            <td>Register_Globals:</td><td align="right">{sysInfo.registerGlobals}</td>
          </tr>
          <tr>
            <td>Magic_Quotes_Gpc:</td><td align="right">{sysInfo.magicQuotesGPC}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ACPOverview;