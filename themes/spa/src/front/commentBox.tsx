import React, { forwardRef, MouseEvent, useEffect, useRef, useState, useImperativeHandle, useContext, FormEvent, ChangeEvent } from 'react';
import dataProvider from '../common/dataProvider';
import LanguageContext from '../common/languageContext';
import AppConfigContext from '../common/appConfigContext';
import * as yuanjs from '@rainyjune/yuanjs';

function Pagination(props: any) {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    let pageNumber = (e.target as HTMLLinkElement).getAttribute("data-pagenumber");
    if (pageNumber == props.currentPage) {
      return false;
    }
    props.onPageChanged(pageNumber);
  };
  return (
    <div className="pagination">
      {(()=> {
        let items = [];
        for (let i = 0; i < props.total; i++) {
          let className = (props.currentPage === i) ? "pagination-item currentPage" : "pagination-item";
          items.push(<a
            key={i}
            className={className} 
            href="#" 
            data-pagenumber={i}
            onClick={handleClick}
            >{i+1}</a>
          );
        }
        return items;
      })()}
    </div>
  )
}

function CommentStatistics(props: any) {
  const appConfig: any = useContext(AppConfigContext);
  const lang: any = useContext(LanguageContext);
  const rawMarkup = () => {
    let pagenavText, text;
    if (props.commentListType === 1) {
      pagenavText = lang.PAGE_NAV;
      text = pagenavText ? pagenavText.replace('{num_of_post}', props.total).replace('{num_of_page}', props.pagenum) : '';
    } else if (props.commentListType === 2) {
      if (props.total) {
        pagenavText = lang.SEARCH_FOUND;
        text = pagenavText ? pagenavText.replace('{result_num}', props.total) : '';
      } else {
        text = lang.SEARCH_NOTFOUND;
      }
    }
    return { __html: text };
  };
  return (
    <div className="statistics">
      {(props.commentListType === 2) ? <a href="#" onClick={props.onCloseSearch}>Close</a> : ''}
      <p dangerouslySetInnerHTML={rawMarkup()} />
      { (!parseInt(appConfig.page_on) || props.commentListType !== 1) ? '' :
        <Pagination 
          onPageChanged={props.onPageChanged} 
          currentPage = {props.currentPage}  
          commentListType={props.commentListType}
          total={Math.ceil(props.total/appConfig.num_perpage)} 
        />
      }
    </div>
  );
}

function CommentList(props: any) {
  let searchText = props.searchText,
      isSearchResult = props.commentListType === 2;

  let createCommentNodes = function(comment: any) {
    let text = isSearchResult ? comment.post_content.replace(searchText, "<span class='keyword'>" + searchText + "</span>") : comment.post_content;
    return (
      <Comment
        key={comment.id}
        data = {comment}>
        {text}
      </Comment>
    );
  };
  return (
    <div className="commentList">
      {props.data.map(createCommentNodes)}
    </div>
  );
}

function Reply(props: any) {
  const lang: any = useContext(LanguageContext);
  const appConfig: any = useContext(AppConfigContext);
  const rawMarkup = () => {
    let mapObj = {
      '{admin_name}': appConfig.admin,
      '{reply_time}': props.date,
      '{reply_content}': props.content
    };
    return { __html: yuanjs.replaceAll(lang.ADMIN_REPLIED, mapObj) };
  };
  return (<div className="reply" dangerouslySetInnerHTML={rawMarkup()}></div>);
}

function Comment(props: any) {
  const rawMarkup = () => {
    return { __html: props.children.toString() };
  };
  const rawAuthorMarkup = () => {
    return { __html: parseInt(props.data.uid) ? props.data.b_username : props.data.uname};
  };
  return (
    <div className="comment">
      <span className="commentAuthor" dangerouslySetInnerHTML={rawAuthorMarkup()}></span> 
      <span className="commentDate">{props.data.time}</span>
      <div className="commentText">
        <p dangerouslySetInnerHTML={rawMarkup()} />
      </div>
      {props.data.reply_content ? <Reply
        content={props.data.reply_content}
        date={props.data.reply_time}
        /> : null
      }
    </div>
  );
}

const Captcha = forwardRef((props: any, ref) => {
  const lang: any = useContext(LanguageContext);
  const picRef = useRef<HTMLImageElement>(null);
  const refreshCaptch = (e: MouseEvent) => {
    e.preventDefault();
    refresh();
  };
  const refresh = () => {
    let img = picRef.current as HTMLImageElement;
    let url = img.getAttribute('data-src');
    img.src = url + '&v=' + Math.random();
  };
  useImperativeHandle(ref, () => ({refresh}), []);
  return (
    <div className="form-group">
      <label htmlFor="inputCaptcha" className="col-sm-2 col-lg-2 control-label">{lang.CAPTCHA}</label>
      <div className="col-sm-5 col-lg-5">
        <input
          id="inputCaptcha"
          type="text" 
          maxLength={10}
          size={20}
          className="form-control"
          value={props.valid_code}
          onChange={props.onCaptchaChange}
        />
        <img
          className="captchaImg"
          ref={picRef}
          src="index.php?action=captcha"
          data-src="index.php?action=captcha"
          onClick={refreshCaptch}
          alt="Captcha"
          title={lang.CLICK_TO_REFRESH}
        />
      </div>
    </div>
  );
});

function CommentForm(props: any) {
  const captchaRef = useRef<any>(null);
  const [userInputType, setUserInputType] = useState('text');
  const [labelContent, setLabelContent] = useState('');
  const [username, setUsername] = useState('anonymous');
  const [text, setText] = useState('');
  const [valid_code, setValid_code] = useState('');
  const lang: any = useContext(LanguageContext);
  const appConfig: any = useContext(AppConfigContext);
  useEffect(() => {
    let computedState: any = {};
    let propUser = props.user;
    if (!propUser) return;
    switch (propUser.user_type) {
      case "admin" :
      case "regular":
        computedState.userInputType = "hidden";
        computedState.username = propUser.username;
        computedState.labelContent = propUser.username;
        break;
      case "guest":
      default:
        computedState.userInputType = "text";
        computedState.username = 'anonymous';
        computedState.labelContent = '';
        break;
    }
    setUserInputType(computedState.userInputType);
    setUsername(computedState.username);
    setLabelContent(computedState.labelContent);
  });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let author = username.trim(),
        text1 = text.trim(),
        valid_code1 = valid_code.trim();
    if (!author || !text1) return;

    setValid_code('');
    
    dataProvider.createPost({ user: author, content: text1, valid_code: valid_code1}, res => {
        if (res.statusCode !== 200) {
          alert(res.response);
          return;
        }
        captchaRef.current?.refresh();
        // Clear the text in the textarea.
        setText('');
        props.onCommentCreated();
    });
    return false;
  };
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleCaptchaChange = (e: any) => {
    setValid_code(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit} className="commentForm form-horizontal" >
      <div className="form-group">
        <label htmlFor="inputUser" className="col-sm-2 col-lg-2 control-label">{lang.NICKNAME}</label>
        <div className="col-sm-5 col-lg-5">
          <input
            id="inputUser"
            type={userInputType} 
            maxLength={10}
            className="form-control"
            value={username}
            onChange={handleUsernameChange}
          />
          <label className="control-label">{userInputType === "hidden" ? username : ''}</label>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inputContent" className="col-sm-2 col-lg-2 control-label">{lang.CONTENT}</label>
        <div className="col-sm-10 col-lg-10">
          <textarea id="inputContent" className="form-control" rows={3} onChange={handleTextChange} value={text}></textarea>
        </div>
      </div>
      {
        (appConfig.valid_code_open == 1) ?
          <Captcha
            ref={captchaRef}
            valid_code={valid_code}
            onCaptchaChange={handleCaptchaChange}
          /> : null
      }
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10 col-lg-offset-2 col-lg-10">
          <button className="btn btn-default" type="submit">{lang.SUBMIT}</button>
        </div>
      </div>
    </form>
  );
}

function CommentBox(props: any) {
  var propsObj = {
    commentListType: props.commentListType,
  };
  const lang: any = useContext(LanguageContext);
  const appConfig: any = useContext(AppConfigContext);
  return (
    <div className="commentBox">
      <h1>{lang.WELCOME_POST}</h1>
      <CommentList
        {...propsObj}
        data={props.comments}
        searchText={props.searchText}
      />
      <CommentStatistics
        {...propsObj}
        onCloseSearch={props.onCloseSearch}
        onPageChanged={props.onPageChanged}
        total={props.commentsTotalNumber} 
        currentPage = {props.currentPage}
        pagenum={appConfig.page_on ? Math.ceil(props.commentsTotalNumber/appConfig.num_perpage) : 1} />
      {
        props.commentListType !== 1 ? '' :
        <CommentForm
          {...propsObj}
          user={props.user}
          onCommentCreated={props.onCommentCreated}
        />
      }
    </div>
  );
}

export default CommentBox;