import React, { useState } from 'react';
import { TriangleUpIcon } from '@radix-ui/react-icons';
import { type TFeedbackItem } from '../../lib/types.ts';

type FeedbackItemProps = {
  feedbackItem: TFeedbackItem;
};

function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const { upvoteCount, badgeLetter, company, text, daysAgo } = feedbackItem;
  const [open, setOpen] = useState(false);
  const [newUpvoteCount, setNewUpvoteCount] = useState(upvoteCount);

  const handleUpvoteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setNewUpvoteCount((prevState) => ++prevState);
    e.currentTarget.disabled = true;
    e.stopPropagation();
  };

  return (
    <li
      onClick={() => setOpen((prevState) => !prevState)}
      className={`feedback ${open ? 'feedback--expand' : ''}`}
    >
      <button onClick={handleUpvoteClick}>
        <TriangleUpIcon />
        <span>{newUpvoteCount}</span>
      </button>

      <div>
        <p>{badgeLetter}</p>
      </div>

      <div>
        <p>{company}</p>
        <p>{text}</p>
      </div>

      <p>{daysAgo === 0 ? 'NEW' : `${daysAgo}d`}</p>
    </li>
  );
}

export default FeedbackItem;
