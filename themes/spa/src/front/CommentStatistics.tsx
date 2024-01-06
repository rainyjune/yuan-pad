import { useContext } from 'react';
import LanguageContext from '../common/languageContext';
import AppConfigContext from '../common/appConfigContext';
import Pagination from './Pagination';

export default function CommentStatistics(props: any) {
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