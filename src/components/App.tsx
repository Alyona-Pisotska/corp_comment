import { useEffect } from 'react';
import Footer from './layuot/Footer.tsx';
import Container from './layuot/Container.tsx';
import HashtagList from './hashtag/HashtagList.tsx';
import { useFeedbackItemsStore } from '../stores/feedbackItemsStore.ts';

function App() {
  const fetchFeedbackItems = useFeedbackItemsStore((state) => state.fetchFeedbackItems);

  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);

  return (
    <div className='app'>
      <Footer />
      <Container />
      <HashtagList />
    </div>
  );
}

export default App
