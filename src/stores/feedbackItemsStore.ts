import { create } from 'zustand';
import { TFeedbackItem } from '../lib/types.ts';
import { BASE_URL } from '../lib/constants.ts';

type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addItemToList: (text: string) => Promise<void>;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

const useFeedbackItemsStore  = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: '',
  selectedCompany: '',
  getCompanyList: () => {
    return get()
      .feedbackItems.map((item) => item.company)
      .filter((company, index, array) => {
        return array.indexOf(company) === index;
      })
  },
  getFilteredFeedbackItems: () => {
    const state = get();

    return state.selectedCompany
      ? state.feedbackItems.filter((item) => item.company === state.selectedCompany)
      : state.feedbackItems;
  },
  addItemToList: async (text: string) => {
    const companyName = text
      .split(' ')
      .find((word) => word.includes('#'))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    set(state => ({
      feedbackItems: [...state.feedbackItems, newItem]
    }));

    await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  },
  selectCompany: (company: string) => {
    set(() => ({
      selectedCompany: company
    }))
  },
  fetchFeedbackItems: async () => {
    set(() => ({
      isLoading: true
    }));

    try {
      const response = await fetch(BASE_URL);

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      set(() => ({
        feedbackItems: data.feedbacks
      }))
    } catch (error) {
      set(() => ({
        errorMessage: 'Something went wrong.'
      }))
    }

    set(() => ({
      isLoading: false
    }));
  },
}));

export { useFeedbackItemsStore };

