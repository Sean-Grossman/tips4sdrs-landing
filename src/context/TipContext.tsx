"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the tip data type
export type Tip = {
  id: string;
  sender: string;
  recipient: string;
  amount: number;
  note: string;
  timestamp: string;
  reactions: {
    like: number;
    celebrate: number;
    support: number;
    love: number;
    insightful: number;
    curious: number;
    laugh: number;
  };
};

interface TipContextType {
  tips: Tip[];
  addTip: (newTip: Omit<Tip, 'id' | 'timestamp' | 'reactions'>) => void;
  addReaction: (tipId: string, reactionType: keyof Tip['reactions']) => void;
}

const defaultContext: TipContextType = {
  tips: [],
  addTip: () => {},
  addReaction: () => {},
};

const TipContext = createContext<TipContextType>(defaultContext);

export const useTips = () => useContext(TipContext);

export const TipProvider = ({ children }: { children: ReactNode }) => {
  const [tips, setTips] = useState<Tip[]>([
    {
      id: '1',
      sender: 'Jordan',
      recipient: 'Marcus',
      amount: 5,
      note: 'Crushed the QBR demo.',
      timestamp: '2 minutes ago',
      reactions: {
        like: 3,
        celebrate: 1,
        support: 2,
        love: 0,
        insightful: 0,
        curious: 0,
        laugh: 0,
      },
    },
    {
      id: '2',
      sender: 'Alexis',
      recipient: 'Taylor',
      amount: 10,
      note: 'Helped me get a meeting with the Founder at Reach Orbit.',
      timestamp: '1 hour ago',
      reactions: {
        like: 5,
        celebrate: 2,
        support: 0,
        love: 1,
        insightful: 3,
        curious: 0,
        laugh: 0,
      },
    },
    {
      id: '3',
      sender: 'Chris',
      recipient: 'Morgan',
      amount: 5,
      note: 'Always responsive, helped answer tech questions during the demo.',
      timestamp: '3 hours ago',
      reactions: {
        like: 2,
        celebrate: 0,
        support: 1,
        love: 0,
        insightful: 2,
        curious: 1,
        laugh: 0,
      },
    },
    {
      id: '4',
      sender: 'Jamie',
      recipient: 'Dana',
      amount: 15,
      note: 'Thanks for booking that call with Kaelin!',
      timestamp: '15 minutes ago',
      reactions: {
        like: 7,
        celebrate: 4,
        support: 2,
        love: 3,
        insightful: 1,
        curious: 0,
        laugh: 5,
      },
    },
  ]);

  const addTip = (newTip: Omit<Tip, 'id' | 'timestamp' | 'reactions'>) => {
    const tipWithMetadata: Tip = {
      ...newTip,
      id: (tips.length + 1).toString(),
      timestamp: 'Just now',
      reactions: {
        like: 0,
        celebrate: 0,
        support: 0,
        love: 0,
        insightful: 0,
        curious: 0,
        laugh: 0,
      },
    };

    setTips([tipWithMetadata, ...tips]);
  };

  const addReaction = (tipId: string, reactionType: keyof Tip['reactions']) => {
    setTips(prevTips => 
      prevTips.map(tip => {
        if (tip.id === tipId) {
          // Create a copy of the reactions object to avoid direct mutation
          const updatedReactions = {...tip.reactions};
          updatedReactions[reactionType] += 1;
          
          return {
            ...tip,
            reactions: updatedReactions
          };
        }
        return tip;
      })
    );
  };

  return (
    <TipContext.Provider value={{ tips, addTip, addReaction }}>
      {children}
    </TipContext.Provider>
  );
};
