type HashtagItemProps = {
  company: string;
  onHashtagClick: (company: string) => void;
};

function HashtagItem({ company, onHashtagClick }: HashtagItemProps) {
  return (
    <li>
      <button onClick={() => onHashtagClick(company)}>#{company}</button>
    </li>
  );
}

export default HashtagItem;
