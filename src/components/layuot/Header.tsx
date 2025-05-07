import { useFeedbackItemsStore } from '../../stores/feedbackItemsStore.ts';
import Pattern from '../Pattern.tsx';
import Logo from '../Logo.tsx';
import PageHeading from '../PageHeading.tsx';
import FeedbackForm from '../feedback/FeedbackForm.tsx';

function Header() {
  const addItemToList = useFeedbackItemsStore((state) => state.addItemToList);

  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddToList={addItemToList} />
    </header>
  );
}

export default Header;
