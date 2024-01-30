import Pagination from 'rc-pagination';
import { useAppConfig, useTranslation } from '../common/dataHooks';
import { CommentStatisticsProps } from '../common/types';
import '../css/index.less';

export default function CommentStatistics(props: CommentStatisticsProps) {
  const { data: lang } = useTranslation();
  const { data: appConfig } = useAppConfig();
  function rawMarkup() {
    let pagenavText, text;
    if (props.commentListType === 1) {
      pagenavText = lang.PAGE_NAV;
      text = pagenavText
        ? pagenavText.replace('{num_of_post}', props.total).replace('{num_of_page}', props.pagenum)
        : '';
    } else if (props.commentListType === 2) {
      if (props.total) {
        pagenavText = lang.SEARCH_FOUND;
        text = pagenavText ? pagenavText.replace('{result_num}', props.total) : '';
      } else {
        text = lang.SEARCH_NOTFOUND;
      }
    }
    return { __html: text };
  }
  return (
    <div className="statistics">
      <p dangerouslySetInnerHTML={rawMarkup()} />
      {parseInt(appConfig?.page_on) === 1 && props.commentListType === 1 && (
        <Pagination
          total={Math.ceil(props.total / appConfig.num_perpage)}
          current={props.currentPage + 1}
          pageSize={Number(appConfig.num_perpage)}
          onChange={(current) => props.onPageChanged(current - 1)}
        />
      )}
    </div>
  );
}
