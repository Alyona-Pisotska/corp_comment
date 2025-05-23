import { useFeedbackItemsStore } from '../../stores/feedbackItemsStore.ts';
import HashtagItem from './HashtagItem.tsx';

function HashtagList() {
  const companyList = useFeedbackItemsStore((state) => state.getCompanyList());
  const selectCompany = useFeedbackItemsStore((state) => state.selectCompany);

  return (
    <ul className='hashtags'>
      {companyList.map((company) => (
        <HashtagItem
          key={company}
          company={company}
          onHashtagClick={selectCompany}
        />
      ))}
    </ul>
  );
}

export default HashtagList;
